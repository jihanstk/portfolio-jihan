"use client";

import { motion } from "framer-motion";
import { TechIcons } from "./TechIcons";

const skillCategories = [
  { title: "Frontend", skills: ["HTML", "CSS", "JS ES6", "React.js", "Next.js", "Redux Toolkit", "Tailwind CSS", "React Query"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "Firebase", "Web Socket", "OpenAI", "ElevenLabs"] },
  { title: "Database", skills: ["MongoDB"] },
  { title: "Other", skills: ["GA4", "Amelia", "CDN Chatbot", "Meta WhatsApp", "Twilio"] },
];
const allSkills = skillCategories.flatMap(c => c.skills);

export default function Skills() {
  return (
    <section id="skills" className="py-14 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
          <div className="section-label">Tech</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">TECHNICAL <span className="text-accent">SKILLS</span></h2>
          <div className="w-12 h-0.5 bg-[#a78bfa] mt-3" />
        </motion.div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: ci * 0.1 }} className="glass p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_6px_rgba(139,92,246,0.5)]" />
                <h3 className="text-xs tracking-[0.18em] uppercase text-[#a78bfa] font-semibold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <motion.span key={s} whileHover={{ scale: 1.05 }} className="tech-pill cursor-default">
                    {TechIcons[s] && <span className="flex-shrink-0">{TechIcons[s]}</span>}{s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </section>
  );
}
