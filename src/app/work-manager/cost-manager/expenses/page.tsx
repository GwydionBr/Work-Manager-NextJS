import HeroHeader from "@/components/heroHeader";
import NewProjectForm from "@/components/time-tracker/forms/newProjectForm";
import ListProjects from "@/components/time-tracker/project/listProjects";
import ReturnButton from "@/components/common/returnButton";
import NewExpenseForm from "@/components/time-tracker/forms/newExpenseForm";
import paths from "@/paths";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function TimeTracker() {
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

  return (
    <div>
      <HeroHeader title="Expenses" />
      <div className="flex justify-between px-16">
        <ReturnButton path={paths.workManager.costManager()} />
        <div className="flex flex-col gap-4 p-10 items-center">
          <NewExpenseForm />
        </div>
      </div>
    </div>
  );
}
