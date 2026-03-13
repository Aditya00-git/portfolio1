import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticBtn from "../components/MagneticBtn";
import GradientOrb from "../components/GradientOrb";
import TextScramble from "../components/TextScramble";

gsap.registerPlugin(ScrollTrigger);

const ROLES = ["FULL STACK DEVELOPER", "AI SYSTEMS BUILDER", "BACKEND ENGINEER", "OPEN SOURCE DEV"];

const Hero = () => {
  const sectionRef = useRef(null);
  const nameRef    = useRef(null);
  const lastRef    = useRef(null);
  const roleRef    = useRef(null);
  const descRef    = useRef(null);
  const lineRef    = useRef(null);
  const scrollRef  = useRef(null);
  const gridRef    = useRef(null);
  const badgeRef   = useRef(null);
  const statusRef  = useRef(null);
  const socialsRef = useRef(null);

  // Typing effect
  useEffect(() => {
    let ri = 0, ci = 0, del = false;
    const type = () => {
      if (!roleRef.current) return;
      const cur = ROLES[ri];
      if (!del) {
        roleRef.current.textContent = cur.slice(0, ++ci);
        if (ci >= cur.length) { del = true; setTimeout(type, 1800); return; }
      } else {
        roleRef.current.textContent = cur.slice(0, --ci);
        if (ci <= 0) { del = false; ri = (ri + 1) % ROLES.length; }
      }
      setTimeout(type, del ? 28 : 52);
    };
    const t = setTimeout(type, 1400);
    return () => clearTimeout(t);
  }, []);

  useGSAP(() => {
    // Grid lines fan in
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(gridRef.current.children,
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.6, stagger: 0.05, ease: "power3.inOut" }
    );
    tl.fromTo([statusRef.current, badgeRef.current],
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }, "-=0.9"
    );
    tl.fromTo(nameRef.current,
      { y: "105%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.3, ease: "power4.out" }, "-=0.8"
    );
    tl.fromTo(lastRef.current,
      { y: "105%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.3, ease: "power4.out" }, "-=1.1"
    );
    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.9, ease: "expo.out" }, "-=0.6"
    );
    tl.fromTo(descRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.5"
    );
    tl.fromTo(socialsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.6"
    );
    tl.fromTo(scrollRef.current,
      { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3"
    );

    // Multi-layer parallax on scroll
    gsap.to(nameRef.current, {
      yPercent: -30, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
    });
    gsap.to(lastRef.current, {
      yPercent: -20, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.8 },
    });
    gsap.to(gridRef.current, {
      yPercent: -12, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 2.2 },
    });
    gsap.to([statusRef.current, badgeRef.current], {
      yPercent: 28, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to(scrollRef.current, {
      opacity: 0, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "25% top", scrub: true },
    });
  });

  // Mouse tilt on section
  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const onMove = (e) => {
      const rx = ((e.clientY / window.innerHeight) - 0.5) * 5;
      const ry = ((e.clientX / window.innerWidth) - 0.5) * -5;
      gsap.to(s, { rotateX: rx, rotateY: ry, duration: 2, ease: "power2.out", transformPerspective: 1200, transformOrigin: "center center" });
    };
    const onLeave = () => gsap.to(s, { rotateX: 0, rotateY: 0, duration: 1.5, ease: "power3.out" });
    s.addEventListener("mousemove", onMove);
    s.addEventListener("mouseleave", onLeave);
    return () => { s.removeEventListener("mousemove", onMove); s.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 px-8 md:px-16 pt-32 overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Ambient orbs */}
      <GradientOrb x="15%" y="25%" size={700} color="#CAFF00" opacity={0.035} />
      <GradientOrb x="80%" y="70%" size={500} color="#CAFF00" opacity={0.025} />

      {/* Vertical grid lines */}
      <div ref={gridRef} className="absolute inset-0 pointer-events-none flex">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px"
            style={{ left: `${(i + 1) * 10}%`, background: "rgba(240,237,230,0.035)" }} />
        ))}
      </div>

      {/* Top-left status */}
      <div ref={statusRef} className="absolute top-24 left-8 md:left-16 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: "#CAFF00", boxShadow: "0 0 8px #CAFF00", animation: "hpulse 2s infinite" }} />
        <span className="label text-muted">Available for work</span>
      </div>

      {/* Top-right year */}
      <div ref={badgeRef} className="absolute top-24 right-8 md:right-16 label text-muted">
        2025 — PRESENT
      </div>

      {/* Giant name — clipped lines */}
      <div className="relative select-none mb-0" style={{ zIndex: 1 }}>
        <div style={{ overflow: "hidden" }} ref={nameRef}>
          <TextScramble
            text="ADITYA"
            tag="h1"
            className="display-xl text-offwhite leading-none"
            scrambleOnMount
            style={{ display: "block" }}
          />
        </div>
        <div style={{ overflow: "hidden" }} ref={lastRef}>
          <h1
            className="display-xl leading-none"
            style={{ WebkitTextStroke: "1.5px rgba(240,237,230,0.18)", color: "transparent" }}
          >
            SESWANI
          </h1>
        </div>
      </div>

      <div ref={lineRef} className="rule my-8" style={{ zIndex: 1 }} />

      {/* Bottom bar */}
      <div ref={descRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8" style={{ zIndex: 1 }}>
        <div>
          <p className="label text-muted mb-2">Role</p>
          <p className="uppercase tracking-wider"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(20px,2.8vw,34px)", color: "#CAFF00", minHeight: "1.4em" }}>
            <span ref={roleRef} />
            <span style={{ animation: "blink 1s step-end infinite", color: "#CAFF00" }}>_</span>
          </p>
        </div>

        <div className="max-w-sm">
          <p className="body-lg" style={{ color: "rgba(240,237,230,0.42)", lineHeight: 1.75 }}>
            CS undergraduate. Building high-performance web apps,
            backend systems, and AI-powered tools that solve real problems.
          </p>
        </div>

        {/* Magnetic social links */}
        <div ref={socialsRef} className="flex flex-col gap-4 shrink-0">
          {[
            { label: "GitHub ↗",   href: "https://github.com/Aditya00-git" },
            { label: "LinkedIn ↗", href: "https://tinyurl.com/35u8nepx" },
            { label: "Resume ↓",   href: "Adiii.pdf", download: true },
          ].map((s) => (
            <MagneticBtn key={s.label} strength={0.4}>
              <a
                href={s.href}
                {...(s.download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
                className="label block px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  color: "rgba(240,237,230,0.35)",
                  border: "1px solid rgba(240,237,230,0.08)",
                  background: "rgba(240,237,230,0.02)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#CAFF00";
                  e.currentTarget.style.borderColor = "rgba(202,255,0,0.35)";
                  e.currentTarget.style.background = "rgba(202,255,0,0.06)";
                  e.currentTarget.style.letterSpacing = "0.28em";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(240,237,230,0.35)";
                  e.currentTarget.style.borderColor = "rgba(240,237,230,0.08)";
                  e.currentTarget.style.background = "rgba(240,237,230,0.02)";
                  e.currentTarget.style.letterSpacing = "0.2em";
                }}
              >
                {s.label}
              </a>
            </MagneticBtn>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: "translateX(-50%)", zIndex: 1 }}>
        <div className="w-px h-14 overflow-hidden" style={{ background: "rgba(240,237,230,0.08)" }}>
          <div className="w-full" style={{ height: "50%", background: "#CAFF00", animation: "scrollDrop 2s ease-in-out infinite" }} />
        </div>
        <span className="label text-muted" style={{ fontSize: 9, letterSpacing: "0.3em" }}>SCROLL</span>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes hpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.5)} }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;