"use client";

import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { TechIcons } from "./TechIcons";
import { stack } from "@/lib/content";
import { gsap, useGSAP, DUR, EASE, STAGGER, prefersReducedMotion } from "@/lib/motion";

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      gsap.utils.toArray<HTMLElement>("[data-stack-group]").forEach((group) => {
        gsap
          .timeline({
            defaults: { ease: EASE.reveal },
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          })
          .fromTo(group, { opacity: 0, y: reduced ? 0 : 20 }, { opacity: 1, y: 0, duration: reduced ? 0.01 : DUR.reveal, clearProps: "transform" })
          .fromTo(
            group.querySelectorAll("[data-stack-primary]"),
            { opacity: 0, y: reduced ? 0 : 12 },
            { opacity: 1, y: 0, duration: reduced ? 0.01 : DUR.ui * 1.8, stagger: reduced ? 0 : STAGGER.tight, clearProps: "transform" },
            "-=0.5",
          );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="stack" className="section relative z-10">
      <div className="shell">
        <div className="max-w-2xl mb-14 sm:mb-16">
          <SectionHeading eyebrow="Tech Stack" className="mb-5">
            What I build <span className="text-accent">with</span>
          </SectionHeading>
          <p data-anim className="text-[0.95rem] sm:text-base text-white/50 leading-relaxed">
            The tools I reach for first, and the rest of what I have shipped with.
          </p>
        </div>

        <div className="space-y-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {stack.map((s) => (
            <div key={s.group} data-stack-group data-anim className="bg-[#08090d] p-6 sm:p-9">
              <div className="grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-10 items-start">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a78bfa] lg:pt-3">{s.group}</h3>

                <div>
                  {/* Primary tools get the visual weight */}
                  <div className={`flex flex-wrap gap-2.5 ${s.secondary.length ? "mb-5" : ""}`}>
                    {s.primary.map((t) => (
                      <span
                        key={t}
                        data-stack-primary
                        className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:border-[#a78bfa]/35 hover:bg-[#a78bfa]/[0.06]"
                      >
                        {TechIcons[t] && <span className="shrink-0">{TechIcons[t]}</span>}
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Same logos, quieter treatment: smaller, no card, muted
                      label — so the hierarchy still reads at a glance */}
                  <div className="flex flex-wrap gap-x-5 gap-y-2.5 empty:hidden">
                    {s.secondary.map((t) => (
                      <span key={t} className="inline-flex items-center gap-2 text-[13px] text-white/40 transition-colors duration-300 hover:text-white/70">
                        {TechIcons[t] && (
                          <span className="shrink-0 opacity-70 [&>svg]:w-[15px] [&>svg]:h-[15px]">{TechIcons[t]}</span>
                        )}
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
