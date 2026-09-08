"use client";

import { useRef } from "react";
import CountUp from "./CountUp";
import { stats } from "@/lib/content";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

/**
 * A compact credibility strip directly under the hero. Every figure here comes
 * from `lib/content.ts` and is countable from the site's own contents.
 */
export default function Impact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      gsap.fromTo(
        "[data-stat]",
        { opacity: 0, y: reduced ? 0 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : DUR.reveal,
          ease: EASE.reveal,
          stagger: reduced ? 0 : STAGGER.normal,
          clearProps: "transform",
          scrollTrigger: { trigger: root.current, start: REVEAL_START, once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="At a glance" className="relative z-10 pb-4">
      <div className="shell">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/[0.07]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-stat
              data-anim
              className={`py-8 sm:py-10 px-1 sm:px-6 border-b border-white/[0.07] ${i % 2 === 0 ? "border-r" : ""} lg:border-b-0 lg:border-r lg:last:border-r-0 border-white/[0.07]`}
            >
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-white tabular-nums tracking-[-0.02em]"
              />
              <div className="mt-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#a78bfa]">{s.label}</div>
              <div className="mt-1 text-[11px] sm:text-xs text-white/30">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
