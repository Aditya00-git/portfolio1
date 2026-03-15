import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import isMobile from "./utils/isMobile";

import CustomCursor  from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar        from "./sections/Navbar";
import Hero          from "./sections/Hero";
import About         from "./sections/About";
import Projects      from "./sections/Projects";
import Experience    from "./sections/Experience";
import Contact       from "./sections/Contact";
import SplashCursor from "./components/SplashCursor";
import RibbonCursor from "./components/RibbonCursor";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useGSAP(() => {
    gsap.to("#page-cover", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.1,
      ease: "power4.inOut",
      delay: 0.1,
    });
  });

  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.5, smoothTouch: false, prevent: isMobile() ? () => true : undefined }}>
      <ScrollProgress />

      <div id="page-cover" style={{
        position: "fixed", inset: 0,
        background: "#0D0D0D",
        zIndex: 999999,
        transformOrigin: "bottom",
      }} />

      <RibbonCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </ReactLenis>
  );
};

export default App;