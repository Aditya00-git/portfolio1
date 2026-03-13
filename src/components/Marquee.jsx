import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Observer);

function hLoop(items, config = {}) {
  items = gsap.utils.toArray(items);
  let tl = gsap.timeline({
    repeat: -1, paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  });
  let len = items.length, startX = items[0].offsetLeft,
    times = [], widths = [], xPercents = [], curIndex = 0,
    pps = (config.speed || 1) * 100,
    snap = gsap.utils.snap(config.snap || 1),
    totalWidth, curX, dtStart, dtLoop, item, i;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap((parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });
  totalWidth = items[len - 1].offsetLeft + (xPercents[len - 1] / 100) * widths[len - 1] - startX
    + items[len - 1].offsetWidth * gsap.getProperty(items[len - 1], "scaleX")
    + (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < len; i++) {
    item = items[i]; curX = (xPercents[i] / 100) * widths[i];
    dtStart = item.offsetLeft + curX - startX;
    dtLoop = dtStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, { xPercent: snap(((curX - dtLoop) / widths[i]) * 100), duration: dtLoop / pps }, 0)
      .fromTo(item, { xPercent: snap(((curX - dtLoop + totalWidth) / widths[i]) * 100) },
        { xPercent: xPercents[i], duration: (curX - dtLoop + totalWidth - curX) / pps, immediateRender: false },
        dtLoop / pps)
      .add("label" + i, dtStart / pps);
    times[i] = dtStart / pps;
  }
  tl.progress(1, true).progress(0, true);
  if (config.reversed) { tl.vars.onReverseComplete(); tl.reverse(); }
  return tl;
}

const Marquee = ({ items, reverse = false, className = "", separator = "◆" }) => {
  const refs = useRef([]);

  useEffect(() => {
    if (!refs.current.length) return;
    const tl = hLoop(refs.current, { repeat: -1, paddingRight: 48, reversed: reverse, speed: 0.7 });

    Observer.create({
      onChangeY(self) {
        let f = 3;
        if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) f *= -1;
        gsap.timeline({ defaults: { ease: "none" } })
          .to(tl, { timeScale: f * 3, duration: 0.2, overwrite: true })
          .to(tl, { timeScale: f / 3, duration: 1 }, "+=0.3");
      },
    });
    return () => tl.kill();
  }, [items, reverse]);

  return (
    <div className={`overflow-hidden whitespace-nowrap flex items-center ${className}`}>
      <div className="flex">
        {items.map((item, i) => (
          <span
            key={i}
            ref={el => refs.current[i] = el}
            className="inline-flex items-center gap-10 px-10"
          >
            {item}
            <span className="text-lime opacity-60 text-xs">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;