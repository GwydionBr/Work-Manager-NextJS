"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { timerSessions } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

interface CreateSessionProps {
  projectId: number;
  loggedDate: Date;
  loggedHours: number;
  loggedMinutes: number;
}

export async function createSession(
  newSession: CreateSessionProps
): Promise<boolean> {
  const { projectId, loggedDate, loggedHours, loggedMinutes } = newSession;

  const project = await db.query.timerProjects.findFirst({
    where: (p) => eq(p.id, projectId), // Bedingung für die Abfrage
  });

  if (!project) {
    console.error('Project not found');
    return false;
  }

  const time_spent = loggedHours * 60 + loggedMinutes;
  let session;
  try{
    session = await db.insert(timerSessions).values({
        timeSpent: time_spent,
        sessionDate: new Date(loggedDate),
        moneyEarned: Number((time_spent * project.projectSalary / 60).toFixed(2)),
        projectId: projectId
    })
  } catch (err: unknown) {
    console.error(err);
    return false;
  }

  revalidatePath(paths.timeTracker.showProject(projectId));
  return true;
}
