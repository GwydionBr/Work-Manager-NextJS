'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from '@/paths';


interface CreateFixedWorkerProps {
  name: string;
  holiday: number;
  workingHours: number;
  dienstPlanId: number;
}

export async function createFixedWorker(props: CreateFixedWorkerProps): Promise<boolean> {
  const { name, holiday, workingHours, dienstPlanId } = props;

  try {
    const fixedWorker = await db.dienstFixedWorker.create({
      data: {
        user_name: name,
        holiday_year: holiday,
        working_hours_week: workingHours,
        dienst_plan_id: dienstPlanId,
      },
    });

    if (!fixedWorker) {
      console.error("Failed to create fixed worker");
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