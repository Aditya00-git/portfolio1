import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const moveX = useRef(null);
  const moveY = useRef(null);

  const text = `Projects built with passion —
spanning AI, web apps, developer tools,
and full-stack systems.`;

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", { duration: 1.2, ease: "power3.out" });
    moveY.current = gsap.quickTo(previewRef.current, "y", { duration: 1.6, ease: "power3.out" });

    gsap.from(".project-row", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out",
      scrollTrigger: { trigger: ".project-row", start: "top 85%" },
    });
  }, []);

  const handleEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);
    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.18, ease: "power2.out" }
    );
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);
    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", duration: 0.2, ease: "power2.in" });
    gsap.to(previewRef.current, { opacity: 0, scale: 0.96, duration: 0.3 });
  };

  const handleMove = (e) => {
    if (window.innerWidth < 768) return;
    moveX.current(e.clientX + 24);
    moveY.current(e.clientY + 24);
  };

  return (
    <section id="projects" className="flex flex-col min-h-screen bg-[#e8e8e3]">
      <AnimatedHeaderSection
        subTitle={"Logic meets aesthetics, seamlessly"}
        title={"Projects"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div className="relative flex flex-col font-light mt-8" onMouseMove={handleMove}>
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="project-row relative flex flex-col gap-1 py-5 cursor-none group md:gap-0 border-t border-black/10"
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={() => handleLeave(index)}
          >
            <div
              ref={(el) => (overlayRefs.current[index] = el)}
              className="absolute inset-0 hidden md:block -z-10"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", background: "#0a0a0a" }}
            />

            <div className="flex justify-between items-center px-8 sm:px-12 text-black transition-all duration-500 md:group-hover:px-14 md:group-hover:text-white">
              <div className="flex items-center gap-4">
                {project.featured && (
                  <span className="text-xs tracking-wider uppercase text-black/40 md:group-hover:text-white/40 hidden sm:block">
                    Featured
                  </span>
                )}
                <h2 className="font-syne font-bold text-[22px] sm:text-[28px] leading-none">
                  {project.name}
                </h2>
              </div>
              <Icon icon="lucide:arrow-up-right" className="size-5 md:size-6 shrink-0" />
            </div>
            <div className="flex flex-wrap px-8 sm:px-12 text-xs uppercase tracking-wider gap-x-4 gap-y-1 mt-1 transition-all duration-500 md:group-hover:px-14">
              {project.frameworks.map((f) => (
                <p key={f.id} className="text-black/50 transition-colors duration-500 md:group-hover:text-white/40">
                  {f.name}
                </p>
              ))}
            </div>
          </a>
        ))}

        <div
          ref={previewRef}
          className="fixed -top-1/2 left-0 z-50 pointer-events-none hidden md:block opacity-0 rounded-2xl overflow-hidden"
          style={{ width: "420px", border: "4px solid rgba(0,0,0,0.2)", scale: "0.96" }}
        >
          {currentIndex !== null && (
            <div className="w-full h-64 flex items-center justify-center" style={{ background: "#0a0a0a" }}>
              <div className="text-center text-white/40 font-light">
                <p className="font-syne font-bold text-2xl text-white mb-2">
                  {projects[currentIndex].name}
                </p>
                <p className="text-sm text-white/50 px-6 leading-relaxed">
                  {projects[currentIndex].description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
                  {projects[currentIndex].frameworks.map((f) => (
                    <span key={f.id} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60 uppercase tracking-wider">
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-8 sm:px-12 mt-8 mb-16">
        <a
          href="https://github.com/Aditya00-git"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 text-black/50 hover:text-black transition-colors duration-300 font-light tracking-wider uppercase text-sm group"
        >
          View more on GitHub
          <Icon icon="lucide:arrow-up-right" className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
};

export default Works;