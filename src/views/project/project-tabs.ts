export const projectTabs = [
  ["home", "홈"],
  ["overview", "모금 소개"],
  ["effects", "기대효과"],
  ["plan", "사용계획"],
  ["partners", "관련단체"],
  ["history", "명예의 전당"],
  ["donate", "기부하기"],
] as const;

export type ProjectTab = (typeof projectTabs)[number][0];

export function parseProjectTab(value: unknown): ProjectTab | undefined {
  return projectTabs.find(([id]) => id === value)?.[0];
}

export function projectTabHref(tab: ProjectTab) {
  return tab === "home" ? "/" : `/?tab=${tab}`;
}
