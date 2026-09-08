"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { gsap, useGSAP, DUR, EASE, prefersReducedMotion } from "@/lib/motion";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map((l) => l.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slide the single active-link outline instead of cross-fading six of them.
  useGSAP(
    () => {
      const box = indicator.current;
      const link = nav.current?.querySelector<HTMLElement>(`[data-nav="${activeSection}"]`);
      if (!box || !link) return;

      const to = { x: link.offsetLeft, width: link.offsetWidth, opacity: 1 };
      if (prefersReducedMotion() || Number(gsap.getProperty(box, "opacity")) === 0) {
        gsap.set(box, to);
      } else {
        gsap.to(box, { ...to, duration: DUR.ui * 1.5, ease: EASE.out });
      }
    },
    { dependencies: [activeSection], scope: nav },
  );

  // Mobile drawer. Height is a layout property, but for a collapsing panel it
  // is the honest one — GSAP measures the auto height and tweens to it.
  useGSAP(
    () => {
      const panel = menu.current;
      if (!panel) return;
      const reduced = prefersReducedMotion();
      const duration = reduced ? 0.01 : DUR.ui * 1.3;

      gsap.killTweensOf(panel);
      if (isOpen) {
        panel.style.display = "block";
        gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration, ease: EASE.out });
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration,
          ease: EASE.out,
          onComplete: () => { panel.style.display = "none"; },
        });
      }
    },
    { dependencies: [isOpen] },
  );

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-700"
      style={{
        background: scrolled ? "rgba(6,7,10,0.70)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(139,92,246,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="target-node !w-5 !h-5" />
            <span className="text-sm sm:text-base font-semibold text-white tracking-wide">SK Mustakin Rahman Jehan</span>
          </a>

          <nav ref={nav} className="hidden md:flex items-center gap-0.5 relative">
            <span
              ref={indicator}
              aria-hidden
              className="absolute left-0 top-0 h-full rounded-sm opacity-0 pointer-events-none will-change-transform"
              style={{ border: "1px solid rgba(139,92,246,0.25)" }}
            />
            {links.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <a key={link.name} href={link.href} data-nav={id}
                  className={`relative px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${activeSection === id ? "text-[#a78bfa]" : "text-white/40 hover:text-white/70"}`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white/60 hover:text-white" aria-expanded={isOpen} aria-label="Toggle menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        ref={menu}
        className="md:hidden overflow-hidden"
        style={{ display: "none", height: 0, background: "rgba(6,7,10,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,92,246,0.08)" }}
      >
        <div className="px-6 py-3 space-y-1">
          {links.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-[#a78bfa] transition-colors"
            >{link.name}</a>
          ))}
        </div>
      </div>
    </header>
  );
}
