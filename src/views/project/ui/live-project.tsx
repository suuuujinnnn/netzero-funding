"use client";
import { useEffect, useState, type ReactNode } from "react";
import { ProjectTabs } from "@/features/project-tabs";
import { FundingStatus } from "./funding-status";
import type { FundingState } from "./funding-data";
import { HistoryPanel } from "./history-panel";
import {
  FUNDING_TARGET,
  INITIAL_FUNDING,
  REFRESH_INTERVAL,
  loadFunding,
} from "./funding-data";
const number = new Intl.NumberFormat("ko-KR");

export function LiveProject({
  heroImage,
  panels,
}: {
  heroImage: ReactNode;
  panels: {
    overview: ReactNode;
    plan: ReactNode;
    partners: ReactNode;
    donate: ReactNode;
  };
}) {
  const url = process.env.NEXT_PUBLIC_FUNDING_CSV_URL?.trim() ?? "";
  const [state, setState] = useState<FundingState>(() => ({
    data: url ? null : INITIAL_FUNDING,
    status: url ? "loading" : "unconfigured",
    checkedAt: null,
  }));
  useEffect(() => {
    if (!url) return;
    let disposed = false;
    let active: AbortController | null = null;
    const refresh = async () => {
      if (active) return;
      const controller = new AbortController();
      active = controller;
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      try {
        const data = await loadFunding(url, controller.signal);
        if (!disposed)
          setState({
            data,
            status: "ready",
            checkedAt: new Date().toISOString(),
          });
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
  }, [url]);
  return (
    <>
      <section className="hero" aria-label="모금 현황">
        {heroImage}
        <div className="hero-inner">
          <p className="hero-kicker">국민대 넷제로 강의실 만들기 프로젝트</p>
          <div className="hero-progress">
            <div className="hero-progress-labels">
              <strong>
                {state.data
                  ? number.format(state.data.amount) + "원"
                  : "집계 확인 중"}
              </strong>
              <span>목표 {number.format(FUNDING_TARGET)}원</span>
            </div>
            <div className="progress-track" aria-hidden="true">
              <span
                style={{
                  width: state.data
                    ? Math.min(
                        100,
                        (state.data.amount / FUNDING_TARGET) * 100,
                      ) + "%"
                    : "0%",
                }}
              />
            </div>
            <p>
              {state.data
                ? "확인 완료 " + number.format(state.data.count) + "건"
                : "확인된 모금 현황을 불러옵니다."}
            </p>
            <FundingStatus state={state} />
          </div>
        </div>
      </section>
      <ProjectTabs
        panels={{ ...panels, history: <HistoryPanel state={state} /> }}
      />
    </>
  );
}
