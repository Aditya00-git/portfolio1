import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Thin lime line at top of page showing scroll progress
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 2,
        background: "#CAFF00",
        transformOrigin: "left",
        transform: "scaleX(0)",
        zIndex: 999998,
        pointerEvents: "none",
        boxShadow: "0 0 10px rgba(202,255,0,0.5)",
      }}
    />
  );
};

export default ScrollProgress;