import type { FundingState } from "./funding-data";
export function FundingStatus({ state }: { state: FundingState }) {
  return (
    <div className="funding-status" role="status">
      <p>
        {state.status === "unconfigured"
          ? "시트 연결 준비 중 · 초기 집계 0원"
          : state.status === "loading"
            ? "집계를 불러오고 있습니다."
            : state.status === "error"
              ? state.data
                ? "집계 갱신에 실패했습니다. 마지막 정상값을 표시하며 5분 간격으로 다시 확인합니다."
                : "집계를 불러오지 못했습니다. 5분 간격으로 다시 확인합니다."
              : "입금 확인 완료된 내역만 반영됩니다."}
      </p>
      {state.checkedAt && (
        <p>
          마지막 조회:{" "}
          <time dateTime={state.checkedAt}>
            {new Intl.DateTimeFormat("ko-KR", {
              timeZone: "Asia/Seoul",
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(state.checkedAt))}{" "}
            (한국 시간)
          </time>
        </p>
      )}
    </div>
  );
}
