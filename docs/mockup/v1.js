const supporters = [
  { name: "김하늘", accent: "#c9ff63", task: "바닥 쓸기", icon: "🧹" },
  { name: "이로운", accent: "#67a8ff", task: "칠판 닦기", icon: "🧽" },
  { name: "박다온", accent: "#ff8d75", task: "의자 맞추기", icon: "🪑" },
  { name: "최윤슬", accent: "#ffd34f", task: "창문 열기", icon: "🪟" },
  { name: "정한결", accent: "#9d8cff", task: "조명 켜기", icon: "💡" },
  { name: "송나래", accent: "#69dec2", task: "책상 정돈", icon: "📚" },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

renderMissionDock();
if (resetScene && "IntersectionObserver" in window) {
  const sceneObserver = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    playLatestAction();
    sceneObserver.disconnect();
  }, { threshold: 0.35 });
  sceneObserver.observe(resetScene);
} else {
  playLatestAction();
}
replayButton?.addEventListener("click", replayAllActions);
