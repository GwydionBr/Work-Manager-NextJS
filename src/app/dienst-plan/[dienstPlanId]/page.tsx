import { DienstPlan } from '@prisma/client';
import Link from 'next/link';
import paths from '@/paths';
import { Button } from '@nextui-org/react';
import * as actions from '@/actions';
import AddFixedWorkerForm from '@/components/dienst-plan/forms/addFixedWorkerForm';
import AddRelativeWorkerForm from '@/components/dienst-plan/forms/addRelativeWorkerForm';
import ListFixeWorker from '@/components/dienst-plan/lists/listFixedWorker';
import ListRelativeWorker from '@/components/dienst-plan/lists/listRelativeWorker';
import AddDepartment from '@/components/dienst-plan/forms/addDepartment';

interface CreateDienstPlanProps {
  params: {
    dienstPlanId: string;
  };
}

export default async function DienstPlanPage({ params }: CreateDienstPlanProps) {
  const dienstPlanId = parseInt(params.dienstPlanId);

  let dienstPlan: DienstPlan | null;
  dienstPlan = await actions.getDienstPlanById(dienstPlanId)

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      {dienstPlan ? <h1 className="text-xl font-bold pb-7">{dienstPlan.name}</h1> : `Could not find DienstPlan with the ID ${dienstPlanId}`}
      <div>
        <Link href={paths.dienstPlan.dienstPlan()}>
          <Button color="default">Back</Button>
        </Link>
        
      </div>
      <div className="w-9/12 flex justify-around">
        <div className="flex flex-col gap-5 align-center">
          <AddRelativeWorkerForm dienstPlanId={dienstPlanId} />
          <ListRelativeWorker dienstPlanId={dienstPlanId} />
        </div>
        <div className="flex flex-col gap-5 align-center">
          <AddFixedWorkerForm dienstPlanId={dienstPlanId} />
          <ListFixeWorker dienstPlanId={dienstPlanId} />
        </div>
        <div className="flex flex-col gap-5 align-center">
          <AddDepartment dienstPlanId={dienstPlanId} />
        </div>
      </div>

    </div>
  );
}