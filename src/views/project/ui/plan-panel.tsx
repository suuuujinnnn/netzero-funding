import { PlanDiagram } from "./plan-diagram";
import "./measurement.css";

const measurements = [
  ["조명(LED)", "25", "40", "720", "100%", "720"],
  ["에어컨(냉방)", "2", "2,650", "174", "100%", "922.2"],
  ["에어컨(난방)", "2", "3,050", "174", "100%", "1,061.4"],
  ["대형 TV", "1", "105", "720", "100%", "75.6"],
  ["소형 TV", "1", "59", "720", "100%", "42.5"],
  ["전자 강의대", "1", "57.5", "720", "100%", "41.4"],
  ["스피커", "4", "0", "720", "100%", "0"],
  ["좌석 콘센트", "30", "57", "720", "43%", "533.5"],
  ["출결 단말기", "1", "18", "8,760", "100%", "157.7"],
  ["빔프로젝터", "2", "366", "720", "100%", "527"],
  ["PC", "1", "150", "720", "100%", "108"],
  ["화자 추적 카메라", "1", "60", "720", "100%", "43.2"],
  ["강사 추적 카메라", "1", "24", "720", "100%", "17.3"],
  ["시간표 디스플레이", "1", "10", "720", "100%", "7.2"],
];

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
              4,257kWh로 산정했습니다.
            </p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <h2>재생에너지 인증서 구매</h2>
            <p>
              자체 재생에너지 발전소를 보유한 굿뉴스에너지와 협력하여 연간
              사용량을 올림한 5REC(5,000kWh)를 특별 공급가로 총 500,000원(부가세
              포함)에 구매합니다.
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
      <section className="measurement" aria-labelledby="measurement-title">
        <div className="measurement-heading">
          <div>
            <span className="measurement-kicker">801 / ELECTRICITY</span>
            <h2 id="measurement-title">전력 사용량 측정 정리</h2>
            <p>북악관 801호의 기기별 연간 예상 전력 사용량입니다.</p>
          </div>
          <div className="measurement-total">
            <span>연간 예상 전력 사용량</span>
            <strong>
              4,257 <small>kWh</small>
            </strong>
          </div>
        </div>
        <div
          className="measurement-table-wrap"
          tabIndex={0}
          role="region"
          aria-label="기기별 전력 사용량 표, 좌우로 스크롤"
        >
          <table>
            <caption>기기별 연간 전력 사용량 산정 내역</caption>
            <thead>
              <tr>
                <th scope="col">기기</th>
                <th scope="col">수량</th>
                <th scope="col">소비전력 (W/개)</th>
                <th scope="col">연간 사용시간 (h)</th>
                <th scope="col">이용률</th>
                <th scope="col">연간 전력량 (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map(([name, ...values]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  {values.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
              <tr className="measurement-total-row">
                <th scope="row" colSpan={5}>
                  합계
                </th>
                <td>
                  <strong>4,257</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="measurement-formula">
          기기별 전력량 = 대수 × 소비전력(W) ÷ 1,000 × 연 사용시간(h) × 이용률
        </p>
        <div className="measurement-basis">
          <h3>산정 기준</h3>
          <ul>
            <li>
              2025년 801호 시간표 기준 주당 24시간, 연 30주 수업으로 연간
              720시간을 적용했습니다.
            </li>
            <li>
              냉방과 난방은 기상청 서울 일별 자료를 바탕으로 각각 29일,
              174시간을 적용했습니다.
            </li>
            <li>
              출결 단말기는 하루 24시간, 연 8,760시간 가동을 적용했습니다.
            </li>
          </ul>
        </div>
        <div className="measurement-notes">
          <h3>측정 자료 확인 사항</h3>
          <p>
            한 수업에서 학생들이 30구 중 13개의 콘센트를 사용해 좌석 콘센트
            이용률을 약 43%로 산정했습니다.
          </p>
        </div>
      </section>
      <div className="plan-summary">
        <h2>프로젝트 한눈에 보기</h2>
        <dl>
          <div>
            <dt>모금기간</dt>
            <dd>2026.11.23 ~ 2026.12.06</dd>
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
