import { Button } from "@nextui-org/react";
import Link from "next/link";
import paths from "@/paths";
import NewSessionForm from "@/components/time-tracker/forms/newSessionForm";
import DeleteProjectButton from "@/components/time-tracker/project/deleteProjectButton";
import * as actions from "@/actions";
import ListSessions from "@/components/time-tracker/session/listSessions";
import NewTimerForm from "@/components/time-tracker/forms/newTimerForm";
import EditProjectForm from "@/components/time-tracker/forms/editProjectForm";
import type { TimerSession } from '@prisma/client';
import { db } from '@/db';

interface ProjectShowPageProps {
  params: {
    projectId: string;
  };
}

export default async function ProjectPage({ params }: ProjectShowPageProps) {
  const projectId = parseInt(params.projectId);
  const project = await actions.getProjectById(projectId);

  let sessions: TimerSession[];
  try {
    sessions = await db.timerSession.findMany({
      where: {
        project_id: projectId
      },
    });
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    sessions = [];
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pb-4 mt-6">{project?.project_name}</h1>
      <p className="text-xl font-bold text-center">{project?.project_description}</p>
      <p className="text-xl font-bold text-center">{project?.project_salary} $/h</p>
      <div className="flex justify-between p-7">
        <Link href={paths.timeTracker.timeTracker()}>
          <Button color="default">Back</Button>
        </Link>
        <div className="flex gap-4">
          {project && <EditProjectForm projectId={projectId} project={project} />}
          <DeleteProjectButton projectId={projectId} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-3 items-center">
        <div className="flex gap-4">
          <NewSessionForm projectId={projectId} />
          {
          project &&
           <NewTimerForm projectId={projectId} projectSalary={project.project_salary} redirectStatus={false}/>
          }
        </div>
        <div className="w-10/12 pt-6">
          <ListSessions sessions={sessions}/>
        </div>
      </div>
    </div>
  );
}
