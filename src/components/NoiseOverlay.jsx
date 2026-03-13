import { useEffect, useRef } from "react";

/**
 * Animated film-grain / noise overlay.
 * Draws random pixel noise on a canvas every N frames.
 * Pure canvas — zero deps, zero paint cost on main thread.
 *
 * Props:
 *   opacity  (default 0.04)  — how visible the grain is
 *   speed    (default 3)     — refresh every N frames (lower = faster flicker)
 *   zIndex   (default 2)
 */
const NoiseOverlay = ({ opacity = 0.04, speed = 3, zIndex = 2 }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const frameRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Fill canvas to match container
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      frameRef.current++;

      // Only redraw every `speed` frames — controls flicker rate
      if (frameRef.current % speed === 0) {
        const w = canvas.width;
        const h = canvas.height;
        if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(draw); return; }

        const imageData = ctx.createImageData(w, h);
        const data      = imageData.data;

        // Fill with random grey pixels — only R channel matters (grey = equal RGB)
        for (let i = 0; i < data.length; i += 4) {
          const v  = (Math.random() * 255) | 0;
          data[i]     = v;   // R
          data[i + 1] = v;   // G
          data[i + 2] = v;   // B
          data[i + 3] = 255; // A — opacity controlled by canvas CSS
        }

        ctx.putImageData(imageData, 0, 0);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:       "absolute",
        inset:          0,
        width:          "100%",
        height:         "100%",
        opacity:        opacity,
        pointerEvents:  "none",
        zIndex:         zIndex,
        // "screen" blend — brightens dark areas, adds glow to highlights
        mixBlendMode:   "screen",
      }}
    />
  );
};

export default NoiseOverlay;