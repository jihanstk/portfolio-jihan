"use client";

import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

const experiences = [
  {
    company: "Message Mind.ai",
    role: "Full-Stack Developer",
    period: "March 2024 - Present",
    highlights: [
      "Advanced AI Integration using OpenAI and custom LLMs for intelligent chatbot experiences.",
      "Meta Platform Integration — WhatsApp Business API for automated customer communication.",
      "Scalable Architecture design for real-time audio streaming and WebSocket connections.",
      "Third-Party Ecosystems integration including Amelia, GA4, Twilio, and CDN Chatbot.",
    ],
  },
];

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      if (reduced) {
        gsap.set(["[data-xp-line]", "[data-xp-item]"], { opacity: 1, scaleY: 1, x: 0 });
        return;
      }

      // The line draws itself as the section passes through the viewport.
      gsap.fromTo(
        "[data-xp-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-xp-track]",
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-xp-item]").forEach((item) => {
        gsap
          .timeline({
            defaults: { ease: EASE.reveal, duration: DUR.reveal },
            scrollTrigger: { trigger: item, start: REVEAL_START, once: true },
          })
          // The node pops first, then its card slides out from the line.
          .fromTo(item.querySelector("[data-xp-node]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: DUR.ui * 1.6, ease: EASE.expo })
          .fromTo(item.querySelector("[data-xp-card]"), { opacity: 0, x: -18 }, { opacity: 1, x: 0, clearProps: "transform" }, "-=0.25")
          .fromTo(item.querySelectorAll("[data-xp-point]"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: STAGGER.tight, duration: DUR.ui * 1.8, clearProps: "transform" }, "-=0.45");
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="py-14 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Work History" className="mb-14">
          MY <span className="text-accent">EXPERIENCE</span>
        </SectionHeading>

        <div data-xp-track className="relative">
          <div
            data-xp-line
            className="absolute left-5 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[#a78bfa]/25 via-[#a78bfa]/8 to-transparent"
          />
          {experiences.map((exp) => (
            <div key={exp.company} data-xp-item className="relative pl-14 mb-10">
              <div data-xp-node data-anim className="absolute left-[12px] top-2 w-4 h-4 rounded-full bg-[#06070a] border-2 border-[#a78bfa] shadow-[0_0_10px_rgba(139,92,246,0.35)]" />
              <div data-xp-card data-anim className="glass-hover p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-[#a78bfa] mb-0.5"><Briefcase size={14} /><span className="text-xs font-semibold tracking-wide">{exp.company}</span></div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs"><Calendar size={12} /><span>{exp.period}</span></div>
                </div>
                <ul className="space-y-2 mt-3">
                  {exp.highlights.map((item, j) => (
                    <li key={j} data-xp-point className="flex items-start gap-2.5 text-white/55 text-sm leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#a78bfa]/50 flex-shrink-0" />{item}
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
