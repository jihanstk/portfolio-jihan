import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SK Mustakin Rahman Jehan | Full Stack Developer",
  description: "Personal portfolio of SK Mustakin Rahman Jehan, a Full Stack Developer specializing in modern, scalable web applications and AI integrations.",
};

/**
 * Runs before first paint. It arms the CSS that hides elements GSAP is about
 * to animate in, and disarms it again if GSAP never gets a chance to run —
 * `src/lib/motion.ts` cancels the timer as soon as it loads. Without the
 * timer, a blocked or failed bundle would leave the page blank.
 */
const antiFlash = `(function(){try{
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var d=document.documentElement;d.classList.add('gsap-anim');
window.__animFailsafe=setTimeout(function(){d.classList.remove('gsap-anim')},3000);
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFlash }} />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
