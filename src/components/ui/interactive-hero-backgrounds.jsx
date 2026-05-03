import React, { useRef, useEffect } from "react";
import { SmokeBackground } from "./spooky-smoke-animation";
import {
  Clock, PerspectiveCamera, Scene, WebGLRenderer, SRGBColorSpace, MathUtils,
  Vector2, Vector3, MeshPhysicalMaterial, Color, Object3D, InstancedMesh,
  PMREMGenerator, SphereGeometry, AmbientLight, PointLight, ACESFilmicToneMapping,
  Raycaster, Plane,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { ArrowRight, Flower2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Bouquet D'Amour brand palette ───────────────────────────
const SPHERE_COLORS = [
  "#B5305A", // deep rose
  "#ce7382", // blush rose
  "#8C2044", // burgundy rose
  "#e8a0b4", // light pink
  "#f0c8d8", // petal pink
  "#d4607a", // medium rose
  "#F7E6EC", // soft blush
  "#c0405e", // rich rose
];

// ─── Three.js scene manager ───────────────────────────────────
class ThreeScene {
  #resizeObserver;
  #intersectionObserver;
  #resizeTimer;
  #animationFrameId = 0;
  #clock = new Clock();
  #state = { elapsed: 0, delta: 0 };
  #isAnimating = false;
  #isVisible = false;

  canvas; camera; scene; renderer;
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0 };
  onBeforeRender = () => {};
  onAfterResize  = () => {};

  constructor({ canvas, rendererOptions = {} }) {
    this.canvas   = canvas;
    this.camera   = new PerspectiveCamera(50, 1, 0.1, 100);
    this.scene    = new Scene();
    this.renderer = new WebGLRenderer({
      canvas,
      powerPreference: "high-performance",
      alpha: true,
      antialias: true,
      ...rendererOptions,
    });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.canvas.style.display = "block";
    this.#initObservers();
    this.resize();
  }

  #initObservers() {
    const parent = this.canvas.parentNode;
    if (parent) {
      this.#resizeObserver = new ResizeObserver(() => {
        clearTimeout(this.#resizeTimer);
        this.#resizeTimer = setTimeout(() => this.resize(), 100);
      });
      this.#resizeObserver.observe(parent);
    } else {
      window.addEventListener("resize", () => {
        clearTimeout(this.#resizeTimer);
        this.#resizeTimer = setTimeout(() => this.resize(), 100);
      });
    }
    this.#intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.#isAnimating = entries[0].isIntersecting;
        this.#isAnimating ? this.#startAnimation() : this.#stopAnimation();
      },
      { threshold: 0 }
    );
    this.#intersectionObserver.observe(this.canvas);
    document.addEventListener("visibilitychange", () => {
      if (this.#isAnimating) {
        document.hidden ? this.#stopAnimation() : this.#startAnimation();
      }
    });
  }

  resize() {
    const parent = this.canvas.parentNode;
    const w = parent ? parent.offsetWidth  : window.innerWidth;
    const h = parent ? parent.offsetHeight : window.innerHeight;
    this.size.width  = w;
    this.size.height = h;
    this.size.ratio  = w / h;
    this.camera.aspect = this.size.ratio;
    this.camera.updateProjectionMatrix();
    const fovRad = (this.camera.fov * Math.PI) / 180;
    this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.z;
    this.size.wWidth  = this.size.wHeight * this.camera.aspect;
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.onAfterResize(this.size);
  }

  #startAnimation() {
    if (this.#isVisible) return;
    this.#isVisible = true;
    this.#clock.start();
    const loop = () => {
      this.#animationFrameId = requestAnimationFrame(loop);
      this.#state.delta    = this.#clock.getDelta();
      this.#state.elapsed += this.#state.delta;
      this.onBeforeRender(this.#state);
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  #stopAnimation() {
    if (!this.#isVisible) return;
    cancelAnimationFrame(this.#animationFrameId);
    this.#isVisible = false;
    this.#clock.stop();
  }

  dispose() {
    this.#stopAnimation();
    this.#resizeObserver?.disconnect();
    this.#intersectionObserver?.disconnect();
    this.scene.clear();
    this.renderer.dispose();
  }
}

// ─── Physics simulation ───────────────────────────────────────
class Physics {
  positionData; velocityData; sizeData;
  center = new Vector3();

  constructor(cfg) {
    this.cfg          = cfg;
    this.positionData = new Float32Array(3 * cfg.count);
    this.velocityData = new Float32Array(3 * cfg.count);
    this.sizeData     = new Float32Array(cfg.count);
    this.#initPositions();
    this.#initSizes();
    this.#initVelocities();
  }

  #initPositions() {
    const { count, maxX, maxY, maxZ } = this.cfg;
    this.center.toArray(this.positionData, 0);
    for (let i = 1; i < count; i++) {
      const b = 3 * i;
      this.positionData[b]     = MathUtils.randFloatSpread(2 * maxX);
      this.positionData[b + 1] = MathUtils.randFloatSpread(2 * maxY);
      this.positionData[b + 2] = MathUtils.randFloatSpread(2 * maxZ);
    }
  }

  #initSizes() {
    const { count, size0, minSize, maxSize } = this.cfg;
    this.sizeData[0] = size0;
    for (let i = 1; i < count; i++)
      this.sizeData[i] = MathUtils.randFloat(minSize, maxSize);
  }

  // Give every ball a gentle random starting velocity
  #initVelocities() {
    const { count } = this.cfg;
    for (let i = 1; i < count; i++) {
      const b = 3 * i;
      this.velocityData[b]     = MathUtils.randFloatSpread(0.08);
      this.velocityData[b + 1] = MathUtils.randFloatSpread(0.08);
      this.velocityData[b + 2] = MathUtils.randFloatSpread(0.04);
    }
  }

  update({ delta }) {
    const { cfg, center, positionData, sizeData, velocityData } = this;
    const start = cfg.controlSphere0 ? 1 : 0;

    if (cfg.controlSphere0) {
      new Vector3().fromArray(positionData, 0).lerp(center, 0.1).toArray(positionData, 0);
      new Vector3(0, 0, 0).toArray(velocityData, 0);
    }

    for (let i = start; i < cfg.count; i++) {
      const b   = 3 * i;
      const pos = new Vector3().fromArray(positionData, b);
      const vel = new Vector3().fromArray(velocityData, b);

      vel.y -= delta * cfg.gravity * sizeData[i];
      // Tiny random drift — keeps every ball in perpetual motion
      const wf = cfg.windForce || 0;
      vel.x += (Math.random() - 0.5) * wf;
      vel.y += (Math.random() - 0.5) * wf;
      vel.z += (Math.random() - 0.5) * wf * 0.4;
      vel.multiplyScalar(cfg.friction);
      vel.clampLength(0, cfg.maxVelocity);
      pos.add(vel);

      // sphere–sphere collision
      for (let j = i + 1; j < cfg.count; j++) {
        const ob   = 3 * j;
        const oPos = new Vector3().fromArray(positionData, ob);
        const diff = new Vector3().subVectors(oPos, pos);
        const dist = diff.length();
        const sum  = sizeData[i] + sizeData[j];
        if (dist < sum) {
          const overlap = (sum - dist) * 0.5;
          diff.normalize();
          pos.addScaledVector(diff, -overlap);
          oPos.addScaledVector(diff,  overlap);
          oPos.toArray(positionData, ob);
        }
      }

      // wall bounce — all 6 faces
      if (Math.abs(pos.x) + sizeData[i] > cfg.maxX) {
        pos.x = Math.sign(pos.x) * (cfg.maxX - sizeData[i]);
        vel.x *= -cfg.wallBounce;
      }
      if (pos.y - sizeData[i] < -cfg.maxY) {
        pos.y = -cfg.maxY + sizeData[i];
        vel.y *= -cfg.wallBounce;
      }
      if (pos.y + sizeData[i] > cfg.maxY) {
        pos.y = cfg.maxY - sizeData[i];
        vel.y *= -cfg.wallBounce;
      }
      if (Math.abs(pos.z) + sizeData[i] > cfg.maxZ) {
        pos.z = Math.sign(pos.z) * (cfg.maxZ - sizeData[i]);
        vel.z *= -cfg.wallBounce;
      }

      pos.toArray(positionData, b);
      vel.toArray(velocityData, b);
    }
  }
}

