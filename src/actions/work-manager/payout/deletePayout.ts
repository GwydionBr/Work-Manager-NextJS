"use server";

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { payouts } from "drizzle/schema";
import { eq } from 'drizzle-orm';

interface DeletePayoutProps {
  payoutId: number;
}

interface DeletePayoutFormState {
  errors: {
    _form?: string[];
  };
}

export async function deletePayout(
  { payoutId }: DeletePayoutProps,
  formState: DeletePayoutFormState,
) {
  try {
    await db.delete(payouts).where(
      eq(payouts.id, payoutId)
    );
  } catch (err: any) {
    return {
      errors: {
        _form: [err.message || 'Something went wrong'],
      },
    };
  }

  revalidatePath(paths.workManager.payout());
}