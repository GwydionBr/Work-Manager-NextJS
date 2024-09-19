"use server";

import { db } from "@/db";
import { TimerSession } from '@/types';
import { eq } from "drizzle-orm";

interface FetchSessionsProps {
  slug: string,
}

export async function fetchSessions({ slug }: FetchSessionsProps): Promise<TimerSession[]> {


  const project = await db.query.timerProjects.findFirst({
    where: (p) => eq(p.projectName, slug)
  });

  if (!project) {
    return [];
  }

  try {
    const sessions = await db.query.timerSessions.findMany({
      where: (p) => eq(p.projectId, project.id),
    });
    return sessions;
  } catch (err: any) {
    console.error("Error fetching sessions:", err);
    throw new Error("Failed to fetch sessions");
  }
}