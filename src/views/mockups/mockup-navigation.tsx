"use client";

import { useEffect, useState, type ReactNode } from "react";

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

export function MockupNavigation({
  header,
  home,
  panels,
  details,
  initialPage,
}: {
  header: ReactNode;
  home: ReactNode;
  panels: Record<PanelId, ReactNode>;
  details: boolean;
  initialPage?: string;
}) {
  const [active, setActive] = useState<PageId>(
    details
      ? (pages.find(([id]) => id === initialPage)?.[0] ?? "overview")
      : "home",
  );
  useEffect(() => {
    const restore = () => {
      const id = window.location.hash.slice(1);
      setActive(
        new URLSearchParams(window.location.search).get("details") === "1"
          ? (pages.find(([key]) => key === id)?.[0] ??
              pages.find(
                ([key]) =>
                  key ===
                  new URLSearchParams(window.location.search).get("section"),
              )?.[0] ??
              "overview")
          : "home",
      );
    };
    restore();
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", restore);
    return () => {
      window.removeEventListener("popstate", restore);
      window.removeEventListener("hashchange", restore);
    };
  }, [details, initialPage]);
  function select(id: PageId) {
    setActive(id);
    window.history.pushState(
      null,
      "",
      id === "home" ? "/mockups/b" : `/mockups/b?details=1&section=${id}#${id}`,
    );
    requestAnimationFrame(() => {
      document.getElementById("mockup-main")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }
  return (
    <div
      className="b-site-shell"
      onClickCapture={(event) => {
        if (!(event.target instanceof Element)) return;
        const target = event.target.closest("button[data-project-tab]");
        const link = event.target.closest("a");
        const nativeEvent = event.nativeEvent;
        if (
          nativeEvent.ctrlKey ||
          nativeEvent.metaKey ||
          nativeEvent.shiftKey ||
          nativeEvent.altKey ||
          nativeEvent.button !== 0
        )
          return;
        let id: PageId | undefined;
        if (target)
          id = pages.find(
            ([key]) => key === target.getAttribute("data-project-tab"),
          )?.[0];
        else if (link) {
          const url = new URL(link.href);
          if (
            url.origin !== window.location.origin ||
            url.pathname !== "/mockups/b"
          )
            return;
          id =
            url.searchParams.get("details") === "1"
              ? pages.find(([key]) => key === url.hash.slice(1))?.[0]
              : "home";
        }
        if (!id) return;
        event.preventDefault();
        select(id);
      }}
    >
      <header className="b-topbar">
        <div className="b-topbar-inner mk-wrap">
          {header}
          <nav className="b-site-menu" aria-label="사이트 메뉴">
            {pages.map(([id, label]) => (
              <a
                key={id}
                href={
                  id === "home"
                    ? "/mockups/b"
                    : `/mockups/b?details=1&section=${id}#${id}`
                }
                aria-current={active === id ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      {active === "home" ? (
        home
      ) : (
        <main
          id="mockup-main"
          tabIndex={-1}
          className={`main-content b-detail b-detail-${active}`}
        >
          <section id={active}>{panels[active]}</section>
        </main>
      )}
    </div>
  );
}
