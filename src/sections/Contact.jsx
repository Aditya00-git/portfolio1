import { useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../components/Marquee";
import SplitLines from "../components/SplitLines";
import GradientOrb from "../components/GradientOrb";
import { socials, marqueeTech } from "../constants";

gsap.registerPlugin(ScrollTrigger);

/* ─── The actual form — isolated so useForm hook is clean ─── */
const ContactForm = () => {
  const [state, handleSubmit] = useForm("xvzbryvq");
  const formItemRefs = useRef([]);

  const fields = [
    { name: "name",    placeholder: "Your Name",        type: "text",  label: "Name"    },
    { name: "email",   placeholder: "Email Address",    type: "email", label: "Email"   },
    { name: "subject", placeholder: "What's it about?", type: "text",  label: "Subject" },
  ];

  if (state.succeeded) {
    return (
      <div className="flex flex-col gap-6 justify-center" style={{ minHeight: 320 }}>
        <div
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(202,255,0,0.1)",
            border: "1px solid rgba(202,255,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26,
          }}
        >✓</div>
        <div>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,4vw,52px)", color: "#CAFF00", letterSpacing: "0.04em", lineHeight: 1 }}>
            Message sent.
          </p>
          <p className="body-lg mt-3" style={{ color: "rgba(240,237,230,0.45)", lineHeight: 1.8 }}>
            Thanks for reaching out — I'll reply within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

      {fields.map((f, i) => (
        <div
          key={f.name}
          ref={el => (formItemRefs.current[i] = el)}
          className="group"
        >
          <div
            className="relative border-b pb-3"
            style={{ borderColor: "rgba(240,237,230,0.1)", transition: "border-color 0.35s" }}
            onFocusCapture={e => (e.currentTarget.style.borderColor = "#CAFF00")}
            onBlurCapture={e => (e.currentTarget.style.borderColor = "rgba(240,237,230,0.1)")}
          >
            <input
              id={f.name}
              type={f.type}
              name={f.name}
              required
              placeholder={f.placeholder}
              disabled={state.submitting}
              className="w-full bg-transparent outline-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(15px,1.6vw,19px)",
                color: "#F0EDE6",
                fontWeight: 300,
                opacity: state.submitting ? 0.4 : 1,
                transition: "opacity 0.3s",
              }}
            />
            {/* Lime fill line on focus */}
            <div
              className="absolute bottom-[-1px] left-0 h-px"
              style={{
                background: "#CAFF00",
                width: 0,
                transition: "width 0.4s ease",
              }}
              onFocus={e => (e.target.style.width = "100%")}
            />
          </div>
          <ValidationError
            prefix={f.label}
            field={f.name}
            errors={state.errors}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#ff6b6b",
              marginTop: 6,
              display: "block",
            }}
          />
        </div>
      ))}

      {/* Textarea */}
      <div
        ref={el => (formItemRefs.current[3] = el)}
        className="relative border-b pb-3"
        style={{ borderColor: "rgba(240,237,230,0.1)", transition: "border-color 0.35s" }}
        onFocusCapture={e => (e.currentTarget.style.borderColor = "#CAFF00")}
        onBlurCapture={e => (e.currentTarget.style.borderColor = "rgba(240,237,230,0.1)")}
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell me more..."
          disabled={state.submitting}
          className="w-full bg-transparent outline-none resize-none"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(15px,1.6vw,19px)",
            color: "#F0EDE6",
            fontWeight: 300,
            opacity: state.submitting ? 0.4 : 1,
            transition: "opacity 0.3s",
          }}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ff6b6b",
            marginTop: 6,
            display: "block",
          }}
        />
      </div>

      {/* Submit */}
      <div ref={el => (formItemRefs.current[4] = el)} className="mt-2">
        <button
          type="submit"
          disabled={state.submitting}
          data-cursor
          style={{ cursor: "none", background: "none", border: "none", padding: 0, opacity: state.submitting ? 0.5 : 1, transition: "opacity 0.3s" }}
        >
          <span className="flex items-center gap-4">
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(24px,3vw,40px)",
                textTransform: "uppercase",
                color: state.submitting ? "#888" : "#F0EDE6",
                letterSpacing: "0.04em",
                transition: "color 0.3s, letter-spacing 0.3s",
              }}
              onMouseEnter={e => { if (!state.submitting) { e.target.style.color = "#CAFF00"; e.target.style.letterSpacing = "0.14em"; } }}
              onMouseLeave={e => { e.target.style.color = "#F0EDE6"; e.target.style.letterSpacing = "0.04em"; }}
            >
              {state.submitting ? "Sending..." : "Send it →"}
            </span>
            <span style={{
              display: "inline-block", height: 1, width: 28,
              background: state.submitting ? "#888" : "#CAFF00",
              transition: "width 0.5s, background 0.3s",
            }} />
          </span>
        </button>
      </div>
    </form>
  );
};

