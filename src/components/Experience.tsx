"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

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
  return (
    <section id="experience" className="py-14 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
          <div className="section-label">Work History</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">MY <span className="text-accent">EXPERIENCE</span></h2>
          <div className="w-12 h-0.5 bg-[#a78bfa] mt-3" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#a78bfa]/25 via-[#a78bfa]/8 to-transparent" />
          {experiences.map((exp, i) => (
            <motion.div key={exp.company} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }} className="relative pl-14 mb-10">
              <div className="absolute left-[12px] top-2 w-4 h-4 rounded-full bg-[#06070a] border-2 border-[#a78bfa] shadow-[0_0_10px_rgba(139,92,246,0.35)]" />
              <div className="glass-hover p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-[#a78bfa] mb-0.5"><Briefcase size={14} /><span className="text-xs font-semibold tracking-wide">{exp.company}</span></div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs"><Calendar size={12} /><span>{exp.period}</span></div>
                </div>
                <ul className="space-y-2 mt-3">
                  {exp.highlights.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-white/55 text-sm leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#a78bfa]/50 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
