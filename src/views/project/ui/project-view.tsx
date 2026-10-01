import Image from "next/image";
import Link from "next/link";
import { ProjectTabs } from "@/features/project-tabs";
import { OverviewPanel } from "./overview-panel";
import { PlanPanel } from "./plan-panel";
import { PartnersPanel } from "./partners-panel";
import { HistoryPanel } from "./history-panel";
import { DonatePanel } from "./donate-panel";
import "./project.css";

export function ProjectView() {
  return (
    <div className="project-page">
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="site-title">
            국민대 넷제로 <span>강의실 만들기 프로젝트</span>
          </Link>
          <span className="header-note">PROJECT ZEROSUM × NET ZERO</span>
        </div>
      </header>
      <section className="hero" aria-label="모금 현황">
        <Image
          className="hero-visual"
          src="/assets/univ.jpg"
          alt="국민대학교 교정과 운동장을 내려다본 모습"
          width={1200}
          height={900}
          sizes="(max-width: 680px) calc(100vw - 32px), (max-width: 1168px) 52vw, 574px"
          preload
        />
        <div className="hero-inner">
          <p className="hero-kicker">첫 번째 교실에서 시작하는 에너지 전환</p>
          <div className="hero-progress">
            <div className="hero-progress-labels">
              <strong className="funding-pending">집계 준비 중</strong>
              <span>목표 800,000원</span>
            </div>
            <p>확인된 모금 현황은 집계 후 안내합니다.</p>
          </div>
        </div>
      </section>
      <ProjectTabs
        panels={{
          overview: <OverviewPanel />,
          plan: <PlanPanel />,
          partners: <PartnersPanel />,
          history: <HistoryPanel />,
          donate: <DonatePanel />,
        }}
      />
      <footer className="site-footer">
        <div>
          <strong>국민대 넷제로 강의실 만들기 프로젝트</strong>
          <p>학생의 선택으로 시작하는 캠퍼스 에너지 전환</p>
        </div>
        <span>PROJECT ZEROSUM · 2026</span>
      </footer>
    </div>
  );
}
