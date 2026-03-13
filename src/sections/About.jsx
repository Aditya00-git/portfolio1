import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitLines from "../components/SplitLines";
import GradientOrb from "../components/GradientOrb";
import TextScramble from "../components/TextScramble";
import { skills } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef  = useRef(null);
  const imgRef      = useRef(null);
  const driftRef    = useRef(null);
  const imgWrapRef  = useRef(null);
  const statsRef    = useRef([]);
  const counterRefs = useRef([]);

  const bio = `I'm Aditya — a Computer Science undergraduate
who builds things that actually work in production.
Full-stack web. Backend systems. AI integrations.
Focused on performance, clean architecture,
and software that solves real problems.`;

  const stats = [
    { n: 5,    suffix: "+",  label: "Projects Shipped" },
    { n: 2,    suffix: "×",  label: "Internships" },
    { n: 6,    suffix: "+",  label: "Certifications" },
    { n: 1000, suffix: "+",  label: "Hours Coded" },
  ];

  useGSAP(() => {
    // ── Section scale-pin exit ──
    gsap.to(sectionRef.current, {
      scale: 0.93,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom 65%",
        end: "bottom 5%",
        scrub: true,
      },
    });

    // ── Image clip-path wipe IN ──
    gsap.fromTo(imgWrapRef.current,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
      {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: { trigger: imgWrapRef.current, start: "top 88%" },
      }
    );

    // ── Image inner parallax (moves slower than wrapper) ──
    gsap.to(imgRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: imgWrapRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // ── Horizontal marquee drift ──
    gsap.to(driftRef.current, {
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // ── Stats — counting animation ──
    statsRef.current.forEach((el, i) => {
      if (!el) return;
      const target = stats[i].n;
      const obj = { val: 0 };
      gsap.fromTo(obj,
        { val: 0 },
        {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          onUpdate: () => {
            if (counterRefs.current[i]) {
              counterRefs.current[i].textContent = Math.round(obj.val) + stats[i].suffix;
            }
          },
        }
      );
      // Card reveal
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: i * 0.07, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Skills stagger pop ──
    const skillEls = document.querySelectorAll(".skill-pill");
    gsap.fromTo(skillEls,
      { scale: 0.75, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.5, stagger: 0.035, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".skills-wrap", start: "top 90%", toggleActions: "play none none none" },
      }
    );

    // ── Section header parallax ──
    gsap.to(".about-heading", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "center top",
        scrub: 1.5,
      },
    });
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-8 md:px-16 overflow-hidden"
      style={{ background: "#111111", borderRadius: "0 0 48px 48px" }}
    >
      <GradientOrb x="90%" y="20%" size={600} color="#CAFF00" opacity={0.03} />

      {/* ── Header ── */}
      <div className="flex items-center gap-4 mb-4">
        <span className="index-num">02</span>
        <div className="rule flex-1" />
        <span className="label text-muted">About</span>
      </div>

      <TextScramble
        text="About Me"
        tag="h2"
        className="about-heading display-lg text-offwhite uppercase mb-16"
        scrambleOnMount
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* ── LEFT: Image + stats ── */}
        <div>
          {/* Photo with clip-path reveal + inner parallax */}
          <div
            ref={imgWrapRef}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "#1A1A1A", aspectRatio: "3/4" }}
          >
            <div
              ref={imgRef}
              className="absolute inset-0"
              style={{ top: "-10%", height: "120%" }}
            >
             
              <img src="/images/afinal 3.png" className="w-full h-full object-cover" /> 
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div style={{
                  width: 96, height: 96, borderRadius: "50%",
                  background: "rgba(202,255,0,0.08)",
                  border: "1px solid rgba(202,255,0,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, color: "#CAFF00",
                }}>AS</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#444", textAlign: "center", lineHeight: 1.9 }}>
                  Add your photo<br />/public/images/aditya.jpg
                </p>
              </div>
            </div>
            {/* Lime corner accent */}
            <div className="absolute bottom-0 left-0 w-24 h-24" style={{ background: "linear-gradient(135deg,#CAFF00,transparent 60%)", opacity: 0.12 }} />
          </div>

          {/* Animated counting stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {stats.map((s, i) => (
              <div
                key={i}
                ref={el => (statsRef.current[i] = el)}
                className="p-5 rounded-xl"
                style={{ background: "#1A1A1A", border: "1px solid rgba(240,237,230,0.07)" }}
              >
                <p
                  ref={el => (counterRefs.current[i] = el)}
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 46, color: "#CAFF00", lineHeight: 1 }}
                >
                  0{s.suffix}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#666", marginTop: 6 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Bio + heatmap + skills ── */}
        <div className="flex flex-col gap-12">

          {/* Horizontal drift watermark */}
          <div className="overflow-hidden select-none pointer-events-none" style={{ marginLeft: "-8vw", marginRight: "-8vw" }}>
            <div ref={driftRef} className="whitespace-nowrap">
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,7vw,96px)", color: "#F0EDE6", opacity: 0.035, textTransform: "uppercase" }}>
                FULL STACK · AI · BACKEND · PERFORMANCE · WEB · OPEN SOURCE · PYTHON · REACT ·&nbsp;
              </span>
            </div>
          </div>

          {/* Bio text — SplitLines clip reveal */}
          <SplitLines
            text={bio}
            className="body-lg"
            style={{ color: "rgba(240,237,230,0.58)", lineHeight: 1.8 }}
          />

          {/* GitHub Activity */}
          <div>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(20px,2.5vw,30px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#F0EDE6", marginBottom: 14 }}>
              GitHub Activity
            </p>
            <div className="rounded-xl p-5 overflow-hidden" style={{ background: "#1A1A1A", border: "1px solid rgba(240,237,230,0.07)" }}>
              <img
                src="https://ghchart.rshah.org/aditya00-git"
                alt="GitHub Contributions"
                className="w-full"
                style={{ filter: "brightness(1.3) saturate(1.5) hue-rotate(18deg)" }}
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(20px,2.5vw,30px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#F0EDE6", marginBottom: 16 }}>
              Tech Stack
            </p>
            <div className="skills-wrap flex flex-wrap gap-3">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="skill-pill"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "9px 20px", borderRadius: 999,
                    background: "#1A1A1A", border: "1px solid rgba(240,237,230,0.1)",
                    color: "#F0EDE6", cursor: "default",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={e => { e.target.style.background = "rgba(202,255,0,0.09)"; e.target.style.borderColor = "rgba(202,255,0,0.35)"; e.target.style.color = "#CAFF00"; e.target.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.target.style.background = "#1A1A1A"; e.target.style.borderColor = "rgba(240,237,230,0.1)"; e.target.style.color = "#F0EDE6"; e.target.style.transform = "translateY(0)"; }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;