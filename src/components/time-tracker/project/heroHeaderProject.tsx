import EditProjectSheet from "@/components/time-tracker/forms/editProjectSheet";

import { TimerProject } from "@/types";

interface HeroHeaderProps {
  project?: TimerProject;
}

export default function HeroHeaderProject({ project }: HeroHeaderProps) {
  return (
    <header className="w-full p-8 bg-background text-foreground">
      <div className="container mx-auto flex flex-col justify-center items-center gap-4">
        <div className="grid grid-cols-3">
          <h1 className="text-4xl col-start-2">{project?.projectName}</h1>
          {project ? <EditProjectSheet project={project} /> : null}
        </div>
        <p className="text-sm ml-4">{project?.projectDescription}</p>
      </div>
    </header>
  );
}
