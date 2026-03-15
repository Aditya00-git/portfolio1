import { useRef, useEffect } from "react";
import gsap from "gsap";
const MagneticBtn = ({ children, strength = 0.35, className = "", style = {}, onClick }) => {
  const el = useRef(null);

  useEffect(() => {
    const btn = el.current;
    if (!btn) return;

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      gsap.to(btn, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={el} className={className} style={{ display: "inline-block", ...style }} onClick={onClick} data-cursor>
      {children}
    </div>
  );
};

export default MagneticBtn;
