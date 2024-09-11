'use server';

import { db } from "@/db";
import type { DienstPlan } from "@prisma/client";

export async function getDienstPläne(): Promise<DienstPlan[]> {
  try {
    const dienstPläne = await db.dienstPlan.findMany();
    return dienstPläne;
  } catch (err: any) {
    console.error("Error fetching dienstPläne:", err);
    console.log(err);
    return [];
  }
}