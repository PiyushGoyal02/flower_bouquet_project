import React, { useState, useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  QuadraticBezierCurve3,
  Vector3,
  TubeGeometry,
  ShaderMaterial,
  Mesh,
  AdditiveBlending,
  DoubleSide,
} from "three";

/* ── Vertex shader (shared) ── */
const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* ── Fragment: rose → gold brand streak ── */
const FRAG_STREAK = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vec3 rose  = vec3(0.76, 0.22, 0.35);
    vec3 gold  = vec3(0.83, 0.66, 0.25);
    vec3 deep  = vec3(0.48, 0.08, 0.18);
    vec3 color = mix(rose, gold, vUv.x);
    color = mix(color, deep, vUv.x * 0.6);
    float glow  = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 2.0);
    float fade  = vUv.x > 0.85 ? 1.0 - smoothstep(0.85, 1.0, vUv.x) : 1.0;
    float pulse = sin(time * 2.0) * 0.1 + 0.9;
    gl_FragColor = vec4(color * glow * pulse * fade, glow * fade * 0.85);
  }
`;

const FRAG_GLOW = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vec3 rose = vec3(0.76, 0.22, 0.35);
    vec3 gold = vec3(0.83, 0.66, 0.25);
    vec3 color = mix(rose, gold, vUv.x);
    float glow  = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 4.0);
    float fade  = vUv.x > 0.85 ? 1.0 - smoothstep(0.85, 1.0, vUv.x) : 1.0;
    float pulse = sin(time * 1.5) * 0.05 + 0.95;
    gl_FragColor = vec4(color * glow * pulse * fade, glow * fade * 0.30);
  }
`;

export default function NewsletterCapture() {
  const mountRef = useRef(null);
  const animRef  = useRef(null);

  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);

  /* ── Three.js background ── */
  useEffect(() => {
    if (!mountRef.current) return;

    const scene    = new Scene();
    const camera   = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    mountRef.current.appendChild(renderer.domElement);

    const curve = new QuadraticBezierCurve3(
      new Vector3(-15, -4, 0),
      new Vector3(2,    3, 0),
      new Vector3(18, 0.8, 0),
    );

    const mkMesh = (radius, frag) => {
      const geo = new TubeGeometry(curve, 200, radius, 32, false);
      const mat = new ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: frag,
        uniforms: { time: { value: 0 } },
        transparent: true,
        blending: AdditiveBlending,
        side: DoubleSide,
      });
      return { mesh: new Mesh(geo, mat), mat, geo };
    };

    const streak = mkMesh(0.8, FRAG_STREAK);
    const glow   = mkMesh(1.5, FRAG_GLOW);
    scene.add(streak.mesh, glow.mesh);

    camera.position.set(0, -0.8, 7);

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      streak.mat.uniforms.time.value = t;
      glow.mat.uniforms.time.value   = t;
      streak.mesh.rotation.z = Math.sin(t * 0.2) * 0.05;
      glow.mesh.rotation.z   = Math.sin(t * 0.2) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animRef.current);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      streak.geo.dispose(); streak.mat.dispose();
      glow.geo.dispose();   glow.mat.dispose();
    };
  }, []);

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSent(true);
      setEmail("");
    }, 1400);
  };

  return (
    <section className="nlc-section">
      {/* Three.js canvas bg */}
      <div ref={mountRef} className="nlc-canvas" />

      {/* Overlay gradient */}
      <div className="nlc-overlay" />

      {/* Card */}
      <div className="nlc-card-wrap">
        <div className="nlc-card">

          <h2 className="nlc-heading">Stay in Bloom</h2>

          <form onSubmit={handleSubmit} className="nlc-form">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="nlc-input"
            />
            <button type="submit" disabled={busy} className="nlc-btn">
              {busy ? <span className="nlc-spinner" /> : "Subscribe"}
            </button>
          </form>

          {sent && (
            <p className="nlc-sent-msg">✓ You're subscribed! Stay blooming.</p>
          )}

        </div>

        <div className="nlc-card-glow" />
      </div>
    </section>
  );
}
