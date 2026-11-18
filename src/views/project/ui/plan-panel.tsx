import { PlanDiagram } from "./plan-diagram";

export function PlanPanel() {
  return (
    <>
      <div className="panel-heading">
        <span className="eyebrow">02 / FUNDING PLAN</span>
        <h1>모인 금액은 어디에 쓰이나요?</h1>
        <p>전력량 산정부터 인증서 구매와 공개까지</p>
      </div>
      <PlanDiagram />
      <ol className="plan-steps">
        <li>
          <span>01</span>
          <div>
            <h2>전력 사용량 산정</h2>
            <p>
              북악관 801호의 기기별 전력 사용량을 합산해 연간 전력 사용량을
              4,250.5kWh로 산정했습니다.
            </p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <h2>재생에너지 인증서 구매</h2>
            <p>
              실제 재생에너지 발전소(햇빛 바람안동 1호)를 보유한 굿뉴스에너지와
              협력하여 연간 사용량을 올림한 5REC(5,000kWh)를 구매할 예정입니다.
              단가는 100kWh당 10,000원이며 총 구매 금액은 500,000원입니다.
            </p>
          </div>
        </li>
        <li>
          <span>03</span>
          <div>
            <h2>기부금 사용</h2>
            <p>
              여러분이 참여해주신 펀딩 금액은 강의실 전기요금을 내는 것이
              아니라, 801호가 사용한 전력량에 상응하는 재생에너지의 환경가치를
              조달하는 데 전액 사용됩니다.
            </p>
          </div>
        </li>
      </ol>
      <div className="plan-summary">
        <h2>프로젝트 한눈에 보기</h2>
        <dl>
          <div>
            <dt>모금기간</dt>
            <dd>2026.10.08 ~ 2026.12.25</dd>
          </div>
          <div>
            <dt>사업기간</dt>
            <dd>2026.10.08 ~ 2027.02.28</dd>
          </div>
          <div>
            <dt>대상</dt>
            <dd>국민대학교 구성원</dd>
          </div>
          <div>
            <dt>목표 전력량</dt>
            <dd>5,000 kWh (5REC)</dd>
          </div>
          <div>
            <dt>목표금액</dt>
            <dd>
              <strong>500,000원</strong>
            </dd>
          </div>
        </dl>
      </div>
      <div className="plan-footnote">
        <span aria-hidden="true">✓</span>
        <p>
          <strong>목표금액 미달 시</strong> 사업계획을 조정해 모금액 규모에 맞게
          사업을 진행하겠습니다.
        </p>
      </div>
    </>
  );
}
