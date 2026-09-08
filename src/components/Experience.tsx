"use client";

import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { experience } from "@/lib/content";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      if (reduced) {
        gsap.set(["[data-xp-line]", "[data-xp-item]"], { opacity: 1, scaleY: 1, x: 0 });
        return;
      }

      gsap.fromTo(
        "[data-xp-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-xp-track]", start: "top 75%", end: "bottom 65%", scrub: 0.5 },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-xp-item]").forEach((item) => {
        gsap
          .timeline({
            defaults: { ease: EASE.reveal, duration: DUR.reveal },
            scrollTrigger: { trigger: item, start: REVEAL_START, once: true },
          })
          .fromTo(item.querySelector("[data-xp-node]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: DUR.ui * 1.6, ease: EASE.expo })
          .fromTo(item.querySelector("[data-xp-card]"), { opacity: 0, x: -18 }, { opacity: 1, x: 0, clearProps: "transform" }, "-=0.25")
          .fromTo(item.querySelectorAll("[data-xp-point]"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: STAGGER.tight, duration: DUR.ui * 1.8, clearProps: "transform" }, "-=0.45");
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="section relative z-10">
      <div className="shell">
        <div className="max-w-2xl mb-14 sm:mb-16">
          <SectionHeading eyebrow="Experience" className="mb-5">
            Where I have <span className="text-accent">worked</span>
          </SectionHeading>
        </div>

        <div data-xp-track className="relative">
          <div data-xp-line className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[#a78bfa]/40 via-[#a78bfa]/12 to-transparent" />

          {experience.map((exp) => (
            <div key={exp.company} data-xp-item className="relative pl-8 sm:pl-12">
              <div data-xp-node data-anim className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-[#06070a] border-2 border-[#a78bfa] shadow-[0_0_12px_rgba(139,92,246,0.4)]" />

              <div data-xp-card data-anim>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-[-0.01em]">{exp.role}</h3>
                  <span className="text-xs font-medium text-white/35 tabular-nums shrink-0">{exp.period}</span>
                </div>
                <div className="text-sm font-semibold text-[#a78bfa] mb-4">{exp.company}</div>

                <p className="text-[0.95rem] text-white/55 leading-relaxed max-w-2xl mb-6">{exp.summary}</p>

                <ul className="space-y-3 max-w-2xl">
                  {exp.highlights.map((item) => (
                    <li key={item} data-xp-point className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-[#a78bfa]/60 shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
