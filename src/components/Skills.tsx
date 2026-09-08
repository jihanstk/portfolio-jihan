"use client";

import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { TechIcons } from "./TechIcons";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

const skillCategories = [
  { title: "Frontend", skills: ["HTML", "CSS", "JS ES6", "React.js", "Next.js", "Redux Toolkit", "Tailwind CSS", "React Query"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "Firebase", "Web Socket", "OpenAI", "ElevenLabs"] },
  { title: "Database", skills: ["MongoDB"] },
  { title: "Other", skills: ["GA4", "Amelia", "CDN Chatbot", "Meta WhatsApp", "Twilio"] },
];
const allSkills = skillCategories.flatMap((c) => c.skills);

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      gsap.fromTo(
        "[data-skill-group]",
        { opacity: 0, y: reduced ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : DUR.reveal,
          ease: EASE.reveal,
          stagger: reduced ? 0 : STAGGER.normal,
          clearProps: "transform",
          scrollTrigger: { trigger: "[data-skill-grid]", start: REVEAL_START, once: true },
        },
      );

      // Pills come in per group, once their card is on screen.
      gsap.utils.toArray<HTMLElement>("[data-skill-group]").forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll("[data-skill-pill]"),
          { opacity: 0, y: reduced ? 0 : 10, scale: reduced ? 1 : 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: reduced ? 0.01 : DUR.ui * 1.6,
            ease: EASE.out,
            stagger: reduced ? 0 : STAGGER.tight * 0.6,
            clearProps: "transform",
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="skills" className="py-14 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Tech" className="mb-14">
          TECHNICAL <span className="text-accent">SKILLS</span>
        </SectionHeading>

        {/* Marquee */}
        <div className="relative mb-14 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#06070a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#06070a] to-transparent z-10" />
          <div className="flex gap-3 animate-marquee">
            {[...allSkills, ...allSkills].map((s, i) => (
              <span key={`${s}-${i}`} className="tech-pill whitespace-nowrap flex-shrink-0">
                {TechIcons[s] && <span className="flex-shrink-0">{TechIcons[s]}</span>}{s}
              </span>
            ))}
          </div>
        </div>

        <div data-skill-grid className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.title} data-skill-group data-anim className="glass p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_6px_rgba(139,92,246,0.5)]" />
                <h3 className="text-xs tracking-[0.18em] uppercase text-[#a78bfa] font-semibold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span key={s} data-skill-pill className="tech-pill tech-pill-lift cursor-default">
                    {TechIcons[s] && <span className="flex-shrink-0">{TechIcons[s]}</span>}{s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
