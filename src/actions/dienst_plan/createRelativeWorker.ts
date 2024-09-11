'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from '@/paths';


interface CreateRelativeWorkerProps {
  name: string;
  workingHours: number;
  dienstPlanId: number;
}

export async function createRelativeWorker(props: CreateRelativeWorkerProps): Promise<boolean> {
  const { name, workingHours, dienstPlanId } = props;

  try {
    const relativeWorker = await db.dienstRelativeWorker.create({
      data: {
        user_name: name,
        working_hours_month: workingHours,
        dienst_plan_id: dienstPlanId,
      },
    });

    if (!relativeWorker) {
      console.error("Failed to create relative worker");
      return false;
    }
  }
  catch (err) {
    console.error(err);
    return false;
  }

  revalidatePath(paths.dienstPlan.showDienstPlan(dienstPlanId));
  return true;
}