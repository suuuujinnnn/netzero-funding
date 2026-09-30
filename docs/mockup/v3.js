(() => {
  const tabs = [...document.querySelectorAll('[role="tab"][data-panel]')];
  const panels = new Map(tabs.map((tab) => [tab.dataset.panel, document.getElementById(tab.dataset.panel)]));
  const fallback = 'overview';

  function showPanel(name, options = {}) {
    if (!panels.has(name)) name = fallback;
    for (const tab of tabs) {
      const active = tab.dataset.panel === name;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels.get(tab.dataset.panel).hidden = !active;
    }
    if (options.hash && location.hash !== `#${name}`) history.replaceState(null, '', `#${name}`);
    if (options.focus) tabs.find((tab) => tab.dataset.panel === name).focus();
    if (options.scroll) document.querySelector('.project-nav').scrollIntoView({ behavior: options.instant ? 'auto' : 'smooth', block: 'start' });
  }

  for (const tab of tabs) {
    tab.addEventListener('click', () => showPanel(tab.dataset.panel, { hash: true, scroll: true }));
    tab.addEventListener('keydown', (event) => {
      const index = tabs.indexOf(tab);
      let next;
      if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      else if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      else if (event.key === 'Home') next = tabs[0];
      else if (event.key === 'End') next = tabs[tabs.length - 1];
      if (next) {
        event.preventDefault();
        showPanel(next.dataset.panel, { hash: true, focus: true });
      }
    });
  }

  for (const button of document.querySelectorAll('[data-next]')) {
    button.addEventListener('click', () => showPanel(button.dataset.next, { hash: true, scroll: true }));
  }

  addEventListener('hashchange', () => showPanel(location.hash.slice(1)));
  showPanel(location.hash.slice(1), { scroll: Boolean(location.hash), instant: true });

  const fundingSource = document.querySelector('.hero');
  const raised = Number(fundingSource.dataset.raised);
  const target = Number(fundingSource.dataset.target);
  const participations = Number(fundingSource.dataset.participations);
  const fraction = target > 0 ? Math.min(1, Math.max(0, raised / target)) : 0;
  const percentage = Math.round(fraction * 100);
  const pieceCount = 24;
  const filledCount = Math.round(fraction * pieceCount);
  const money = (amount) => `${new Intl.NumberFormat('ko-KR').format(amount)}원`;

  document.getElementById('hero-percentage').textContent = `${percentage}%`;
  document.getElementById('hero-raised').textContent = money(raised);
  document.getElementById('hero-target').textContent = money(target);
  document.getElementById('hero-progress-fill').style.width = `${percentage}%`;
  document.querySelector('.progress-track').setAttribute('aria-label', `목업용 모금 진행률 ${percentage}퍼센트`);
  document.getElementById('history-count').textContent = `${new Intl.NumberFormat('ko-KR').format(participations)}건`;
  document.getElementById('puzzle-filled').textContent = String(filledCount);

  const puzzle = document.getElementById('funding-puzzle');
  puzzle.setAttribute('aria-label', `목업용 모금 진행률 ${percentage}퍼센트를 나타내는 ${pieceCount}조각 퍼즐, ${filledCount}조각 완성`);
  const svgNS = 'http://www.w3.org/2000/svg';
  const svgElement = (tag, attributes = {}) => {
    const node = document.createElementNS(svgNS, tag);
    for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, String(value));
    return node;
  };
  // Offset centers create pieces with different shapes and sizes, without a row/column grid.
  const centers = [
    [65, 85], [205, 65], [345, 100], [490, 75], [620, 105], [760, 82],
    [95, 235], [245, 250], [380, 220], [525, 265], [675, 225], [770, 265],
    [60, 385], [205, 405], [345, 370], [480, 410], [635, 365], [755, 420],
    [90, 535], [240, 530], [390, 540], [525, 520], [655, 535], [780, 540],
  ];
  const fillOrder = [0, 1, 3, 6, 7, 8, 10, 12, 14, 17, 19, 22, 2, 4, 5, 9, 11, 13, 15, 16, 18, 20, 21, 23];
  const filledPieces = new Set(fillOrder.slice(0, filledCount));
  const pointText = ([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`;

  function clipCell(polygon, center, neighbor) {
    const normal = [neighbor[0] - center[0], neighbor[1] - center[1]];
    const limit = (neighbor[0] ** 2 + neighbor[1] ** 2 - center[0] ** 2 - center[1] ** 2) / 2;
    const side = ([x, y]) => normal[0] * x + normal[1] * y - limit;
    const clipped = [];
    for (let index = 0; index < polygon.length; index += 1) {
      const start = polygon[index];
      const end = polygon[(index + 1) % polygon.length];
      const startSide = side(start);
      const endSide = side(end);
      if (startSide <= 1e-7) clipped.push(start);
      if ((startSide < -1e-7 && endSide > 1e-7) || (startSide > 1e-7 && endSide < -1e-7)) {
        const ratio = startSide / (startSide - endSide);
        clipped.push([start[0] + (end[0] - start[0]) * ratio, start[1] + (end[1] - start[1]) * ratio]);
      }
    }
    return clipped;
  }

  function shapedEdge(start, end) {
    const onBorder = [0, 800].some((x) => Math.abs(start[0] - x) < .01 && Math.abs(end[0] - x) < .01)
      || [0, 600].some((y) => Math.abs(start[1] - y) < .01 && Math.abs(end[1] - y) < .01);
    const length = Math.hypot(end[0] - start[0], end[1] - start[1]);
    if (onBorder || length < 75) return ` L ${pointText(end)}`;

    const forward = start[0] < end[0] || (Math.abs(start[0] - end[0]) < .01 && start[1] < end[1]);
    const a = forward ? start : end;
    const b = forward ? end : start;
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const normal = [-dy / length, dx / length];
    const hash = Math.round(a[0] * 10) + Math.round(a[1] * 7) + Math.round(b[0] * 3) + Math.round(b[1] * 11);
    const bulge = (hash % 2 ? 1 : -1) * Math.min(35, length * .22);
    const point = (position, depth = 0) => [a[0] + dx * position + normal[0] * depth, a[1] + dy * position + normal[1] * depth];
    const segments = [
      { start: point(.25), c1: point(.32), c2: point(.35, bulge * .12), end: point(.33, bulge * .25) },
      { start: point(.33, bulge * .25), c1: point(.28, bulge * .8), c2: point(.38, bulge), end: point(.5, bulge) },
      { start: point(.5, bulge), c1: point(.62, bulge), c2: point(.72, bulge * .8), end: point(.67, bulge * .25) },
      { start: point(.67, bulge * .25), c1: point(.65, bulge * .12), c2: point(.68), end: point(.75) },
    ];
    let path = ` L ${pointText(forward ? segments[0].start : segments[3].end)}`;
    for (const segment of forward ? segments : [...segments].reverse()) {
      path += forward
        ? ` C ${pointText(segment.c1)} ${pointText(segment.c2)} ${pointText(segment.end)}`
        : ` C ${pointText(segment.c2)} ${pointText(segment.c1)} ${pointText(segment.start)}`;
    }
    return `${path} L ${pointText(end)}`;
  }

  function piecePath(polygon) {
    let path = `M ${pointText(polygon[0])}`;
    for (let index = 0; index < polygon.length; index += 1) {
      path += shapedEdge(polygon[index], polygon[(index + 1) % polygon.length]);
    }
    return `${path} Z`;
  }

  const pieces = centers.map((center, index) => centers.reduce((polygon, neighbor, neighborIndex) => (
    index === neighborIndex ? polygon : clipCell(polygon, center, neighbor)
  ), [[0, 0], [800, 0], [800, 600], [0, 600]]));
  const puzzlePieces = document.getElementById('puzzle-pieces');
  for (let index = 0; index < pieceCount; index += 1) {
    const filled = filledPieces.has(index);
    const group = svgElement('g', {
      class: `puzzle-piece ${filled ? 'is-filled' : 'is-empty'}`,
      role: 'group',
      'aria-label': `${index + 1}번째 조각, ${filled ? '채워짐' : '비어 있음'}`,
    });
    group.append(svgElement('path', {
      d: piecePath(pieces[index]),
      fill: filled ? 'none' : '#1d2c42',
      stroke: filled ? '#12253a' : '#8195a8',
      'stroke-width': 5,
      'stroke-linejoin': 'round',
    }));
    puzzlePieces.append(group);
  }

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

  const copyButton = document.getElementById('copy-account');
  const copyStatus = document.getElementById('copy-status');
  copyButton.addEventListener('click', async () => {
    const account = document.getElementById('account-number').textContent.trim();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(account);
      } else {
        const input = document.createElement('textarea');
        input.value = account;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.append(input);
        input.select();
        const copied = document.execCommand('copy');
        input.remove();
        if (!copied) throw new Error('copy failed');
      }
      copyStatus.textContent = '계좌번호가 복사되었습니다. 실제 송금 전 운영팀 안내를 확인해 주세요.';
    } catch {
      copyStatus.textContent = '자동 복사가 지원되지 않습니다. 계좌번호를 직접 선택해 복사해 주세요.';
    }
  });
})();
