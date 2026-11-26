"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ProjectNavigation } from "./project-navigation";
import { ProjectHero } from "./project-hero";
import type { FundingState } from "./funding-data";
import { HistoryPanel } from "./history-panel";
import { FUNDING_TARGET, loadFunding } from "./funding-data";
import { DonatePanel } from "./donate-panel";
import type { ProjectTab } from "../project-tabs";

export function LiveProject({
  initialTab,
  heroImage,
  header,
  homeContent,
  panels,
}: {
  initialTab: ProjectTab;
  heroImage: ReactNode;
  header: ReactNode;
  homeContent: ReactNode;
  panels: {
    overview: ReactNode;
    effects: ReactNode;
    plan: ReactNode;
    partners: ReactNode;
  };
}) {
  const [state, setState] = useState<FundingState>(() => ({
    data: null,
    status: "loading",
    checkedAt: null,
  }));
  useEffect(() => {
    let disposed = false;
    let active: AbortController | null = null;
    const refresh = async () => {
      if (active) return;
      const controller = new AbortController();
      active = controller;
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      try {
        const result = await loadFunding(controller.signal);
        if (!disposed)
          setState((previous) =>
            result.status === "ready"
              ? result
              : previous.checkedAt
                ? { ...previous, status: "error" }
                : {
                    data: null,
                    status: "unconfigured",
                    checkedAt: null,
                  },
          );
      } catch {
        if (!disposed)
          setState((previous) => ({ ...previous, status: "error" }));
      } finally {
        window.clearTimeout(timeout);
        active = null;
      }
    };
    void refresh();
    const poll = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 60000);
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      disposed = true;
      active?.abort();
    };
  }, []);
  const goalReached = (state.data?.amount ?? 0) >= FUNDING_TARGET;
  const celebrated = useRef(false);
  const playConfetti = useCallback((node: HTMLDivElement | null) => {
    if (!node || celebrated.current) return;
    celebrated.current = true;
    if (window.matchMedia("(max-width: 760px)").matches) {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      node
        .closest(".garden-hero")
        ?.querySelector(".garden-join")
        ?.scrollIntoView({
          behavior: reducedMotion.matches ? "instant" : "smooth",
          block: "center",
        });
    }
    node.dataset.play = "true";
  }, []);
  return (
    <ProjectNavigation
      initialTab={initialTab}
      header={header}
      home={
        <>
          <div className="formal-classroom-hero">
            <ProjectHero
              state={state}
              image={heroImage}
              goalReached={goalReached}
              playConfetti={playConfetti}
            />
          </div>
          {homeContent}
        </>
      }
      panels={{
        ...panels,
        history: <HistoryPanel state={state} />,
        donate: <DonatePanel goalReached={goalReached} />,
      }}
    />
  );
}
