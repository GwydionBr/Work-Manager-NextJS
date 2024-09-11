'use server';

import { db } from '@/db';

export async function getDienstPlanById(dienstPlanId: number) {
  try {
    const dienstPlan = await db.dienstPlan.findUnique({
      where: {
        id: dienstPlanId,
      },
    });
    return dienstPlan;
  } catch (err) {
    console.error(err);
    return null;
  }
}