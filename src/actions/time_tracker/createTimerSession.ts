"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { redirect } from "next/navigation";
import { timerSessions } from "../../../drizzle/schema";

interface CreateTimerSessionProps {
  time_spent: number;
  money_earned: number;
  project_id: number;
  redirectStatus: boolean;
}


export async function createTimerSession( 
  newSession: CreateTimerSessionProps 
  ): Promise<boolean> {
  const { time_spent, money_earned, project_id, redirectStatus} = newSession;
  try {
    await db.insert(timerSessions).values({
        projectId: project_id,
        timeSpent: time_spent,
        sessionDate: new Date(),
        moneyEarned: money_earned,
    });
  } catch (err: any) {
    console.log(err);
    return false;
  }

  revalidatePath(paths.timeTracker.showProject(project_id));
  revalidatePath(paths.timeTracker.timeTracker());
  if (redirectStatus) {
    redirect(paths.timeTracker.showProject(project_id));
  }
  return true;
}