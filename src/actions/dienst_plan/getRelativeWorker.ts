'use server';

import { db } from "@/db";
import type { DienstRelativeWorker } from '@prisma/client';


export async function getRelativeWorker(dienstPlanId: number): Promise<DienstRelativeWorker[]> {

  try{
    const relativeWorker = await db.dienstRelativeWorker.findMany(
      {
        where: {
          dienst_plan_id: dienstPlanId,
        },
      }
    );
    return relativeWorker;
  }
  catch (err) {
    console.error(err);
    return [];
  }
}