"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import type { TimerSession } from "@prisma/client";
import paths from '@/paths';

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

  const project = await db.timerProject.findFirst({
    where: {
      id: Number(projectId),
    },
  });


  if (!project) {
    console.error('Project not found');
    return false;
  }

  const time_spent = loggedHours * 60 + loggedMinutes;
  let session: TimerSession;
  try{
    session = await db.timerSession.update({
      where: {
        id: sessionId
      },
      data:{
        time_spent,
        session_date: new Date(loggedDate),
        money_earned: Number((time_spent * project.project_salary / 60).toFixed(2)),
      }
    })
  } catch (err: unknown) {
    console.error(err);
    return false;
  }

  revalidatePath(paths.timeTracker.showProject(projectId));
  return true;
}
