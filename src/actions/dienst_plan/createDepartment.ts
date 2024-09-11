'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from '@/paths';


interface CreateFixedWorkerProps {
  departmentName: string;
  departmentShortName: string;
  startTimeSummer: string;
  endTimeSummer: string;
  startTimeWinter: string;
  endTimeWinter: string;
  dienstPlanId: number;
}

export async function createDepartment(props: CreateFixedWorkerProps): Promise<boolean> {
  const { dienstPlanId, departmentName, departmentShortName, startTimeSummer, endTimeSummer, startTimeWinter, endTimeWinter } = props;

  try {
    const fixedWorker = await db.dienstDepartment.create({
      data: {
        department_name: departmentName,
        department_short: departmentShortName,
        start_time_summer: startTimeSummer,
        end_time_summer: endTimeSummer,
        start_time_winter: startTimeWinter,
        end_time_winter: endTimeWinter,
        dienst_plan_id: dienstPlanId,
      },
    });

    if (!fixedWorker) {
      console.error("Failed to create department");
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