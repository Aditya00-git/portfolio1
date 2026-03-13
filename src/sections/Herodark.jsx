import { useEffect, useRef } from "react";
import { BackgroundBeams } from "../components/BackgroundBeams";
import { motion } from "framer-motion";

const PARTICLE_COUNT = typeof window !== "undefined" && window.innerWidth < 768 ? 50 : 80;
const CONNECT_DIST = 150;
const SPEED = 0.9;

class Particle {
  constructor(w, h, x, y) {
    this.x = x ?? Math.random() * w;
    this.y = y ?? Math.random() * h;
    this.depth = Math.random() * 2 + 0.5;
    this.vx = (Math.random() - 0.5) * SPEED * this.depth;
    this.vy = (Math.random() - 0.5) * SPEED * this.depth;
    this.size = 1.4 * this.depth;
    this.w = w;
    this.h = h;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.w) this.vx *= -1;
    if (this.y < 0 || this.y > this.h) this.vy *= -1;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fill();
  }
}

const HeroDark = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => new Particle(W, H));

    const connect = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i], b = particlesRef.current[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const op = (1 - dist / CONNECT_DIST) * 0.6;
            ctx.strokeStyle = `rgba(0,238,255,${op})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particlesRef.current.forEach((p) => { p.move(); p.draw(ctx); });
      connect();
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      particlesRef.current.forEach(p => { p.w = W; p.h = H; });
    };
    window.addEventListener("resize", handleResize);

    const handleClick = (e) => {
      for (let i = 0; i < 6; i++) {
        const p = new Particle(W, H, e.clientX, e.clientY);
        p.vx = (Math.random() - 0.5) * 4;
        p.vy = (Math.random() - 0.5) * 4;
        particlesRef.current.push(p);
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#020617]"
    >
      {/* Network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Beams */}
      <div className="absolute inset-0 opacity-70" style={{ zIndex: 1 }}>
        <BackgroundBeams />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 select-none">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs tracking-[0.5rem] uppercase mb-6 font-light"
          style={{ color: "#00eeff" }}
        >
          Hi, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-syne font-black uppercase text-white leading-none"
          style={{ fontSize: "clamp(52px, 10vw, 140px)" }}
        >
          Aditya<br />
          <span className="text-transparent" style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.3)"
          }}>Seswani</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-white/50 text-sm sm:text-base md:text-lg font-light tracking-widest uppercase mt-6 max-w-xl mx-auto"
        >
          Full Stack Developer · AI Systems · Clean Architecture
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="w-24 h-px mx-auto mt-8"
          style={{ background: "linear-gradient(to right, transparent, #00eeff, transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-white text-xs tracking-widest mt-8 uppercase"
        >
          scroll to explore ↓
        </motion.p>
      </div>
    </section>
  );
};

export default HeroDark;