import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../constants";
import TextScramble from "../components/TextScramble";
import GradientOrb from "../components/GradientOrb";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef   = useRef(null);
  const titleRef     = useRef(null);
  const rowRefs      = useRef([]);
  const overlayRefs  = useRef([]);
  const previewRef   = useRef(null);
  const numRefs      = useRef([]);
  const moveX        = useRef(null);
  const moveY        = useRef(null);
  const [hovered, setHovered]   = useState(null);

  useGSAP(() => {
    // ── Section heading parallax ──
    gsap.to(titleRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1.5,
      },
    });

    // ── Each row slides in staggered ──
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Project index numbers count in ──
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, scale: 2 },
        {
          opacity: 1, scale: 1, duration: 0.7, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 94%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Cursor-follow preview — quickTo ──
    moveX.current = gsap.quickTo(previewRef.current, "x", { duration: 1.1, ease: "power3.out" });
    moveY.current = gsap.quickTo(previewRef.current, "y", { duration: 1.3, ease: "power3.out" });
  });

  const onEnter = (i) => {
    if (window.innerWidth < 768) return;
    setHovered(i);
    gsap.fromTo(overlayRefs.current[i],
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.28, ease: "power2.out" }
    );
    gsap.to(previewRef.current, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power2.out" });
  };

  const onLeave = (i) => {
    if (window.innerWidth < 768) return;
    setHovered(null);
    gsap.to(overlayRefs.current[i], { scaleY: 0, transformOrigin: "bottom", duration: 0.22, ease: "power2.in" });
    gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.92, duration: 0.25 });
  };

  const onMove = (e) => {
    if (!moveX.current || window.innerWidth < 768) return;
    moveX.current(e.clientX + 24);
    moveY.current(e.clientY - 60);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-8 md:px-16"
      style={{ background: "#0D0D0D", overflow: "hidden" }}
    >
      {/* Ambient orb */}
      <GradientOrb x="85%" y="40%" size={500} color="#CAFF00" opacity={0.03} />

      {/* ── Header ── */}
      <div className="flex items-center gap-4 mb-4">
        <span className="index-num">03</span>
        <div className="rule flex-1" />
        <span className="label text-muted">Selected Work</span>
      </div>

      {/* Title with parallax */}
      <div style={{ overflow: "hidden" }}>
        <TextScramble
          text="Projects"
          tag="h2"
          className="display-lg text-offwhite uppercase mb-16"
          style={{ display: "block" }}
          scrambleOnMount
        />
      </div>

      {/* ── Project list ── */}
      <div className="relative" onMouseMove={onMove}>
        {projects.map((p, i) => (
          <a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            ref={el => (rowRefs.current[i] = el)}
            className="group relative flex items-center justify-between py-6 border-t"
            style={{ borderColor: "rgba(240,237,230,0.06)", cursor: "none" }}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={() => onLeave(i)}
            data-cursor
          >
            {/* Hover fill — scaleY from bottom */}
            <div
              ref={el => (overlayRefs.current[i] = el)}
              className="absolute inset-0 pointer-events-none"
              style={{ background: "#161616", transform: "scaleY(0)", transformOrigin: "bottom", zIndex: 0 }}
            />

            {/* Left — number + title */}
            <div className="relative z-10 flex items-center gap-6 flex-1 min-w-0">
              <span
                ref={el => (numRefs.current[i] = el)}
                className="index-num shrink-0 transition-colors duration-300 group-hover:text-lime"
              >{p.id}</span>
              <div className="min-w-0">
                <h3
                  className="uppercase text-offwhite transition-colors duration-300 group-hover:text-lime truncate"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,4.5vw,64px)", lineHeight: 1 }}
                >
                  {p.name}
                </h3>
                <p className="label text-muted mt-1 hidden md:block">{p.type}</p>
              </div>
            </div>

            {/* Right — tags + year + arrow */}
            <div className="relative z-10 flex items-center gap-6 shrink-0">
              <div className="hidden md:flex flex-wrap gap-2 justify-end max-w-xs">
                {p.tags.slice(0, 3).map((t, j) => (
                  <span
                    key={j}
                    className="label text-muted px-3 py-1 rounded-full"
                    style={{ background: "rgba(240,237,230,0.04)", border: "1px solid rgba(240,237,230,0.07)" }}
                  >{t}</span>
                ))}
              </div>
              <span className="label text-muted">{p.year}</span>
              <span
                className="text-xl transition-all duration-300"
                style={{ color: "rgba(240,237,230,0.2)" }}
                onMouseEnter={e => { e.target.style.color = "#CAFF00"; e.target.style.transform = "translate(3px,-3px)"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(240,237,230,0.2)"; e.target.style.transform = "translate(0,0)"; }}
              >↗</span>
            </div>
          </a>
        ))}

        <div className="rule" />

        {/* ── Floating cursor preview card ── */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-50 pointer-events-none hidden md:flex flex-col justify-end rounded-2xl overflow-hidden"
          style={{
            width: 380,
            height: 240,
            opacity: 0,
            scale: 0.92,
            background: "#1A1A1A",
            border: "1px solid rgba(202,255,0,0.12)",
            padding: 0,
          }}
        >
          {hovered !== null && (
            <div
              className="w-full h-full flex flex-col justify-end p-7"
              style={{ background: "linear-gradient(to top, #0D0D0D 35%, rgba(13,13,13,0.4))" }}
            >
              <p className="label text-lime mb-2">{projects[hovered].type}</p>
              <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: "#F0EDE6", textTransform: "uppercase", lineHeight: 1 }}>
                {projects[hovered].full}
              </h4>
              <p className="mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(240,237,230,0.45)", lineHeight: 1.5 }}>
                {projects[hovered].description.slice(0, 90)}…
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── GitHub CTA ── */}
      <div className="mt-14 flex items-center gap-6">
        <a
          href="https://github.com/Aditya00-git"
          target="_blank" rel="noreferrer"
          className="group inline-flex items-center gap-4"
          data-cursor
        >
          <span
            className="label transition-all duration-300"
            style={{ color: "rgba(240,237,230,0.35)" }}
            onMouseEnter={e => e.target.style.color = "#CAFF00"}
            onMouseLeave={e => e.target.style.color = "rgba(240,237,230,0.35)"}
          >
            View all on GitHub ↗
          </span>
        </a>
      </div>
    </section>
  );
};

export default Projects;