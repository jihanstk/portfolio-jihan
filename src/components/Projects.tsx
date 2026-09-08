"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { GithubIcon } from "./SocialIcons";
import { projects, type Project } from "@/lib/content";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion, isTouch } from "@/lib/motion";

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <article data-project data-anim className="relative">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Screenshot — deliberately the largest element in the section */}
        <div className={`relative ${flipped ? "lg:order-2" : ""}`}>
          <div
            data-project-glow
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] opacity-0 pointer-events-none"
            style={{ background: "radial-gradient(closest-side, rgba(167,139,250,0.16), transparent 70%)" }}
          />
          <div
            data-project-media
            className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0b10] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] will-change-[clip-path]"
          >
            {/* Browser chrome — frames the screenshot as a shipped product */}
            <div className="flex items-center gap-1.5 px-4 h-9 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              {project.liveLink && (
                <span className="ml-3 truncate text-[10px] text-white/25 font-mono">
                  {new URL(project.liveLink).hostname}
                </span>
              )}
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <div data-project-img className="absolute -top-[5%] -bottom-[5%] left-0 right-0 will-change-transform">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Case study */}
        <div data-project-content className={flipped ? "lg:order-1" : ""}>
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#a78bfa]/70 mb-3">
            {project.tagline}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em] mb-4">{project.title}</h3>
          <p className="text-[0.95rem] text-white/60 leading-relaxed mb-7">{project.summary}</p>

          <dl className="space-y-5 mb-7 border-l border-white/[0.08] pl-5">
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-1.5">The Problem</dt>
              <dd className="text-sm text-white/50 leading-relaxed">{project.problem}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-1.5">What I Built</dt>
              <dd className="text-sm text-white/50 leading-relaxed">{project.solution}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-1.5">My Role</dt>
              <dd className="text-sm text-white/50 leading-relaxed">{project.role}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-7">
            {project.tech.map((t) => (
              <span key={t} className="text-xs text-white/35">{t}</span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 !px-5 !text-[13px]">
                View Project <ArrowUpRight size={15} aria-hidden />
              </a>
            )}
            {project.sourceLink && (
              <a href={project.sourceLink} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5 !px-5 !text-[13px]">
                <GithubIcon size={14} /> Source
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const touch = isTouch();
      const cleanups: Array<() => void> = [];

      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
        const media = card.querySelector<HTMLElement>("[data-project-media]");
        const img = card.querySelector<HTMLElement>("[data-project-img]");
        const glow = card.querySelector<HTMLElement>("[data-project-glow]");
        const content = card.querySelectorAll("[data-project-content] > *");

        const tl = gsap.timeline({
          defaults: { ease: EASE.reveal },
          scrollTrigger: { trigger: card, start: REVEAL_START, once: true },
        });

        if (reduced) {
          tl.set([card, media, ...content], { opacity: 1, clipPath: "none", y: 0 });
        } else {
          tl.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: DUR.reveal })
            .fromTo(
              media,
              { clipPath: "inset(0% 0% 100% 0%)", scale: 1.06 },
              { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: DUR.large, ease: EASE.expo },
              "-=0.6",
            )
            .fromTo(
              content,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: DUR.reveal, stagger: STAGGER.tight, clearProps: "transform" },
              "-=0.8",
            );
        }

        if (!reduced && !touch && img) {
          gsap.fromTo(
            img,
            { yPercent: -3 },
            { yPercent: 3, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.6 } },
          );
        }

        if (!touch && img && glow) {
          const hover = gsap
            .timeline({ paused: true, defaults: { duration: DUR.ui * 1.4, ease: EASE.out } })
            .to(img, { scale: 1.04 }, 0)
            .to(glow, { opacity: 1 }, 0);

          const enter = () => hover.play();
          const leave = () => hover.reverse();
          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
          });
        }
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="section relative z-10">
      <div className="shell">
        <div className="max-w-2xl mb-14 sm:mb-20">
          <SectionHeading eyebrow="Featured Work" className="mb-5">
            Things I have <span className="text-accent">shipped</span>
          </SectionHeading>
          <p data-anim className="text-[0.95rem] sm:text-base text-white/50 leading-relaxed">
            Three products in production. Each one below is live — the problem it
            solves, what I built, and where I sat on the team.
          </p>
        </div>

        <div className="space-y-24 sm:space-y-32">
          {projects.map((project, i) => (
            <CaseStudy key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
