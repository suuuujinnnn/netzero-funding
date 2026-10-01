"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const supporters = [
  { name: "김하늘", accent: "#c9ff63", task: "바닥 쓸기", icon: "🧹" },
  { name: "이로운", accent: "#67a8ff", task: "칠판 닦기", icon: "🧽" },
  { name: "박다온", accent: "#ff8d75", task: "의자 맞추기", icon: "🪑" },
  { name: "최윤슬", accent: "#ffd34f", task: "창문 열기", icon: "🪟" },
  { name: "정한결", accent: "#9d8cff", task: "조명 켜기", icon: "💡" },
  { name: "송나래", accent: "#69dec2", task: "책상 정돈", icon: "📚" },
];

export function ClassroomReplay() {
  const [active, setActive] = useState<number | null>(null);
  const [completed, setCompleted] = useState(0);
  const [replaying, setReplaying] = useState(false);
  const [hasReplayed, setHasReplayed] = useState(false);
  const [run, setRun] = useState(0);
  const [message, setMessage] = useState("");
  const scene = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const latestPlayed = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    setActive(null);
    setCompleted(supporters.length);
    setReplaying(false);
    setHasReplayed(true);
    setMessage("✨ 교실 리셋 완료!");
  }, [clearTimers]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (reduced.matches) finish();
    };
    reduced.addEventListener("change", onMotionChange);
    const playLatest = () => {
      if (latestPlayed.current) return;
      latestPlayed.current = true;
      if (reduced.matches) {
        finish();
        return;
      }
      const index = supporters.length - 1;
      setActive(index);
      setMessage(
        `${supporters[index].icon} ${supporters[index].name}님의 ${supporters[index].task}`,
      );
    };
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                playLatest();
                observer?.disconnect();
              }
            },
            { threshold: 0.35 },
          )
        : null;
    if (scene.current && observer) observer.observe(scene.current);
    else playLatest();
    return () => {
      observer?.disconnect();
      reduced.removeEventListener("change", onMotionChange);
      clearTimers();
    };
  }, [clearTimers, finish]);

  function replay() {
    clearTimers();
    latestPlayed.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    setRun((value) => value + 1);
    setActive(null);
    setCompleted(0);
    setHasReplayed(true);
    setReplaying(true);
    setMessage("교실 리셋을 다시 보여드립니다.");
    supporters.forEach((supporter, index) => {
      timers.current.push(
        setTimeout(
          () => {
            setActive(index);
            setMessage(
              `${supporter.icon} ${supporter.name}님의 ${supporter.task}`,
            );
          },
          index * 1050 + 180,
        ),
      );
      timers.current.push(
        setTimeout(() => setCompleted(index + 1), index * 1050 + 900),
      );
    });
    timers.current.push(setTimeout(finish, supporters.length * 1050 + 250));
  }

  const done = Array.from(
    { length: completed },
    (_, index) => `done-${index}`,
  ).join(" ");
  return (
    <div className="hall-panel reset-panel" id="reset-panel">
      <div className="reset-hud">
        <span>
          <strong>801호 리셋 미션</strong>
          <small>ROOM 801 · RESET COMPLETE</small>
        </span>
        <button
          type="button"
          className="replay-button"
          id="replay-missions"
          disabled={replaying}
          onClick={replay}
        >
          <span aria-hidden="true">↻</span> 전체 다시보기
        </button>
      </div>
      <div
        key={run}
        className={`classroom-sim ${replaying ? "is-replaying" : ""} ${done}`}
        id="classroom-sim"
        ref={scene}
        data-action={active ?? undefined}
      >
        <div className="sim-wall" aria-hidden="true">
          <div className="sim-board">
            <span className="board-scribble" />
            <i className="tool-eraser" />
          </div>
          <div className="sim-window">
            <i />
            <b />
          </div>
          <div className="sim-light">
            <i />
          </div>
        </div>
        <div className="sim-floor" aria-hidden="true">
          <span className="floor-dirt dirt-one" />
          <span className="floor-dirt dirt-two" />
          <span className="floor-dirt dirt-three" />
          <div className="tool-broom">
            <i />
          </div>
          <div className="sim-chair chair-one" />
          <div className="sim-chair chair-two" />
          <div className="sim-desk">
            <span className="loose-book book-one" />
            <span className="loose-book book-two" />
            <span className="book-stack" />
          </div>
        </div>
        <div
          className="action-toast"
          id="action-toast"
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      </div>
      <div
        className="mission-dock"
        id="mission-dock"
        aria-label="완료된 교실 리셋 역할"
      >
        {supporters.map((supporter, index) => (
          <div
            key={supporter.name}
            className={`dock-role ${active === index ? "is-active" : ""} ${hasReplayed && index < completed ? "is-complete" : ""}`}
            style={{ "--accent": supporter.accent } as CSSProperties}
          >
            <span className="dock-icon" aria-hidden="true">
              {supporter.icon}
            </span>
            <span>
              <strong>{supporter.name}</strong>
              <small>{supporter.task}</small>
            </span>
          </div>
        ))}
      </div>
      <p className="metaphor-note">
        <span aria-hidden="true">!</span> 후원금을 청소에 사용하는 것이 아니라,
        참여가 더해지는 모습을 게임처럼 표현한 목업입니다.
      </p>
    </div>
  );
}
