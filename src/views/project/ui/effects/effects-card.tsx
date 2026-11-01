import type { EffectsData } from "./effects-data";

export function EffectsCard({ data }: { data: EffectsData }) {
  const metrics = [
    { icon: "☁️", label: "CO₂ 환산 비교치", value: `${data.carbon} kgCO₂eq` },
    {
      icon: "🌲",
      label: "소나무 연간 흡수량 비교",
      value: `약 ${data.trees}그루`,
    },
    { icon: "💧", label: "수돗물 사용량 비교", value: `약 ${data.water}L` },
  ];
  return (
    <article className="effects-card" aria-label={`${data.amount}원 기대효과`}>
      <div className="effects-card-summary">
        <span className="effects-eyebrow">참여 금액</span>
        <h2>
          {data.amount}
          <small>원</small>
        </h2>
        <span className="effects-bolt" aria-hidden="true">
          ⚡
        </span>
        <span className="effects-eyebrow">REC 전력량</span>
        <p className="effects-electricity">
          {data.electricity}
          <small>kWh</small>
        </p>
      </div>
      <dl className="effects-metrics">
        {metrics.map(({ icon, label, value }) => (
          <div key={label}>
            <span className="effects-icon" aria-hidden="true">
              {icon}
            </span>
            <div>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </article>
  );
}
