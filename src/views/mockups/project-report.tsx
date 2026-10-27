import Link from "next/link";

const chapters = [
  ["overview", "프로젝트 개요"],
  ["background", "추진 배경"],
  ["rec", "REC의 원리와 한계"],
  ["calculation", "전력량 산정과 목표"],
  ["plan", "기부금 사용계획과 일정"],
  ["partners", "추진 주체"],
];

export function ProjectReport({ from }: { from: "a-1" | "a-2" }) {
  const contents = chapters.map(([id, title], i) => (
    <a href={`#${id}`} key={id}>
      <span>0{i + 1}</span>
      {title}
    </a>
  ));
  return (
    <main id="mockup-main" className="report-layout mk-wrap">
      <aside className="report-sidebar">
        <p>PROJECT DOCUMENT</p>
        <nav className="report-desktop-toc" aria-label="보고서 목차">
          {contents}
        </nav>
        <details className="report-mobile-toc">
          <summary>문서 목차</summary>
          <nav aria-label="보고서 목차">{contents}</nav>
        </details>
        <Link className="report-return" href={`/mockups/${from}`}>
          ← 모금 사이트로 돌아가기
        </Link>
      </aside>
      <article className="report-document">
        <header className="report-cover">
          <p>PROJECT ZEROSUM / 사업 소개</p>
          <h1>
            국민대 넷제로 강의실
            <br />
            만들기 프로젝트
          </h1>
          <p>추진 배경 · 재생에너지 인증서 · 사업계획</p>
          <dl>
            <div>
              <dt>대상 공간</dt>
              <dd>국민대학교 북악관 801호</dd>
            </div>
            <div>
              <dt>사업기간</dt>
              <dd>2026.10.08 — 2027.02.28</dd>
            </div>
            <div>
              <dt>주관</dt>
              <dd>프로젝트 제로섬</dd>
            </div>
          </dl>
        </header>
        <section id="overview">
          <p className="report-section-no">01 / OVERVIEW</p>
          <h2>프로젝트 개요</h2>
          <p>
            국민대학교 넷제로 동아리에 소속된 8명의 대학생 팀 프로젝트
            제로섬(ZEROSUM)은 캠퍼스 공간에서 기후 위기 대응을 실천하고자
            ‘국민대 넷제로 강의실 만들기 프로젝트’를 기획했습니다.
          </p>
          <p>
            본 프로젝트는 북악관 801호가 사용한 전력량에 상응하는 재생에너지
            인증서(REC)를 구매하여 재생에너지로 생산되었다는 환경적 가치를
            확보하고자 합니다.
          </p>
          <blockquote>학생의 선택으로 시작하는 캠퍼스 에너지 전환</blockquote>
        </section>
        <section id="background">
          <p className="report-section-no">02 / BACKGROUND</p>
          <h2>추진 배경</h2>
          <h3>전력 소비자인 개인의 참여</h3>
          <p>
            재생에너지 전환은 주로 국가와 기업을 중심으로 추진되고 있으며 개인의
            참여 방식은 제한적입니다. 개인이 강의실의 전력 계약을 바꾸거나
            태양광 설비를 직접 설치하는 것은 현실적으로 어렵습니다.
          </p>
          <p>
            기존 환경 캠페인이 소등이나 냉난방 조절 등 절약과 감축에 집중했다면,
            이번 프로젝트는 우리가 사용하는 에너지의 가치를 선택하는 방식으로
            참여를 확장하고자 합니다.
          </p>
        </section>
        <section id="rec">
          <p className="report-section-no">03 / MECHANISM & LIMITS</p>
          <h2>REC의 원리와 한계</h2>
          <h3>전기 자체와 환경적 가치의 구분</h3>
          <p>
            재생에너지 발전 사업자는 전기를 생산할 때 발생하는 ‘전기 자체’와
            ‘재생에너지로 생산되었다는 환경적 가치’를 분리하여 판매할 수
            있습니다. 프로젝트는 이 가운데 환경적 가치를 재생에너지
            인증서(REC)의 형태로 구매합니다.
          </p>
          <div className="report-rec-flow">
            <span>재생에너지 발전</span>
            <span aria-hidden="true">→</span>
            <div>
              <span>전기 자체</span>
              <strong>환경적 가치 → REC 구매</strong>
            </div>
          </div>
          <h3>직접적인 전력 공급을 의미하지 않습니다</h3>
          <p>
            인증서를 구매한다고 해서 발전소에서 생산한 재생에너지 전력을
            강의실로 직접 끌어오는 것은 아닙니다. 강의실로 들어오는 물리적인
            전기 자체를 바꾸는 대신, 사용 전력량에 상응하는 재생에너지의 환경적
            가치를 조달하는 방식입니다.
          </p>
        </section>
        <section id="calculation">
          <p className="report-section-no">04 / CALCULATION & TARGET</p>
          <h2>전력량 산정과 목표</h2>
          <p>
            국민대학교 전력 사용량 및 건물 단위 면적을 기준으로 북악관 801호의
            연간 전력 사용량을 계산합니다. 산정된 전력량만큼 굿뉴스에너지와
            협력하여 REC를 구매할 계획입니다.
          </p>
          <table>
            <caption>프로젝트 목표와 구매 계획</caption>
            <tbody>
              <tr>
                <th scope="row">대상 강의실</th>
                <td>국민대학교 북악관 801호</td>
              </tr>
              <tr>
                <th scope="row">목표 전력량</th>
                <td>약 8,000 kWh</td>
              </tr>
              <tr>
                <th scope="row">목표금액</th>
                <td>약 800,000원</td>
              </tr>
              <tr>
                <th scope="row">인증서 구매 예정 비용</th>
                <td>100 kWh당 약 10,000원</td>
              </tr>
              <tr>
                <th scope="row">협력 발전소</th>
                <td>햇빛 바람안동 1호</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section id="plan">
          <p className="report-section-no">05 / FUNDING & SCHEDULE</p>
          <h2>기부금 사용계획과 일정</h2>
          <p>
            모금액은 강의실의 전기요금을 납부하는 데 사용하는 것이 아니라, 801호
            사용 전력량에 상응하는 재생에너지의 환경적 가치를 조달하는 데 전액
            사용합니다.
          </p>
          <table>
            <caption>사업 일정과 참여 대상</caption>
            <tbody>
              <tr>
                <th scope="row">모금기간</th>
                <td>2026.10.08 — 2026.12.25</td>
              </tr>
              <tr>
                <th scope="row">사업기간</th>
                <td>2026.10.08 — 2027.02.28</td>
              </tr>
              <tr>
                <th scope="row">참여 대상</th>
                <td>국민대학교 구성원</td>
              </tr>
            </tbody>
          </table>
          <h3>목표금액 미달 시</h3>
          <p>사업계획을 조정하여 모금액 규모에 맞게 사업을 진행합니다.</p>
        </section>
        <section id="partners">
          <p className="report-section-no">06 / ORGANIZATION</p>
          <h2>추진 주체</h2>
          <dl className="report-organizations">
            <div>
              <dt>프로젝트 제로섬</dt>
              <dd>
                국민대학교 넷제로 동아리의 대학생 팀으로, 강의실 전력량 산정과
                프로젝트 운영을 맡습니다.
              </dd>
            </div>
            <div>
              <dt>국민대학교 넷제로 동아리</dt>
              <dd>학생이 주도하는 캠퍼스 에너지 전환 활동을 지원합니다.</dd>
            </div>
            <div>
              <dt>국민대학교 기후변화대응사업단</dt>
              <dd>기후변화 대응을 위한 대학 내 활동을 지원합니다.</dd>
            </div>
            <div>
              <dt>굿뉴스에너지</dt>
              <dd>재생에너지 인증서 판매와 소각을 담당하는 협력 단체입니다.</dd>
            </div>
          </dl>
        </section>
        <footer className="report-document-end">
          <span>PROJECT ZEROSUM · 사업 소개 문서</span>
          <a href="#overview">문서 처음으로 ↑</a>
        </footer>
      </article>
    </main>
  );
}
