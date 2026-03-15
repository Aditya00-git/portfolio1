import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const SplitLines = ({ text, className = "", delay = 0, trigger = true, style = {} }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n").filter(l => l.trim());

  useGSAP(() => {
    if (!lineRefs.current.length) return;
    gsap.fromTo(
      lineRefs.current,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
        delay,
        scrollTrigger: trigger
          ? { trigger: containerRef.current, start: "top 92%", toggleActions: "play none none none" }
          : undefined,
      }
    );
  });

  return (
    <div ref={containerRef} className={className} style={style}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.15 }}>
          <span ref={el => (lineRefs.current[i] = el)} style={{ display: "block" }}>
            {line}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SplitLines;
