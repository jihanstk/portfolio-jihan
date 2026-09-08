"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import HeroBackground from "./HeroBackground";
import { socials } from "./SocialIcons";
import { profile } from "@/lib/content";
import { gsap, useGSAP, DUR, EASE, STAGGER, prefersReducedMotion, isTouch } from "@/lib/motion";

/**
 * The experience badge: tilts toward the cursor and drifts on a very slow
 * float. Pointer tracking uses gsap.quickTo so mousemove never builds tweens.
 */
function ExperienceCard() {
  const card = useRef<HTMLDivElement>(null);
  const setRotX = useRef<gsap.QuickToFunc | null>(null);
  const setRotY = useRef<gsap.QuickToFunc | null>(null);
  const setGlare = useRef<((x: number, y: number) => void) | null>(null);

  useGSAP(
    () => {
      const el = card.current;
      if (!el || prefersReducedMotion() || isTouch()) return;

      const tilt = { duration: DUR.ui * 1.6, ease: EASE.out };
      setRotX.current = gsap.quickTo(el, "rotationX", tilt);
      setRotY.current = gsap.quickTo(el, "rotationY", tilt);

      const glare = el.querySelector<HTMLElement>(".ec-glare");
      if (glare) {
        setGlare.current = (x, y) => {
          glare.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
        };
      }

      gsap.to(el, { y: -7, delay: 1.2, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true });
    },
    { scope: card },
  );

  const handleMove = (e: React.MouseEvent) => {
    const el = card.current;
    if (!el || !setRotX.current || !setRotY.current) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setRotX.current(py * -16);
    setRotY.current(px * 16);
    setGlare.current?.((px + 0.5) * 100, (py + 0.5) * 100);
  };

  return (
    <div
      ref={card}
      data-hero="badge"
      data-anim
      onMouseMove={handleMove}
      onMouseLeave={() => { setRotX.current?.(0); setRotY.current?.(0); }}
      style={{ transformStyle: "preserve-3d" }}
      className="absolute -bottom-7 -left-4 sm:-left-8 md:-left-12 z-20 will-change-transform"
    >
      <div
        className="relative px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(139,92,246,0.08)", backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(139,92,246,0.2)", boxShadow: "0 8px 32px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="ec-glare absolute inset-0 pointer-events-none rounded-2xl" />
        <div className="relative z-10 text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#a78bfa] drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]">2+</div>
          <div className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-white/60 font-bold mt-1">Years Building</div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(root);
      const rise = reduced ? 0 : 24;
      const d = reduced ? 0.01 : DUR.reveal;

      const tl = gsap.timeline({ defaults: { ease: EASE.reveal, duration: d } });

      tl.fromTo(q('[data-hero="status"]'), { opacity: 0, y: rise }, { opacity: 1, y: 0, duration: reduced ? 0.01 : DUR.ui * 1.5 })
        .fromTo(q('[data-hero="line"]'), { opacity: 0, y: rise * 1.6 }, { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.loose, ease: EASE.expo }, "-=0.15")
        .fromTo(q('[data-hero="identity"]'), { opacity: 0, y: rise }, { opacity: 1, y: 0 }, "-=0.55")
        .fromTo(q('[data-hero="desc"]'), { opacity: 0, y: rise }, { opacity: 1, y: 0 }, "-=0.5")
        .fromTo(q('[data-hero="cta"] > *'), { opacity: 0, y: rise * 0.7 }, { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.tight, duration: reduced ? 0.01 : DUR.ui * 1.6 }, "-=0.42")
        .fromTo(q('[data-hero="social"] > *'), { opacity: 0, y: rise * 0.5 }, { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.tight, duration: reduced ? 0.01 : DUR.ui * 1.5 }, "-=0.3")
        .fromTo(q('[data-hero="portrait"]'), { opacity: 0, scale: reduced ? 1 : 0.94 }, { opacity: 1, scale: 1, duration: reduced ? 0.01 : DUR.large, ease: EASE.expo, clearProps: "scale" }, 0.1)
        .fromTo(q('[data-hero="badge"]'), { opacity: 0, scale: reduced ? 1 : 0.9 }, { opacity: 1, scale: 1 }, "-=0.5")
        .fromTo(q('[data-hero="scroll"]'), { opacity: 0 }, { opacity: 1 }, "-=0.2");

      if (!reduced) {
        gsap.to(q('[data-hero="scroll-tick"]'), { y: 6, duration: 1.1, ease: "sine.inOut", repeat: -1, yoyo: true });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} id="home" className="min-h-screen flex items-center relative overflow-hidden pt-28 pb-20 sm:pt-32">
      <HeroBackground />

      <div className="shell w-full relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-12 lg:gap-16">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {profile.availableForWork && (
              <div data-hero="status" data-anim className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 mb-7">
                <span className="status-dot" aria-hidden />
                <span className="text-[11px] tracking-[0.14em] uppercase text-white/55 font-medium">Available for new projects</span>
              </div>
            )}

            {/* The value proposition leads; the name sits underneath it. */}
            <h1 className="text-[2rem] leading-[1.12] sm:text-5xl lg:text-[3.75rem] font-bold text-white tracking-[-0.02em] mb-6">
              <span data-hero="line" data-anim className="block">I build digital products</span>
              <span data-hero="line" data-anim className="block">that turn ideas into</span>
              <span data-hero="line" data-anim className="block text-accent">real businesses.</span>
            </h1>

            <div data-hero="identity" data-anim className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 mb-6 text-sm">
              <span className="font-semibold text-white">{profile.name}</span>
              <span className="text-white/20" aria-hidden>/</span>
              <span className="text-[#a78bfa]">{profile.role}</span>
            </div>

            <p data-hero="desc" data-anim className="text-[0.95rem] sm:text-base text-white/55 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9">
              I design and ship full-stack web applications — from the data model
              and API through to the interface people actually use. Currently
              building AI-driven communication tooling at MessageMind.ai.
            </p>

            <div data-hero="cta" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mb-9">
              <a data-anim href="#work" className="btn-primary">
                View My Work <ArrowRight size={16} aria-hidden />
              </a>
              <a data-anim href="#contact" className="btn-ghost">
                Let&apos;s Talk
              </a>
            </div>

            <div data-hero="social" className="flex items-center justify-center lg:justify-start gap-2.5">
              {socials.map(({ Icon, label, href }) => (
                <a key={label} data-anim href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-[#a78bfa] hover:border-[#a78bfa]/30 transition-colors duration-300"
                ><Icon /></a>
              ))}
            </div>
          </div>

          <div data-hero="portrait" data-anim className="order-1 lg:order-2 flex justify-center lg:justify-end relative" style={{ perspective: 800 }}>
            <div className="relative w-52 h-60 sm:w-64 sm:h-72 md:w-[19rem] md:h-[23rem]">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/[0.10] via-transparent to-transparent rounded-2xl blur-[50px] pointer-events-none" />
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/[0.08]" style={{ boxShadow: "inset 0 0 40px rgba(139,92,246,0.04)" }}>
                <Image
                  src="/jehan_portrait.png?v=2"
                  alt={`Portrait of ${profile.name}, ${profile.role}`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 304px"
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#06070a] to-transparent z-10" />
              </div>
              <ExperienceCard />
            </div>
          </div>
        </div>
      </div>

      <a
        data-hero="scroll"
        data-anim
        href="#work"
        aria-label="Skip to featured work"
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/25 hover:text-[#a78bfa] transition-colors"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown data-hero="scroll-tick" size={14} aria-hidden />
      </a>
    </section>
  );
}
