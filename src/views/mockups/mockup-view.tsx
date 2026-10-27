import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MockupHome } from "./mockup-home";
import { MockupLogos } from "./mockup-logos";
import { MockupHall } from "./mockup-hall";
import { ProjectReport } from "./project-report";
import { ProjectTabs } from "@/features/project-tabs";
import { OverviewPanel } from "@/views/project/ui/overview-panel";
import { PlanPanel } from "@/views/project/ui/plan-panel";
import { PartnersPanel } from "@/views/project/ui/partners-panel";
import { DonatePanel } from "@/views/project/ui/donate-panel";

type Variant = "a-1" | "a-2" | "b" | "a-info";
const menus = [
  ["overview", "모금 소개"],
  ["plan", "사용계획"],
  ["partners", "관련단체"],
  ["history", "명예의 전당"],
  ["donate", "기부하기"],
];

export function MockupView({
  variant,
  details,
  from,
}: {
  variant: Variant;
  details: boolean;
  from: "a-1" | "a-2";
}) {
  const info = variant === "a-info";
  const base = `/mockups/${variant}`;
  const detailHref = (tab: string) => `${base}?details=1#${tab}`;
  const introHref =
    variant === "b"
      ? detailHref("overview")
      : `/mockups/a-info?from=${variant}`;
  const donateHref = detailHref("donate");
  return (
    <div className={`mk-page mk-${variant} project-page`}>
      <a className="skip-link" href="#mockup-main">
        본문 바로가기
      </a>
      <div className="mk-preview">
        <span>
          논의용 목업 ·{" "}
          {info ? "A / 프로젝트 소개 문서" : variant.toUpperCase()} · 미완성
        </span>
        <Link href="/mockups">다른 안 보기 ↗</Link>
      </div>
      <header className="study-header mk-wrap">
        <MockupLogos />
        {info ? (
          <Link className="study-report-back" href={`/mockups/${from}`}>
            ← 모금 사이트로 돌아가기
          </Link>
        ) : (
          <div className="study-header-actions">
            {variant !== "b" && (
              <Link href={introHref}>
                프로젝트 알아보기 <ArrowUpRight size={15} />
              </Link>
            )}
            <Link className="mk-button mk-header-cta" href={donateHref}>
              참여하기 <ArrowUpRight size={17} />
            </Link>
          </div>
        )}
      </header>
      {variant === "b" && (
        <nav className="study-site-nav mk-wrap" aria-label="사이트 메뉴">
          <Link href={base}>홈</Link>
          {!details &&
            menus.map(([id, label]) => (
              <Link href={detailHref(id)} key={id}>
                {label}
              </Link>
            ))}
        </nav>
      )}
      {info ? (
        <ProjectReport from={from} />
      ) : details ? (
        <div id="mockup-main" className="mk-details">
          <ProjectTabs
            panels={{
              overview: <OverviewPanel />,
              plan: <PlanPanel />,
              partners: <PartnersPanel />,
              donate: <DonatePanel />,
              history: <MockupHall page />,
            }}
          />
        </div>
      ) : (
        <MockupHome
          variant={variant}
          introHref={introHref}
          donateHref={donateHref}
        />
      )}
      <footer className="mk-footer mk-wrap">
        <div>
          <strong>PROJECT ZEROSUM</strong>
          <p>국민대 넷제로 강의실 만들기 프로젝트</p>
        </div>
        <p>제로섬 · 국민대학교 기후변화대응사업단 · 굿뉴스에너지</p>
        <Link href="/mockups">목업 비교로 돌아가기 ↗</Link>
      </footer>
    </div>
  );
}
