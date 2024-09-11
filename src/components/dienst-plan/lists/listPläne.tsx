import * as actions from '@/actions';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

export default async function ListPläne() {

  const dienstpläne = await actions.getDienstPläne();

  if (!dienstpläne) return (<div>Keine Pläne vorhanden</div>);

  const renderedPläne = dienstpläne.map((plan) => {
    return (
      <div key={plan.id} className="flex gap-5 items-center p-3 border-2 border-black justify-between">
        {plan.name}
        <Link href={`/dienst-plan/${plan.id}`}>
          <Button>Details</Button>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-5 p-7">
      {renderedPläne}
    </div>
  );
}