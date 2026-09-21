const supporters = [
  { name: "김하늘", accent: "#c9ff63" },
  { name: "이로운", accent: "#67a8ff" },
  { name: "박다온", accent: "#ff8d75" },
  { name: "최윤슬", accent: "#ffd34f" },
  { name: "정한결", accent: "#9d8cff" },
  { name: "송나래", accent: "#69dec2" },
];

const seats = document.querySelector("#supporter-seats");
const stars = document.querySelector("#supporter-stars");

supporters.forEach(({ name, accent }, index) => {
  const seat = document.createElement("article");
  seat.className = "supporter-seat";
  seat.style.setProperty("--supporter-accent", accent);
  seat.innerHTML = `
    <span class="seat-light" aria-hidden="true"><i></i></span>
    <span class="supporter-name">${name}<small>예시</small></span>
    <span class="seat-desk" aria-hidden="true"><i></i><b></b></span>
  `;
  seats.append(seat);

  const star = document.createElement("div");
  star.className = `supporter-star supporter-star-${index + 1}`;
  star.style.setProperty("--supporter-accent", accent);
  star.innerHTML = `<i aria-hidden="true">✦</i><span>${name}<small>예시</small></span>`;
  stars.append(star);
});

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
