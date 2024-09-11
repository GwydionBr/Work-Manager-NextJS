import TimerHeader from '@/components/time-tracker/headers/timerHeader';
import NewProjectForm from '@/components/time-tracker/forms/newProjectForm';
import ListProjects from '@/components/time-tracker/project/listProjects';
import { Button} from '@nextui-org/react';
import Link from "next/link";
import paths from "@/paths";

export default function TimeTracker() {
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
        <ListProjects />
      </div>
      
    </div>
  );
}