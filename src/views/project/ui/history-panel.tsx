import { ClassroomReplay } from "@/features/classroom-replay";
import { FundingPuzzle } from "./funding-puzzle";

export function HistoryPanel() {
  return (
    <>
      <div className="panel-heading">
        <span className="eyebrow">04 / HALL OF FAME</span>
        <h1>명예의 전당</h1>
        <p>작은 참여가 모여 첫 번째 교실의 선택이 됩니다.</p>
      </div>
      <div className="design-preview-note">
        <strong>디자인 검토용 목업 · 3가지 안</strong>
        <p>
          아래 금액·조각 수·이름·메시지는 예시입니다. 실제 모금 현황과 연결되지
          않습니다.
        </p>
      </div>
      <div className="history-options">
        <section
          className="history-option"
          aria-labelledby="puzzle-option-title"
        >
          <div className="history-option-heading">
            <span>[1안]</span>
            <h2 id="puzzle-option-title">퍼즐</h2>
          </div>
          <div className="history-layout">
            <div className="puzzle-card">
              <div className="puzzle-heading">
                <span>HALL OF ENERGY</span>
                <strong>
                  <span id="puzzle-filled">12</span> / 24 조각
                </strong>
              </div>
              <h2>
                한 조각씩 채워지는
                <br />첫 번째 교실
              </h2>
              <FundingPuzzle />
              <p>
                퍼즐 한 조각은 목표 모금액의 1/24을 나타냅니다. 참여 인원과는
                별개이며, 현재 조각 수는 목업용 모금 진행률에 맞춰 표시됩니다.
              </p>
            </div>
            <div className="history-detail">
              <div className="history-total">
                <span>목업용 참여 현황</span>
                <strong>
                  총 <em id="history-count">132건</em> 기부되었습니다.
                </strong>
                <small>아래 기록은 화면 구성을 위한 예시입니다.</small>
              </div>
              <div className="history-list" aria-label="목업용 참여 내역">
                <div>
                  <time dateTime="2026-10-30">2026.10.30</time>
                  <p>경제학과 송배강님</p>
                  <strong>100원 참여</strong>
                </div>
                <div>
                  <time dateTime="2026-10-29">2026.10.29</time>
                  <p>동아시아국제학부 중국학전공 박지은</p>
                  <strong>1,000원 참여</strong>
                </div>
                <div>
                  <time dateTime="2026-10-29">2026.10.29</time>
                  <p>동아시아국제학부 중국학전공 김주은</p>
                  <strong>500원 참여</strong>
                </div>
                <div>
                  <time dateTime="2026-10-29">2026.10.29</time>
                  <p>동아시아국제학부 중국학전공 문익준</p>
                  <strong>50,000원 참여</strong>
                </div>
              </div>
            </div>
          </div>
          <p className="history-privacy">
            실제 운영 시에는 공개에 동의한 참여자만 표시하며, 입금 및 제출 내역
            확인 후 반영합니다.
          </p>
        </section>
        <section
          className="history-option"
          aria-labelledby="classroom-option-title"
        >
          <div className="history-option-heading">
            <span>[2안]</span>
            <h2 id="classroom-option-title">교실 깨끗이하기</h2>
          </div>
          <ClassroomReplay />
        </section>
        <section
          className="history-option"
          aria-labelledby="honor-option-title"
        >
          <div className="history-option-heading">
            <span>[3안]</span>
            <h2 id="honor-option-title">
              명예의 전당 · 우리의 이름으로 만드는 변화
            </h2>
          </div>
          <div className="honor-hall">
            <div className="honor-intro">
              <div>
                <span className="honor-eyebrow">THE FOUNDING CLASS · 2026</span>
                <h2>
                  첫 번째 교실을 바꾼
                  <br />
                  당신의 이름을 기억합니다.
                </h2>
                <p>
                  크고 작은 마음이 모여 새로운 선택을 만들었습니다.
                  <br />
                  이곳은 그 시작을 함께한 사람들을 위한 공간입니다.
                </p>
                <div className="honor-seal">
                  <span aria-hidden="true">✦</span> 국민대 넷제로 · 첫 번째 교실
                </div>
              </div>
            </div>
            <div className="honor-caption">
              <span>함께 만든 첫 번째 변화</span>
              <p>금액의 크기보다, 함께한 마음을 기억합니다.</p>
            </div>
            <div className="honor-grid">
              <article className="honor-card">
                <h3>김하늘</h3>

                <p className="honor-message">“작은 선택이 큰 변화를 만들길.”</p>
              </article>
              <article className="honor-card">
                <h3>이로운</h3>

                <p className="honor-message">
                  “우리 교실의 새로운 시작을 응원해요.”
                </p>
              </article>
              <article className="honor-card">
                <h3>박다온</h3>

                <p className="honor-message">“함께라서 가능한 에너지 전환.”</p>
              </article>
              <article className="honor-card">
                <h3>최윤슬</h3>

                <p className="honor-message">
                  “다음 교실로도 이어지면 좋겠어요.”
                </p>
              </article>
              <article className="honor-card">
                <h3>정한결</h3>

                <p className="honor-message">
                  “더 나은 캠퍼스에 마음을 보탭니다.”
                </p>
              </article>
              <article className="honor-card">
                <h3>송나래</h3>

                <p className="honor-message">
                  “오늘의 참여가 내일의 기준이 되길.”
                </p>
              </article>
              <article className="honor-card">
                <h3>익명의 참여자</h3>

                <p className="honor-message">
                  “조용히, 그리고 오래 응원합니다.”
                </p>
              </article>
              <article className="honor-card">
                <h3>한빛 동아리</h3>

                <p className="honor-message">“우리의 작은 실천을 모았어요.”</p>
              </article>
            </div>
            <div className="honor-thanks">
              <span aria-hidden="true">✧</span>
              <h3>이 시작에 함께해 주셔서 감사합니다.</h3>
              <p>우리의 이름이 모여, 다음 교실의 가능성이 됩니다.</p>
            </div>
          </div>
          <p className="history-privacy">
            디자인 검토용 가상 이름·메시지입니다. 금액 순위 없이 같은 크기로
            기념하며, 실제 적용 시 공개 동의와 확인을 거친 기록만 표시합니다.
            검색·필터·기부 버튼은 넣지 않았습니다.
          </p>
        </section>
      </div>
    </>
  );
}
