'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { payouts } from "drizzle/schema";
import { eq } from 'drizzle-orm';

interface EditPayoutProps {
  payoutId: number;
  amount: number;
  date: Date;
}

export async function editPayout(
  { payoutId, amount, date }: EditPayoutProps
): Promise<boolean> {

  try {
    await db.update(payouts)
      .set({
        amount: amount,
        date: date,
      })
      .where(eq(payouts.id, payoutId));

  } catch (err: unknown) {
    console.log(err);
    return false;
  }

  revalidatePath(paths.workManager.payout());
  return true;
}