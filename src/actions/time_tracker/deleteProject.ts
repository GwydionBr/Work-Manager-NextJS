"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { timerProjects, timerSessions } from "../../../drizzle/schema";
import { eq } from 'drizzle-orm';

interface DeleteProjectProps {
  projectId: number;
}

interface DeleteProjectFormState {
  errors: {
    _form?: string[];
  };
  }

export async function deleteProject(
  {projectId}: DeleteProjectProps,
  formState: DeleteProjectFormState,
) {
  try {
    await db.delete(timerSessions).where(
      eq( timerSessions.projectId, projectId)
    );
    await db.delete(timerProjects).where(
      eq( timerProjects.id, projectId)
    );
  } catch (err: any) {
    return {
      errors: {
        _form: [err.message || 'Something went wrong'],
      },
    };
  }

  revalidatePath(paths.timeTracker.timeTracker());
  redirect(paths.timeTracker.timeTracker());
}