import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
// import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const text = `I BUILD SCALABLE WEB APPLICATIONS,
AI-POWERED TOOLS, AND CLEAN BACKEND
SYSTEMS THAT PERFORM IN PRODUCTION.`;

  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "768px" });

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        y: 160,
        scrollTrigger: { trigger: el, start: "top 85%" },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);

  return (
    <section id="experience" className="min-h-screen rounded-t-[40px] pb-20" style={{ background: "#0a0a0a" }}>
      <AnimatedHeaderSection
        subTitle={"Crafting with code and creativity"}
        title={"Services"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-8 sm:px-12 pt-6 pb-12 text-white border-t border-white/10"
          style={
            isDesktop
              ? {
                  background: "#0a0a0a",
                  top: `calc(8vh + ${index * 5}em)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { background: "#0a0a0a", top: 0 }
          }
        >
          <div className="flex flex-col gap-6 font-light">
            <h2 className="font-syne font-bold text-3xl lg:text-4xl text-white">
              {service.title}
            </h2>
            <p className="text-lg leading-relaxed tracking-wide lg:text-xl text-white/50">
              {service.description}
            </p>
            <div className="flex flex-col gap-3 text-xl lg:text-2xl text-white/70">
              {service.items.map((item, i) => (
                <div key={i}>
                  <h3 className="flex items-center gap-8">
                    <span className="text-sm text-white/20 font-mono">0{i + 1}</span>
                    {item.title}
                  </h3>
                  {i < service.items.length - 1 && (
                    <div className="w-full h-px my-3 bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;