import { prisma } from "@/lib/prisma";
import { ProjectList } from "./_components/project-list";

async function getProjects() {
  try {
    return await prisma.project.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main>
      <ProjectList projects={projects} />
    </main>
  );
}
