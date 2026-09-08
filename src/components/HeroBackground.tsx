"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, isTouch } from "@/lib/motion";

/**
 * Atmosphere behind the hero: two very slow purple lights and a dot grid that
 * drifts a few pixels. Everything here is transform/opacity only and sits at
 * single-digit opacity — it should register as depth, not as an effect.
 */
export default function HeroBackground() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // No ambient loops at all for reduced motion — the static gradients stay.
      if (prefersReducedMotion()) return;

      const touch = isTouch();

      gsap.to(".hb-light-a", {
        xPercent: touch ? 6 : 14,
        yPercent: touch ? -5 : -10,
        scale: 1.12,
        duration: 26,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hb-light-b", {
        xPercent: touch ? -6 : -12,
        yPercent: touch ? 5 : 9,
        scale: 1.08,
        duration: 34,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: -8,
      });

      gsap.to(".hb-light-a, .hb-light-b", {
        opacity: 0.55,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 4,
      });

      // Transform, not background-position: the grid is oversized and slides
      // exactly one tile, so the loop is seamless and stays on the compositor.
      if (!touch) {
        gsap.to(".hb-grid", {
          x: 28,
          y: 28,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="hb-grid absolute -inset-8 opacity-60 will-change-transform"
        style={{
          backgroundImage: "radial-gradient(rgba(167,139,250,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)",
        }}
      />
      <div className="hb-light-a absolute top-1/4 right-[18%] w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-purple-500/[0.05] blur-[110px] will-change-transform" />
      <div className="hb-light-b absolute bottom-[12%] left-[8%] w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-indigo-400/[0.035] blur-[120px] will-change-transform" />
    </div>
  );
}
