'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import type { DienstPlan } from "@prisma/client";
import { redirect } from 'next/navigation';
import paths from '@/paths';

export async function createDienstPlan(dienst_name: string): Promise<boolean> {
  let newDienstPlan: DienstPlan;
  try {
    newDienstPlan = await db.dienstPlan.create({
      data: {
        name: dienst_name,
      },
    });
  } catch (err: any) {
    console.error(err);
    return false;
  }

  revalidatePath('/dienst-plan');
  redirect(paths.dienstPlan.showDienstPlan(newDienstPlan.id));
}