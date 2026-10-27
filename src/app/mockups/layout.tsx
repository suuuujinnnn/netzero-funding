import type { Metadata } from "next";
import "@/views/project/ui/project.css";
import "@/views/mockups/mockups.css";

export const metadata: Metadata = {
  title: "제로섬 · 디자인 비교 목업",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
