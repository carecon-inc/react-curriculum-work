import { ProjectList } from "@/app/(home)/_components/project-list";
import { getProjects } from "@/app/(home)/action";

export default async function Home() {
    const projects = await getProjects();
    return <ProjectList initialProjects={projects} />;
}
