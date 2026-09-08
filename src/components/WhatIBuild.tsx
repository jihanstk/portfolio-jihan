"use client";

import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { capabilities } from "@/lib/content";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

export default function WhatIBuild() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      gsap.fromTo(
        "[data-capability]",
        { opacity: 0, y: reduced ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : DUR.reveal,
          ease: EASE.reveal,
          stagger: reduced ? 0 : STAGGER.normal,
          clearProps: "transform",
          scrollTrigger: { trigger: "[data-capability-grid]", start: REVEAL_START, once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="section relative z-10">
      <div className="shell">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <SectionHeading eyebrow="What I Build" className="mb-5">
            Products, not just <span className="text-accent">pages</span>
          </SectionHeading>
          <p data-anim className="text-[0.95rem] sm:text-base text-white/50 leading-relaxed">
            I work across the whole stack, which means one person can take an idea
            from data model to deployed interface without the handoffs.
          </p>
        </div>

        <div data-capability-grid className="grid sm:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {capabilities.map((c, i) => (
            <div
              key={c.title}
              data-capability
              data-anim
              className="group relative bg-[#08090d] p-7 sm:p-9 transition-colors duration-300 hover:bg-[#0c0a16]"
            >
              <div className="text-[11px] font-mono text-[#a78bfa]/40 mb-4">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-[#a78bfa] transition-colors duration-300">
                {c.title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed max-w-sm">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
