"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Anchor navigation has to work whether or not Lenis is running.
    let scrollToId: (id: string) => void = (id) => {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    // Reduced motion means native scrolling — eased scrolling is still motion.
    if (!prefersReducedMotion()) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      // One clock: GSAP drives Lenis, Lenis reports back to ScrollTrigger.
      // Without this the two run on separate rAF loops and triggers lag.
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const instance = lenis;
      scrollToId = (id) => {
        const el = document.querySelector(id);
        if (el) instance.scrollTo(el as HTMLElement, { offset: -80 });
      };
    }

    // Anchors and any control marked data-scroll-to both route through Lenis,
    // so nothing on the page scrolls on a second, competing clock.
    const handleAnchorClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a[href^='#'], [data-scroll-to]");
      const id = el?.dataset.scrollTo ?? el?.getAttribute("href");
      if (!id || id.length <= 1 || !document.querySelector(id)) return;
      e.preventDefault();
      scrollToId(id);
    };

    document.addEventListener("click", handleAnchorClick);

    // Trigger positions are measured from layout. Images and webfonts settle
    // after that, so remeasure once everything has actually landed.
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      document.removeEventListener("click", handleAnchorClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
