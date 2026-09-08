"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map(l => l.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              return (
                <a key={link.name} href={link.href}
                  className={`relative px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] uppercase transition-all duration-300 ${active ? "text-[#a78bfa]" : "text-white/40 hover:text-white/70"}`}
                >
                  {active && (
                    <motion.span layoutId="nav" className="absolute inset-0 rounded-sm" style={{ border: "1px solid rgba(139,92,246,0.25)" }} transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white/60 hover:text-white">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(6,7,10,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,92,246,0.08)" }}
          >
            <div className="px-6 py-3 space-y-1">
              {links.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-[#a78bfa] transition-colors"
                >{link.name}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
