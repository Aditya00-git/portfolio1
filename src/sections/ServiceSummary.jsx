import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#srv-1", { xPercent: 18, scrollTrigger: { trigger: "#srv-1", scrub: 1 } });
    gsap.to("#srv-2", { xPercent: -24, scrollTrigger: { trigger: "#srv-2", scrub: 1 } });
    gsap.to("#srv-3", { xPercent: 60, scrollTrigger: { trigger: "#srv-3", scrub: 1 } });
    gsap.to("#srv-4", { xPercent: -60, scrollTrigger: { trigger: "#srv-4", scrub: 1 } });
  });

  return (
    <section className="mt-16 mb-32 overflow-hidden font-syne font-bold leading-snug text-center contact-text uppercase select-none">
      <div id="srv-1"><p>Full Stack</p></div>
      <div id="srv-2" className="flex items-center justify-center gap-4 translate-x-12">
        <p className="italic font-light">Development</p>
        <div className="w-8 h-1 md:w-24 bg-black/30" />
        <p>& AI</p>
      </div>
      <div id="srv-3" className="flex items-center justify-center gap-4 -translate-x-32">
        <p>Backend</p>
        <div className="w-8 h-1 md:w-24 bg-black/30" />
        <p className="italic font-light">Systems</p>
        <div className="w-8 h-1 md:w-24 bg-black/30" />
        <p>APIs</p>
      </div>
      <div id="srv-4" className="translate-x-20">
        <p>Performance</p>
      </div>
    </section>
  );
};

export default ServiceSummary;