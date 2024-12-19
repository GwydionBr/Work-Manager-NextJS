import HeroHeader from "@/components/heroHeader";
import ListExpenses from "@/components/time-tracker/expenses/listExpenses";
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
      <ReturnButton className="pl-8" path={paths.workManager.costManager()} />
      <div className="flex justify-between px-16">
        <div className="flex flex-col gap-4 p-10 items-center">
          <NewExpenseForm />
          <ListExpenses userId={user.id!} />
        </div>
      </div>
    </div>
  );
}
