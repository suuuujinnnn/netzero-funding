"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Only content blocks enter. Hero, headings, nested callouts and effects cards
// keep their own behavior, so a parent and its children never enter together.
const targets = [
  ".prose > article",
  ".plan-steps > li",
  ".plan-summary",
  ".partner-list > article",
  ".donate-steps > li",
  ".donate-aside",
  ".explain-stages > li",
  ".history-layout",
].join(",");

export function StaggeredContent({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root.current || preference.matches) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (preference.matches) continue;
          const animation = entry.target.animate(
            [
              { opacity: 0, translate: "0 14px" },
              { opacity: 1, translate: "0 0" },
            ],
            {
              duration: 320,
              delay: Math.min(order++, 3) * 70,
              easing: "cubic-bezier(.2,.7,.3,1)",
              fill: "backwards",
            },
          );
          animations.add(animation);
          animation.finished.then(
            () => animations.delete(animation),
            () => animations.delete(animation),
          );
        }
      },
      { threshold: 0.08 },
    );
    const candidates = Array.from(root.current.querySelectorAll(targets));
    candidates
      .filter(
        (node) =>
          !candidates.some(
            (parent) => parent !== node && parent.contains(node),
          ),
      )
      .forEach((node) => observer.observe(node));
    function stop() {
      if (preference.matches)
        animations.forEach((animation) => animation.cancel());
    }
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stop);
    };
  }, []);
  return (
    <div ref={root} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
