import HeroHeader from "@/components/header/heroHeader";
import paths from "@/paths";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import * as actions from "@/actions";

interface DienstPlanPageProps {
  params: {
    dienstPlanId: string;
  };
}

export default async function ShowPlan({ params }: DienstPlanPageProps) {
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

  const dienstPlanId = parseInt(params.dienstPlanId);
  const dienstPlan = await actions.getPlanById(dienstPlanId);

  return (
    <div>
      <HeroHeader title="Failed" />
      <div className="flex flex-col gap-4 p-10 items-center"></div>
    </div>
  );
}
