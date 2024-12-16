import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { db } from '@/db';
import paths from '@/paths';
import EditProjectSheet from '../forms/editProjectSheet';
import NewTimerForm from '@/components/time-tracker/forms/newTimerForm';
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { eq } from "drizzle-orm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  
  const renderedProjectsMobile = projects.map((project) => {
    return (
      <AccordionItem value={`${project.id}`} key={project.id} className="bg-card pr-4 my-2 rounded-md">
        <AccordionTrigger>
          <div className="grid grid-cols-7">
            <p className="col-span-3">{project.projectName}</p>
            <p>{project.projectSalary} $/h</p>
            <div className="col-span-3">
                <Link href={paths.workManager.showProject(project.id)} className={buttonVariants({ variant: "secondary" })}>
                  View
                </Link>
            </div>
          </div>
        </AccordionTrigger>
          <AccordionContent className="">
            <div className="grid grid-cols-2 gap-4 p-4">
              <p className="col-span-2 text-center pb-4">{project.projectDescription}</p>
              <NewTimerForm projectId={project.id} projectSalary={project.projectSalary} redirectStatus={true}/>
              <EditProjectSheet project={project}/>
            </div>
        </AccordionContent>
      </AccordionItem>
    );
  });

  const renderedProjectsDesktop = projects.map((project) => {
    return (
      <Card key={project.id} className="pr-4 my-2 rounded-md">
        <CardHeader>
          <Link href={paths.workManager.showProject(project.id)}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-center pb-3">{project.projectName}</CardTitle>
              <p className="border-2 p-2 border-blue-700">{project.projectSalary} $/h</p>
            </div>
            <Separator />
            <p className="pb-4">{project.projectDescription}</p>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 p-4">
            <NewTimerForm projectId={project.id} projectSalary={project.projectSalary} redirectStatus={true}/>
            <EditProjectSheet project={project}/>
          </div>
        </CardContent>
      </Card>
    );
  });

  return (
    <>
      <div className="block lg:hidden">
        <Accordion type="single" collapsible className="pt-4">
          {renderedProjectsMobile}
        </Accordion>
      </div> 
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
        {renderedProjectsDesktop}
      </div>
    </>
  );
}