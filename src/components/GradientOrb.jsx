import { useEffect, useRef } from "react";
import gsap from "gsap";
import isMobile from "../utils/isMobile";

/**
 * Ambient glow orb.
 * On mobile: rendered as a static div — no blur, no GSAP, no GPU paint.
 * On desktop: soft blur + slow breathing drift.
 */
const GradientOrb = ({ x = "20%", y = "30%", size = 600, color = "#CAFF00", opacity = 0.04 }) => {
  const orbRef = useRef(null);
  const mobile = isMobile();

  useEffect(() => {
    if (mobile) return; // static on mobile — no animation
    gsap.to(orbRef.current, {
      x: "+=40", y: "+=30",
      duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1,
    });
    gsap.to(orbRef.current, {
      scale: 1.15,
      duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1,
    });
  }, []);

  return (
    <div
      ref={orbRef}
      style={{
        position: "absolute",
        left: x, top: y,
        width: mobile ? size * 0.6 : size,   // smaller on mobile
        height: mobile ? size * 0.6 : size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: mobile ? opacity * 0.6 : opacity,
        pointerEvents: "none",
        // blur is the #1 GPU killer — remove on mobile entirely
        filter: mobile ? "none" : "blur(40px)",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        willChange: mobile ? "auto" : "transform",
      }}
    />
  );
};

export default GradientOrb;