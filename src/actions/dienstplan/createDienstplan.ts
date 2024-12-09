'use server';

import { db } from "@/db";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { dienstPlan } from "drizzle/schema";
import { auth } from '@/auth';

const createProjectSchema = z.object({
  dienstplanName: z.string().min(1).max(255),
  dienstplanDescription: z.string().min(1).max(255),
});

interface CreateProjectFormState {
  errors: {
    dienstplanName?: string[];
    dienstplanDescription?: string[];
    _form?: string[];
  };
}

export async function createDienstplan (
  formState: CreateProjectFormState,
  formData: FormData
): Promise<CreateProjectFormState> {

  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

  const result = createProjectSchema.safeParse({
    dienstplanName: formData.get("dienstplanName") as string,
    dienstplanDescription: formData.get("dienstplanDescription") as string,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let plan;
  try {
    plan = await db.insert(dienstPlan).values({
        userId: user.id!,
        name: result.data.dienstplanName,
        description: result.data.dienstplanDescription
    }).returning();
  } catch (err: any) {
    return {
      errors: {
        _form: [err.message || 'Something went wrong'],
      },
    };
  }

  revalidatePath('/dienst-plan');
  redirect(paths.dienstPlan.showPlan(plan[0].id));
}
