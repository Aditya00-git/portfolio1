import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, achievements, certifications } from "../constants";
import TextScramble from "../components/TextScramble";
import GradientOrb from "../components/GradientOrb";

gsap.registerPlugin(ScrollTrigger);

const CardContent = ({ exp }) => (
  <>
    <div className="flex items-start justify-between gap-2 mb-3">
      <div>
        <span className="index-num block mb-2">{exp.id}</span>
        <h3 className="text-offwhite uppercase"
          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(20px,2.2vw,32px)", lineHeight: 1 }}>
          {exp.role}
        </h3>
        <p className="label mt-1" style={{ color: "#CAFF00", letterSpacing: "0.14em" }}>{exp.company}</p>
      </div>
      <span className="label px-2 py-1 rounded-full shrink-0 text-xs"
        style={{
          background: exp.status === "CURRENT" ? "rgba(202,255,0,0.1)" : "rgba(240,237,230,0.05)",
          color: exp.status === "CURRENT" ? "#CAFF00" : "#555",
          border: `1px solid ${exp.status === "CURRENT" ? "rgba(202,255,0,0.3)" : "rgba(240,237,230,0.08)"}`,
          whiteSpace: "nowrap",
        }}>
        {exp.status}
      </span>
    </div>
    <div className="rule mb-3" />
    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(12px,1.2vw,14px)", color: "rgba(240,237,230,0.45)", lineHeight: 1.7 }}>
      {exp.desc}
    </p>
    <p className="label mt-4" style={{ color: "rgba(240,237,230,0.18)", fontSize: 10 }}>{exp.period}</p>
  </>
);

