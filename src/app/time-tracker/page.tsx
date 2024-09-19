import TimerHeader from '@/components/time-tracker/headers/timerHeader';
import NewProjectForm from '@/components/time-tracker/forms/newProjectForm';
import ListProjects from '@/components/time-tracker/project/listProjects';
import {Button} from "@nextui-org/button";
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
      <TimerHeader />
      <div className="flex flex-col gap-4 p-10 items-center">
        <Link href={paths.timeTracker.overview()}>
          <Button>
            Overview
          </Button>
        </Link>
        <NewProjectForm />
        <ListProjects userId={user.id!}/>
      </div>
      
    </div>
  );
}