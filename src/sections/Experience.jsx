import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, achievements, certifications } from "../constants";
import TextScramble from "../components/TextScramble";
import GradientOrb from "../components/GradientOrb";
import MagneticBtn from "../components/MagneticBtn";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const cardRefs    = useRef([]);
  const achRefs     = useRef([]);
  const certRefs    = useRef([]);
  const achHeadRef  = useRef(null);
  const certHeadRef = useRef(null);

  useGSAP(() => {
    // ── Title parallax ──
    gsap.to(titleRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top top",
        scrub: 1.5,
      },
    });

    // ── Experience cards — stacked sticky pinning + fade ──
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: "circ.out",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Achievements heading scaleX rule ──
    if (achHeadRef.current) {
      gsap.fromTo(achHeadRef.current.querySelectorAll(".ach-rule"),
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: achHeadRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }

    // ── Achievement cards — fan in from below ──
    const validAch = achRefs.current.filter(Boolean);
    if (validAch.length) {
      gsap.fromTo(validAch,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: validAch[0], start: "top 92%", toggleActions: "play none none none" },
        }
      );
    }

    // ── Cert heading rule ──
    if (certHeadRef.current) {
      gsap.fromTo(certHeadRef.current.querySelectorAll(".cert-rule"),
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: certHeadRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }

    // ── Cert rows — slide in from right alternating ──
    const validCert = certRefs.current.filter(Boolean);
    if (validCert.length) {
      validCert.forEach((el, i) => {
        gsap.fromTo(el,
          { x: i % 2 === 0 ? 60 : -60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 94%", toggleActions: "play none none none" },
          }
        );
      });
    }
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 px-8 md:px-16"
      style={{ background: "#111111" }}
    >
      <GradientOrb x="10%" y="60%" size={500} color="#CAFF00" opacity={0.03} />

      {/* ── Header ── */}
      <div className="flex items-center gap-4 mb-4">
        <span className="index-num">04</span>
        <div className="rule flex-1" />
        <span className="label text-muted">Journey</span>
      </div>

      <div style={{ overflow: "hidden" }}>
        <TextScramble
          text="Experience"
          tag="h2"
          className="display-lg text-offwhite uppercase mb-16"
          style={{ display: "block" }}
          scrambleOnMount
        />
      </div>

      {/* ── Sticky stacked cards ── */}
      <div className="flex flex-col mb-28">
        {experience.map((exp, i) => (
          <div
            key={exp.id}
            ref={el => (cardRefs.current[i] = el)}
            className="sticky rounded-2xl p-8 md:p-10"
            style={{
              top: `calc(88px + ${i * 18}px)`,
              background: i === 0 ? "#1A1A1A" : "#202020",
              border: "1px solid rgba(240,237,230,0.07)",
              marginBottom: `${(experience.length - i) * 9}rem`,
              zIndex: i + 1,
              boxShadow: i === 0 ? "0 24px 80px rgba(0,0,0,0.5)" : "none",
            }}
          >
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <span className="index-num block mb-2">{exp.id}</span>
                <h3
                  className="text-offwhite uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(26px,4vw,52px)", lineHeight: 1 }}
                >
                  {exp.role}
                </h3>
                <p className="label text-lime mt-2" style={{ letterSpacing: "0.18em" }}>{exp.company}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <p className="label text-muted">{exp.period}</p>
                <span
                  className="inline-block px-3 py-1 rounded-full label"
                  style={{
                    background: exp.status === "CURRENT" ? "rgba(202,255,0,0.1)" : "rgba(240,237,230,0.05)",
                    color: exp.status === "CURRENT" ? "#CAFF00" : "#555",
                    border: `1px solid ${exp.status === "CURRENT" ? "rgba(202,255,0,0.3)" : "rgba(240,237,230,0.08)"}`,
                  }}
                >
                  {exp.status}
                </span>
              </div>
            </div>
            <div className="rule mb-5" />
            <p className="body-lg" style={{ color: "rgba(240,237,230,0.5)", fontSize: "clamp(14px,1.5vw,18px)" }}>{exp.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Achievements ── */}
      <div className="mb-24">
        <div ref={achHeadRef} className="flex items-center gap-6 mb-12">
          <div className="ach-rule rule flex-1" />
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px,3vw,36px)", letterSpacing: "0.08em", color: "#F0EDE6" }}>
            Achievements
          </h3>
          <div className="ach-rule rule flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <div
              key={i}
              ref={el => (achRefs.current[i] = el)}
              className="p-6 rounded-xl"
              style={{
                background: "#1A1A1A",
                border: "1px solid rgba(240,237,230,0.07)",
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(202,255,0,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(240,237,230,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: 22, color: "#CAFF00", display: "block", marginBottom: 12 }}>{a.icon}</span>
              <h4
                className="text-offwhite uppercase mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(17px,2vw,24px)", letterSpacing: "0.04em" }}
              >
                {a.title}
              </h4>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#555" }}>
                {a.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Certifications ── */}
      <div>
        <div ref={certHeadRef} className="flex items-center gap-6 mb-12">
          <div className="cert-rule rule flex-1" />
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px,3vw,36px)", letterSpacing: "0.08em", color: "#F0EDE6" }}>
            Certifications
          </h3>
          <div className="cert-rule rule flex-1" />
        </div>

        {certifications.map((c, i) => (
          <div
            key={i}
            ref={el => (certRefs.current[i] = el)}
            className="flex items-center justify-between py-5 border-t"
            style={{
              borderColor: "rgba(240,237,230,0.07)",
              transition: "padding-left 0.35s ease, background 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.paddingLeft = "20px";
              e.currentTarget.style.background = "rgba(202,255,0,0.02)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.paddingLeft = "0";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div className="flex items-center gap-6">
              <span className="index-num" style={{ minWidth: 28 }}>0{i + 1}</span>
              <div>
                <p
                  className="text-offwhite uppercase"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(18px,2.5vw,32px)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.1,
                    transition: "color 0.25s",
                  }}
                  onMouseEnter={e => (e.target.style.color = "#CAFF00")}
                  onMouseLeave={e => (e.target.style.color = "#F0EDE6")}
                >
                  {c.name}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginTop: 3 }}>
                  {c.issuer}
                </p>
              </div>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.14em", color: "#555" }}>
              {c.year}
            </span>
          </div>
        ))}
        <div className="rule mt-0" />
      </div>
    </section>
  );
};

export default Experience;