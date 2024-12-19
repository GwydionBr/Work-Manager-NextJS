import ListSessions from "@/components/time-tracker/session/listSessions";
import paths from "@/paths";
import type { TimerSession, TimerProject } from "@/types";
import HeroHeader from "@/components/header/heroHeader";
import { db } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { eq, inArray } from "drizzle-orm";
import ReturnButton from "@/components/common/returnButton";

export default async function OverviewPage() {
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

  let projects: TimerProject[] = [];
  let sessions: (TimerSession & { projectName: string })[] = [];

  try {
    // Wähle die timerProjects aus, die die richtige userId haben
    projects = await db.query.timerProjects.findMany({
      where: (p) => eq(p.userId, user.id!),
    });

    // Extrahiere die projectIds aus den ausgewählten timerProjects
    const projectIds = projects.map((project) => project.id);

    // Wähle die timerSessions aus, die die projectId der ausgewählten timerProjects haben
    const rawSessions = await db.query.timerSessions.findMany({
      where: (s) => inArray(s.projectId, projectIds),
    });

    // Füge die projectName Eigenschaft zu den Sessions hinzu
    sessions = rawSessions.map((session) => {
      const project = projects.find(
        (project) => project.id === session.projectId
      );
      return {
        ...session,
        projectName: project ? project.projectName : "Unknown Project",
      };
    });
  } catch (error) {
    console.error(
      "Failed to fetch projects or sessions in Overview Page:",
      error
    );
  }

  return (
    <div>
      <HeroHeader title="Overview" />
      <div className="px-8 pb-16">
        <ReturnButton path={paths.workManager.showProjects()} />
      </div>
      <div className="grid grid-cols-12">
        <div className="row-start-2 col-start-2 col-span-10">
          <ListSessions sessions={sessions} />
        </div>
      </div>
    </div>
  );
}
