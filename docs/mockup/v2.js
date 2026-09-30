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
    if (options.scroll) document.querySelector('.project-nav').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  showPanel(location.hash.slice(1));

  const copyButton = document.getElementById('copy-account');
  const copyStatus = document.getElementById('copy-status');
  copyButton.addEventListener('click', async () => {
    const account = document.getElementById('account-number').textContent.trim();
    try {
      await navigator.clipboard.writeText(account);
      copyStatus.textContent = '계좌번호가 복사되었습니다. 실제 송금 전 운영팀 안내를 확인해 주세요.';
    } catch {
      copyStatus.textContent = '자동 복사가 지원되지 않습니다. 계좌번호를 직접 선택해 복사해 주세요.';
    }
  });
})();
