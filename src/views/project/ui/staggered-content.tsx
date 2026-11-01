"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Reveal individual content blocks, never both a parent and its children.
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
  useLayoutEffect(() => {
    const container = root.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!container || preference.matches) return;
    const candidates = Array.from(container.querySelectorAll(targets));
    const blocks = candidates.filter(
      (node) =>
        !candidates.some((parent) => parent !== node && parent.contains(node)),
    );
    const pending = new Map<Element, Animation>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          );
        entering.forEach((entry, index) => {
          const animation = pending.get(entry.target);
          if (!animation) return;
          pending.delete(entry.target);
          observer.unobserve(entry.target);
          if (preference.matches) {
            animation.cancel();
            return;
          }
          animation.effect?.updateTiming({ delay: Math.min(index, 3) * 120 });
          animation.play();
        });
      },
      { threshold: 0, rootMargin: "0px 0px -64px 0px" },
    );
    for (const block of blocks) {
      const animation = block.animate(
        [
          { opacity: 0, translate: "0 36px" },
          { opacity: 1, translate: "0 0" },
        ],
        { duration: 520, easing: "cubic-bezier(.2,.7,.3,1)", fill: "both" },
      );
      // Hold the hidden start frame until scrolling brings this block into view.
      animation.pause();
      animation.currentTime = 0;
      pending.set(block, animation);
      animations.add(animation);
      animation.finished.then(
        () => {
          animation.cancel();
          animations.delete(animation);
        },
        () => animations.delete(animation),
      );
      observer.observe(block);
    }
    function revealFocused(event: FocusEvent) {
      if (!(event.target instanceof Node)) return;
      for (const [block, animation] of pending) {
        if (!block.contains(event.target)) continue;
        observer.unobserve(block);
        pending.delete(block);
        animation.cancel();
      }
    }
    function stop() {
      if (!preference.matches) return;
      observer.disconnect();
      pending.clear();
      animations.forEach((animation) => animation.cancel());
    }
    container.addEventListener("focusin", revealFocused);
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      container.removeEventListener("focusin", revealFocused);
      preference.removeEventListener("change", stop);
    };
  }, []);
  return (
    <div ref={root} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
