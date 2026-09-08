"use client";

import { useRef, useState } from "react";
import { Mail, Phone, Send, CheckCircle, Loader2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

const GithubIcon = ({ size = 18 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>);
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>);

const inputClass = "w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-3 sm:px-3.5 py-2 sm:py-2.5 text-white/70 text-sm placeholder:text-white/15 focus:outline-none focus:border-[#a78bfa]/25 transition-colors";

export default function ContactFooter() {
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      // Heading is handled by SectionHeading; this picks up where it leaves
      // off — supporting copy, then the contact details, then the form.
      gsap
        .timeline({
          defaults: { ease: EASE.reveal, duration: reduced ? 0.01 : DUR.reveal },
          scrollTrigger: { trigger: "[data-contact-panel]", start: REVEAL_START, once: true },
        })
        .fromTo("[data-contact-panel]", { opacity: 0, y: reduced ? 0 : 28 }, { opacity: 1, y: 0, clearProps: "transform" })
        .fromTo("[data-contact-intro] > *", { opacity: 0, y: reduced ? 0 : 16 }, { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.normal, clearProps: "transform" }, "-=0.5")
        .fromTo("[data-contact-form] > *", { opacity: 0, y: reduced ? 0 : 16 }, { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.tight, duration: reduced ? 0.01 : DUR.ui * 2, clearProps: "transform" }, "-=0.55")
        .fromTo("[data-contact-socials] > *", { opacity: 0, scale: reduced ? 1 : 0.85 }, { opacity: 1, scale: 1, stagger: reduced ? 0 : STAGGER.tight, duration: reduced ? 0.01 : DUR.ui * 1.6, ease: EASE.expo, clearProps: "transform" }, "-=0.3");
    },
    { scope: root },
  );

  return (
    <footer ref={root} id="contact" className="relative z-10 pt-14 sm:pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Get In Touch">
          CONTACT <span className="text-accent">ME</span>
        </SectionHeading>

        <div data-contact-panel data-anim className="glass p-6 sm:p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-10 sm:w-12 h-10 sm:h-12 border-t border-l border-[#a78bfa]/15 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-10 sm:w-12 h-10 sm:h-12 border-t border-r border-[#a78bfa]/15 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-10 sm:w-12 h-10 sm:h-12 border-b border-l border-[#a78bfa]/15 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-10 sm:w-12 h-10 sm:h-12 border-b border-r border-[#a78bfa]/15 rounded-br-xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div data-contact-intro>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">Let&apos;s Build Something <span className="text-accent">Great</span></h3>
              <p className="text-xs sm:text-sm text-white/40 leading-relaxed mb-6 sm:mb-7">I&apos;m currently available for freelance work and full-time opportunities. If you&apos;re looking for a developer who can bring your vision to life, let&apos;s talk.</p>
              <div className="space-y-3">
                <a href="mailto:jihanstk@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#a78bfa]/[0.08] border border-[#a78bfa]/15 flex items-center justify-center group-hover:bg-[#a78bfa]/15 transition-colors"><Mail className="text-[#a78bfa]" size={15} /></div>
                  <div><div className="text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-white/25">Email</div><div className="text-xs sm:text-sm text-white font-medium group-hover:text-[#a78bfa] transition-colors">jihanstk@gmail.com</div></div>
                </a>
                <a href="https://wa.me/8801888351004" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#a78bfa]/[0.08] border border-[#a78bfa]/15 flex items-center justify-center group-hover:bg-[#a78bfa]/15 transition-colors"><Phone className="text-[#a78bfa]" size={15} /></div>
                  <div><div className="text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-white/25">WhatsApp</div><div className="text-xs sm:text-sm text-white font-medium group-hover:text-[#a78bfa] transition-colors">+880 01888351004</div></div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <form data-contact-form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-white/25 mb-1.5 block">Your Name *</label>
                  <input type="text" placeholder="John Doe" value={form.name} onChange={update("name")} required className={inputClass} />
                </div>
                <div>
                  <label className="text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-white/25 mb-1.5 block">Email *</label>
                  <input type="email" placeholder="john@example.com" value={form.email} onChange={update("email")} required className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-white/25 mb-1.5 block">Phone Number</label>
                <input type="tel" placeholder="+880 1XXXXXXXXX" value={form.phone} onChange={update("phone")} className={inputClass} />
              </div>
              <div>
                <label className="text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-white/25 mb-1.5 block">Message *</label>
                <textarea rows={3} placeholder="Let's collaborate on..." value={form.message} onChange={update("message")} required className={`${inputClass} resize-none`} />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className={`bracket-btn w-full flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === "sent" ? "!text-green-400" : status === "error" ? "!text-red-400" : "bracket-btn-accent"
                } ${status === "sending" ? "opacity-60 pointer-events-none" : ""}`}
              >
                {status === "idle" && <><Send size={13} />Send Message</>}
                {status === "sending" && <><Loader2 size={13} className="animate-spin" />Sending...</>}
                {status === "sent" && <><CheckCircle size={13} />Message Sent!</>}
                {status === "error" && <>{errorMsg}</>}
              </button>
            </form>
          </div>

          <div data-contact-socials className="flex items-center justify-center gap-3 mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/5">
            {[
              { Icon: GithubIcon, l: "GitHub", href: "https://github.com/jihanstk" },
              { Icon: LinkedinIcon, l: "LinkedIn", href: "https://www.linkedin.com/in/sk-mustakin-rahman-jehan/" },
              { Icon: WhatsAppIcon, l: "WhatsApp", href: "https://wa.me/8801888351004" },
            ].map(({ Icon, l, href }) => (
              <a key={l} href={href} target="_blank" rel="noopener noreferrer" aria-label={l} className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/25 hover:text-[#a78bfa] hover:border-[#a78bfa]/25 transition-all duration-300"><Icon size={16} /></a>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 text-center text-white/20 text-[10px] sm:text-xs tracking-wider">
          <p>© {new Date().getFullYear()} SK Mustakin Rahman Jehan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
