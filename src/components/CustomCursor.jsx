import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const trail = trailRef.current;
    if (!dot || !ring || !trail) return;

    // Current + target positions
    let mx = -200, my = -200;   // mouse (snap)
    let rx = -200, ry = -200;   // ring  (lagging)
    let tx = -200, ty = -200;   // trail (most lagging)
    let rafId;
    let isHover = false;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      // Ring follows mouse with lag
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      // Trail follows ring with more lag
      tx = lerp(tx, mx, 0.06);
      ty = lerp(ty, my, 0.06);

      dot.style.transform   = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform  = `translate(${rx}px, ${ry}px) translate(-50%, -50%) rotate(45deg)`;
      trail.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.opacity   = "1";
      ring.style.opacity  = "1";
      trail.style.opacity = "1";
    };

    const onEnter = () => {
      isHover = true;
      ring.style.width  = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "rgba(202,255,0,0.7)";
      ring.style.background  = "rgba(202,255,0,0.06)";
      dot.style.width  = "8px";
      dot.style.height = "8px";
      dot.style.background = "#fff";
    };

    const onLeave = () => {
      isHover = false;
      ring.style.width  = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(202,255,0,0.35)";
      ring.style.background  = "transparent";
      dot.style.width  = "5px";
      dot.style.height = "5px";
      dot.style.background = "#CAFF00";
    };

    const attachHover = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  const base = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 999999,
    opacity: 0,
    willChange: "transform",
  };

  return (
    <>
      {/* Outer diamond — lags most */}
      <div
        ref={trailRef}
        style={{
          ...base,
          zIndex: 999997,
          width: 54,
          height: 54,
          border: "1px solid rgba(202,255,0,0.12)",
          borderRadius: 0,
          transition: "width 0.3s, height 0.3s",
        }}
      />

      {/* Mid diamond — medium lag */}
      <div
        ref={ringRef}
        style={{
          ...base,
          zIndex: 999998,
          width: 36,
          height: 36,
          border: "1px solid rgba(202,255,0,0.35)",
          borderRadius: 0,
          background: "transparent",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease",
        }}
      />

      {/* Center dot — snaps */}
      <div
        ref={dotRef}
        style={{
          ...base,
          zIndex: 999999,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#CAFF00",
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
          boxShadow: "0 0 8px rgba(202,255,0,0.6)",
        }}
      />
    </>
  );
};

export default CustomCursor;