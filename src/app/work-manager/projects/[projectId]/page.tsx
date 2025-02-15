import paths from "@/paths";
import NewSessionForm from "@/components/time-tracker/forms/newSessionForm";
import * as actions from "@/actions";
import ListSessions from "@/components/time-tracker/session/listSessions";
import NewTimerForm from "@/components/time-tracker/forms/newTimerForm";
import type { TimerSession } from "@/types";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import HeroHeaderProject from "@/components/time-tracker/project/heroHeaderProject";
import ReturnButton from "@/components/common/returnButton";

interface ProjectShowPageProps {
  params: {
    projectId: string;
  };
}

export default async function ProjectPage({ params }: ProjectShowPageProps) {
  const projectId = parseInt(params.projectId);
  const project = (await actions.getProjectById(projectId)) || undefined;

  let sessions: TimerSession[];
  try {
    sessions = await db.query.timerSessions.findMany({
      where: (p) => eq(p.projectId, projectId),
    });
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    sessions = [];
  }

  return (
    <div>
      <div className="flex items-center">
        <HeroHeaderProject project={project} />
      </div>

      <p className="text-xl font-bold text-center pt-8">
        {project?.projectSalary} $/h
      </p>
      <div className="flex justify-between p-7">
        <ReturnButton path={paths.workManager.showProjects()} />
      </div>
      <div className="flex flex-col gap-4 p-3 items-center">
        <div className="flex gap-4">
          <NewSessionForm projectId={projectId} />
        </div>
        <div className="w-10/12 pt-6 grid grid-cols-3">
          <div className="col-span-2">
            <ListSessions sessions={sessions} />
          </div>
          <div className="self-center justify-self-center">
            {project && (
              <div className="fixed top-1/2 transform -translate-y-1/2">
                <NewTimerForm
                  projectId={projectId}
                  projectSalary={project.projectSalary}
                  redirectStatus={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
