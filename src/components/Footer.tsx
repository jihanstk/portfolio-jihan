import { socials } from "./SocialIcons";
import { navLinks, profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07]">
      <div className="shell py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="text-sm font-semibold text-white">{profile.name}</div>
            <div className="text-xs text-white/30 mt-1">{profile.role}</div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-xs text-white/35 hover:text-[#a78bfa] transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-[#a78bfa] hover:border-[#a78bfa]/30 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 pt-6 border-t border-white/[0.05] text-[11px] text-white/20">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
