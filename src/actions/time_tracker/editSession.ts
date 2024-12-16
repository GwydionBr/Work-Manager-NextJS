"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { timerSessions } from "drizzle/schema";
import { eq } from 'drizzle-orm';

interface CreateSessionProps {
  sessionId: number;
  projectId: number;
  loggedDate: Date;
  loggedHours: number;
  loggedMinutes: number;
}

export async function editSession(
  newSession: CreateSessionProps
): Promise<boolean> {
  const { sessionId, projectId, loggedDate, loggedHours, loggedMinutes } = newSession;

  const project = await db.query.timerProjects.findFirst({
    where: (p) => eq(p.id, projectId),
  });


  if (!project) {
    console.error('Project not found');
    return false;
  }

  const time_spent = loggedHours * 60 + loggedMinutes;
  try{
    const session = await db.update(timerSessions)
    .set({
      timeSpent: time_spent,
      sessionDate: new Date(loggedDate),
      moneyEarned: Number((time_spent * project.projectSalary / 60).toFixed(2)),
    })
    .where(eq(timerSessions.id, sessionId));
    
  } catch (err: unknown) {
    console.error(err);
    return false;
  }

  revalidatePath(paths.workManager.showProject(projectId));
  return true;
}
