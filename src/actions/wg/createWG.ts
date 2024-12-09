'use server';

import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { auth } from '@/auth';

import { wg } from "drizzle/schema";

interface CreateWgProps {
  wgName: string;
  wgDescription: string;
}

export async function createWG( newWG: CreateWgProps ) {

  // Check if user is authenticated
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

  // Insert new WG into database
  const { wgName, wgDescription } = newWG;
  let createdWg;

  try{
    createdWg = await db.insert(wg).values({
        name: wgName,
        description: wgDescription,
    }).returning();
  } catch (err: any) {
    console.error(err);
    return false;
  }

  revalidatePath(paths.wgGame.wg());
  redirect(paths.wgGame.showWG(createdWg[0].id));
}