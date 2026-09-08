"use client";

import { useRef } from "react";
import {
  gsap,
  useGSAP,
  DUR,
  EASE,
  STAGGER,
  REVEAL_START,
  prefersReducedMotion,
} from "@/lib/motion";

/**
 * The eyebrow / heading / accent-line trio used by every section, revealed as
 * one group so the rhythm is identical everywhere on the page.
 */
export default function SectionHeading({
  eyebrow,
  children,
  className = "mb-10 sm:mb-14",
}: {
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const tl = gsap.timeline({
        defaults: { ease: EASE.reveal, duration: reduced ? 0.01 : DUR.reveal },
        scrollTrigger: { trigger: root.current, start: REVEAL_START, once: true },
      });

      tl.fromTo(
        [".sh-eyebrow", ".sh-title"],
        { opacity: 0, y: reduced ? 0 : 18 },
        { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.loose, clearProps: "transform" },
      ).fromTo(
        ".sh-line",
        { scaleX: 0 },
        { scaleX: 1, duration: reduced ? 0.01 : DUR.ui * 2, ease: EASE.expo },
        "-=0.35",
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      <div className="section-label sh-eyebrow" data-anim>
        {eyebrow}
      </div>
      <h2 className="sh-title text-2xl sm:text-3xl md:text-4xl font-bold text-white" data-anim>
        {children}
      </h2>
      <div className="sh-line w-12 h-0.5 bg-[#a78bfa] mt-3 origin-left" data-anim />
    </div>
  );
}
