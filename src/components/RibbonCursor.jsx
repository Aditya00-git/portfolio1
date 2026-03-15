import { useEffect, useRef } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';
import isMobile from '../utils/isMobile';

const RibbonCursor = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isMobile()) return;

    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    gl.canvas.style.position = 'fixed';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100vw';
    gl.canvas.style.height = '100vh';
    gl.canvas.style.pointerEvents = 'none';
    gl.canvas.style.zIndex = '99998';
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines = [];

    const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      varying vec2 vUV;
      vec4 getPosition() {
        vec4 current = vec4(position, 1.0);
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;
        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;
        normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
        float dist = length(nextScreen - prevScreen);
        normal *= smoothstep(0.0, 0.02, dist);
        float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
        float pixelWidth = current.w * pixelWidthRatio;
        normal *= pixelWidth * uThickness;
        current.xy -= normal * side;
        return current;
      }
      void main() {
        vUV = uv;
        gl_Position = getPosition();
      }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUV;
      void main() {
        // Fade tail out — head is bright, tail fades
        float fade = 1.0 - smoothstep(0.0, 1.0, vUV.y);
        gl_FragColor = vec4(uColor, uOpacity * fade);
      }
    `;

    const STRANDS = [
      { color: '#CAFF00', thickness: 22, spring: 0.04, friction: 0.88, offset: new Vec3(0, 0, 0) },
      { color: '#CAFF00', thickness: 14, spring: 0.03, friction: 0.86, offset: new Vec3(0.012, 0.012, 0) },
      { color: '#a8d900', thickness: 8,  spring: 0.025, friction: 0.84, offset: new Vec3(-0.01, 0.02, 0) },
    ];

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      lines.forEach(l => l.polyline.resize());
    }
    window.addEventListener('resize', resize);

    STRANDS.forEach(({ color, thickness, spring, friction, offset }) => {
      const count = 24;
      const points = Array.from({ length: count }, () => new Vec3());

      const polyline = new Polyline(gl, {
        points,
        vertex,
        fragment,
        uniforms: {
          uColor:   { value: new Color(color) },
          uThickness: { value: thickness },
          uOpacity: { value: 0.85 },
        },
      });
      polyline.mesh.setParent(scene);

      lines.push({ spring, friction, mouseVelocity: new Vec3(), mouseOffset: offset, points, polyline });
    });

    resize();

    const mouse = new Vec3(-2, -2, 0); 
    const tmp   = new Vec3();

    const onMove = (e) => {
      mouse.set(
        (e.clientX / window.innerWidth)  *  2 - 1,
        (e.clientY / window.innerHeight) * -2 + 1,
        0
      );
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let rafId;
    function update() {
      rafId = requestAnimationFrame(update);

      lines.forEach(line => {
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);
        for (let i = 1; i < line.points.length; i++) {
          line.points[i].lerp(line.points[i - 1], 0.7);
        }
        line.polyline.updateGeometry();
      });

      renderer.render({ scene });
    }
    update();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
    };
  }, []);

  if (isMobile()) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 99998,
      }}
    />
  );
};

export default RibbonCursor;