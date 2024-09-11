"use server";

import { db } from "@/db";

export async function getProjectById(projectId: number) {
  try {
    const project = await db.timerProject.findFirst({
      where: {
        id: projectId,
      },
    });
    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}
