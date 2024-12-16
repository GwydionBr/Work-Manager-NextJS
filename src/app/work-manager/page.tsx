import HeroHeader from '@/components/heroHeader';
import NewProjectForm from '@/components/time-tracker/forms/newProjectForm';
import ListProjects from '@/components/time-tracker/project/listProjects';
import { Button } from "@/components/ui/button"
import { buttonVariants } from '@/components/ui/button';
import Link from "next/link";
import paths from "@/paths";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function TimeTracker() {
  const session = await auth()
  const user = session?.user
  if (!session || !user) {
    redirect(paths.home())
  }
  
  return (
    <div>
      <HeroHeader 
        title="Projects"
      />
      <div className="flex justify-between px-16">
          <Link href={paths.workManager.costManager()} className={buttonVariants({ variant: "secondary" })}>
            Cost Manager
          </Link>
          <Link href={paths.workManager.overview()} className={buttonVariants({ variant: "secondary" })}>
            Overview
          </Link>
      </div>
      <div className="flex flex-col gap-4 p-10 items-center">
        <NewProjectForm />
        <ListProjects userId={user.id!}/>
      </div>
      
    </div>
  );
}

