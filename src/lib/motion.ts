"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// GSAP made it. Cancel the layout's failsafe so it does not un-hide elements
// mid-reveal; the `gsap-anim` class can stay, because every [data-anim]
// element gets an inline opacity from an immediately-rendered fromTo tween.
if (typeof window !== "undefined") {
  const w = window as Window & { __animFailsafe?: ReturnType<typeof setTimeout> };
  if (w.__animFailsafe) {
    clearTimeout(w.__animFailsafe);
    w.__animFailsafe = undefined;
  }
}

/**
 * One motion system for the whole site. Every animation pulls its duration,
 * easing and stagger from here so the timing reads as deliberate rather than
 * as a pile of one-off numbers.
 */
export const DUR = {
  ui: 0.28, // hovers, taps, small state changes
  reveal: 0.75, // a section or card entering
  large: 1.05, // portrait, masked image reveals
} as const;

export const EASE = {
  out: "power2.out", // default for UI
  reveal: "power3.out", // default for entrances
  expo: "expo.out", // for the largest moves
} as const;

export const STAGGER = {
  tight: 0.06,
  normal: 0.09,
  loose: 0.12,
} as const;

/** Sections start their reveal a little before they reach the fold. */
export const REVEAL_START = "top 82%";

/**
 * True when the visitor asked for less motion. Entrances still happen — they
 * just resolve instantly instead of travelling.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Coarse pointers get lighter treatment: no parallax, shorter travel. */
export function isTouch() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (max-width: 767px)").matches;
}

export { gsap, ScrollTrigger, useGSAP };
