"use client";
import { useEffect, useState, type ReactNode } from "react";
import { ProjectNavigation } from "./project-navigation";
import { ProjectHero } from "./project-hero";
import type { FundingState } from "./funding-data";
import { HistoryPanel } from "./history-panel";
import { INITIAL_FUNDING, REFRESH_INTERVAL, loadFunding } from "./funding-data";

export function LiveProject({
  heroImage,
  header,
  homeContent,
  panels,
}: {
  heroImage: ReactNode;
  header: ReactNode;
  homeContent: ReactNode;
  panels: {
    overview: ReactNode;
    effects: ReactNode;
    plan: ReactNode;
    partners: ReactNode;
    donate: ReactNode;
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
                    data: INITIAL_FUNDING,
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
    const interval = window.setInterval(() => void refresh(), REFRESH_INTERVAL);
    return () => {
      disposed = true;
      window.clearInterval(interval);
      active?.abort();
    };
  }, []);
  return (
    <ProjectNavigation
      header={header}
      home={
        <>
          <div className="formal-classroom-hero">
            <ProjectHero state={state} image={heroImage} />
          </div>
          {homeContent}
        </>
      }
      panels={{ ...panels, history: <HistoryPanel state={state} /> }}
    />
  );
}
