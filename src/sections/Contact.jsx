import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../components/Marquee";
import SplitLines from "../components/SplitLines";
import { socials, marqueeTech } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ID = "xvzbryvq"; // ← your Formspree form ID

const Contact = () => {
  const pinnedRef    = useRef(null);
  const bigTextRef   = useRef(null);
  const dotRef       = useRef(null);
  const formRef      = useRef(null);
  const formItemRefs = useRef([]);
  const footerRef    = useRef(null);

  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: pinnedRef.current,
      start: "top top",
      end: "+=700",
      pin: true,
      pinSpacing: true,
    });

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

    gsap.to(dotRef.current, {
      scale: 1.6, repeat: -1, yoyo: true, duration: 0.9, ease: "power1.inOut",
    });

    const validItems = formItemRefs.current.filter(Boolean);
    if (validItems.length) {
      gsap.fromTo(validItems,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(formRef.current);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        formRef.current.reset();
        // Reset back to idle after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const data = await res.json();
        console.error("Formspree error:", data);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const fields = [
    { name: "name",    placeholder: "Your Name",        type: "text"  },
    { name: "email",   placeholder: "Email Address",    type: "email" },
    { name: "subject", placeholder: "What's it about?", type: "text"  },
  ];

  const btnLabel = {
    idle:    "Send it →",
    sending: "Sending...",
    success: "✓  Message sent",
    error:   "Error — try again",
  }[status];

  const btnColor = {
    idle:    "#F0EDE6",
    sending: "#888",
    success: "#CAFF00",
    error:   "#ff6b6b",
  }[status];

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

        <div ref={bigTextRef} className="flex-1 flex items-center py-12">
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

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-wrap gap-6">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                className="label transition-all duration-300"
                style={{ color: "rgba(240,237,230,0.3)" }}
                onMouseEnter={e => { e.target.style.color = "#CAFF00"; e.target.style.letterSpacing = "0.26em"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(240,237,230,0.3)"; e.target.style.letterSpacing = "0.2em"; }}
                data-cursor>
                {s.name} ↗
              </a>
            ))}
          </div>
          <a href="mailto:seswaniaditya@gmail.com"
            className="label transition-colors duration-300"
            style={{ color: "rgba(240,237,230,0.3)" }}
            onMouseEnter={e => e.target.style.color = "#CAFF00"}
            onMouseLeave={e => e.target.style.color = "rgba(240,237,230,0.3)"}
            data-cursor>
            seswaniaditya@gmail.com
          </a>
        </div>
      </div>

      {/* ══ CONTACT FORM ══ */}
      <div
        ref={formRef}
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
              or just want to say hey — drop me a message.
              I reply within 24 hours.
            </p>

            {/* Email direct link */}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-5 h-px" style={{ background: "#CAFF00" }} />
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

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            noValidate
          >
            {fields.map((f, i) => (
              <div
                key={f.name}
                ref={el => (formItemRefs.current[i] = el)}
                className="relative border-b pb-3"
                style={{
                  borderColor: focused === f.name ? "#CAFF00" : "rgba(240,237,230,0.1)",
                  transition: "border-color 0.35s",
                }}
              >
                <input
                  type={f.type}
                  name={f.name}
                  required
                  disabled={status === "sending"}
                  placeholder={f.placeholder}
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent outline-none"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(15px,1.6vw,19px)",
                    color: "#F0EDE6",
                    fontWeight: 300,
                    opacity: status === "sending" ? 0.4 : 1,
                    transition: "opacity 0.3s",
                  }}
                />
                {/* animated underline fill on focus */}
                <div
                  className="absolute bottom-0 left-0 h-px"
                  style={{
                    background: "#CAFF00",
                    width: focused === f.name ? "100%" : "0%",
                    transition: "width 0.4s ease",
                    bottom: "-1px",
                  }}
                />
              </div>
            ))}

            {/* Textarea */}
            <div
              ref={el => (formItemRefs.current[3] = el)}
              className="relative border-b pb-3"
              style={{
                borderColor: focused === "message" ? "#CAFF00" : "rgba(240,237,230,0.1)",
                transition: "border-color 0.35s",
              }}
            >
              <textarea
                name="message"
                rows="4"
                required
                disabled={status === "sending"}
                placeholder="Tell me more..."
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent outline-none resize-none"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(15px,1.6vw,19px)",
                  color: "#F0EDE6",
                  fontWeight: 300,
                  opacity: status === "sending" ? 0.4 : 1,
                  transition: "opacity 0.3s",
                }}
              />
              <div
                className="absolute bottom-0 left-0 h-px"
                style={{
                  background: "#CAFF00",
                  width: focused === "message" ? "100%" : "0%",
                  transition: "width 0.4s ease",
                  bottom: "-1px",
                }}
              />
            </div>

            {/* Submit button */}
            <div ref={el => (formItemRefs.current[4] = el)} className="mt-2">
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                data-cursor
                style={{ cursor: "none", background: "none", border: "none", padding: 0 }}
              >
                <span
                  className="flex items-center gap-4 group"
                  style={{ transition: "opacity 0.3s", opacity: status === "sending" ? 0.5 : 1 }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(24px,3vw,40px)",
                      textTransform: "uppercase",
                      color: btnColor,
                      letterSpacing: "0.04em",
                      transition: "color 0.35s, letter-spacing 0.3s",
                    }}
                    onMouseEnter={e => { if (status === "idle") { e.target.style.letterSpacing = "0.14em"; } }}
                    onMouseLeave={e => { e.target.style.letterSpacing = "0.04em"; }}
                  >
                    {btnLabel}
                  </span>
                  {/* animated bar */}
                  <span
                    style={{
                      display: "inline-block",
                      height: 1,
                      width: status === "success" ? 80 : 28,
                      background: btnColor,
                      transition: "width 0.5s ease, background 0.35s",
                    }}
                  />
                </span>
              </button>

              {/* Success / error message */}
              {status === "success" && (
                <p
                  className="mt-4 label"
                  style={{ color: "#CAFF00", letterSpacing: "0.2em" }}
                >
                  Thanks! I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p
                  className="mt-4 label"
                  style={{ color: "#ff6b6b", letterSpacing: "0.2em" }}
                >
                  Something went wrong. Try emailing me directly.
                </p>
              )}
            </div>
          </form>
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