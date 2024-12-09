'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { timerProjects } from "drizzle/schema";
import { eq } from 'drizzle-orm';


interface editProjectProps {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectSalary: number;
}


export async function editProject(
  { projectId, projectName, projectDescription, projectSalary }: editProjectProps
): Promise<boolean> {

  try{
    await db.update(timerProjects)
      .set({
        projectName: projectName,
        projectDescription: projectDescription,
        projectSalary: projectSalary,
      })
      .where(eq(timerProjects.id, projectId));

  } catch (err: unknown) {
    console.log(err);
    return false;
  }


  
  revalidatePath(paths.timeTracker.timeTracker());
  revalidatePath(paths.timeTracker.showProject(projectId));
  return true;
}