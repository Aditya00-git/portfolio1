import { useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../components/Marquee";
import SplitLines from "../components/SplitLines";

import { socials, marqueeTech } from "../constants";

/* ─── Social icon paths ─── */
const ICONS = {
  GitHub: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  "Twitter / X": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
};

/* handle / username shown on card */
const HANDLES = {
  GitHub:       "Aditya00-git",
  LinkedIn:     "Aditya Seswani",
  "Twitter / X":"@AdityaSeswani",
  Instagram:    "@adityaseswani",
};

/* ─── Single social card ─── */
const SocialCard = ({ social }) => {
  const cardRef  = useRef(null);
  const arrowRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -6, borderColor: "rgba(202,255,0,0.35)",
      boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(202,255,0,0.1)",
      duration: 0.35, ease: "power3.out",
    });
    gsap.to(arrowRef.current, {
      x: 4, y: -4, opacity: 1, color: "#CAFF00",
      duration: 0.3, ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0, borderColor: "rgba(240,237,230,0.07)",
      boxShadow: "none",
      duration: 0.4, ease: "power3.out",
    });
    gsap.to(arrowRef.current, {
      x: 0, y: 0, opacity: 0.3, color: "#F0EDE6",
      duration: 0.35, ease: "power2.out",
    });
  };

  return (
    <a
      ref={cardRef}
      href={social.href}
      target="_blank"
      rel="noreferrer"
      data-cursor
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "block",
        padding: "20px 24px",
        borderRadius: 16,
        background: "#1A1A1A",
        border: "1px solid rgba(240,237,230,0.07)",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s",
      }}
    >
      {/* Lime corner sweep on hover — CSS pseudo via inline child */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16,
        background: "linear-gradient(135deg, rgba(202,255,0,0.05) 0%, transparent 50%)",
        opacity: 0, transition: "opacity 0.3s",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        {/* Icon + text */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Icon circle */}
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(202,255,0,0.07)",
            border: "1px solid rgba(202,255,0,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#CAFF00", flexShrink: 0,
          }}>
            {ICONS[social.name]}
          </div>

          <div>
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(18px,2vw,22px)",
              letterSpacing: "0.06em",
              color: "#F0EDE6",
              lineHeight: 1,
              marginBottom: 4,
            }}>
              {social.name}
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(240,237,230,0.3)",
            }}>
              {HANDLES[social.name]}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <span
          ref={arrowRef}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            color: "#F0EDE6",
            opacity: 0.3,
            lineHeight: 1,
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          ↗
        </span>
      </div>
    </a>
  );
};

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
          <div className="flex flex-wrap gap-4">
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
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socials.map((s, i) => (
                <SocialCard key={i} social={s} />
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>

      <div
        ref={footerRef}
        className="px-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(240,237,230,0.06)" }}
      >
        <span className="label text-muted">© 2026 Aditya Seswani</span>
        <span className="label text-muted">Built with React + GSAP + Lenis</span>
        <span className="label text-muted">CS Undergraduate · India</span>
      </div>
    </section>
  );
};

export default Contact;