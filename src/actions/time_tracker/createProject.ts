'use server';

import { db } from "@/db";
import type { TimerProject } from "@prisma/client";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';

const createProjectSchema = z.object({
  projectName: z.string().min(1).max(255),
  projectDescription: z.string().min(1).max(255),
  projectSalary: z.number().min(1),
});

interface CreateProjectFormState {
  errors: {
    projectName?: string[];
    projectDescription?: string[];
    projectSalary?: string[];
    _form?: string[];
  };
}

export async function createProject(
  formState: CreateProjectFormState,
  formData: FormData
): Promise<CreateProjectFormState> {
  const result = createProjectSchema.safeParse({
    projectName: formData.get("projectName") as string,
    projectDescription: formData.get("projectDescription") as string,
    projectSalary: Number(formData.get("projectSalary")),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let project: TimerProject;
  try {
    project = await db.timerProject.create({
      data: {
        project_name: result.data.projectName,
        project_description: result.data.projectDescription,
        project_salary: result.data.projectSalary,
      },
    });
  } catch (err: any) {
    return {
      errors: {
        _form: [err.message || 'Something went wrong'],
      },
    };
  }

  revalidatePath('/time-tracker');
  redirect(paths.timeTracker.showProject(project.id));
}
