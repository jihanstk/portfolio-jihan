"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "15+", label: "Solo Projects" },
  { value: "10+", label: "Group Projects" },
  { value: "17+", label: "Tech Stack" },
];

export default function About() {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section id="about" className="py-14 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10 sm:mb-14">
          <div className="section-label">About Me</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">ABOUT <span className="text-accent">ME</span></h2>
          <div className="w-12 h-0.5 bg-[#a78bfa] mt-3" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-6 sm:p-8 relative overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
            }}
          >
            {/* Mouse-follow light — only visible while hovering */}
            {hover && (
              <div className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
                style={{ background: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, rgba(167,139,250,0.1) 0%, transparent 70%)` }}
              />
            )}

            {/* Vertical name — glows on hover */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180 hidden sm:block font-semibold text-white/[0.05] group-hover:text-[#a78bfa]/40 transition-all duration-700 group-hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.3)]">
              SK Mustakin Rahman Jehan
            </div>

            <div className="text-center sm:ml-6 relative z-10">
              <div className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-[#a78bfa] drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]">2+</div>
              <div className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#a78bfa] font-bold mt-1">Years of Experience</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6 sm:mb-7">
              I'm a <span className="text-accent font-semibold">Full Stack Developer</span> who turns ideas into fast, accessible products. I obsess over the small things: micro-interactions, type safety, and code <span className="text-accent">future-me will thank me for</span>.
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="glass p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-xl font-bold text-white">{s.value}</div>
                  <div className="text-[8px] sm:text-[9px] tracking-[0.1em] uppercase text-white/35 mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:jihanstk@gmail.com" className="bracket-btn">Let's Talk</a>
              <a href="#projects" className="bracket-btn bracket-btn-accent">View Work</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
