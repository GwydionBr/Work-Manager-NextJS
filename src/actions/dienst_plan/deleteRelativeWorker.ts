"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from "@/paths"

interface DeleteFixedWorkerProps {
  workerId: number;
  dienstPlanId: number;
}

export async function deleteRelativeWorker(
  {workerId, dienstPlanId}: DeleteFixedWorkerProps,
): Promise<boolean> {
  try {
    await db.dienstRelativeWorker.delete({
      where: {
        id: workerId,
      },
    });
  } catch (err: any) {
      console.log(err)
      return false;
  }

  revalidatePath(paths.dienstPlan.showDienstPlan(dienstPlanId));
  return true;
}