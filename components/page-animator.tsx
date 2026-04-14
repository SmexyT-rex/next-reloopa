"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export function PageAnimator() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section
    const heroTl = gsap.timeline();
    heroTl.from(".hero-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    heroTl.from(".hero-image", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    }, "-=0.8");

    // Curator's Picks
    gsap.from(".curator-pick", {
      scrollTrigger: {
        trigger: ".curator-section",
        start: "top 80%",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Available Objects
    gsap.from(".available-object", {
      scrollTrigger: {
        trigger: ".available-section",
        start: "top 80%",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

  });

  return null;
}
