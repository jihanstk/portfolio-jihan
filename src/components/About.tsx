"use client";

import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import CountUp from "./CountUp";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion, isTouch } from "@/lib/motion";

const stats = [
  { value: 15, suffix: "+", label: "Solo Projects" },
  { value: 10, suffix: "+", label: "Group Projects" },
  { value: 17, suffix: "+", label: "Tech Stack" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);
  const light = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      gsap
        .timeline({
          defaults: { ease: EASE.reveal, duration: reduced ? 0.01 : DUR.reveal },
          scrollTrigger: { trigger: "[data-about-grid]", start: REVEAL_START, once: true },
        })
        .fromTo("[data-about-card]", { opacity: 0, x: reduced ? 0 : -24 }, { opacity: 1, x: 0, clearProps: "transform" })
        .fromTo("[data-about-copy] > *", { opacity: 0, y: reduced ? 0 : 20 }, { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.normal, clearProps: "transform" }, "-=0.55");

      // Mouse-follow light. quickTo keeps this to two interpolated values per
      // frame instead of a React re-render per mousemove.
      const card = root.current?.querySelector<HTMLElement>("[data-about-card]");
      const glow = light.current;
      if (!card || !glow || isTouch() || reduced) return;

      const moveX = gsap.quickTo(glow, "x", { duration: DUR.ui, ease: EASE.out });
      const moveY = gsap.quickTo(glow, "y", { duration: DUR.ui, ease: EASE.out });

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        moveX(e.clientX - r.left);
        moveY(e.clientY - r.top);
      };
      const onEnter = () => gsap.to(glow, { opacity: 1, duration: DUR.ui });
      const onLeave = () => gsap.to(glow, { opacity: 0, duration: DUR.ui });

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="py-14 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="About Me">
          ABOUT <span className="text-accent">ME</span>
        </SectionHeading>

        <div data-about-grid className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div data-about-card data-anim className="glass p-6 sm:p-8 relative overflow-hidden group cursor-pointer">
            <div
              ref={light}
              aria-hidden
              className="absolute -left-[125px] -top-[125px] w-[250px] h-[250px] rounded-full opacity-0 pointer-events-none will-change-transform"
              style={{ background: "radial-gradient(circle, rgba(167,139,250,0.13) 0%, transparent 70%)" }}
            />

            {/* Vertical name — glows on hover */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180 hidden sm:block font-semibold text-white/[0.05] group-hover:text-[#a78bfa]/40 transition-all duration-700 group-hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.3)]">
              SK Mustakin Rahman Jehan
            </div>

            <div className="text-center sm:ml-6 relative z-10">
              <CountUp value={2} suffix="+" className="block text-6xl sm:text-7xl md:text-8xl font-extrabold text-[#a78bfa] drop-shadow-[0_0_20px_rgba(139,92,246,0.4)] tabular-nums" />
              <div className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#a78bfa] font-bold mt-1">Years of Experience</div>
            </div>
          </div>

          <div data-about-copy>
            <p data-anim className="text-sm sm:text-base text-white/60 leading-relaxed mb-6 sm:mb-7">
              I&apos;m a <span className="text-accent font-semibold">Full Stack Developer</span> who turns ideas into fast, accessible products. I obsess over the small things: micro-interactions, type safety, and code <span className="text-accent">future-me will thank me for</span>.
            </p>
            <div data-anim className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {stats.map((s) => (
                <div key={s.label} className="glass p-3 sm:p-4 text-center">
                  <CountUp value={s.value} suffix={s.suffix} className="block text-lg sm:text-xl font-bold text-white tabular-nums" />
                  <div className="text-[8px] sm:text-[9px] tracking-[0.1em] uppercase text-white/35 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div data-anim className="flex flex-wrap gap-3">
              <a href="mailto:jihanstk@gmail.com" className="bracket-btn">Let&apos;s Talk</a>
              <a href="#projects" className="bracket-btn bracket-btn-accent">View Work</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
