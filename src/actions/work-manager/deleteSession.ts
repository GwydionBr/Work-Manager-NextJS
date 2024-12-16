"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from "@/paths"
import { timerSessions } from "drizzle/schema";
import { eq } from 'drizzle-orm';


interface DeleteProjectProps {
  sessionId: number;
  projectId: number;
}

export async function deleteSession(
  {sessionId, projectId}: DeleteProjectProps,
): Promise<boolean> {
  try {
    await db.delete(timerSessions).where(
      eq( timerSessions.id, sessionId),
    );
  } catch (err: any) {
      console.log(err)
      return false;
  }

  revalidatePath(paths.workManager.showProject(projectId));
  return true;
}