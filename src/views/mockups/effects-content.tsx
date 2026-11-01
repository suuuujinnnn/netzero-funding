import { EffectsPreview } from "./effects-preview";
import { allEffectsData } from "./effects-data";
import "./effects-content.css";

const criteria = [
  ["REC 구매단가", "100kWh당 10,000원", "기업 제시 기준"],
  [
    "전력 배출계수",
    "0.4173kgCO₂eq/kWh",
    "한국에너지공단 EG-TIPS · 소비단 · 2025.12 공표, 2023년 통계",
  ],
  [
    "소나무 흡수량",
    "20.07kgCO₂/그루/년",
    "국립공원공단 · 2025년 4월 발표 · 조사 대상 소나무 기준",
  ],
  [
    "수돗물 배출계수",
    "0.00066kgCO₂/L",
    "행사 탄소배출량 산정기준표 · 원계수 적용 범위와 연도 확인 필요",
  ],
  [
    "폐기물 배출계수",
    "0.34000kgCO₂/kg",
    "행사 탄소배출량 산정기준표 · 폐기물 성상과 처리 방식 확인 필요",
  ],
];

export function EffectsContent() {
  return (
    <div className="effects-content panel-body">
      <p className="effects-intro">
        여러분의 참여로 구매할 수 있는 재생에너지 인증서(REC)의 전력량을
        살펴보고, 이에 대응하는 일반 전력 사용의 온실가스 배출량을 익숙한 일상
        속 지표와 비교해 보세요.
      </p>
      <EffectsPreview />
      <div className="prose effects-body">
        <article
          className="effects-section"
          aria-labelledby="effects-example-title"
        >
          <h2 id="effects-example-title">
            10,000원의 참여, 이렇게 비교할 수 있어요
          </h2>
          <p>
            10,000원으로 구매할 수 있는 REC 전력량은 100kWh입니다. 이만큼의 일반
            전력 사용에 대응하는 배출량 비교치는 41.73kgCO₂eq입니다.
          </p>
          <ul className="effects-comparisons">
            <li>
              <span aria-hidden="true">🌲</span>
              <p>
                소나무 <strong>약 2.1그루</strong>의 연간 이산화탄소 흡수량과
                비슷한 규모
              </p>
            </li>
            <li>
              <span aria-hidden="true">💧</span>
              <p>
                수돗물 <strong>약 63,227L</strong> 사용에 따른 탄소배출량과
                비슷한 규모
              </p>
            </li>
            <li>
              <span aria-hidden="true">♻️</span>
              <p>
                폐기물 <strong>약 122.7kg</strong> 처리에 따른 탄소배출량과
                비슷한 규모
              </p>
            </li>
          </ul>
        </article>
        <article
          className="effects-section"
          aria-labelledby="effects-results-title"
        >
          <h2 id="effects-results-title">참여 금액별로 한눈에 보기</h2>
          <p>
            각 지표는 같은 배출량 비교치를 서로 다른 기준으로 표현한 값입니다.
            항목을 합산하지 않습니다.
          </p>
          <div
            className="effects-table-scroll"
            role="region"
            aria-label="모금액별 환산표, 좁은 화면에서 좌우로 스크롤"
            tabIndex={0}
          >
            <table>
              <caption>REC 구매 전력량과 환경 영향 규모의 참고 비교</caption>
              <thead>
                <tr>
                  <th scope="col">모금액</th>
                  <th scope="col">REC 전력량</th>
                  <th scope="col">CO₂eq 비교치</th>
                  <th scope="col">
                    소나무
                    <br />
                    (연간 흡수량)
                  </th>
                  <th scope="col">
                    수돗물
                    <br />
                    (사용량)
                  </th>
                  <th scope="col">
                    폐기물
                    <br />
                    (처리량)
                  </th>
                </tr>
              </thead>
              <tbody>
                {allEffectsData.map((data) => (
                  <tr key={data.amount}>
                    <th scope="row">{data.amount}원</th>
                    <td>{data.electricity}kWh</td>
                    <td>{data.carbon}kgCO₂eq</td>
                    <td>약 {data.trees}그루</td>
                    <td>약 {data.water}L</td>
                    <td>약 {data.waste}kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article
          className="effects-section"
          aria-labelledby="effects-method-title"
        >
          <h2 id="effects-method-title">이 수치는 어떻게 계산했나요?</h2>
          <dl className="effects-criteria">
            {criteria.map(([label, value, source]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  <strong>{value}</strong>
                  <span>{source}</span>
                </dd>
              </div>
            ))}
          </dl>
          <ol className="effects-formulas">
            <li>REC 해당 전력량(kWh) = 모금액(원) ÷ 100</li>
            <li>온실가스 배출량 비교치(kgCO₂eq) = 전력량(kWh) × 0.4173</li>
            <li>소나무 흡수량 비교(그루) = CO₂eq 비교치 ÷ 20.07</li>
            <li>수돗물 사용량 비교(L) = CO₂eq 비교치 ÷ 0.00066</li>
            <li>폐기물 처리량 비교(kg) = CO₂eq 비교치 ÷ 0.34000</li>
          </ol>
          <aside
            className="callout effects-interpretation"
            aria-labelledby="effects-interpretation-title"
          >
            <div className="callout-icon" aria-hidden="true">
              i
            </div>
            <div>
              <h3 id="effects-interpretation-title">비교값을 읽기 전에</h3>
              <p>
                소나무·수돗물·폐기물 계수의 원자료 단위는 kgCO₂이고, 전력의
                비교치는 kgCO₂eq입니다. 이 값들을 나눈 결과는 온난화 영향의
                규모를 설명하는 참고 비교이며, 같은 활동 경계에서 산정한 실제
                감축량을 뜻하지 않습니다.
              </p>
              <p>
                REC 구매로 나무를 직접 심거나 수돗물 사용·폐기물 처리가 실제로
                줄어든다는 의미는 아닙니다. 수돗물과 폐기물 계수는 원자료의 적용
                조건을 추가로 확인해야 합니다.
              </p>
            </div>
          </aside>
        </article>
        <article
          className="effects-section effects-sources"
          aria-labelledby="effects-sources-title"
        >
          <h2 id="effects-sources-title">수치의 근거</h2>
          <ul>
            <li>
              <a href="https://tips.energy.or.kr/carbon/Ggas_tatistics03.do">
                한국에너지공단 EG-TIPS · 전력배출계수(2025.12)
              </a>
            </li>
            <li>
              국립공원공단 · 「탄소흡수 뛰어난 국립공원 자생수목 10종
              공개」(2025.4.4.)
            </li>
            <li>행사 탄소배출량 산정기준표 · 제공 자료의 수돗물·폐기물 계수</li>
          </ul>
          <p>
            제공된 「모금액별 REC 구매 기대효과 환산 정리」의 기준과 환산값을
            옮겼습니다.
          </p>
        </article>
      </div>
    </div>
  );
}
