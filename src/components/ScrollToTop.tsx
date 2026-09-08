"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { gsap, useGSAP, DUR, EASE, prefersReducedMotion } from "@/lib/motion";

const CIRCUMFERENCE = 2 * Math.PI * 20;

export default function ScrollToTop() {
  const btn = useRef<HTMLButtonElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 400);
      // Written straight to the attribute — no re-render per scroll frame.
      if (ring.current) {
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        ring.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const el = btn.current;
      if (!el) return;
      const reduced = prefersReducedMotion();
      gsap.to(el, {
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.7,
        duration: reduced ? 0.01 : DUR.ui * 1.3,
        ease: EASE.out,
        overwrite: true,
      });
    },
    { dependencies: [visible] },
  );

  return (
    <button
      ref={btn}
      // SmoothScroll's delegated handler picks this up and scrolls via Lenis.
      data-scroll-to="#home"
      style={{ opacity: 0, transform: "scale(0.7)" }}
      // Hidden from pointers and assistive tech until it is actually on screen.
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center group cursor-pointer ${visible ? "" : "pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="20" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="2.5" />
        <circle
          ref={ring}
          cx="28" cy="28" r="20" fill="none" stroke="#a78bfa" strokeWidth="2.5"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]"
        />
      </svg>
      {/* Glass bg */}
      <div className="absolute inset-[4px] rounded-full"
        style={{
          background: "rgba(139,92,246,0.1)",
          backdropFilter: "blur(16px) saturate(150%)",
          WebkitBackdropFilter: "blur(16px) saturate(150%)",
          border: "1px solid rgba(139,92,246,0.2)",
          boxShadow: "0 4px 20px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      />
      <ArrowUp size={20} strokeWidth={3} className="relative z-10 text-[#a78bfa] group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
    </button>
  );
}
