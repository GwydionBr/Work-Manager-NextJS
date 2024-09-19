'use server';

import { db } from "@/db";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { timerProjects } from "../../../drizzle/schema";
import { auth } from '@/auth';

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

  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

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

  let project;
  try {
    project = await db.insert(timerProjects).values({
        userId: user.id!,
        projectName: result.data.projectName,
        projectDescription: result.data.projectDescription,
        projectSalary: result.data.projectSalary,
    }).returning();
  } catch (err: any) {
    return {
      errors: {
        _form: [err.message || 'Something went wrong'],
      },
    };
  }

  revalidatePath('/time-tracker');
  redirect(paths.timeTracker.showProject(project[0].id));
}
