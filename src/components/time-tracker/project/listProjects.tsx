import Link from 'next/link';
import { Divider } from '@nextui-org/react';
import { Button } from "@/components/ui/button"
import { db } from '@/db';
import paths from '@/paths';
import EditProjectForm from '@/components/time-tracker/forms/editProjectForm';
import NewTimerForm from '@/components/time-tracker/forms/newTimerForm';
import { eq } from "drizzle-orm";

export default async function ListProjects({ userId }: { userId: string }) {
  let projects;
  try {
    projects = await db.query.timerProjects.findMany({
      where: (p) => eq(p.userId, userId),
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    // Handle the error appropriately in your application context
    return <div>Failed to load projects.</div>;
  }
  
  const renderedProjects = projects.map((project) => {
    return (
      <div key={project.id}>
        <div  className="grid grid-cols-7 gap-4">
          <p className="col-span-3">{project.projectName}</p>
          <p>{project.projectSalary} $/h</p>
          <Link className="col-span-1" href={paths.timeTracker.showProject(project.id)}>
            <Button size="sm" className="bg-secondary text-secondary-foreground">View</Button>
          </Link>
          <NewTimerForm projectId={project.id} projectSalary={project.projectSalary} redirectStatus={true}/>
          <EditProjectForm projectId={project.id} project={project}/>
        </div>
        <Divider />
      </div>
      
    );
  });

  return (
    <div className='flex flex-col gap-3 p-3'>
      {renderedProjects}
    </div>
  );
}
