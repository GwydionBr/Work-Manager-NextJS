'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { payouts } from "drizzle/schema";
import { auth } from '@/auth';

interface CreatePayoutProps {
  amount: number;
  date: Date;
}

export async function createPayout(
  newPayout: CreatePayoutProps
) {

  // Check if user is authenticated
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

  // Insert new payout into database
  const { amount, date } = newPayout;
  let payout;

  try {
    payout = await db.insert(payouts).values({
        userId: user.id!,
        amount,
        date,
    }).returning();
  } catch (err: any) {
    return false;
  }

  revalidatePath(paths.workManager.payout());
}