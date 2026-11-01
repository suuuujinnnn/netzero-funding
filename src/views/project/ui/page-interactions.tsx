"use client";

import { useEffect } from "react";
import "./page-interactions.css";

// Keep content visible without JavaScript; animate only as it enters the viewport.
const revealSelector = [
  ".panel-heading",
  ".prose > article",
  ".plan-steps > li",
  ".plan-summary",
  ".partner-list > article",
  ".donate-steps > li",
  ".donate-aside",
  ".study-hall-heading",
  ".study-hall-surface",
  ".history-total",
  ".garden-heading",
  ".garden-card",
  ".explain-heading",
  ".explain-stages > li",
  ".garden-benefit-list > article",
  ".dev-flow > li",
  ".report-cover",
].join(",");

export function PageInteractions() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (preference.matches) continue;
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.children).filter((node) =>
                node.matches(revealSelector),
              )
            : [];
          const delay = Math.max(0, siblings.indexOf(entry.target) % 4) * 65;
          const animation = entry.target.animate(
            [
              { opacity: 0.25, transform: "translateY(20px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 430,
              delay,
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
    function observeContent() {
      document.querySelectorAll(".project-page").forEach((page) => {
        page.querySelectorAll(revealSelector).forEach((node) => {
          if (observed.has(node)) return;
          observed.add(node);
          observer.observe(node);
        });
      });
    }
    observeContent();
    const mutations = new MutationObserver(observeContent);
    mutations.observe(document.body, { childList: true, subtree: true });
    function stopMotion() {
      if (preference.matches)
        animations.forEach((animation) => animation.cancel());
    }
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stopMotion);
    };
  }, []);
  return null;
}
