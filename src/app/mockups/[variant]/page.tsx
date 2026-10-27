import { notFound } from "next/navigation";
import { MockupView } from "@/views/mockups/mockup-view";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ variant: string }>;
  searchParams: Promise<{ details?: string; from?: string }>;
}) {
  const { variant } = await params;
  if (
    variant !== "a-1" &&
    variant !== "a-2" &&
    variant !== "b" &&
    variant !== "a-info"
  )
    notFound();
  const query = await searchParams;
  return (
    <MockupView
      variant={variant}
      details={query.details === "1"}
      from={query.from === "a-2" ? "a-2" : "a-1"}
    />
  );
}
