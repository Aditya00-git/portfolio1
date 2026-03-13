import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";
import MagneticBtn from "../components/MagneticBtn";
import { socials } from "../constants";

const Navbar = () => {
  const panelRef    = useRef(null);
  const linksRef    = useRef([]);
  const metaRef     = useRef(null);
  const tlRef       = useRef(null);
  const iconTopRef  = useRef(null);
  const iconBotRef  = useRef(null);
  const iconTl      = useRef(null);
  const [open, setOpen]       = useState(false);
  const [visible, setVisible] = useState(true);

  useGSAP(() => {
    // Start panel hidden above viewport
    gsap.set(panelRef.current, { yPercent: -100 });
    gsap.set([...linksRef.current.filter(Boolean), metaRef.current], {
      autoAlpha: 0, y: 24,
    });

    tlRef.current = gsap.timeline({ paused: true })
      .to(panelRef.current, {
        yPercent: 0, duration: 0.75, ease: "power4.inOut",
      })
      .to(linksRef.current.filter(Boolean), {
        autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.55, ease: "power3.out",
      }, "-=0.35")
      .to(metaRef.current, {
        autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out",
      }, "-=0.25");

    iconTl.current = gsap.timeline({ paused: true })
      .to(iconTopRef.current, { rotate: 45,  y:  4, duration: 0.3, ease: "power2.inOut" })
      .to(iconBotRef.current, { rotate: -45, y: -4, duration: 0.3, ease: "power2.inOut" }, "<");
  }, []);

  // Hide header on scroll down
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const cur = window.scrollY;
      setVisible(cur < last || cur < 60);
      last = cur;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    if (open) { tlRef.current.reverse(); iconTl.current.reverse(); }
    else       { tlRef.current.play();   iconTl.current.play();    }
    setOpen(p => !p);
  };

  const sections = ["home", "about", "projects", "experience", "contact"];

  return (
    <>
      {/* ── Full-screen menu panel ── */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-50 flex flex-col px-8 md:px-16"
        style={{
          background: "#0D0D0D",
          paddingTop: 88,    // below the header bar
          paddingBottom: 40,
          overflow: "hidden",
        }}
      >
        {/* Nav links — take remaining space but don't overflow */}
        <nav className="flex flex-col justify-center flex-1 gap-0 min-h-0">
          {sections.map((s, i) => (
            <div
              key={s}
              ref={el => (linksRef.current[i] = el)}
              className="border-b"
              style={{ borderColor: "rgba(240,237,230,0.06)" }}
            >
              <Link
                to={s}
                smooth
                offset={-60}
                duration={1600}
                onClick={toggle}
                className="group flex items-center justify-between cursor-none"
                style={{ padding: "12px 0" }}
                data-cursor
              >
                <span className="index-num mr-6 shrink-0">0{i + 1}</span>
                <span
                  className="flex-1 uppercase transition-colors duration-300 group-hover:text-lime"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    // Responsive size — fits 5 items without overflow
                    fontSize: "clamp(28px, 5.5vw, 72px)",
                    lineHeight: 1,
                    color: "#F0EDE6",
                  }}
                >
                  {s}
                </span>
                <span
                  className="text-lime opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0"
                  style={{ fontSize: "clamp(16px, 2vw, 24px)" }}
                >→</span>
              </Link>
            </div>
          ))}
        </nav>

        {/* Socials + copyright — always visible at bottom */}
        <div
          ref={metaRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0"
          style={{ paddingTop: 24, borderTop: "1px solid rgba(240,237,230,0.06)" }}
        >
          <div>
            <p className="label text-muted mb-3">Socials</p>
            <div className="flex flex-wrap gap-5">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label transition-all duration-300"
                  style={{ color: "rgba(240,237,230,0.4)" }}
                  onMouseEnter={e => { e.target.style.color = "#CAFF00"; e.target.style.letterSpacing = "0.26em"; }}
                  onMouseLeave={e => { e.target.style.color = "rgba(240,237,230,0.4)"; e.target.style.letterSpacing = "0.2em"; }}
                >
                  {s.name} ↗
                </a>
              ))}
            </div>
          </div>
          <p className="label text-muted">© 2025 Aditya Seswani</p>
        </div>
      </div>

      {/* ── Top header bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-8 md:px-16 py-5 transition-transform duration-500"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          background: open ? "transparent" : "transparent",
        }}
      >
        {/* Logo */}
        <div
          className="label transition-colors duration-300"
          style={{ color: open ? "rgba(240,237,230,0.6)" : "rgba(240,237,230,0.6)" }}
        >
          Aditya.dev
        </div>

        {/* Burger */}
        <MagneticBtn strength={0.45}>
          <button
            onClick={toggle}
            className="w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[5px] border transition-all duration-300"
            style={{
              background: open ? "#CAFF00" : "#1A1A1A",
              borderColor: open ? "#CAFF00" : "rgba(240,237,230,0.1)",
              cursor: "none",
            }}
            data-cursor
          >
            <span
              ref={iconTopRef}
              className="block w-5 h-px rounded-full origin-center"
              style={{ background: open ? "#0D0D0D" : "#F0EDE6", transition: "background 0.3s" }}
            />
            <span
              ref={iconBotRef}
              className="block w-5 h-px rounded-full origin-center"
              style={{ background: open ? "#0D0D0D" : "#F0EDE6", transition: "background 0.3s" }}
            />
          </button>
        </MagneticBtn>
      </header>
    </>
  );
};

export default Navbar;