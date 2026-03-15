import { useEffect, useRef } from "react";
import isMobile from "../utils/isMobile";

const CustomCursor = () => {
  const dotRef   = useRef(null);
  const d1Ref    = useRef(null);
  const d2Ref    = useRef(null);

  useEffect(() => {
    if (isMobile()) return; 

    const dot = dotRef.current;
    const d1  = d1Ref.current;
    const d2  = d2Ref.current;
    if (!dot || !d1 || !d2) return;

    let mx = -200, my = -200;
    let d1x = -200, d1y = -200;
    let d2x = -200, d2y = -200;
    let rafId;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      d1x += (mx - d1x) * 0.12;
      d1y += (my - d1y) * 0.12;
      d1.style.transform = `translate(${d1x - 16}px, ${d1y - 16}px) rotate(45deg)`;
      d2x += (mx - d2x) * 0.06;
      d2y += (my - d2y) * 0.06;
      d2.style.transform = `translate(${d2x - 26}px, ${d2y - 26}px) rotate(45deg)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const addHover = () => {
      document.querySelectorAll("a,[data-cursor],button").forEach(el => {
        el.addEventListener("mouseenter", () => {
          d1.style.width = "40px"; d1.style.height = "40px";
          d1.style.borderColor = "#CAFF00";
          dot.style.opacity = "0";
        });
        el.addEventListener("mouseleave", () => {
          d1.style.width = "32px"; d1.style.height = "32px";
          d1.style.borderColor = "rgba(202,255,0,0.6)";
          dot.style.opacity = "1";
        });
      });
    };
    addHover();
    const mo = new MutationObserver(addHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      mo.disconnect();
    };
  }, []);

  if (isMobile()) return null;

  return (
    <>
      
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 999998,
        width: 8, height: 8, borderRadius: "50%",
        background: "#CAFF00",
        pointerEvents: "none",
        willChange: "transform",
        transition: "opacity 0.2s",
      }} />
      
      <div ref={d1Ref} style={{
        position: "fixed", top: 0, left: 0, zIndex: 999997,
        width: 32, height: 32,
        border: "1px solid rgba(202,255,0,0.6)",
        pointerEvents: "none",
        willChange: "transform",
        transition: "width 0.25s, height 0.25s, border-color 0.25s",
      }} />
      
      <div ref={d2Ref} style={{
        position: "fixed", top: 0, left: 0, zIndex: 999996,
        width: 52, height: 52,
        border: "1px solid rgba(202,255,0,0.18)",
        pointerEvents: "none",
        willChange: "transform",
      }} />
    </>
  );
};

export default CustomCursor;