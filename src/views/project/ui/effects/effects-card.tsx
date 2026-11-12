import type { EffectsData } from "./effects-data";

export function EffectsCard({ data }: { data: EffectsData }) {
  const metrics = [
    {
      icon: "☁️",
      label: "온실가스 배출량 환산",
      value: `${data.carbon} kgCO₂eq`,
    },
    { icon: "🌲", label: "소나무 연간흡수량으로 치면", value: data.trees },
    {
      icon: "🚗",
      label: "자동차 주행거리로 치면",
      value: data.distance,
      detail: `국민대–길음역 ${data.trips}`,
    },
  ];
  return (
    <article className="effects-card" aria-label={`${data.amount}원 기대효과`}>
      <div className="effects-card-summary">
        <span className="effects-eyebrow">모금액</span>
        <h2>
          {data.amount}
          <small>원</small>
        </h2>
        <span className="effects-bolt" aria-hidden="true">
          ⚡
        </span>
        <span className="effects-eyebrow">재생에너지로 바꾼 전기</span>
        <p className="effects-electricity">
          {data.electricity}
          <small>kWh</small>
        </p>
      </div>
      <dl className="effects-metrics">
        {metrics.map(({ icon, label, value, detail }) => (
          <div key={label}>
            <span className="effects-icon" aria-hidden="true">
              {icon}
            </span>
            <div>
              <dt>{label}</dt>
              <dd>{value}</dd>
              {detail && <dd className="effects-round-trips">{detail}</dd>}
            </div>
          </div>
        ))}
      </dl>
    </article>
  );
}
