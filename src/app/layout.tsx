import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "국민대 넷제로 강의실 만들기 프로젝트",
  description:
    "학생이 강의실의 전력 사용량을 살펴보고, 그에 상응하는 재생에너지 환경가치에 함께 참여하는 프로젝트를 소개합니다.",
  openGraph: {
    title: "국민대 넷제로 강의실 만들기 프로젝트",
    description:
      "강의실에서 시작하는 학생 주도의 재생에너지 참여 프로젝트를 알아보세요.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
