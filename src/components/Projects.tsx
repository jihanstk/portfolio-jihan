"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion, isTouch } from "@/lib/motion";

const GithubIcon = ({ size = 14 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>);

const projects = [
  {
    title: "Mes Avantages",
    subtitle: "Pharmacy Marketing Platform",
    description: "Lead-generation platform for pharmacies built on a headless Sanity + MongoDB stack, with an AI chat assistant, automated booking, and custom performance dashboards.",
    tags: ["Next.js", "TypeScript", "Express.js", "Redux Toolkit", "RTK Query", "MongoDB", "Sanity CMS"],
    image: "/project_mes_avantages.png",
    liveLink: "https://mesavantages.com/",
  },
  {
    title: "Amra Krishok",
    subtitle: "Agriculture Marketplace",
    description: "Full-stack transaction platform with Seller/Buyer dashboards, real-time notifications, and secure payment processing.",
    tags: ["Next.js", "Express.js", "Node.js", "MongoDB", "React Query"],
    image: "/project_amra_krishok.png",
    liveLink: "https://amra-krishok.vercel.app/",
    sourceLink: "https://github.com/jihanstk/amra-krishok",
  },
  {
    title: "Health-Care",
    subtitle: "Hospital Management System",
    description: "End-to-end hospital management with patient scheduling, admin panel, doctor dashboard, and Stripe payment integration.",
    tags: ["Next.js", "MongoDB", "Express", "Firebase", "Stripe.js"],
    image: "/project_healthcare.png",
    liveLink: "https://health-care-azure.vercel.app/",
    sourceLink: "https://github.com/jihanstk/health-care",
  },
];

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const touch = isTouch();
      const cards = gsap.utils.toArray<HTMLElement>("[data-project]");
      const cleanups: Array<() => void> = [];

      cards.forEach((card) => {
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
          // The image unmasks first and the copy follows into the gap it leaves.
          tl.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: DUR.reveal })
            .fromTo(
              media,
              { clipPath: "inset(0% 0% 100% 0%)", scale: 1.12 },
              { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: DUR.large, ease: EASE.expo },
              "-=0.6",
            )
            .fromTo(
              content,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: DUR.reveal, stagger: STAGGER.tight, clearProps: "transform" },
              "-=0.75",
            );
        }

        // A light parallax drift on the artwork. Desktop only — on a phone the
        // card fills the viewport and parallax just reads as jitter.
        if (!reduced && !touch && img) {
          gsap.fromTo(
            img,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        }

        // Hover: the artwork pushes in slightly and a purple light comes up
        // behind the card. Pointer devices only.
        if (!touch && img && glow) {
          const hover = gsap
            .timeline({ paused: true, defaults: { duration: DUR.ui * 1.4, ease: EASE.out } })
            .to(img, { scale: 1.06 }, 0)
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

      // gsap.context runs this on revert, so listeners die with the component.
      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projects" className="py-14 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Portfolio">
          FEATURED <span className="text-accent">PROJECTS</span>
        </SectionHeading>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <div key={project.title} data-project data-anim className="glass-hover overflow-hidden group relative">
              {/* Hover light — sits under the content, never intercepts clicks */}
              <div
                data-project-glow
                aria-hidden
                className="absolute -inset-px rounded-[1.25rem] opacity-0 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${i % 2 === 0 ? "20%" : "80%"} 50%, rgba(167,139,250,0.10), transparent 65%)`,
                }}
              />

              <div className={`relative flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} `}>
                {/* Image */}
                <div data-project-media className="relative lg:w-[45%] h-56 lg:h-auto overflow-hidden will-change-[clip-path]">
                  <div data-project-img className="absolute -top-[6%] -bottom-[6%] left-0 right-0 will-change-transform">
                    <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a]/80 via-transparent to-transparent lg:bg-none" />
                  <div className={`absolute inset-0 hidden lg:block ${i % 2 === 0 ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#06070a]/60 to-transparent`} />
                </div>

                {/* Content */}
                <div data-project-content className="p-6 md:p-8 lg:w-[55%] flex flex-col justify-center">
                  <div className="text-[9px] tracking-[0.2em] uppercase text-[#a78bfa]/50 mb-1.5">{project.subtitle}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#a78bfa] transition-colors duration-300">{project.title}</h3>
                  <p className="text-sm text-white/40 mb-5 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (<span key={tag} className="tech-pill text-[10px]">{tag}</span>))}
                  </div>

                  <div className="flex items-center gap-5 pt-4 border-t border-white/5">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/40 hover:text-[#a78bfa] transition-colors">
                      <ExternalLink size={13} /><span className="text-[10px] tracking-wider uppercase">Live</span>
                    </a>
                    {project.sourceLink && (
                      <a href={project.sourceLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/40 hover:text-[#a78bfa] transition-colors">
                        <GithubIcon size={13} /><span className="text-[10px] tracking-wider uppercase">Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
