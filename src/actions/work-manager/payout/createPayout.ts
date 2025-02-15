'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { payouts } from "drizzle/schema";
import { auth } from '@/auth';
import { ServerOutput } from "@/types";

interface CreatePayoutProps {
  amount: number;
  date: Date;
}

export async function createPayout(
  newPayout: CreatePayoutProps
): Promise<ServerOutput> {

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
    return {
      success: false,
      errors: {
        message: err.message || 'Something went wrong',
      },
    };
  }

  revalidatePath(paths.workManager.payout());
  return {
      success: true,
      data: {
        payout: payout[0],
      },
    };
}