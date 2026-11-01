import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MockupHome } from "./mockup-home";
import { MockupLogos } from "./mockup-logos";
import { MockupHall } from "./mockup-hall";
import { ProjectReport } from "./project-report";
import { MockupNavigation } from "./mockup-navigation";
import { OverviewPanel } from "@/views/project/ui/overview-panel";
import { PlanPanel } from "@/views/project/ui/plan-panel";
import { PartnersPanel } from "@/views/project/ui/partners-panel";
import { DonatePanel } from "@/views/project/ui/donate-panel";
import { EffectsContent } from "./effects-content";

type Variant = "a-1" | "a-2" | "b" | "a-info";
export function MockupView({
  variant,
  details,
  from,
  section,
}: {
  variant: Variant;
  details: boolean;
  from: "a-1" | "a-2";
  section?: string;
}) {
  const info = variant === "a-info";
  const base = `/mockups/${variant}`;
  const detailHref = (tab: string) =>
    `${base}?details=1${variant === "b" ? `&section=${tab}` : ""}#${tab}`;
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
      {variant === "b" ? (
        <MockupNavigation
          details={details}
          initialPage={section}
          header={
            <Link href="/mockups/b" aria-label="프로젝트 홈">
              <MockupLogos />
            </Link>
          }
          home={
            <MockupHome
              variant="b"
              introHref={introHref}
              donateHref={donateHref}
            />
          }
          panels={{
            overview: (
              <OverviewPanel planHref="/mockups/b?details=1&section=plan#plan" />
            ),
            plan: <PlanPanel />,
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
            partners: <PartnersPanel />,
            donate: (
              <DonatePanel planHref="/mockups/b?details=1&section=plan#plan" />
            ),
            history: <MockupHall page />,
          }}
        />
      ) : (
        <>
          <header className="study-header mk-wrap">
            <MockupLogos />
            {info ? (
              <Link className="study-report-back" href={`/mockups/${from}`}>
                ← 모금 사이트로 돌아가기
              </Link>
            ) : (
              <div className="study-header-actions">
                <Link href={introHref}>
                  프로젝트 알아보기 <ArrowUpRight size={15} />
                </Link>
                <Link
                  className="mk-button mk-header-cta"
                  href={details ? base : donateHref}
                >
                  {details ? "모금페이지로" : "참여하기"}{" "}
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            )}
          </header>
          {info ? (
            <ProjectReport from={from} effects={section === "effects"} />
          ) : details ? (
            <main
              id="mockup-main"
              tabIndex={-1}
              className={`themed-donation themed-donation-${variant} mk-wrap`}
            >
              <nav className="donation-trail" aria-label="페이지 위치">
                <Link href={base}>
                  ←{" "}
                  {variant === "a-1"
                    ? "초록빛 교실로 돌아가기"
                    : "캠페인으로 돌아가기"}
                </Link>
                <span>
                  {variant === "a-1"
                    ? "YOUR NEXT GREEN STEP"
                    : "LET’S MAKE OUR CHOICE!"}
                </span>
              </nav>
              <div className="donation-intro">
                <span aria-hidden="true">{variant === "a-1" ? "✳" : "↗"}</span>
                <p>
                  {variant === "a-1"
                    ? "작은 선택을 더하는 방법, 차근차근 안내할게요."
                    : "준비됐나요? 세 단계면 함께할 수 있어요!"}
                </p>
              </div>
              <DonatePanel planHref={`${introHref}#plan`} />
              <div className="donation-closing">
                <p>
                  {variant === "a-1"
                    ? "우리 교실의 다음 장면을 함께 만들어가요."
                    : "작은 참여, 우리 교실의 새로운 가능성."}
                </p>
                <Link href={base}>모금 이야기로 돌아가기 →</Link>
              </div>
            </main>
          ) : (
            <MockupHome
              variant={variant}
              introHref={introHref}
              donateHref={donateHref}
            />
          )}
        </>
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
