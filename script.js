const supporters = [
  { name: "김하늘", accent: "#c9ff63", task: "바닥 쓸기", icon: "🧹" },
  { name: "이로운", accent: "#67a8ff", task: "칠판 닦기", icon: "🧽" },
  { name: "박다온", accent: "#ff8d75", task: "의자 맞추기", icon: "🪑" },
  { name: "최윤슬", accent: "#ffd34f", task: "창문 열기", icon: "🪟" },
  { name: "정한결", accent: "#9d8cff", task: "조명 켜기", icon: "💡" },
  { name: "송나래", accent: "#69dec2", task: "책상 정돈", icon: "📚" },
];

const supporterGoal = 12;
const message = ["우", "리", "도", "에", "너", "지", "를", "함", "께", "선", "택", "해"];
const svgNS = "http://www.w3.org/2000/svg";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function svgElement(tag, attributes = {}) {
  const node = document.createElementNS(svgNS, tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

const horizontalTabs = [
  [32, -32, 32, -32],
  [-32, 32, -32, 32],
];
const verticalTabs = [
  [32, -32, 32],
  [-32, 32, -32],
  [32, -32, 32],
];

function horizontalEdge(x, y, bulge, reverse = false) {
  if (reverse) {
    return ` L ${x + 135} ${y} C ${x + 122} ${y} ${x + 128} ${y + bulge} ${x + 100} ${y + bulge} C ${x + 72} ${y + bulge} ${x + 78} ${y} ${x + 65} ${y} L ${x} ${y}`;
  }
  return ` L ${x + 65} ${y} C ${x + 78} ${y} ${x + 72} ${y + bulge} ${x + 100} ${y + bulge} C ${x + 128} ${y + bulge} ${x + 122} ${y} ${x + 135} ${y} L ${x + 200} ${y}`;
}

function verticalEdge(x, y, bulge, reverse = false) {
  if (reverse) {
    return ` L ${x} ${y + 135} C ${x} ${y + 122} ${x + bulge} ${y + 128} ${x + bulge} ${y + 100} C ${x + bulge} ${y + 72} ${x} ${y + 78} ${x} ${y + 65} L ${x} ${y}`;
  }
  return ` L ${x} ${y + 65} C ${x} ${y + 78} ${x + bulge} ${y + 72} ${x + bulge} ${y + 100} C ${x + bulge} ${y + 128} ${x} ${y + 122} ${x} ${y + 135} L ${x} ${y + 200}`;
}

function piecePath(row, column) {
  const x = column * 200;
  const y = row * 200;
  let path = `M ${x} ${y}`;
  path += row === 0 ? ` L ${x + 200} ${y}` : horizontalEdge(x, y, horizontalTabs[row - 1][column]);
  path += column === 3 ? ` L ${x + 200} ${y + 200}` : verticalEdge(x + 200, y, verticalTabs[row][column]);
  path += row === 2 ? ` L ${x} ${y + 200}` : horizontalEdge(x, y + 200, horizontalTabs[row][column], true);
  path += column === 0 ? ` L ${x} ${y}` : verticalEdge(x, y, verticalTabs[row][column - 1], true);
  return `${path} Z`;
}

function renderPuzzle() {
  const puzzle = document.querySelector("#supporter-puzzle");
  if (!puzzle) return;

  for (let index = 0; index < supporterGoal; index += 1) {
    const row = Math.floor(index / 4);
    const column = index % 4;
    const supporter = supporters[index];
    const group = svgElement("g", {
      class: `jigsaw-piece ${supporter ? "is-filled" : "is-empty"}`,
      tabindex: "0",
      role: "group",
      "aria-label": supporter ? `${supporter.name}님이 채운 퍼즐 조각` : `비어 있는 ${index + 1}번째 퍼즐 조각`,
    });
    group.style.setProperty("--piece-index", index);

    const shape = svgElement("path", {
      d: piecePath(row, column),
      fill: supporter ? "url(#campus-art)" : "#18253a",
      stroke: supporter ? "#172337" : "#708097",
      "stroke-width": supporter ? "8" : "6",
      "stroke-linejoin": "round",
    });
    group.append(shape);

    const centerX = column * 200 + 100;
    const centerY = row * 200 + 100;
    if (supporter) {
      const label = svgElement("g", { class: "piece-label" });
      label.append(
        svgElement("rect", { x: centerX - 58, y: centerY + 42, width: 116, height: 42, rx: 21, fill: supporter.accent }),
      );
      const name = svgElement("text", { x: centerX, y: centerY + 70, class: "piece-name", "text-anchor": "middle" });
      name.textContent = supporter.name;
      label.append(name);
      group.append(label);
    } else {
      const plus = svgElement("text", { x: centerX, y: centerY + 5, class: "piece-plus", "text-anchor": "middle" });
      plus.textContent = "+";
      const next = svgElement("text", { x: centerX, y: centerY + 43, class: "piece-next", "text-anchor": "middle" });
      next.textContent = "NEXT";
      group.append(plus, next);
    }
    puzzle.append(group);
  }
}

function renderMessage() {
  const container = document.querySelector("#supporter-message");
  if (!container) return;
  message.forEach((letter, index) => {
    const supporter = supporters[index];
    const tile = document.createElement("div");
    tile.className = `message-tile ${supporter ? "is-filled" : "is-empty"}`;
    tile.style.setProperty("--tile-index", index);
    if (supporter) tile.style.setProperty("--supporter-accent", supporter.accent);
    tile.innerHTML = supporter
      ? `<strong>${letter}</strong><span>${supporter.name}</span>`
      : `<strong>${letter}</strong><span>다음 참여로<br />채워져요</span>`;
    container.append(tile);
  });
}

function renderMissionDock() {
  const dock = document.querySelector("#mission-dock");
  if (!dock) return;
  supporters.forEach((supporter, index) => {
    const role = document.createElement("div");
    role.className = "dock-role";
    role.dataset.actionIndex = index;
    role.style.setProperty("--accent", supporter.accent);
    role.innerHTML = `<span class="dock-icon" aria-hidden="true">${supporter.icon}</span><span><strong>${supporter.name}</strong><small>${supporter.task}</small></span>`;
    dock.append(role);
  });
}

const resetScene = document.querySelector("#classroom-sim");
const replayButton = document.querySelector("#replay-missions");
const actionToast = document.querySelector("#action-toast");
let replayTimers = [];
let latestActionPlayed = false;

function clearReplayTimers() {
  replayTimers.forEach(window.clearTimeout);
  replayTimers = [];
}

function setActiveAction(index) {
  if (!resetScene) return;
  resetScene.removeAttribute("data-action");
  void resetScene.offsetWidth;
  resetScene.dataset.action = String(index);
  document.querySelectorAll(".dock-role").forEach((role, roleIndex) => {
    role.classList.toggle("is-active", roleIndex === index);
  });
  const supporter = supporters[index];
  if (actionToast && supporter) actionToast.textContent = `${supporter.icon} ${supporter.name}님의 ${supporter.task}`;
}

function playLatestAction() {
  if (latestActionPlayed) return;
  latestActionPlayed = true;
  setActiveAction(supporters.length - 1);
}

function replayAllActions() {
  if (!resetScene || !replayButton) return;
  clearReplayTimers();
  replayButton.disabled = true;
  resetScene.removeAttribute("data-action");
  resetScene.className = "classroom-sim is-replaying";

  if (reduceMotion.matches) {
    supporters.forEach((_, index) => resetScene.classList.add(`done-${index}`));
    document.querySelectorAll(".dock-role").forEach((role) => role.classList.add("is-active"));
    if (actionToast) actionToast.textContent = "교실 리셋 완료!";
    replayButton.disabled = false;
    return;
  }

  supporters.forEach((_, index) => {
    replayTimers.push(window.setTimeout(() => setActiveAction(index), index * 1050 + 180));
    replayTimers.push(window.setTimeout(() => resetScene.classList.add(`done-${index}`), index * 1050 + 900));
  });

  replayTimers.push(window.setTimeout(() => {
    resetScene.removeAttribute("data-action");
    resetScene.classList.remove("is-replaying");
    document.querySelectorAll(".dock-role").forEach((role) => role.classList.add("is-complete"));
    if (actionToast) actionToast.textContent = "✨ 교실 리셋 완료!";
    replayButton.disabled = false;
  }, supporters.length * 1050 + 250));
}

function setupTabs() {
  const tabList = document.querySelector(".hall-switcher");
  if (!tabList) return;
  const tabs = [...tabList.querySelectorAll('[role="tab"]')];

  function selectTab(tab, moveFocus = false) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = document.querySelector(`#${item.getAttribute("aria-controls")}`);
      if (panel) panel.hidden = !selected;
    });
    if (moveFocus) tab.focus();
    if (tab.id === "reset-tab") playLatestAction();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(tabs[nextIndex], true);
    });
  });
}

renderPuzzle();
renderMessage();
renderMissionDock();
setupTabs();
replayButton?.addEventListener("click", replayAllActions);
