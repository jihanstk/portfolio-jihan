"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 400);
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const circumference = 2 * Math.PI * 20;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="20" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="2.5" />
            <circle cx="28" cy="28" r="20" fill="none" stroke="#a78bfa" strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeLinecap="round"
              className="transition-all duration-150 drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]"
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
        </motion.button>
      )}
    </AnimatePresence>
  );
}
