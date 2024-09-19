import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import paths from "@/paths";


export async function checkAuth() {
 const session = await auth()
  if (!session) {
    redirect(paths.home())
  }
  else {
    return session
  }
}