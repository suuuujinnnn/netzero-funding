import { FundingPuzzle } from "@/views/project/ui/funding-puzzle";

export function MockupHall({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";
  return (
    <section
      className="study-hall mk-wrap"
      aria-labelledby="study-hall-heading"
    >
      <div className="study-hall-heading">
        <p className="dev-kicker">HALL OF ENERGY / 함께 만드는 교실</p>
        <Heading id="study-hall-heading">한 조각씩, 우리의 이름으로.</Heading>
        <p>작은 참여가 모여 첫 번째 교실의 선택이 됩니다.</p>
      </div>
      <div className="study-hall-surface">
        <div className="study-hall-puzzle">
          <div className="study-hall-meta">
            <span>첫 번째 교실 · 북악관 801호</span>
            <span>24 PIECES</span>
          </div>
          <FundingPuzzle
            amount={null}
            ariaLabel="실제 집계가 미연결된 24조각 교정 퍼즐 목업"
          />
          <p>
            퍼즐 한 조각은 목표 모금액의 1/24을 나타냅니다.
            <br />
            확인 완료된 모금액에 따라 채워지며 참여 인원과는 별개입니다.
          </p>
        </div>
        <div className="study-hall-names">
          <dl>
            <div>
              <dt>확인 완료 모금액</dt>
              <dd>미연결</dd>
            </div>
            <div>
              <dt>확인 완료 참여 건수</dt>
              <dd>미연결</dd>
            </div>
          </dl>
          <h3>함께한 이름</h3>
          <div className="study-hall-empty">
            <span aria-hidden="true">✳</span>
            <strong>집계 연결 후 표시</strong>
            <p>
              공개에 동의하고 입금 확인이 완료된
              <br />
              참여자의 이름이 이곳에 표시됩니다.
            </p>
          </div>
          <p className="study-hall-status">
            논의용 목업으로 실제 집계는 연결하지 않았습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
