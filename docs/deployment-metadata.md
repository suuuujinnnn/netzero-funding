# 배포용 메타데이터

프론트엔드의 루트 `src/app/layout.tsx`에 아래 제목·설명을 적용했습니다. 프로젝트 화면은 구현됐으며 favicon과 SVG 아이콘을 연결했습니다. 실제 배포는 별도 작업입니다.

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://netzero-funding.vercel.app"),
  alternates: { canonical: "/" },
  title: "국민대 넷제로 강의실 만들기 프로젝트",
  description:
    "학생이 강의실의 전력 사용량을 살펴보고, 그에 상응하는 재생에너지 환경가치에 함께 참여하는 프로젝트를 소개합니다.",
  openGraph: {
    url: "/",
    title: "국민대 넷제로 강의실 만들기 프로젝트",
    description:
      "강의실에서 시작하는 학생 주도의 재생에너지 참여 프로젝트를 알아보세요.",
    locale: "ko_KR",
    type: "website",
  },
};
```

공유 이미지가 정해지기 전에는 `openGraph.images`를 설정하지 않습니다. 운영 도메인은 `https://netzero-funding.vercel.app`으로 확정하여 `metadataBase`, canonical, Open Graph URL에 반영했습니다. Twitter는 이미지 없는 summary 카드로 설정했습니다. 실제 모금 수치, 계좌, 확정되지 않은 일정은 제목과 설명에 넣지 않습니다.

## Gemini 공유 이미지 프롬프트

> 1200×630 비율의 웹 링크 미리보기 이미지를 만들어줘. 대학 강의실에서 시작하는 재생에너지 참여를 단순한 그래픽으로 표현하고, 진녹색(#234a3c)·연두색(#d7ed9f)·미색(#f5f6f2)을 사용해줘. 실제 캠퍼스 사진, 특정 건물, 인물, 로고, 글자는 넣지 말고 제목을 나중에 배치할 왼쪽 공간을 비워줘.