// ─── Instanced sphere mesh ─────────────────────────────────────
const _obj = new Object3D();

class FlowerSpheres extends InstancedMesh {
  constructor(renderer, params) {
    const pmrem      = new PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(renderer)).texture;
    pmrem.dispose();

    super(
      new SphereGeometry(1, 32, 32),
      new MeshPhysicalMaterial({
        envMap:             envTexture,
        metalness:          0.5,
        roughness:          0.25,
        clearcoat:          1,
        clearcoatRoughness: 0.1,
        ...params.materialParams,
      }),
      params.count
    );

    this.cfg     = params;
    this.physics = new Physics(params);

    this.ambientLight = new AmbientLight(0xffffff, params.ambientIntensity ?? 1.5);
    this.add(this.ambientLight);
    this.light = new PointLight(0xffffff, params.lightIntensity ?? 3, 100, 1);
    this.add(this.light);

    this.#applyColors(params.colors);
  }

  #applyColors(colors) {
    if (!colors?.length) return;
    const objs = colors.map(c => c instanceof Color ? c : new Color(c));
    for (let i = 0; i < this.count; i++) this.setColorAt(i, objs[i % objs.length]);
    if (this.instanceColor) this.instanceColor.needsUpdate = true;
  }

  update(deltaInfo) {
    this.physics.update(deltaInfo);
    for (let i = 0; i < this.count; i++) {
      _obj.position.fromArray(this.physics.positionData, 3 * i);
      _obj.scale.setScalar(this.physics.sizeData[i]);
      _obj.updateMatrix();
      this.setMatrixAt(i, _obj.matrix);
    }
    this.instanceMatrix.needsUpdate = true;
    if (this.cfg.controlSphere0)
      this.light.position.fromArray(this.physics.positionData, 0);
  }
}

