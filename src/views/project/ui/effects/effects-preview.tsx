"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { EffectsCard } from "./effects-card";
import { effectsData } from "./effects-data";
import "./effects-preview.css";

export function EffectsPreview() {
  const [replay, setReplay] = useState(0);
  return (
    <div className="effects-preview">
      <div className="effects-toolbar">
        <button
          className="effects-replay"
          type="button"
          onClick={() => setReplay((value) => value + 1)}
        >
          <RotateCcw size={15} aria-hidden="true" /> 다시 보기
        </button>
      </div>
      <div
        className="effects-grid"
        key={replay}
        data-replaying={replay > 0 || undefined}
      >
        {effectsData.map((data) => (
          <div className="effects-grid-item" key={data.amount}>
            <EffectsCard data={data} />
          </div>
        ))}
      </div>
      <p className="effects-note">
        일반 전력 사용의 배출량과 비교한 참고치이며 실제 감축량을 뜻하지
        않습니다.
      </p>
    </div>
  );
}
