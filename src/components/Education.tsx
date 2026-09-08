"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

export default function Education() {
  return (
    <section className="py-14 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass p-7">
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-9 h-9 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/15 flex items-center justify-center"><GraduationCap className="text-[#a78bfa]" size={18} /></div>
              <h2 className="text-base font-bold text-white tracking-wide">EDUCATION</h2>
            </div>
            <div className="space-y-5">
              <div className="relative pl-5 border-l border-[#a78bfa]/15">
                <div className="absolute w-1.5 h-1.5 bg-[#a78bfa] rounded-full -left-[4px] top-1.5 shadow-[0_0_6px_rgba(139,92,246,0.4)]" />
                <h3 className="text-sm font-bold text-white mb-0.5">BSc CSE</h3>
                <p className="text-xs text-white/40">Northern University Bangladesh</p>
              </div>
              <div className="relative pl-5 border-l border-[#a78bfa]/8">
                <div className="absolute w-1.5 h-1.5 bg-[#a78bfa]/50 rounded-full -left-[4px] top-1.5" />
                <h3 className="text-sm font-bold text-white mb-0.5">Diploma in Engineering</h3>
                <p className="text-xs text-white/40">Satkhira Polytechnic</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="glass p-7">
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-9 h-9 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/15 flex items-center justify-center"><Award className="text-[#a78bfa]" size={18} /></div>
              <h2 className="text-base font-bold text-white tracking-wide">CERTIFICATIONS</h2>
            </div>
            <div className="space-y-5">
              <div className="relative pl-5 border-l border-[#a78bfa]/15">
                <div className="absolute w-1.5 h-1.5 bg-[#a78bfa] rounded-full -left-[4px] top-1.5 shadow-[0_0_6px_rgba(139,92,246,0.4)]" />
                <h3 className="text-sm font-bold text-white mb-0.5">Complete Web Development</h3>
                <p className="text-xs text-white/40">Programming-Hero</p>
              </div>
              <div className="relative pl-5 border-l border-[#a78bfa]/8">
                <div className="absolute w-1.5 h-1.5 bg-[#a78bfa]/50 rounded-full -left-[4px] top-1.5" />
                <h3 className="text-sm font-bold text-white mb-0.5">WordPress Theme Dev</h3>
                <p className="text-xs text-white/40">Learn With Hasin Hyder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
