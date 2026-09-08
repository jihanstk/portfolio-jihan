"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const GithubIcon = () => (<svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>);
const LinkedinIcon = () => (<svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>);
const WhatsAppIcon = () => (<svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>);

function ExperienceCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="absolute -bottom-8 -left-4 sm:-left-8 md:-left-14 z-20 cursor-pointer"
    >
      <div className="relative px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(139,92,246,0.08)", backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(139,92,246,0.2)", boxShadow: "0 8px 32px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
        <motion.div className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`) }}
        />
        <div className="absolute inset-0 rounded-2xl animate-pulse" style={{ boxShadow: "0 0 20px rgba(139,92,246,0.15)" }} />
        <div className="relative z-10 text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#a78bfa] drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]">2+</div>
          <div className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-white/60 font-bold mt-1">Years of Experience</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
      <div className="absolute top-1/3 right-1/4 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.2em] text-white/20 uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-px h-6 bg-gradient-to-b from-[#a78bfa]/30 to-transparent" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex-1 text-center lg:text-left">
            <div className="section-label justify-center lg:justify-start mb-4 sm:mb-5">Hello<span className="text-[#a78bfa]">.</span></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-2">
              I'm <span className="text-accent">SK Mustakin</span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-2">
              <span className="text-accent">Rahman Jehan</span>
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/80 leading-[1.2] mb-6 sm:mb-7">Full Stack Developer</h3>
            <p className="text-sm md:text-base text-white/40 mb-7 sm:mb-9 max-w-md mx-auto lg:mx-0 leading-relaxed">
              I build clean, scalable web apps with modern frameworks and AI integrations that deliver exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-7 sm:mb-8">
              <a href="mailto:jihanstk@gmail.com" className="bracket-btn">Contact Me</a>
              <a href="#" className="bracket-btn bracket-btn-accent">My Resume</a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {[
                { Icon: LinkedinIcon, l: "LinkedIn", href: "https://www.linkedin.com/in/sk-mustakin-rahman-jehan/" },
                { Icon: GithubIcon, l: "GitHub", href: "https://github.com/jihanstk" },
                { Icon: WhatsAppIcon, l: "WhatsApp", href: "https://wa.me/8801888351004" },
              ].map(({ Icon, l, href }) => (
                <a key={l} href={href} target="_blank" rel="noopener noreferrer" aria-label={l}
                  className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-[#a78bfa] hover:border-[#a78bfa]/30 transition-all duration-300"
                ><Icon /></a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end relative" style={{ perspective: 800 }}
          >
            <div className="relative w-56 h-64 sm:w-64 sm:h-72 md:w-80 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/[0.08] via-transparent to-transparent rounded-2xl blur-[50px] pointer-events-none" />
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/[0.08]" style={{ boxShadow: "inset 0 0 40px rgba(139,92,246,0.04)" }}>
                <Image src="/jehan_portrait.png?v=2" alt="SK Mustakin Rahman Jehan" fill className="object-cover object-top" priority sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 320px" unoptimized />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#06070a] to-transparent z-10" />
              </div>
              <ExperienceCard />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fixed left social bar */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-40">
        {[
          { Icon: LinkedinIcon, l: "LinkedIn", href: "https://www.linkedin.com/in/sk-mustakin-rahman-jehan/" },
          { Icon: GithubIcon, l: "GitHub", href: "https://github.com/jihanstk" },
          { Icon: WhatsAppIcon, l: "WhatsApp", href: "https://wa.me/8801888351004" },
        ].map(({ Icon, l, href }) => (
          <a key={l} href={href} target="_blank" rel="noopener noreferrer" aria-label={l}
            className="w-8 h-8 flex items-center justify-center text-white/25 hover:text-[#a78bfa] transition-all duration-300"
          ><Icon /></a>
        ))}
        <div className="w-px h-14 bg-white/[0.08] mt-2" />
      </div>
    </section>
  );
}
