"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm"; // eq importieren, um die Bedingung zu erstellen

export async function getProjectById(projectId: number) {
  try {
    // Verwende die `where`-Bedingung anstelle von `with`
    const project = await db.query.timerProjects.findFirst({
      where: (project) => eq(project.id, projectId), // Bedingung für die Abfrage
    });
    
    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}
