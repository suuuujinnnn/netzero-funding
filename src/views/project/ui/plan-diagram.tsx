import "./plan-diagram.css";

export function PlanDiagram() {
  return (
    <figure className="funding-diagram">
      <figcaption>전력량과 참여가 만나, 재생에너지의 가치로.</figcaption>
      <div
        className="funding-diagram-flow"
        role="img"
        aria-label="북악관 801호의 전력량을 산정하고, 기부금 전액으로 산정 전력량에 상응하는 REC를 구매한 뒤 구매·사용 내역을 공개합니다."
      >
        <div className="funding-diagram-sources" aria-hidden="true">
          <div className="funding-diagram-input">
            <span>북악관 801호</span>
            <strong>전력량 산정</strong>
          </div>
          <div className="funding-diagram-input">
            <span>참여자의 기부금</span>
            <strong>전액 사용</strong>
          </div>
        </div>
        <svg
          className="funding-diagram-merge"
          viewBox="0 0 100 132"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 29H35Q50 29 50 44V88Q50 103 35 103H0M50 66H100" />
        </svg>
        <div className="funding-diagram-purchase" aria-hidden="true">
          REC 구매
        </div>
        <svg
          className="funding-diagram-arrow"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 12H96m-8-6 8 6-8 6" />
        </svg>
        <div className="funding-diagram-result" aria-hidden="true">
          <strong>결과 공개</strong>
          <span>구매·사용 내역</span>
        </div>
      </div>
      <p className="funding-diagram-footer">
        산정 전력량에 상응하는 REC 구매에 기부금 전액을 사용합니다.
      </p>
    </figure>
  );
}
