"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const pages = [
  ["home", "홈"],
  ["overview", "모금 소개"],
  ["effects", "기대효과"],
  ["plan", "사용계획"],
  ["partners", "관련단체"],
  ["history", "명예의 전당"],
  ["donate", "기부하기"],
] as const;
type PageId = (typeof pages)[number][0];
type PanelId = Exclude<PageId, "home">;

function readPage(): PageId {
  return pages.find(([id]) => `#${id}` === window.location.hash)?.[0] ?? "home";
}

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
  header,
  home,
  panels,
}: {
  header: ReactNode;
  home: ReactNode;
  panels: Record<PanelId, ReactNode>;
}) {
  const [active, setActive] = useState<PageId>("home");
  const links = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const restore = () => setActive(readPage());
    restore();
    window.addEventListener("hashchange", restore);
    window.addEventListener("popstate", restore);
    return () => {
      window.removeEventListener("hashchange", restore);
      window.removeEventListener("popstate", restore);
    };
  }, []);

  useEffect(() => {
    revealMenuLink(links.current[pages.findIndex(([id]) => id === active)]);
  }, [active]);

  function select(id: PageId) {
    setActive(id);
    if (window.location.hash !== `#${id}`)
      window.history.pushState(null, "", `#${id}`);
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
        const button = event.target.closest("button[data-project-tab]");
        const link = event.target.closest("a");
        let id: PageId | undefined;
        if (button)
          id = pages.find(
            ([key]) => key === button.getAttribute("data-project-tab"),
          )?.[0];
        else if (
          link &&
          !link.hasAttribute("target") &&
          !link.hasAttribute("download")
        ) {
          const url = new URL(link.href);
          if (url.origin !== window.location.origin || url.pathname !== "/")
            return;
          if (!url.hash) id = "home";
          else id = pages.find(([key]) => `#${key}` === url.hash)?.[0];
        }
        if (!id) return;
        event.preventDefault();
        select(id);
      }}
    >
      <header className="b-topbar">
        <div className="b-topbar-inner mk-wrap">
          {header}
          <nav className="b-site-menu" aria-label="프로젝트 메뉴">
            {pages.map(([id, label], index) => (
              <a
                key={id}
                ref={(node) => {
                  links.current[index] = node;
                }}
                href={`#${id}`}
                aria-current={active === id ? "page" : undefined}
                onKeyDown={(event) => {
                  let next: number;
                  if (event.key === "ArrowRight")
                    next = (index + 1) % pages.length;
                  else if (event.key === "ArrowLeft")
                    next = (index - 1 + pages.length) % pages.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = pages.length - 1;
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
          <p>메뉴 전환과 모금 집계를 확인하려면 JavaScript를 켜 주세요.</p>
        </noscript>
      </main>
    </div>
  );
}
