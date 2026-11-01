import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Leaf, Sparkles, Sun } from "lucide-react";
import { FUNDING_TARGET, type FundingState } from "./funding-data";
import { FundingStatus } from "./funding-status";
const number = new Intl.NumberFormat("ko-KR");

export function ProjectHero({
  state,
  image,
}: {
  state: FundingState;
  image: ReactNode;
}) {
  return (
    <section className="garden-board garden-hero mk-wrap">
      <div className="garden-heading">
        <p className="dev-kicker">
          <span /> OUR FIRST GREEN CLASSROOM
        </p>
        <h1>
          국민대 넷제로
          <br />
          <em>강의실 만들기</em>
        </h1>
        <p>교실에서 시작하는 학생 주도의 재생에너지 참여 실험</p>
      </div>
      <div className="garden-scene">
        {image}
        <span className="garden-scene-label">
          <span /> 북악관 801호 · 우리가 바꿔갈 첫 교실
        </span>
      </div>
      <article className="garden-card garden-goal">
        <p className="garden-card-label">
          <Sun size={17} /> OUR MISSION <span>01</span>
        </p>
        <h2>
          한 교실만큼의
          <br />
          새로운 선택
        </h2>
        <div className="garden-ring">
          <div>
            <strong>8,000</strong>
            <span>kWh · 목표 전력량</span>
          </div>
        </div>
        <p>
          우리가 쓰는 전력량만큼
          <br />
          재생에너지의 가치를 모아요.
        </p>
        <span className="garden-card-tag">
          <Leaf size={12} /> 재생에너지 인증서 REC
        </span>
      </article>
      <article className="garden-card garden-join">
        <p className="garden-card-label">
          <Sparkles size={17} /> MAKE IT HAPPEN
        </p>
        <h2>
          확인 완료된 모금액
          <strong>
            {state.data ? number.format(state.data.amount) : "집계 확인 중"}
            {state.data && <span>원</span>}
          </strong>
        </h2>
        <p>목표 {number.format(FUNDING_TARGET)}원</p>
        <div
          className="live-progress"
          role="progressbar"
          aria-label="목표 모금액 대비 확인 완료 금액"
          aria-valuemin={0}
          aria-valuemax={FUNDING_TARGET}
          aria-valuenow={
            state.data ? Math.min(FUNDING_TARGET, state.data.amount) : undefined
          }
          aria-valuetext={
            state.data
              ? `${number.format(state.data.amount)}원 / 목표 ${number.format(FUNDING_TARGET)}원`
              : "집계 확인 중"
          }
        >
          <span
            style={{
              width: `${state.data ? Math.min(100, (state.data.amount / FUNDING_TARGET) * 100) : 0}%`,
            }}
          />
        </div>
        <p>
          {state.data
            ? `확인 완료 ${number.format(state.data.count)}건`
            : "확인된 모금 현황을 불러옵니다."}
        </p>
        <p>모금기간 2026.10.08 — 2026.12.25</p>
        <a className="mk-button" href="#donate">
          기부하기 <ArrowUpRight size={18} />
        </a>
        <FundingStatus state={state} />
      </article>
      <div className="garden-floating-tag">
        <Leaf size={19} />
        <div>
          <strong>환경적 가치</strong>
          <span>환경가치를 선택하는 방법</span>
        </div>
      </div>
      <div className="garden-caption">
        <span>THE CLASSROOM EDIT / 801</span>
        <p>
          학생의 선택이 모여
          <br />
          새로운 가능성이 자랍니다.
        </p>
        <ArrowDown size={22} />
      </div>
    </section>
  );
}
