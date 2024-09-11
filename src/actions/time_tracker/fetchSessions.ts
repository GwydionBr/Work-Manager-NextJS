"use server";

import { db } from "@/db";
import type { TimerSession } from "@prisma/client";

interface FetchSessionsProps {
  slug: string,
}

export async function fetchSessions({ slug }: FetchSessionsProps): Promise<TimerSession[]> {
  const project = await db.timerProject.findFirst({
    where: {
      project_name: slug,
    },
  });

  if (!project) {
    return [];
  }

  try {
    const sessions = await db.timerSession.findMany({
      where: {
        project_id: project.id,
      },
    });
    return sessions;
  } catch (err: any) {
    console.error("Error fetching sessions:", err);
    throw new Error("Failed to fetch sessions");
  }
}