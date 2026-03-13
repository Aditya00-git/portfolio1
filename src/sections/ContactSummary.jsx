import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSummary = () => {
  const containerRef = useRef(null);

  const items = ["Innovation", "Precision", "Scalability", "Collaboration", "Performance"];
  const items2 = ["let's connect", "let's connect", "let's connect", "let's connect", "let's connect"];

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=700 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-12 bg-[#e8e8e3]"
    >
      <Marquee items={items} className="text-black" />

      <div className="overflow-hidden font-syne font-light text-center contact-text leading-tight px-6">
        <p>
          "Let's build a{" "}
          <br />
          <span className="font-bold">memorable</span> &{" "}
          <span className="italic">inspiring</span>
          <br />
          web app{" "}
          <span className="text-transparent" style={{ WebkitTextStroke: "2px #0a0a0a" }}>
            together
          </span>
          "
        </p>
      </div>

      <Marquee
        items={items2}
        reverse={true}
        className="text-black border-y border-black/20"
        icon="material-symbols-light:square"
        iconClassName="text-black/40"
      />
    </section>
  );
};

export default ContactSummary;