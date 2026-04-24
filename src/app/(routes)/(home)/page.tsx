import { ProjectList } from "@/app/(routes)/(home)/_components/project-list";
import { getProjects } from "@/app/(routes)/(home)/action";

export default async function Home() {
    const projects = await getProjects();
    return <ProjectList projects={projects} />;
}
