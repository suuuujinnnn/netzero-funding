import Link from "next/link";
import { MockupLogos } from "@/views/mockups/mockup-logos";

const options = [
  [
    "a-1",
    "A—01",
    "작은 마음이 모이면",
    "입체 교실과 초록 대시보드",
    "작은 교실을 둘러싼 반투명 카드로 참여의 목표를 보여줍니다.",
  ],
  [
    "a-2",
    "A—02",
    "CHANGE STARTS HERE.",
    "키치한 학생 캠페인",
    "스티커·티켓·캠퍼스 사진을 겹친 포스터로 참여를 제안합니다.",
  ],
  [
    "b",
    "B",
    "교실에서 시작하는 전환",
    "기존 UI와 설명형 인포그래픽",
    "교정 퍼즐과 사용계획을 재사용하고, 목표와 REC 흐름을 도식화합니다.",
  ],
];

export default function Page() {
  return (
    <main className="mockup-picker">
      <MockupLogos />
      <p className="mk-eyebrow">PROJECT ZEROSUM / DESIGN STUDY</p>
      <h1>
        같은 프로젝트,
        <br />세 가지 첫인상.
      </h1>
      <p>모금 참여를 중심에 두고, 디자인과 정보 탐색 방식을 비교합니다.</p>
      <div className="mk-options">
        {options.map(([path, number, title, subtitle, description]) => (
          <Link
            className={`mk-option mk-option-${path}`}
            href={`/mockups/${path}`}
            key={path}
          >
            <span>{number} / PREVIEW</span>
            <div className="mk-option-art" aria-hidden="true">
              {path === "a-1" ? "✳" : path === "a-2" ? "↗" : "801"}
            </div>
            <h2>{title}</h2>
            <strong>{subtitle}</strong>
            <p>{description}</p>
            <b>목업 살펴보기 ↗</b>
          </Link>
        ))}
      </div>
      <p className="mk-picker-note">
        논의용 미완성 목업 · A 두 안은 별도 소개 사이트로, B는 내부 메뉴로
        연결됩니다.
      </p>
      <Link href="/">현재 사이트 보기 →</Link>
    </main>
  );
}
