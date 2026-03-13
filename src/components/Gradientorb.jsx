import { useEffect, useRef } from "react";
import gsap from "gsap";

// Soft ambient orb that slowly drifts — adds depth to dark backgrounds
const GradientOrb = ({ x = "20%", y = "30%", size = 600, color = "#CAFF00", opacity = 0.04 }) => {
  const orbRef = useRef(null);

  useEffect(() => {
    // Slow breathing drift
    gsap.to(orbRef.current, {
      x: "+=40",
      y: "+=30",
      duration: 8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    gsap.to(orbRef.current, {
      scale: 1.15,
      duration: 6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1,
    });
  }, []);

  return (
    <div
      ref={orbRef}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        pointerEvents: "none",
        filter: "blur(40px)",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
      }}
    />
  );
};

export default GradientOrb;