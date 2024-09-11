"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from "@/paths"

interface DeleteProjectProps {
  sessionId: number;
  projectId: number;
}

export async function deleteSession(
  {sessionId, projectId}: DeleteProjectProps,
): Promise<boolean> {
  try {
    await db.timerSession.delete({
      where: {
        id: sessionId,
      },
    });
  } catch (err: any) {
      console.log(err)
      return false;
  }

  revalidatePath(paths.timeTracker.showProject(projectId));
  return true;
}