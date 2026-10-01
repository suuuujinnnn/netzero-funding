import { FundingPuzzle } from "./funding-puzzle";
import { filledPieces } from "./funding-data";
import { FundingStatus } from "./funding-status";
import type { FundingState } from "./funding-data";
export function HistoryPanel({ state }: { state: FundingState }) {
  const data = state.data;
  return (
    <>
      <div className="panel-heading">
        <span className="eyebrow">04 / HALL OF ENERGY</span>
        <h1>명예의 전당</h1>
        <p>작은 참여가 모여 첫 번째 교실의 선택이 됩니다.</p>
      </div>
      <div className="history-layout">
        <div className="puzzle-card">
          <div className="puzzle-heading">
            <span>HALL OF ENERGY</span>
            <strong>{data ? filledPieces(data.amount) : "—"} / 24 조각</strong>
          </div>
          <h2>
            한 조각씩 채워지는
            <br />첫 번째 교실
          </h2>
          <FundingPuzzle amount={data?.amount ?? null} />
          <p>
            퍼즐 한 조각은 목표 모금액의 1/24을 나타냅니다. 입금 확인 완료된
            금액에 따라 채워지며 참여 인원과는 별개입니다.
          </p>
        </div>
        <div className="history-detail">
          <div className="history-total">
            <span>확인 완료된 참여</span>
            <strong>
              {data
                ? new Intl.NumberFormat("ko-KR").format(data.count) + "건"
                : "집계 확인 중"}
            </strong>
          </div>
          <h2 className="supporter-heading">함께한 이름</h2>
          {data?.names.length ? (
            <ul className="supporter-names" aria-label="공개에 동의한 참여자">
              {data.names.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          ) : (
            <p className="supporter-empty">
              {data
                ? "아직 공개된 참여자 이름이 없습니다."
                : "참여자 목록을 확인하고 있습니다."}
            </p>
          )}
          <FundingStatus state={state} />
        </div>
      </div>
      <p className="history-privacy">
        공개에 동의하고 입금 확인이 완료된 참여자의 이름만 표시합니다. 시트 변경
        후 홈페이지 반영까지 시간이 걸릴 수 있습니다. 홈페이지는 5분 간격으로
        집계를 다시 조회합니다.
      </p>
    </>
  );
}
