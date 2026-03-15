import { useEffect, useRef } from "react";
import isMobile from "../utils/isMobile";

const NoiseOverlay = ({ opacity = 0.04, speed = 3, zIndex = 2 }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const frameRef  = useRef(0);

  useEffect(() => {
    if (isMobile()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = Math.floor(canvas.offsetWidth  / 2);
      canvas.height = Math.floor(canvas.offsetHeight / 2);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      frameRef.current++;
      if (frameRef.current % speed === 0) {
        const w = canvas.width;
        const h = canvas.height;
        if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(draw); return; }
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          data[i] = data[i+1] = data[i+2] = v;
          data[i+3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [speed]);
  if (isMobile()) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        imageRendering: "pixelated",
        opacity, pointerEvents: "none", zIndex,
        mixBlendMode: "screen",
      }}
    />
  );
};

export default NoiseOverlay;