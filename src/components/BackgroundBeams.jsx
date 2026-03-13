import { motion } from "framer-motion";
import React from "react";

const pathData = [
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  "M-358 -213C-358 -213 -290 192 174 319C638 446 706 851 706 851",
  "M-336 -237C-336 -237 -268 168 196 295C660 422 728 827 728 827",
  "M-314 -261C-314 -261 -246 144 218 271C682 398 750 803 750 803",
  "M-292 -285C-292 -285 -224 120 240 247C704 374 772 779 772 779",
  "M-270 -309C-270 -309 -202 96 262 223C726 350 794 755 794 755",
  "M-248 -333C-248 -333 -180 72 284 199C748 326 816 731 816 731",
  "M-226 -357C-226 -357 -158 48 306 175C770 302 838 707 838 707",
  "M-204 -381C-204 -381 -136 24 328 151C792 278 860 683 860 683",
  "M-182 -405C-182 -405 -114 0 350 127C814 254 882 659 882 659",
  "M-160 -429C-160 -429 -92 -24 372 103C836 230 904 635 904 635",
  "M-138 -453C-138 -453 -70 -48 394 79C858 206 926 611 926 611",
  "M-116 -477C-116 -477 -48 -72 416 55C880 182 948 587 948 587",
  "M-94 -501C-94 -501 -26 -96 438 31C902 158 970 563 970 563",
  "M-72 -525C-72 -525 -4 -120 460 7C924 134 992 539 992 539",
];

const animations = pathData.map((_, i) => ({
  duration: 4 + (i % 5) * 0.8,
  delay: i * 0.18,
}));

export const BackgroundBeams = React.memo(({ className = "" }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <svg
        className="absolute h-full w-full"
        fill="none"
        viewBox="0 0 696 316"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g opacity="0.04">
          {pathData.map((d, i) => (
            <path key={`static-${i}`} d={d} stroke="white" strokeWidth="0.5" />
          ))}
        </g>
        {pathData.map((d, i) => (
          <motion.path
            key={`beam-${i}`}
            d={d}
            stroke={`url(#grad-${i})`}
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 0.7, 0.7, 0] }}
            transition={{
              duration: animations[i].duration,
              delay: animations[i].delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <defs>
          {pathData.map((_, i) => (
            <linearGradient key={`grad-${i}`} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00eeff" stopOpacity="0" />
              <stop offset="30%" stopColor="#00eeff" stopOpacity="1" />
              <stop offset="60%" stopColor="#7c3aed" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff4da6" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";