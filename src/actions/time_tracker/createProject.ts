'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { timerProjects } from "drizzle/schema";
import { auth } from '@/auth';

interface CreateProjectProps {
  projectName: string;
  projectDescription: string;
  projectSalary: number;
}

export async function createProject(
  newProject: CreateProjectProps
) {

  // Check if user is authenticated
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

  // Insert new project into database
  const { projectName, projectDescription, projectSalary } = newProject;
  let project;

  try {
    project = await db.insert(timerProjects).values({
        userId: user.id!,
        projectName,
        projectDescription,
        projectSalary,
    }).returning();
  } catch (err: any) {
    return false;
  }

  revalidatePath('/time-tracker');
  redirect(paths.timeTracker.showProject(project[0].id));
}
