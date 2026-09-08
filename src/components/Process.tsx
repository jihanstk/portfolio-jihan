"use client";

import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { process } from "@/lib/content";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      gsap.fromTo(
        "[data-step]",
        { opacity: 0, y: reduced ? 0 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : DUR.reveal,
          ease: EASE.reveal,
          stagger: reduced ? 0 : STAGGER.loose,
          clearProps: "transform",
          scrollTrigger: { trigger: "[data-step-grid]", start: REVEAL_START, once: true },
        },
      );

      if (!reduced) {
        gsap.fromTo(
          "[data-step-rail]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: EASE.expo,
            scrollTrigger: { trigger: "[data-step-grid]", start: REVEAL_START, once: true },
          },
        );
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" className="section relative z-10">
      <div className="shell">
        <div className="max-w-2xl mb-14 sm:mb-16">
          <SectionHeading eyebrow="How I Work" className="mb-5">
            From idea to <span className="text-accent">launched</span>
          </SectionHeading>
          <p data-anim className="text-[0.95rem] sm:text-base text-white/50 leading-relaxed">
            The same four steps on every project, whether it is a landing page or
            a platform. Predictable for you, reviewable at each stage.
          </p>
        </div>

        <div className="relative">
          <div
            data-step-rail
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-[19px] h-px origin-left bg-gradient-to-r from-[#a78bfa]/30 via-[#a78bfa]/15 to-transparent"
          />
          <div data-step-grid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {process.map((p) => (
              <div key={p.step} data-step data-anim className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="relative z-10 w-[38px] h-[38px] rounded-full bg-[#06070a] border border-[#a78bfa]/25 flex items-center justify-center text-[11px] font-mono font-semibold text-[#a78bfa]">
                    {p.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white tracking-wide uppercase mb-2.5">{p.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
