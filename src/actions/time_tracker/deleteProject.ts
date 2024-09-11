"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';

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
    await db.timerSession.deleteMany({
      where: {
        project_id: projectId,
      },
    });
    await db.timerProject.delete({
      where: {
        id: projectId,
      },
    });
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