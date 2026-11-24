import { useEffect, useRef } from "react";
import { FundingPuzzle } from "./funding-puzzle";
import { FUNDING_TARGET } from "./funding-data";
import { FundingStatus } from "./funding-status";
import type { FundingState } from "./funding-data";

const fundingPercent = new Intl.NumberFormat("ko-KR", {
  style: "percent",
  maximumFractionDigits: 1,
  roundingMode: "trunc",
});

export function HistoryPanel({ state }: { state: FundingState }) {
  const data = state.data;
  const hasFunding = data !== null && state.status !== "unconfigured";
  const names = data?.names;
  const namesList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = namesList.current;
    if (
      !list ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;
        target.classList.add("supporter-name-entered");
        observer.unobserve(target);
      }
    });

    for (const nameplate of list.children) {
      if (!nameplate.classList.contains("supporter-name-entered")) {
        observer.observe(nameplate);
      }
    }

    return () => observer.disconnect();
  }, [names]);
  return (
    <>
      <div className="panel-heading">
        <span className="eyebrow">05 / HALL OF ENERGY</span>
        <h1>명예의 전당</h1>
        <p>작은 참여가 모여 첫 번째 교실의 선택이 됩니다.</p>
      </div>
      <div className="history-layout">
        <div className="puzzle-card">
          <h2>
            한 조각씩 채워지는
            <br />첫 번째 교실
          </h2>
          <div className="puzzle-figure">
            <FundingPuzzle amount={hasFunding ? data.amount : null} />
            <div className="puzzle-progress">
              <span>모금 달성률</span>
              <strong>
                {hasFunding
                  ? fundingPercent.format(data.amount / FUNDING_TARGET)
                  : "—"}
              </strong>
            </div>
          </div>
        </div>
        <div className="history-detail">
          <h2 className="supporter-heading">함께한 이름</h2>
          {names?.length ? (
            <>
              <p className="supporter-thanks">
                첫 번째 교실을 함께 만들어 주셔서 고맙습니다.
              </p>
              <ul
                ref={namesList}
                className="supporter-names"
                role="list"
                aria-label="공개에 동의한 참여자"
              >
                {names.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </>
          ) : hasFunding ? (
            <p className="supporter-empty">
              아직 공개된 참여자 이름이 없습니다.
            </p>
          ) : null}
          {state.status === "unconfigured" ? (
            <p className="supporter-empty" role="status">
              모금 집계 연결을 기다리고 있습니다.
            </p>
          ) : state.status !== "ready" ? (
            <FundingStatus state={state} />
          ) : null}
        </div>
      </div>
      <p className="history-privacy">
        공개에 동의하고 입금 확인이 완료된 참여자의 이름만 표시합니다. 시트 변경
        후 홈페이지를 새로고침하면 집계를 다시 조회합니다. 반영까지 시간이 걸릴
        수 있습니다.
      </p>
    </>
  );
}
