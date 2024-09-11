'use server';

import { db } from "@/db";
import type { DienstFixedWorker } from '@prisma/client';


export async function getFixedWorker(dienstPlanId: number): Promise<DienstFixedWorker[]> {

  try{
    const fixedWorker = await db.dienstFixedWorker.findMany(
      {
        where: {
          dienst_plan_id: dienstPlanId,
        },
      }
    );
    return fixedWorker;
  }
  catch (err) {
    console.error(err);
    return [];
  }
}