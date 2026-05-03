import React, { useEffect, useRef } from "react";

// Background-only WebGL shader — restored to original prompt colours/logic.
// Only change from original: time runs at 0.65× speed (slightly slower, no dimming).
export default function ShaderBackground({ style }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vert = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // ── Original fragment shader from the prompt, unchanged ──
    const frag = `
      precision mediump float;

      uniform vec2  u_resolution;
      uniform float u_time;
      uniform vec2  u_mouse;

      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv  = gl_FragCoord.xy / u_resolution.xy;
        vec2 uv0 = uv;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;

        float d   = length(uv);
        vec3  col = vec3(0.0);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.5) - 0.5;

          d = length(uv) * exp(-length(uv0));

          vec3 color = palette(length(uv0) + i * 0.4 + u_time * 0.01);

          d = sin(d * 4.0 + u_time) / 36.0;
          d = pow(0.005 / d, 1.5);

          vec2  mouseEffect = u_mouse - uv0;
          float mouseDist   = length(mouseEffect);
          d *= 1.0 + sin(mouseDist * 10.0 - u_time * 2.0) * 0.1;

          col += color * d;
        }

        float wave = sin(uv0.x * 2.0 + u_time) * 0.01;
        col += vec3(wave);

        vec3 gradient1   = vec3(0.1, 0.2, 0.5);
        vec3 gradient2   = vec3(0.9, 0.1, 0.4);
        vec3 gradientMix = mix(gradient1, gradient2, uv0.y + sin(u_time) * 0.2);
        col = mix(col, gradientMix, 0.3);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function makeShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, makeShader(gl.VERTEX_SHADER,   vert));
    gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(prog,  "a_position");
    const resLoc = gl.getUniformLocation(prog,  "u_resolution");
    const timLoc = gl.getUniformLocation(prog,  "u_time");
    const mouLoc = gl.getUniformLocation(prog,  "u_mouse");

    const resize = () => {
      const parent = canvas.parentNode;
      canvas.width  = parent ? parent.offsetWidth  : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse);

    const t0 = Date.now();
    const render = () => {
      // Original speed was * 0.001 — running at 0.65× (slightly slower, no other change)
      const t = (Date.now() - t0) * 0.001 * 0.65;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timLoc, t);
      gl.uniform2f(mouLoc, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset:     0,
        width:    "100%",
        height:   "100%",
        display:  "block",
        ...style,
      }}
    />
  );
}
