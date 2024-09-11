'use server';

import { db } from "@/db";
import type { VanSpot } from "@prisma/client";

export async function fetchSpotById(spotId: number): Promise<VanSpot | null> {
  try {
    const result = await db.vanSpot.findUnique({
      where: { id: spotId },
    });
    return result;
  } catch (error) {
    console.error("Error fetching spot:", error);
    return null;
  }
}