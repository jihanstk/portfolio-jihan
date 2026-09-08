"use client";

import { useRef, useState } from "react";
import { Mail, Phone, Send, CheckCircle, Loader2, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/content";
import { gsap, useGSAP, DUR, EASE, STAGGER, REVEAL_START, prefersReducedMotion } from "@/lib/motion";

const inputClass =
  "w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-white/80 text-sm placeholder:text-white/20 focus:outline-none focus:border-[#a78bfa]/40 focus:bg-white/[0.04] transition-colors";
const labelClass = "text-[10px] tracking-[0.14em] uppercase text-white/30 mb-1.5 block font-medium";

export default function Contact() {
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
      const d = reduced ? 0.01 : DUR.reveal;

      gsap
        .timeline({
          defaults: { ease: EASE.reveal, duration: d },
          scrollTrigger: { trigger: root.current, start: REVEAL_START, once: true },
        })
        .fromTo("[data-contact-line]", { opacity: 0, y: reduced ? 0 : 26 }, { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.loose, ease: EASE.expo, clearProps: "transform" })
        .fromTo("[data-contact-intro] > *", { opacity: 0, y: reduced ? 0 : 16 }, { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.normal, clearProps: "transform" }, "-=0.5")
        .fromTo("[data-contact-form] > *", { opacity: 0, y: reduced ? 0 : 16 }, { opacity: 1, y: 0, stagger: reduced ? 0 : STAGGER.tight, duration: reduced ? 0.01 : DUR.ui * 2, clearProps: "transform" }, "-=0.6");
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" className="section relative z-10 overflow-hidden">
      {/* Single soft light behind the closing statement */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-10 w-[600px] h-[380px] rounded-full pointer-events-none blur-[130px] bg-purple-500/[0.055]"
      />

      <div className="shell relative">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-[2.25rem] leading-[1.08] sm:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em]">
            <span data-contact-line data-anim className="block">Have an idea?</span>
            <span data-contact-line data-anim className="block text-accent">Let&apos;s build it.</span>
          </h2>
          <p data-contact-line data-anim className="mt-7 text-[0.95rem] sm:text-lg text-white/50 leading-relaxed max-w-xl mx-auto">
            Whether you have a product spec or just a rough problem worth solving,
            tell me about it. I read every message and reply personally.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
          <div data-contact-intro className="space-y-3">
            <a data-anim href={`mailto:${profile.email}`} className="panel panel-hover flex items-center gap-4 p-4 group">
              <span className="w-10 h-10 rounded-lg bg-[#a78bfa]/[0.08] border border-[#a78bfa]/15 flex items-center justify-center shrink-0">
                <Mail className="text-[#a78bfa]" size={16} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] tracking-[0.14em] uppercase text-white/25">Email</span>
                <span className="block text-sm text-white font-medium truncate group-hover:text-[#a78bfa] transition-colors">{profile.email}</span>
              </span>
              <ArrowUpRight size={15} className="ml-auto text-white/20 group-hover:text-[#a78bfa] transition-colors shrink-0" aria-hidden />
            </a>

            <a data-anim href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="panel panel-hover flex items-center gap-4 p-4 group">
              <span className="w-10 h-10 rounded-lg bg-[#a78bfa]/[0.08] border border-[#a78bfa]/15 flex items-center justify-center shrink-0">
                <Phone className="text-[#a78bfa]" size={16} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] tracking-[0.14em] uppercase text-white/25">WhatsApp</span>
                <span className="block text-sm text-white font-medium truncate group-hover:text-[#a78bfa] transition-colors">{profile.phone}</span>
              </span>
              <ArrowUpRight size={15} className="ml-auto text-white/20 group-hover:text-[#a78bfa] transition-colors shrink-0" aria-hidden />
            </a>

            <p data-anim className="text-xs text-white/30 leading-relaxed pt-2 px-1">
              Based in {profile.location} — working with teams in any timezone.
            </p>
          </div>

          <form data-contact-form onSubmit={handleSubmit} className="glass p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-name" className={labelClass}>Your Name *</label>
                <input id="c-name" type="text" placeholder="John Doe" value={form.name} onChange={update("name")} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="c-email" className={labelClass}>Email *</label>
                <input id="c-email" type="email" placeholder="john@example.com" value={form.email} onChange={update("email")} required className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="c-phone" className={labelClass}>Phone Number</label>
              <input id="c-phone" type="tel" placeholder="+880 1XXXXXXXXX" value={form.phone} onChange={update("phone")} className={inputClass} />
            </div>
            <div>
              <label htmlFor="c-message" className={labelClass}>What are you building? *</label>
              <textarea id="c-message" rows={5} placeholder="A short description of the project, the timeline, and what you need help with." value={form.message} onChange={update("message")} required className={`${inputClass} resize-none`} />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`btn-primary w-full ${status === "sent" ? "!bg-green-400" : status === "error" ? "!bg-red-400" : ""} ${status === "sending" ? "opacity-60 pointer-events-none" : ""}`}
            >
              {status === "idle" && <><Send size={15} aria-hidden />Start a Conversation</>}
              {status === "sending" && <><Loader2 size={15} className="animate-spin" aria-hidden />Sending...</>}
              {status === "sent" && <><CheckCircle size={15} aria-hidden />Message Sent</>}
              {status === "error" && <>{errorMsg}</>}
            </button>

            <p aria-live="polite" className="sr-only">
              {status === "sent" ? "Your message was sent." : status === "error" ? errorMsg : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
