import * as actions from '@/actions';
import DeleteRelativeWorkerButton from '@/components/dienst-plan/deleteRelativeWorker';

interface RelativeWorkerProps {
  dienstPlanId: number;
}

export default async function ListRelativeWorker(dienstPlan: RelativeWorkerProps) {

  const fixedWorker = await actions.getRelativeWorker(dienstPlan.dienstPlanId);

  if (!fixedWorker) return (<div>Kein Aushilfen vorhanden</div>);

  const renderedPläne = fixedWorker.map((worker) => {
    return (
      <div key={worker.id} className="flex gap-5 items-center p-3 border-2 border-black justify-between">
        <div className="flex gap-5">
          <div>{worker.user_name}</div>
          <div>{worker.working_hours_month}</div>
          <DeleteRelativeWorkerButton workerId={worker.id} dienstPlanId={dienstPlan.dienstPlanId} />
      </div>
    </div>
    );
  }
  );

  return (
    <div className="flex flex-col gap-5 p-7">
      {renderedPläne}
    </div>
  );
}