export default function Experience() {
  const sectionRef  = useRef(null);
  const wrapRef     = useRef(null);
  const lineRef     = useRef(null);
  const dotRefs     = useRef([]);
  const cardRefs    = useRef([]);
  const connRefs    = useRef([]);   // vertical connector from line to card
  const achRefs     = useRef([]);
  const certRefs    = useRef([]);
  const achHeadRef  = useRef(null);
  const certHeadRef = useRef(null);

  useLayoutEffect(() => {
    const n           = experience.length;
    const PIN_SCROLL  = 150 + n * 500;   // total scroll distance while pinned

    const ctx = gsap.context(() => {

      // ── hide everything ──
      gsap.set(lineRef.current,             { scaleX: 0 });
      gsap.set(dotRefs.current,             { scale: 0, autoAlpha: 0 });
      gsap.set(cardRefs.current,            { autoAlpha: 0, y: 30 });
      gsap.set(connRefs.current,            { scaleY: 0 });

      // ── PIN ──
      ScrollTrigger.create({
        trigger : wrapRef.current,
        start   : "top top",
        end     : `+=${PIN_SCROLL}`,
        pin     : true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // ── master timeline scrubbed to scroll ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger : wrapRef.current,
          start   : "top top",
          end     : `+=${PIN_SCROLL}`,
          scrub   : 1.2,
        },
      });

      // line draws fully across
      tl.to(lineRef.current, { scaleX: 1, ease: "none", duration: n });

      // for each entry: dot, connector, card appear at their x-position moment
      experience.forEach((_, i) => {
        // when does dot i appear? evenly spaced while line draws
        const insertTime = (i + 0.55) / n * n;   // in tl "duration" units

        tl.to(dotRefs.current[i],
          { scale: 1, autoAlpha: 1, duration: 0.25, ease: "back.out(2)" },
          insertTime
        );
        tl.to(connRefs.current[i],
          { scaleY: 1, duration: 0.2, ease: "power2.out" },
          insertTime + 0.1
        );
        tl.to(cardRefs.current[i],
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
          insertTime + 0.2
        );
      });

      // ── below-pin sections ──
      achRefs.current.filter(Boolean).forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: i * 0.07, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" } }
        );
      });

      [achHeadRef, certHeadRef].forEach(ref => {
        if (!ref.current) return;
        ref.current.querySelectorAll(".h-rule").forEach(el => {
          gsap.fromTo(el,
            { scaleX: 0, transformOrigin: "center" },
            { scaleX: 1, duration: 1, ease: "expo.out",
              scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" } }
          );
        });
      });

      certRefs.current.filter(Boolean).forEach((el, i) => {
        gsap.fromTo(el,
          { x: i % 2 === 0 ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 94%", toggleActions: "play none none none" } }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{ background: "#111111" }}>
      <GradientOrb x="80%" y="20%" size={500} color="#CAFF00" opacity={0.03} />

      {/* ── Section header ── */}
      <div className="px-8 md:px-16 pt-24 pb-0">
        <div className="flex items-center gap-4 mb-4">
          <span className="index-num">04</span>
          <div className="rule flex-1" />
          <span className="label text-muted">Journey</span>
        </div>
        <div style={{ overflow: "hidden" }}>
          <TextScramble text="Experience" tag="h2"
            className="display-lg text-offwhite uppercase"
            style={{ display: "block" }} scrambleOnMount />
        </div>
      </div>

      {/* ══════════ PINNED HORIZONTAL TIMELINE ══════════ */}
      <div
        ref={wrapRef}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#111111",
          overflow: "hidden",
          padding: "0 clamp(32px,8vw,120px)",
        }}
      >
        {/* Cards row — sit ABOVE the line */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${experience.length}, 1fr)`,
          gap: 24,
          marginBottom: 48,
          alignItems: "flex-end",
        }}>
          {experience.map((exp, i) => (
            <div
              key={exp.id}
              ref={el => (cardRefs.current[i] = el)}
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: "#1A1A1A",
                border: "1px solid rgba(240,237,230,0.07)",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(202,255,0,0.28)"; e.currentTarget.style.boxShadow="0 20px 60px rgba(0,0,0,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(240,237,230,0.07)"; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{ position:"absolute",top:0,right:0,width:60,height:60,background:"linear-gradient(225deg,rgba(202,255,0,0.08),transparent 60%)" }} />
              <CardContent exp={exp} />
            </div>
          ))}
        </div>

        {/* Connectors (vertical lines from card bottom → dot) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${experience.length}, 1fr)`,
          gap: 24,
          height: 40,
          alignItems: "flex-end",
        }}>
          {experience.map((_, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center" }}>
              <div
                ref={el => (connRefs.current[i] = el)}
                style={{
                  width: 1, height: 40,
                  background: "linear-gradient(to bottom, rgba(202,255,0,0.4), #CAFF00)",
                  transformOrigin: "bottom center",
                }}
              />
            </div>
          ))}
        </div>

        {/* Horizontal line + dots row */}
        <div style={{ position: "relative", height: 32, marginTop: 0 }}>

          {/* Ghost track */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            height: 1, background: "rgba(240,237,230,0.06)",
            transform: "translateY(-50%)",
          }} />

          {/* Lime growing line */}
          <div
            ref={lineRef}
            style={{
              position: "absolute", top: "50%", left: 0, right: 0,
              height: 1,
              background: "linear-gradient(to right, #CAFF00, rgba(202,255,0,0.4))",
              boxShadow: "0 0 8px rgba(202,255,0,0.6)",
              transformOrigin: "left center",
              transform: "translateY(-50%) scaleX(0)",
            }}
          />

          {/* Dots — evenly spaced above the line */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            display: "grid",
            gridTemplateColumns: `repeat(${experience.length}, 1fr)`,
            gap: 24,
            transform: "translateY(-50%)",
          }}>
            {experience.map((exp, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "center" }}>
                <div
                  ref={el => (dotRefs.current[i] = el)}
                  style={{
                    width: 20, height: 20,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {/* Pulse ring */}
                  <div style={{
                    position: "absolute", width: 20, height: 20, borderRadius: "50%",
                    border: "1px solid rgba(202,255,0,0.4)",
                    background: "#111111",
                    animation: exp.status === "CURRENT" ? "ringPulse 2s ease-in-out infinite" : "none",
                  }} />
                  {/* Core */}
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    position: "relative", zIndex: 1,
                    background: exp.status === "CURRENT" ? "#CAFF00" : "rgba(240,237,230,0.35)",
                    boxShadow: exp.status === "CURRENT" ? "0 0 12px rgba(202,255,0,1)" : "none",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Year labels below line */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${experience.length}, 1fr)`,
          gap: 24,
          marginTop: 16,
        }}>
          {experience.map((exp, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center" }}>
              <span style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "rgba(240,237,230,0.25)",
              }}>{exp.period}</span>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes ringPulse {
          0%,100% { transform:scale(1);   opacity:0.4; }
          50%      { transform:scale(2.4); opacity:0;   }
        }
      `}</style>

      {/* ══ ACHIEVEMENTS ══ */}
      <div className="px-8 md:px-16 pt-20 mb-24">
        <div ref={achHeadRef} className="flex items-center gap-6 mb-12">
          <div className="h-rule rule flex-1" />
          <h3 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(22px,3vw,36px)",letterSpacing:"0.08em",color:"#F0EDE6",whiteSpace:"nowrap" }}>Achievements</h3>
          <div className="h-rule rule flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <div key={i} ref={el => (achRefs.current[i] = el)} className="p-6 rounded-xl"
              style={{ background:"#1A1A1A",border:"1px solid rgba(240,237,230,0.07)",transition:"border-color 0.3s,transform 0.3s,box-shadow 0.3s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(202,255,0,0.3)";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 20px 60px rgba(0,0,0,0.5)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(240,237,230,0.07)";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"; }}>
              <span style={{ fontSize:20,color:"#CAFF00",display:"block",marginBottom:12 }}>{a.icon}</span>
              <h4 className="text-offwhite uppercase mb-2" style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(17px,2vw,22px)",letterSpacing:"0.04em" }}>{a.title}</h4>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:"0.12em",textTransform:"uppercase",color:"#555" }}>{a.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ CERTIFICATIONS ══ */}
      <div className="px-8 md:px-16 pb-24">
        <div ref={certHeadRef} className="flex items-center gap-6 mb-12">
          <div className="h-rule rule flex-1" />
          <h3 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(22px,3vw,36px)",letterSpacing:"0.08em",color:"#F0EDE6",whiteSpace:"nowrap" }}>Certifications</h3>
          <div className="h-rule rule flex-1" />
        </div>
        {certifications.map((c, i) => (
          <div key={i} ref={el => (certRefs.current[i] = el)}
            className="flex items-center justify-between py-5 border-t"
            style={{ borderColor:"rgba(240,237,230,0.07)",transition:"padding-left 0.35s,background 0.3s" }}
            onMouseEnter={e=>{ e.currentTarget.style.paddingLeft="20px";e.currentTarget.style.background="rgba(202,255,0,0.02)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.paddingLeft="0";e.currentTarget.style.background="transparent"; }}>
            <div className="flex items-center gap-6">
              <span className="index-num" style={{ minWidth:28 }}>0{i+1}</span>
              <div>
                <p className="text-offwhite uppercase"
                  style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(18px,2.5vw,30px)",letterSpacing:"0.04em",lineHeight:1.1,transition:"color 0.25s" }}
                  onMouseEnter={e=>(e.target.style.color="#CAFF00")}
                  onMouseLeave={e=>(e.target.style.color="#F0EDE6")}>
                  {c.name}
                </p>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase",color:"#555",marginTop:3 }}>{c.issuer}</p>
              </div>
            </div>
            <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:"0.14em",color:"#555" }}>{c.year}</span>
          </div>
        ))}
        <div className="rule mt-0" />
      </div>
    </section>
  );
}