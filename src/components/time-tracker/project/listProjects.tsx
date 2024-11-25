import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { db } from '@/db';
import paths from '@/paths';
import EditProjectForm from '@/components/time-tracker/forms/editProjectForm';
import NewTimerForm from '@/components/time-tracker/forms/newTimerForm';
import { eq } from "drizzle-orm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
      <AccordionItem value={`${project.id}`} key={project.id} className="bg-card pr-4 my-2 rounded-md">
        <AccordionTrigger>
          <div className="grid grid-cols-7">
            <p className="col-span-3">{project.projectName}</p>
            <p>{project.projectSalary} $/h</p>
            <div className="col-span-3">
              <Button size="sm" asChild>
                <Link href={paths.timeTracker.showProject(project.id)}>
                  View
                </Link>
              </Button>
            </div>
          </div>
        </AccordionTrigger>
          <AccordionContent className="">
            <div className="grid grid-cols-2 gap-4 p-4">
              <p className="col-span-2 text-center pb-4">{project.projectDescription}</p>
              <NewTimerForm projectId={project.id} projectSalary={project.projectSalary} redirectStatus={true}/>
              <EditProjectForm projectId={project.id} project={project}/>
            </div>
        </AccordionContent>
      </AccordionItem>
    );
  });

  return (
    <Accordion type="single" collapsible className="pt-4">
      {renderedProjects}
    </Accordion>

  );
}
