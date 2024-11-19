"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm"; 

export async function getPlanById(planId: number) {
  try {
    const plan = await db.query.dienstPlan.findFirst({
      where: (dienstplan) => eq(dienstplan.id, planId), 
    });
    
    return plan;
  } catch (error) {
    console.error("Error fetching dienstplan by ID:", error);
    return null;
  }
}
