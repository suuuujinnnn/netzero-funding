"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  parseProjectTab,
  projectTabHref,
  projectTabs,
  type ProjectTab,
} from "../project-tabs";

function revealMenuLink(link: HTMLAnchorElement | null | undefined) {
  const menu = link?.parentElement;
  if (!link || !menu || menu.scrollWidth <= menu.clientWidth) return;
  const item = link.getBoundingClientRect();
  const viewport = menu.getBoundingClientRect();
  const inset = 4;
  if (item.left < viewport.left + inset)
    menu.scrollLeft += item.left - viewport.left - inset;
  else if (item.right > viewport.right - inset)
    menu.scrollLeft += item.right - viewport.right + inset;
}

export function ProjectNavigation({
  initialTab,
  header,
  home,
  panels,
}: {
  initialTab: ProjectTab;
  header: ReactNode;
  home: ReactNode;
  panels: Record<Exclude<ProjectTab, "home">, ReactNode>;
}) {
  const [active, setActive] = useState(initialTab);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const restore = () => {
      const url = new URL(window.location.href);
      const legacyTab = parseProjectTab(url.hash.slice(1));
      if (legacyTab && !url.searchParams.has("tab")) {
        if (legacyTab !== "home") url.searchParams.set("tab", legacyTab);
        url.hash = "";
        window.history.replaceState(null, "", url);
      }
      const [tab, ...duplicates] = url.searchParams.getAll("tab");
      setActive((duplicates.length === 0 && parseProjectTab(tab)) || "home");
    };
    restore();
    window.addEventListener("hashchange", restore);
    window.addEventListener("popstate", restore);
    return () => {
      window.removeEventListener("hashchange", restore);
      window.removeEventListener("popstate", restore);
    };
  }, []);

  useEffect(() => {
    revealMenuLink(
      links.current[projectTabs.findIndex(([id]) => id === active)],
    );
  }, [active]);

  function select(id: ProjectTab, url: URL) {
    setActive(id);
    if (window.location.href !== url.href)
      window.history.pushState(null, "", url);
    requestAnimationFrame(() => {
      document.getElementById("main")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  return (
    <div
      className="b-site-shell"
      onClickCapture={(event) => {
        if (
          !(event.target instanceof Element) ||
          event.button !== 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const link = event.target.closest("a");
        if (
          !link ||
          link.hasAttribute("target") ||
          link.hasAttribute("download")
        )
          return;
        const url = new URL(link.href);
        if (
          url.origin !== window.location.origin ||
          url.pathname !== "/" ||
          url.hash
        )
          return;
        const id = url.search
          ? parseProjectTab(url.searchParams.get("tab"))
          : "home";
        if (!id) return;
        event.preventDefault();
        select(id, url);
      }}
    >
      <header className="b-topbar">
        <div className="b-topbar-inner mk-wrap">
          {header}
          <nav className="b-site-menu" aria-label="프로젝트 메뉴">
            {projectTabs.map(([id, label], index) => (
              <a
                key={id}
                ref={(node) => {
                  links.current[index] = node;
                }}
                href={projectTabHref(id)}
                aria-current={active === id ? "page" : undefined}
                onKeyDown={(event) => {
                  let next: number;
                  if (event.key === "ArrowRight")
                    next = (index + 1) % projectTabs.length;
                  else if (event.key === "ArrowLeft")
                    next =
                      (index - 1 + projectTabs.length) % projectTabs.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = projectTabs.length - 1;
                  else return;
                  event.preventDefault();
                  links.current[next]?.focus({ preventScroll: true });
                  revealMenuLink(links.current[next]);
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main
        id="main"
        tabIndex={-1}
        className={
          active === "home"
            ? "formal-home"
            : `main-content b-detail b-detail-${active}`
        }
      >
        {active === "home" ? (
          home
        ) : (
          <section id={active} key={active}>
            {panels[active]}
          </section>
        )}
        <noscript>
          <p>모금 집계를 확인하려면 JavaScript를 켜 주세요.</p>
        </noscript>
      </main>
    </div>
  );
}
