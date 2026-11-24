import { parseProjectTab, ProjectView } from "@/views/project";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const { tab } = await searchParams;
  return <ProjectView initialTab={parseProjectTab(tab) ?? "home"} />;
}
