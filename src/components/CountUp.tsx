"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

/**
 * Counts a real figure up from zero when it scrolls into view. `value` is the
 * number as it should read when the animation finishes — nothing here invents
 * or rounds a statistic, it only animates toward the number it was given.
 */
export default function CountUp({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = el.current;
      if (!node || prefersReducedMotion()) return;

      // Reset before the trigger fires. The element is off-screen at this
      // point (or the trigger fires on the same frame), so nothing flickers.
      node.textContent = `0${suffix}`;

      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration,
        ease: EASE.expo,
        scrollTrigger: { trigger: node, start: REVEAL_START, once: true },
        onUpdate: () => {
          node.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    },
    { scope: el, dependencies: [value, suffix, duration] },
  );

  // Rendered at its final value, so the real number is in the HTML for search
  // engines and for anyone without JavaScript.
  return (
    <span ref={el} className={className}>
      {value}
      {suffix}
    </span>
  );
}
