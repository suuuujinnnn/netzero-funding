import { Check } from "lucide-react";

export function FundingGoalNotice() {
  return (
    <div className="funding-goal-notice" role="status">
      <span className="funding-goal-check" aria-hidden="true">
        <Check size={17} strokeWidth={3} />
      </span>
      <div>
        <strong>목표 모금액 달성</strong>
        <span>참여해 주셔서 감사합니다.</span>
      </div>
    </div>
  );
}
