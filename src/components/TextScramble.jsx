import { useRef, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";

const TextScramble = ({ text, tag: Tag = "span", className = "", style = {}, scrambleOnMount = false }) => {
  const el = useRef(null);
  const raf = useRef(null);
  const iteration = useRef(0);

  const scramble = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    iteration.current = 0;

    const step = () => {
      if (!el.current) return;
      el.current.textContent = text
        .split("")
        .map((c, i) => {
          if (c === " ") return " ";
          if (i < iteration.current) return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iteration.current < text.length) {
        iteration.current += 0.35;
        raf.current = requestAnimationFrame(step);
      } else {
        el.current.textContent = text;
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      const t = setTimeout(scramble, 400);
      return () => clearTimeout(t);
    }
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [scrambleOnMount, text]);

  return (
    <Tag
      ref={el}
      className={className}
      style={{ cursor: "default", ...style }}
      onMouseEnter={scramble}
    >
      {text}
    </Tag>
  );
};

export default TextScramble;