"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const tabs = [
  { id: "overview", label: "모금 소개" },
  { id: "plan", label: "사용계획" },
  { id: "partners", label: "관련단체" },
  { id: "history", label: "명예의 전당" },
  { id: "donate", label: "기부하기" },
] as const;
type TabId = (typeof tabs)[number]["id"];
function readHash(): TabId {
  return (
    tabs.find((tab) => `#${tab.id}` === window.location.hash)?.id ?? "overview"
  );
}

export function ProjectTabs({ panels }: { panels: Record<TabId, ReactNode> }) {
  const [active, setActive] = useState<TabId>("overview");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const nav = useRef<HTMLElement>(null);

  function revealTab(id: TabId) {
    const button = buttons.current[tabs.findIndex((tab) => tab.id === id)];
    const list = button?.parentElement;
    if (!button || !list) return;
    const offset =
      button.getBoundingClientRect().left -
      list.getBoundingClientRect().left +
      list.scrollLeft;
    list.scrollLeft = Math.max(
      0,
      offset - (list.clientWidth - button.offsetWidth) / 2,
    );
  }

  useEffect(() => {
    const restore = () => {
      const id = readHash();
      setActive(id);
      revealTab(id);
    };
    restore();
    window.addEventListener("hashchange", restore);
    return () => window.removeEventListener("hashchange", restore);
  }, []);

  function select(id: TabId, index?: number) {
    setActive(id);
    revealTab(id);
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
    if (index !== undefined) {
      buttons.current[index]?.focus();
    } else {
      nav.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }

  return (
    <>
      <nav className="project-nav" aria-label="프로젝트 메뉴" ref={nav}>
        <div className="nav-inner" role="tablist" aria-label="프로젝트 정보">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={tab.id}
              aria-selected={active === tab.id}
              tabIndex={active === tab.id ? 0 : -1}
              className={tab.id === "donate" ? "donate-tab" : undefined}
              onClick={() => select(tab.id)}
              onKeyDown={(event) => {
                let next: number;
                if (event.key === "ArrowRight")
                  next = (index + 1) % tabs.length;
                else if (event.key === "ArrowLeft")
                  next = (index - 1 + tabs.length) % tabs.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = tabs.length - 1;
                else return;
                event.preventDefault();
                select(tabs[next].id, next);
              }}
            >
              {tab.label}
              {tab.id === "donate" && <span aria-hidden="true">↗</span>}
            </button>
          ))}
        </div>
      </nav>
      <main
        id="main"
        className="main-content"
        tabIndex={-1}
        onClick={(event) => {
          if (!(event.target instanceof Element)) return;
          const button = event.target.closest("button[data-project-tab]");
          const destination = tabs.find(
            (tab) => tab.id === button?.getAttribute("data-project-tab"),
          );
          if (!destination) return;
          select(destination.id);
          buttons.current[tabs.indexOf(destination)]?.focus({
            preventScroll: true,
          });
        }}
      >
        {tabs.map((tab) => (
          <section
            key={tab.id}
            className="tab-panel"
            id={tab.id}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            hidden={active !== tab.id}
          >
            {panels[tab.id]}
          </section>
        ))}
        <noscript>
          <p>메뉴를 전환하려면 JavaScript를 켜 주세요.</p>
        </noscript>
      </main>
    </>
  );
}
