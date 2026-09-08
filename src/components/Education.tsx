"use client";

import { useRef } from "react";
import { education, certifications } from "@/lib/content";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

/**
 * Deliberately low-contrast and compact: this supports credibility, it should
 * never compete with the work above it.
 */
export default function Education() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      gsap.fromTo(
        "[data-credential]",
        { opacity: 0, y: reduced ? 0 : 16 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : DUR.reveal,
          ease: EASE.reveal,
          stagger: reduced ? 0 : STAGGER.tight,
          clearProps: "transform",
          scrollTrigger: { trigger: root.current, start: REVEAL_START, once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Education and certifications" className="relative z-10 pb-20 sm:pb-28">
      <div className="shell">
        <div className="grid sm:grid-cols-2 gap-10 sm:gap-16 pt-12 border-t border-white/[0.07]">
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-6">Education</h2>
            <ul className="space-y-5">
              {education.map((item) => (
                <li key={item.title} data-credential data-anim>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-sm font-medium text-white/80">{item.title}</h3>
                    <span className="text-[11px] text-white/25 tabular-nums shrink-0">{item.period}</span>
                  </div>
                  <p className="text-xs text-white/35 mt-0.5">{item.org}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-6">Certifications</h2>
            <ul className="space-y-5">
              {certifications.map((item) => (
                <li key={item.title} data-credential data-anim>
                  <h3 className="text-sm font-medium text-white/80">{item.title}</h3>
                  <p className="text-xs text-white/35 mt-0.5">{item.org}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
