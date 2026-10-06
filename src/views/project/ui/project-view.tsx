import Image from "next/image";
import Link from "next/link";
import { LiveProject } from "./live-project";
import { OverviewPanel } from "./overview-panel";
import { PlanPanel } from "./plan-panel";
import { PartnersPanel } from "./partners-panel";
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
          <Link
            href="/"
            className="site-title"
            aria-label="국민대 넷제로 강의실 만들기 프로젝트 홈"
          >
            <Image
              className="header-logo"
              src="/assets/logo/zerosum_white.svg"
              alt="제로섬"
              width={48}
              height={60}
              unoptimized
            />
            <Image
              className="header-goodnews-logo"
              src="/assets/logo/good.jpg"
              alt="굿뉴스 에너지"
              width={2504}
              height={916}
              sizes="(max-width: 680px) 120px, 164px"
            />
          </Link>
          <span className="header-note">PROJECT ZEROSUM × NET ZERO</span>
        </div>
      </header>
      <LiveProject
        heroImage={
          <Image
            className="hero-visual"
            src="/assets/univ.jpg"
            alt="국민대학교 교정과 운동장을 내려다본 모습"
            width={1200}
            height={900}
            sizes="(max-width: 680px) calc(100vw - 32px), (max-width: 1168px) 52vw, 574px"
            preload
          />
        }
        panels={{
          overview: <OverviewPanel />,
          plan: <PlanPanel />,
          partners: <PartnersPanel />,
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
