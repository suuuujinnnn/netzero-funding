import Image from "next/image";
import Link from "next/link";
import { LiveProject } from "./live-project";
import { OverviewPanel } from "./overview-panel";
import { PlanPanel } from "./plan-panel";
import { PartnersPanel } from "./partners-panel";
import { DonatePanel } from "./donate-panel";
import { ProjectHome } from "./project-home";
import { EffectsContent } from "./effects/effects-content";
import "./project.css";
import "./production.css";

export function ProjectView() {
  return (
    <div className="project-page production-site">
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <LiveProject
        header={
          <div className="header-inner production-logo-group">
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
                className="header-kookmin-logo"
                src="/assets/logo/kookmin.svg"
                alt="국민대학교 기후변화대응사업단"
                width={518}
                height={119}
                unoptimized
              />
              <Image
                className="header-goodnews-logo"
                src="/assets/logo/goodnews.svg"
                alt="굿뉴스 에너지"
                width={826}
                height={302}
                unoptimized
              />
            </Link>
          </div>
        }
        homeContent={<ProjectHome />}
        heroImage={
          <Image
            src="/assets/illustrations/green-classroom.png"
            alt="나무와 책상, REC 인증서를 곁들인 작은 교실의 입체 콘셉트 일러스트"
            fill
            sizes="(max-width: 760px) 100vw, 70vw"
            preload
          />
        }
        panels={{
          overview: <OverviewPanel />,
          effects: (
            <>
              <div className="panel-heading">
                <span className="eyebrow">EXPECTED IMPACT</span>
                <h1>기대효과</h1>
                <p>참여 금액에 따른 REC 전력량과 환경 영향 규모 비교</p>
              </div>
              <EffectsContent />
            </>
          ),
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
