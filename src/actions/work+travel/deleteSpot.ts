'use server';

import { db } from "@/db";



export async function deleteSpot(spotId: number): Promise <boolean> {
  try {
    await db.vanSpot.delete({
      where: {
        id: spotId,
      },
    });
  } catch (error: any) {
    console.log("Error deleting spot:", error);
    return false;
  }
  return true;
}