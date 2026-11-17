import { EffectsPreview } from "./effects-preview";
import { allEffectsData, effectsCriteria, effectsData } from "./effects-data";
import "./effects-content.css";

const criteria = [
  ["REC 구매단가", "100kWh당 10,000원", "REC 구매 기업 제시 단가"],
  [
    "전력 배출계수",
    `${effectsCriteria.gridEmissions}kgCO₂eq/kWh`,
    "한국에너지공단 EG-TIPS · 전력 배출계수(2025.12), 2023년 소비단 기준",
    "https://tips.energy.or.kr/carbon/Ggas_tatistics03.do",
  ],
  [
    "소나무 흡수량",
    `${effectsCriteria.pineAbsorption}kgCO₂/그루/년`,
    "국립공원공단 · 「탄소흡수 뛰어난 국립공원 자생수목 10종 공개」(2025.4.4.)",
  ],
  [
    "자동차 배출계수",
    `${effectsCriteria.carEmissions * 1000}gCO₂/km`,
    "산림탄소등록부 「탄소계산기」 · 교통수단 이용 배출량 산정, 중형차(가솔린)",
  ],
  [
    "이동거리",
    `편도 ${effectsCriteria.oneWayKm}km · 왕복 ${effectsCriteria.oneWayKm * 2}km`,
    "국민대학교 ↔ 길음역(4호선) · 프로젝트 설정 기준",
  ],
];

export function EffectsContent() {
  const example = effectsData[1];
  return (
    <div className="effects-content panel-body">
      <p className="effects-intro">
        모금액으로 구매할 수 있는 재생에너지 인증서(REC)의 전력량을 살펴보고,
        같은 양의 일반 전력 사용에 대응하는 온실가스 배출량을 소나무의 흡수량과
        자동차 주행거리로 비교해 보세요.
      </p>
      <EffectsPreview />
      <div className="prose effects-body">
        <article
          className="effects-section"
          aria-labelledby="effects-example-title"
        >
          <h2 id="effects-example-title">
            10,000원으로 이렇게 비교할 수 있어요
          </h2>
          <p>
            10,000원으로 구매할 수 있는 REC 전력량은 {example.electricity}
            kWh입니다. 같은 양의 일반 전력 사용에 대응하는 배출량은{" "}
            {example.carbon}kgCO₂eq입니다.
          </p>
          <ul className="effects-comparisons">
            <li>
              <span aria-hidden="true">🌲</span>
              <p>
                소나무 <strong>{example.trees}</strong>의 연간 흡수량과 비슷한
                규모
              </p>
            </li>
            <li>
              <span aria-hidden="true">🚗</span>
              <p>
                자동차 주행거리 <strong>{example.distance}</strong>, 국민대와
                길음역 사이 {example.trips}에 해당하는 규모
              </p>
            </li>
          </ul>
        </article>
        <article
          className="effects-section"
          aria-labelledby="effects-results-title"
        >
          <h2 id="effects-results-title">모금액별 환산 결과</h2>
          <p>
            각 지표는 같은 배출량 비교치를 서로 다른 기준으로 표현한 값입니다.
          </p>
          <div
            className="effects-table-scroll"
            role="region"
            aria-label="모금액별 환산표, 좁은 화면에서 좌우로 스크롤"
            tabIndex={0}
          >
            <table>
              <caption>REC 구매 전력량과 온실가스 배출량의 참고 비교</caption>
              <thead>
                <tr>
                  <th scope="col">모금액</th>
                  <th scope="col">재생에너지로 바꾼 전기</th>
                  <th scope="col">온실가스 배출량 환산</th>
                  <th scope="col">소나무 연간 흡수량 비교</th>
                  <th scope="col">자동차 주행거리</th>
                  <th scope="col">국민대–길음역 이동 횟수</th>
                </tr>
              </thead>
              <tbody>
                {allEffectsData.map((data) => (
                  <tr key={data.amount}>
                    <th scope="row">{data.amount}원</th>
                    <td>{data.electricity}kWh</td>
                    <td>{data.carbon}kgCO₂eq</td>
                    <td>{data.trees}</td>
                    <td>{data.distance}</td>
                    <td>{data.trips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className="effects-section effects-meaning">
          <h2>프로젝트의 의의 및 확장 가능성</h2>
          <p>학생들의 작은 실천이 만들어내는 변화</p>
          <div className="effects-meaning-grid">
            <section>
              <span>01 | 사회</span>
              <h3>누구나 참여할 수 있는 재생에너지 전환</h3>
              <p>
                재생에너지 전환이 정부와 기업뿐만 아니라 개인도 함께 만들어갈 수
                있는 변화임을 보여줍니다. 이를 통해 재생에너지에 대한 사회적
                관심과 참여를 확대하고자 합니다.
              </p>
            </section>
            <section>
              <span>02 | 국민대학교</span>
              <h3>학생 주도형 재생에너지 전환 모델 제시</h3>
              <p>
                기존의 에너지 절약 캠페인을 넘어, 학생들이 직접 재생에너지
                전환에 참여하는 새로운 모델을 제시합니다. 이를 통해 대학 내
                재생에너지 전환의 가능성을 확인하고자 합니다.
              </p>
            </section>
            <section>
              <span>03 | 학생</span>
              <h3>이론을 넘어 실천하는 기후행동</h3>
              <p>
                학생들이 재생에너지 전환 과정에 직접 참여하며 REC의 역할과
                의미를 이해하고, 기후변화 대응을 일상에서 실천하는 경험을
                제공합니다.
              </p>
            </section>
          </div>
          <h3>확장 가능성</h3>
          <p>
            <strong>하나의 강의실에서 시작해, 캠퍼스 전체로.</strong>
          </p>
          <p>
            북악관 801호에서 시작된 이번 프로젝트가 다른 강의실과 교내 공간으로
            확대되고, 나아가 다른 대학에서도 활용할 수 있는 학생 주도형
            재생에너지 전환 모델로 발전하기를 기대합니다.
          </p>
        </article>
        <article
          className="effects-section effects-sources"
          aria-labelledby="effects-sources-title"
        >
          <h2 id="effects-sources-title">산정 기준 및 출처</h2>
          <p>
            자동차 주행거리는 배출량을 1km당 배출계수로 나눠 구합니다. 편도와
            왕복 횟수는 반올림 전 주행거리를 각각 3.8km와 7.6km로 나눕니다.
            소나무와 자동차 수치는 온난화 영향의 규모를 설명하는 참고 비교이며,
            실제 배출 감축량을 뜻하지 않습니다.
          </p>
          <dl className="effects-criteria">
            {criteria.map(([label, value, source, href]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  <strong>{value}</strong>
                  <span>{href ? <a href={href}>{source}</a> : source}</span>
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </div>
  );
}