// ─── Pointer tracking ─────────────────────────────────────────
const pointer = new Vector2();
function onPointerMove(e) {
  pointer.set(
    (e.clientX / window.innerWidth)  *  2 - 1,
    (e.clientY / window.innerHeight) * -2 + 1
  );
}

// ─── Sphere config ─────────────────────────────────────────────
const SPHERE_CONFIG = {
  count:            80,
  colors:           SPHERE_COLORS,
  minSize:          0.09,
  maxSize:          0.26,
  size0:            0.28,
  gravity:          0,       // zero gravity — balls float in all directions
  friction:         0.9985,  // gentle damping prevents wind runaway
  wallBounce:       0.96,    // good energy retention on each bounce
  windForce:        0.003,   // maintains perpetual drift against friction
  maxVelocity:      0.12,
  maxX:             10,
  maxY:             10,
  maxZ:             10,
  controlSphere0:   true,
  followCursor:     true,
  lightIntensity:   3.5,
  ambientIntensity: 1.2,
};

// ─── Exported hero component ───────────────────────────────────
export function InteractiveHeroSection() {
  const canvasRef = useRef(null);
  const navigate  = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const three = new ThreeScene({ canvas });
    three.renderer.toneMapping = ACESFilmicToneMapping;
    three.camera.position.set(0, 0, 20);

    const spheres   = new FlowerSpheres(three.renderer, SPHERE_CONFIG);
    const raycaster = new Raycaster();
    const plane     = new Plane(new Vector3(0, 0, 1), 0);
    const hitPoint  = new Vector3();

    three.scene.add(spheres);
    window.addEventListener("pointermove", onPointerMove);

    three.onBeforeRender = (deltaInfo) => {
      raycaster.setFromCamera(pointer, three.camera);
      if (raycaster.ray.intersectPlane(plane, hitPoint))
        spheres.physics.center.copy(hitPoint);
      spheres.update(deltaInfo);
    };

    three.onAfterResize = (size) => {
      spheres.physics.cfg.maxX = size.wWidth  / 2;
      spheres.physics.cfg.maxY = size.wHeight / 2;
      spheres.physics.cfg.maxZ = size.wWidth  / 4;
    };

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      three.dispose();
    };
  }, []);

  return (
    <section style={{
      position:   'relative',
      width:      '100%',
      height:     '100vh',
      overflow:   'hidden',
      background: 'var(--sec-hero)',
    }}>
      {/* Layer 0 — Smoke / fog WebGL2 background */}
      <SmokeBackground smokeColor="#C2385A" style={{ zIndex: 0 }} />

      {/* Layer 1 — Three.js physics spheres (transparent bg shows shader) */}
      <canvas
        ref={canvasRef}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1 }}
      />

      {/* Layer 2 — soft vignette: darkens edges, keeps centre bright */}
      <div style={{
        position:   'absolute',
        inset:       0,
        background: [
          'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(4,1,2,0.15) 70%, rgba(4,1,2,0.45) 100%)',
          'linear-gradient(to bottom, rgba(4,1,2,0.25) 0%, transparent 18%, transparent 80%, rgba(4,1,2,0.35) 100%)',
        ].join(', '),
        zIndex: 2,
      }} />

      {/* Keyframe animations */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes heroIconPulse {
          0%,100% { filter: drop-shadow(0 0 12px rgba(192,57,90,0.55)); }
          50%      { filter: drop-shadow(0 0 28px rgba(192,57,90,1.00)); }
        }
        @keyframes heroDividerIn {
          from { opacity:0; transform:translateX(-18px); }
          to   { opacity:1; transform:translateX(0);     }
        }
      `}</style>

      {/* Layer 3 — HeroSection03-style typographic content */}
      <div style={{
        position:      'absolute',
        inset:          0,
        zIndex:         3,
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'center',
        padding:       'clamp(72px,8vh,96px) clamp(24px,5vw,64px) clamp(28px,4vh,48px)',
      }}>

        {/* ── Row 1: description + FRESH ── */}
        <div style={{ display:'flex', alignItems:'flex-end', gap:'20px', marginBottom:'2px', opacity:0, animation:'heroFadeUp 0.65s ease forwards', animationDelay:'0.1s' }}>
          <p style={{
            fontSize:   '0.78rem',
            color:      'rgba(255,210,225,0.6)',
            lineHeight: 1.65,
            margin:     0,
            maxWidth:   '180px',
            textAlign:  'right',
            fontFamily: "'Poppins', sans-serif",
            flexShrink:  0,
          }}>
            India's premier floral brand,<br />crafting bouquets since&nbsp;2019.
          </p>
          <h1 style={{
            fontSize:      'clamp(2.6rem,7.5vw,8rem)',
            fontWeight:     300,
            lineHeight:     1,
            letterSpacing: '0.06em',
            margin:         0,
            fontFamily:    "var(--font-body)",
            color:         'var(--text-on-dark)',
            textShadow:    '0 2px 24px rgba(0,0,0,0.55)',
          }}>FRESH</h1>
        </div>

        {/* ── Row 2: B[Flower]UQUETS + description ── */}
        <div style={{ display:'flex', alignItems:'flex-end', gap:'20px', marginBottom:'2px', opacity:0, animation:'heroFadeUp 0.65s ease forwards', animationDelay:'0.35s' }}>
          <h1 style={{
            fontSize:      'clamp(2.6rem,7.5vw,8rem)',
            fontWeight:     300,
            lineHeight:     1,
            letterSpacing: '0.06em',
            margin:         0,
            fontFamily:    "var(--font-body)",
            color:         'var(--text-on-dark)',
            display:       'flex',
            alignItems:    'center',
            textShadow:    '0 2px 24px rgba(0,0,0,0.55)',
          }}>
            <span>B</span>
            <Flower2 style={{
              width:     'clamp(2.4rem,7vw,7.5rem)',
              height:    'clamp(2.4rem,7vw,7.5rem)',
              color:     'var(--rose)',
              flexShrink: 0,
              animation: 'heroIconPulse 2.8s ease-in-out infinite',
            }} />
            <span>UQUETS</span>
          </h1>
          <p style={{
            fontSize:   '0.78rem',
            color:      'rgba(255,210,225,0.6)',
            lineHeight: 1.65,
            margin:     0,
            maxWidth:   '180px',
            fontFamily: "'Poppins', sans-serif",
            flexShrink:  0,
            paddingBottom: '10px',
          }}>
            Delivering joy across<br />450+ cities in&nbsp;India.
          </p>
        </div>

        {/* ── Row 3: CRAFTED ❤ LOVE ── */}
        <div style={{ display:'flex', alignItems:'flex-end', gap:'20px', marginBottom:'28px', opacity:0, animation:'heroFadeUp 0.65s ease forwards', animationDelay:'0.6s' }}>
          <h1 style={{
            fontSize:      'clamp(2.6rem,7.5vw,8rem)',
            fontWeight:     300,
            lineHeight:     1,
            letterSpacing: '0.06em',
            margin:         0,
            fontFamily:    "var(--font-body)",
            color:         'var(--text-on-dark)',
            display:       'flex',
            alignItems:    'center',
            textShadow:    '0 2px 24px rgba(0,0,0,0.55)',
          }}>
            <span>CRAFTED</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width:'clamp(2.4rem,7vw,7.5rem)', height:'clamp(2.4rem,7vw,7.5rem)', flexShrink:0, animation:'heroIconPulse 2.8s ease-in-out infinite 0.5s' }}
              viewBox="0 0 24 24"
              fill="var(--rose)"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
            <span>LOVE</span>
          </h1>
        </div>

        {/* ── Divider + info + CTA buttons ── */}
        <div style={{
          borderTop:       '1px solid rgba(255,180,200,0.14)',
          paddingTop:      '20px',
          display:         'flex',
          alignItems:      'center',
          gap:             '20px',
          flexWrap:        'wrap',
          opacity:          0,
          animation:       'heroDividerIn 0.6s ease forwards',
          animationDelay:  '0.85s',
        }}>
          {/* Location tag */}
          <span style={{
            fontSize:      '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'rgba(240,160,184,0.5)',
            fontFamily:    "var(--font-body)",
            whiteSpace:    'nowrap',
          }}>
            Pan India · 450+ Cities
          </span>

          {/* Brand name accent */}
          <div style={{ display:'flex', alignItems:'flex-end', gap:'6px' }}>
            <span style={{
              fontSize:   'clamp(0.85rem,1.6vw,1.2rem)',
              fontWeight:  100,
              fontFamily: "'Poppins', sans-serif",
              color:      'rgba(255,240,243,0.6)',
            }}>FLORIST</span>
            <span style={{
              fontSize:    'clamp(1rem,2vw,1.5rem)',
              fontWeight:   700,
              fontStyle:   'italic',
              color:       'var(--rose-light)',
              fontFamily:  "'Poppins', sans-serif",
            }}>sai</span>
          </div>

          <div style={{ flex:1 }} />

          {/* CTA buttons */}
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <button
              onClick={() => navigate('/products')}
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          '7px',
                padding:      '11px 26px',
                fontSize:     '13px',
                fontWeight:    700,
                color:        'var(--white)',
                background:   'linear-gradient(135deg, var(--rose), var(--rose-hover))',
                border:       'none',
                borderRadius: '9999px',
                cursor:       'pointer',
                boxShadow:    'var(--btn-primary-shadow)',
                transition:   'transform 200ms, box-shadow 200ms',
                fontFamily:   "var(--font-body)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow)';
              }}
            >
              Explore Bouquets <ArrowRight size={14} />
            </button>

            <button
              onClick={() => navigate('/contact')}
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                gap:             '7px',
                padding:         '11px 26px',
                fontSize:        '13px',
                fontWeight:       600,
                color:           'var(--rose-light)',
                backgroundColor: 'rgba(251,222,232,0.08)',
                border:          '1px solid rgba(251,222,232,0.28)',
                borderRadius:    '9999px',
                cursor:          'pointer',
                backdropFilter:  'blur(8px)',
                transition:      'background 200ms,border-color 200ms,transform 200ms',
                fontFamily:      "'Poppins', sans-serif",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(251,222,232,0.18)';
                e.currentTarget.style.borderColor     = 'rgba(251,222,232,0.6)';
                e.currentTarget.style.transform       = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(251,222,232,0.08)';
                e.currentTarget.style.borderColor     = 'rgba(251,222,232,0.28)';
                e.currentTarget.style.transform       = 'translateY(0)';
              }}
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
