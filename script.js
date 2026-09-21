const supporters = [
  { name: "김하늘", accent: "#c9ff63", task: "종이컵 치우기" },
  { name: "이로운", accent: "#67a8ff", task: "의자 제자리" },
  { name: "박다온", accent: "#ff8d75", task: "칠판 닦기" },
  { name: "최윤슬", accent: "#ffd34f", task: "창문 열기" },
  { name: "정한결", accent: "#9d8cff", task: "사용하지 않는 조명 끄기" },
  { name: "송나래", accent: "#69dec2", task: "책상 정돈" },
];

const supporterGoal = 12;
const futureTasks = ["바닥 정리", "분리배출", "창가 정돈", "책상 닦기", "케이블 정리", "마지막 점검"];
const message = ["우", "리", "도", "에", "너", "지", "를", "함", "께", "선", "택", "해"];

const puzzle = document.querySelector("#supporter-puzzle");
const missions = document.querySelector("#supporter-missions");
const messageBoard = document.querySelector("#supporter-message");

for (let index = 0; index < supporterGoal; index += 1) {
  const supporter = supporters[index];

  const piece = document.createElement("div");
  piece.className = supporter ? "puzzle-piece is-filled" : "puzzle-piece is-empty";
  piece.style.setProperty("--piece-index", index);
  if (supporter) {
    piece.style.setProperty("--supporter-accent", supporter.accent);
    piece.innerHTML = `<span>${supporter.name}<small>예시</small></span><i aria-hidden="true">✓</i>`;
  } else {
    piece.innerHTML = `<span>NEXT</span><i aria-hidden="true">+</i>`;
  }
  puzzle.append(piece);

  const mission = document.createElement("article");
  mission.className = supporter ? "mission is-complete" : "mission is-locked";
  mission.style.setProperty("--mission-index", index);
  if (supporter) {
    mission.style.setProperty("--supporter-accent", supporter.accent);
    mission.innerHTML = `
      <span class="mission-status" aria-hidden="true">✓</span>
      <div><small>MISSION ${String(index + 1).padStart(2, "0")}</small><strong>${supporter.task}</strong></div>
      <span class="mission-player">${supporter.name}<small>예시</small></span>
    `;
  } else {
    mission.innerHTML = `
      <span class="mission-status" aria-hidden="true">?</span>
      <div><small>MISSION ${String(index + 1).padStart(2, "0")}</small><strong>${futureTasks[index - supporters.length]}</strong></div>
      <span class="mission-player">도움 필요</span>
    `;
  }
  missions.append(mission);

  const tile = document.createElement("div");
  tile.className = supporter ? "message-tile is-filled" : "message-tile is-empty";
  tile.style.setProperty("--tile-index", index);
  if (supporter) {
    tile.style.setProperty("--supporter-accent", supporter.accent);
    tile.innerHTML = `<strong>${message[index]}</strong><span>${supporter.name}<small>예시</small></span>`;
  } else {
    tile.innerHTML = `<strong>${message[index]}</strong><span>다음 참여로 채워져요</span>`;
  }
  messageBoard.append(tile);
}

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = tabs.map((tab) => document.querySelector(`#${tab.getAttribute("aria-controls")}`));

function selectHallView(selectedTab) {
  tabs.forEach((tab, index) => {
    const isSelected = tab === selectedTab;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    panels[index].hidden = !isSelected;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectHallView(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    selectHallView(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});
