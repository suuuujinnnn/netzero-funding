export type EffectsData = {
  amount: string;
  electricity: string;
  carbon: string;
  trees: string;
  water: string;
  waste: string;
};

// docs/REC_모금액별_기대효과_환산_정리.docx의 참고 비교값.
export const effectsData: EffectsData[] = [
  {
    amount: "1,000",
    electricity: "10",
    carbon: "4.173",
    trees: "0.2",
    water: "6,323",
    waste: "12.3",
  },
  {
    amount: "10,000",
    electricity: "100",
    carbon: "41.73",
    trees: "2.1",
    water: "63,227",
    waste: "122.7",
  },
  {
    amount: "50,000",
    electricity: "500",
    carbon: "208.65",
    trees: "10.4",
    water: "316,136",
    waste: "613.7",
  },
];

export const allEffectsData: EffectsData[] = [
  ...effectsData,
  {
    amount: "100,000",
    electricity: "1,000",
    carbon: "417.3",
    trees: "20.8",
    water: "632,273",
    waste: "1,227.4",
  },
  {
    amount: "500,000",
    electricity: "5,000",
    carbon: "2,086.5",
    trees: "104.0",
    water: "3,161,364",
    waste: "6,136.8",
  },
  {
    amount: "800,000",
    electricity: "8,000",
    carbon: "3,338.4",
    trees: "166.3",
    water: "5,058,182",
    waste: "9,818.8",
  },
];
