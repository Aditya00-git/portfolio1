import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";
import MagneticBtn from "../components/MagneticBtn";
import { socials } from "../constants";

const Navbar = () => {
  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const metaRef = useRef(null);
  const tlRef = useRef(null);
  const iconTopRef = useRef(null);
  const iconBotRef = useRef(null);
  const iconTl = useRef(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useGSAP(() => {
    gsap.set(panelRef.current, { yPercent: -100 });
    gsap.set([...linksRef.current, metaRef.current], { autoAlpha: 0, y: 30 });

    tlRef.current = gsap.timeline({ paused: true })
      .to(panelRef.current, { yPercent: 0, duration: 0.8, ease: "power4.inOut" })
      .to(linksRef.current, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.4");

    iconTl.current = gsap.timeline({ paused: true })
      .to(iconTopRef.current, { rotate: 45, y: 4, duration: 0.35, ease: "power2.inOut" })
      .to(iconBotRef.current, { rotate: -45, y: -4, duration: 0.35, ease: "power2.inOut" }, "<");
  }, []);

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
    else { tlRef.current.play(); iconTl.current.play(); }
    setOpen(p => !p);
  };

  const sections = ["home", "about", "projects", "experience", "contact"];

  return (
    <>
      {/* Full-screen dropdown panel */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-50 flex flex-col justify-between px-8 md:px-16 pt-28 pb-12"
        style={{ background: "#0D0D0D", borderBottom: "1px solid rgba(202,255,0,0.15)" }}
      >
        <nav className="flex flex-col gap-2">
          {sections.map((s, i) => (
            <div
              key={s}
              ref={el => linksRef.current[i] = el}
              className="overflow-hidden border-b"
              style={{ borderColor: "rgba(240,237,230,0.06)" }}
            >
              <Link
                to={s} smooth offset={-60} duration={1600}
                onClick={toggle}
                className="group flex items-center justify-between py-4 cursor-none"
                data-cursor
              >
                <span className="index-num mr-6">0{i + 1}</span>
                <span
                  className="display-md uppercase flex-1 transition-colors duration-300 group-hover:text-lime"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {s}
                </span>
                <span className="text-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl">→</span>
              </Link>
            </div>
          ))}
        </nav>

        <div ref={metaRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="label text-muted mb-2">Socials</p>
            <div className="flex flex-wrap gap-4">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="label text-offwhite opacity-50 hover:opacity-100 hover:text-lime transition-all duration-300">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
          <p className="label text-muted">© 2024 Aditya Seswani</p>
        </div>
      </div>

      {/* Top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-8 md:px-16 py-5 transition-transform duration-500"
        style={{ transform: visible ? "translateY(0)" : "translateY(-110%)" }}
      >
        {/* Logo */}
        <div className="label text-offwhite opacity-70">Aditya.dev</div>

        {/* Burger */}
        <MagneticBtn strength={0.5}>
        <button
          onClick={toggle}
          className="w-12 h-12 rounded-full flex flex-col items-center justify-center gap-[5px] cursor-none border transition-all duration-300"
          style={{ background: open ? "#CAFF00" : "#1A1A1A", borderColor: open ? "#CAFF00" : "rgba(240,237,230,0.1)" }}
          data-cursor
        >
          <span
            ref={iconTopRef}
            className="block w-5 h-px rounded-full origin-center transition-colors duration-300"
            style={{ background: open ? "#0D0D0D" : "#F0EDE6" }}
          />
          <span
            ref={iconBotRef}
            className="block w-5 h-px rounded-full origin-center transition-colors duration-300"
            style={{ background: open ? "#0D0D0D" : "#F0EDE6" }}
          />
        </button>
        </MagneticBtn>
      </header>
    </>
  );
};

export default Navbar;