"use client";

import { useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { EffectsCard } from "./effects-card";
import { effectsData } from "./effects-data";
import "./effects-preview.css";

const layouts = ["캐러셀형", "나란히형"] as const;

export function EffectsPreview() {
  const id = useId();
  const [layout, setLayout] = useState(0);
  const [active, setActive] = useState(1);
  const [replay, setReplay] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function select(index: number) {
    setLayout(index);
    if (index === 1) setReplay((value) => value + 1);
  }
  return (
    <div className="effects-preview">
      <div className="effects-toolbar">
        <div
          className="effects-tabs"
          role="tablist"
          aria-label="기대효과 디자인"
        >
          {layouts.map((label, index) => (
            <button
              key={label}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-controls={`${id}-panel`}
              aria-selected={layout === index}
              tabIndex={layout === index ? 0 : -1}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                let next: number;
                if (event.key === "Home") next = 0;
                else if (event.key === "End") next = 1;
                else if (["ArrowLeft", "ArrowRight"].includes(event.key))
                  next = 1 - index;
                else return;
                event.preventDefault();
                select(next);
                tabs.current[next]?.focus();
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {layout === 1 && (
          <button
            className="effects-replay"
            type="button"
            onClick={() => setReplay((value) => value + 1)}
          >
            <RotateCcw size={15} aria-hidden="true" />
            다시 보기
          </button>
        )}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${layout}`}
        tabIndex={0}
      >
        {layout === 0 ? (
          <div
            className="effects-carousel"
            role="region"
            aria-roledescription="캐러셀"
            aria-label="금액별 기대효과"
          >
            <div className="effects-stage">
              {effectsData.map((data, index) => {
                const position = (index - active + 3) % 3;
                return (
                  <div
                    className={`effects-slide effects-position-${position}`}
                    key={data.amount}
                    aria-hidden={index !== active}
                  >
                    <EffectsCard data={data} />
                  </div>
                );
              })}
            </div>
            <div className="effects-carousel-controls">
              <button
                type="button"
                aria-label="이전 금액 보기"
                onClick={() => setActive((value) => (value + 2) % 3)}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <span role="status" aria-live="polite">
                {effectsData[active].amount}원{" "}
                <span className="effects-page-count">{active + 1} / 3</span>
              </span>
              <button
                type="button"
                aria-label="다음 금액 보기"
                onClick={() => setActive((value) => (value + 1) % 3)}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          <div className="effects-grid" key={replay}>
            {effectsData.map((data) => (
              <div className="effects-grid-item" key={data.amount}>
                <EffectsCard data={data} />
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="effects-note">
        일반 전력 사용의 배출량과 비교한 참고치이며 실제 감축량을 뜻하지
        않습니다.
      </p>
    </div>
  );
}