/* ─── Main Contact section ─── */
const Contact = () => {
  const pinnedRef   = useRef(null);
  const bigTextRef  = useRef(null);
  const dotRef      = useRef(null);
  const formSectRef = useRef(null);
  const footerRef   = useRef(null);

  useGSAP(() => {
    // Pin CTA
    ScrollTrigger.create({
      trigger: pinnedRef.current,
      start: "top top",
      end: "+=700",
      pin: true,
      pinSpacing: true,
    });

    // Big text parallax within pin
    gsap.to(bigTextRef.current, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: pinnedRef.current,
        start: "top top",
        end: "+=700",
        scrub: 1.5,
      },
    });

    // Status dot pulse
    gsap.to(dotRef.current, {
      scale: 1.6, repeat: -1, yoyo: true, duration: 0.9, ease: "power1.inOut",
    });

    // Form section slides up
    if (formSectRef.current) {
      gsap.fromTo(formSectRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: formSectRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }

    // Footer
    if (footerRef.current) {
      gsap.fromTo(footerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 95%", toggleActions: "play none none none" },
        }
      );
    }
  });

  return (
    <section id="contact" style={{ background: "#0D0D0D" }}>

      {/* ══ PINNED CTA ══ */}
      <div
        ref={pinnedRef}
        className="min-h-screen flex flex-col justify-between py-16 px-8 md:px-16 overflow-hidden"
      >
        <GradientOrb x="60%" y="50%" size={700} color="#CAFF00" opacity={0.03} />

        <Marquee
          items={marqueeTech}
          className="opacity-20 py-2"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(16px,2vw,24px)" }}
        />

        <div ref={bigTextRef} className="flex-1 flex items-center py-12" style={{ zIndex: 1 }}>
          <div>
            <SplitLines
              text={`LET'S\nBUILD\nSOMETHING.`}
              className="display-xl text-offwhite uppercase leading-none select-none"
              trigger={false}
              delay={0}
            />
            <div className="mt-10 flex items-center gap-4">
              <div
                ref={dotRef}
                className="w-3 h-3 rounded-full"
                style={{ background: "#CAFF00", boxShadow: "0 0 12px rgba(202,255,0,0.6)" }}
              />
              <span className="label text-muted">Currently accepting projects</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6" style={{ zIndex: 1 }}>
          <div className="flex flex-wrap gap-6">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                className="label transition-all duration-300"
                style={{ color: "rgba(240,237,230,0.3)" }}
                onMouseEnter={e => { e.target.style.color = "#CAFF00"; e.target.style.letterSpacing = "0.28em"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(240,237,230,0.3)"; e.target.style.letterSpacing = "0.2em"; }}
                data-cursor>
                {s.name} ↗
              </a>
            ))}
          </div>
          <a
            href="mailto:seswaniaditya@gmail.com"
            className="label transition-colors duration-300"
            style={{ color: "rgba(240,237,230,0.3)" }}
            onMouseEnter={e => e.target.style.color = "#CAFF00"}
            onMouseLeave={e => e.target.style.color = "rgba(240,237,230,0.3)"}
            data-cursor>
            seswaniaditya@gmail.com
          </a>
        </div>
      </div>

      {/* ══ FORM SECTION ══ */}
      <div
        ref={formSectRef}
        className="py-24 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(240,237,230,0.06)" }}
      >
        <div className="flex items-center gap-4 mb-16">
          <span className="index-num">05</span>
          <div className="rule flex-1" />
          <span className="label text-muted">Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <h3
              className="text-offwhite uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px,5vw,72px)", lineHeight: 1 }}
            >
              Send a<br />Message
            </h3>
            <p className="body-lg" style={{ color: "rgba(240,237,230,0.38)", lineHeight: 1.8 }}>
              Have a project idea, want to collaborate,
              or just want to say hey — I reply within 24 hours.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div style={{ width: 20, height: 1, background: "#CAFF00" }} />
              <a
                href="mailto:seswaniaditya@gmail.com"
                className="label transition-colors duration-300"
                style={{ color: "rgba(240,237,230,0.4)" }}
                onMouseEnter={e => e.target.style.color = "#CAFF00"}
                onMouseLeave={e => e.target.style.color = "rgba(240,237,230,0.4)"}
                data-cursor
              >
                seswaniaditya@gmail.com
              </a>
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <div
        ref={footerRef}
        className="px-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(240,237,230,0.06)" }}
      >
        <span className="label text-muted">© 2025 Aditya Seswani</span>
        <span className="label text-muted">Built with React + GSAP + Lenis</span>
        <span className="label text-muted">CS Undergraduate · India</span>
      </div>
    </section>
  );
};

export default Contact;