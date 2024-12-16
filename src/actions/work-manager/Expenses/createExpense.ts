'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { spendings } from "drizzle/schema";
import { auth } from '@/auth';


interface CreateExpenseProps {
  title: string;
  amount: number;
  description?: string;
  monthly: boolean;
  startDate: Date;
  endDate?: Date;
}

export async function createExpense(
  newExpense: CreateExpenseProps
) {

  // Check if user is authenticated
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

  // Insert new expense into database
  const { title, amount, description, monthly, startDate, endDate } = newExpense;
  let expense;

  try {
    expense = await db.insert(spendings).values({
        userId: user.id!,
        title,
        amount,
        description,
        monthly,
        startDate,
        endDate,
    }).returning();
  } catch (err: any) {
    return false;
  }

  revalidatePath(paths.workManager.costManager());
}