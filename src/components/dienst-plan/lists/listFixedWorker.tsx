import * as actions from '@/actions';
import DeleteFixedWorkerButton from '@/components/dienst-plan/deleteFixedWorker';

interface FixedWorkerProps {
  dienstPlanId: number;
}

export default async function ListFixeWorker(props: FixedWorkerProps) {
  const { dienstPlanId } = props;
  
  const fixedWorker = await actions.getFixedWorker(dienstPlanId);

  if (!fixedWorker) return (<div>Kein Fixed Worker vorhanden</div>);

  const renderedPläne = fixedWorker.map((worker) => {
    return (
      <div key={worker.id} className="flex gap-5 items-center p-3 border-2 border-black justify-between">
        <div className="flex gap-5">
          <div>{worker.user_name}</div>
          <div>{worker.holiday_year}</div>
          <div>{worker.working_hours_week}</div>
          <DeleteFixedWorkerButton workerId={worker.id} dienstPlanId={dienstPlanId} />
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