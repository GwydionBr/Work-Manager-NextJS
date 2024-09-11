'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

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
    await db.timerProject.update({
      where: {
      id: projectId,
      },
      data: {
        project_name: projectName,
        project_description: projectDescription,
        project_salary: projectSalary,
      },
    });
  } catch (err: unknown) {
    console.log(err);
    return false;
  }


  
  revalidatePath(paths.timeTracker.timeTracker());
  revalidatePath(paths.timeTracker.showProject(projectId));
  return true;
}