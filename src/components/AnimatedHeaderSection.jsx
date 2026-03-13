import { useRef } from "react";
import { AnimatedTextLines } from "./AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor = "text-black",
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? { trigger: contextRef.current, start: "top 80%" }
        : undefined,
    });

    tl.from(contextRef.current, {
      y: "40vh",
      duration: 1.2,
      ease: "circ.out",
    });

    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 120,
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div ref={headerRef} className="flex flex-col justify-center gap-10 pt-16 sm:gap-14">
          <p className={`text-xs font-light tracking-[0.4rem] uppercase px-8 sm:px-12 ${textColor} opacity-60`}>
            {subTitle}
          </p>
          <div className="px-8 sm:px-12">
            <h1 className={`flex flex-col gap-8 uppercase banner-text sm:gap-12 md:block font-syne font-bold ${textColor}`}>
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-8 sm:px-12 ${textColor}`}>
        <div className="absolute inset-x-0 border-t border-current opacity-20" />
        <div className="pt-10 sm:pt-14">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text tracking-wider ${textColor} opacity-70`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;