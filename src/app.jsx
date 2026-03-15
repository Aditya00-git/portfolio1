import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import isMobile from "./utils/isMobile";

import Preloader      from "./components/Preloader";
import RibbonCursor   from "./components/RibbonCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar         from "./sections/Navbar";
import Hero           from "./sections/Hero";
import About          from "./sections/About";
import Projects       from "./sections/Projects";
import Experience     from "./sections/Experience";
import Contact        from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const orbRef    = useRef(null);
  const [preloadDone, setPreloadDone] = useState(false);

  useGSAP(() => {
    if (!preloadDone) return;

    // Page-load curtain lift — fires after preloader completes
    gsap.to("#page-cover", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.1,
      ease: "power4.inOut",
      delay: 0.1,
    });

    // Global orb travels right → left as user scrolls
    if (!isMobile()) {
      gsap.to(orbRef.current, {
        left: "-10%",
        top: "70%",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
        },
      });
    }
  }, { dependencies: [preloadDone] });

  return (
    <>
      {/* Preloader — unmounts itself via opacity but stays in DOM briefly */}
      {!preloadDone && (
        <Preloader onComplete={() => setPreloadDone(true)} />
      )}

      <ReactLenis root options={{ lerp: 0.07, duration: 1.5, smoothTouch: false, prevent: isMobile() ? () => true : undefined }}>
        <ScrollProgress />

        {/* Page cover */}
        <div id="page-cover" style={{
          position: "fixed", inset: 0,
          background: "#0D0D0D",
          zIndex: 999999,
          transformOrigin: "bottom",
        }} />

        {/* Global ambient orb */}
        <div
          ref={orbRef}
          style={{
            position: "fixed",
            left: "85%",
            top: "20%",
            transform: "translate(-50%, -50%)",
            width: 800, height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(202,255,0,0.12) 0%, rgba(202,255,0,0.04) 40%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            willChange: "left, top",
          }}
        />

        <RibbonCursor />
        <Navbar />

        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </ReactLenis>
    </>
  );
};

export default App;