const number = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 3 });
const decimal = new Intl.NumberFormat("ko-KR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
export const effectsCriteria = {
  electricityCost: 100,
  gridEmissions: 0.4173,
  pineAbsorption: 20.07,
  carEmissions: 0.192,
  oneWayKm: 3.8,
};
function effectFor(amount: number) {
  const electricity = amount / effectsCriteria.electricityCost;
  const carbon = electricity * effectsCriteria.gridEmissions;
  const trees = carbon / effectsCriteria.pineAbsorption;
  const distance = carbon / effectsCriteria.carEmissions;
  return {
    amount: number.format(amount),
    electricity: number.format(electricity),
    carbon: number.format(carbon),
    trees:
      trees < 1
        ? `소나무 1그루 약 ${Math.round(trees * 365)}일치`
        : `약 ${decimal.format(trees)}그루`,
    distance: `약 ${number.format(distance < 10 ? Math.round(distance * 10) / 10 : Math.round(distance))}km`,
    trips: `편도 약 ${decimal.format(distance / effectsCriteria.oneWayKm)}회 (왕복 약 ${decimal.format(distance / (effectsCriteria.oneWayKm * 2))}회)`,
  };
}
export type EffectsData = ReturnType<typeof effectFor>;
export const effectsData = [1000, 10000, 100000].map(effectFor);
export const allEffectsData = [1000, 10000, 50000, 100000, 500000].map(
  effectFor,
);
