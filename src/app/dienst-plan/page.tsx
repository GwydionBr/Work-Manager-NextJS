import HeroHeader from '@/components/heroHeader';
import NewDienstplanForm from '@/components/dienstplan/forms/newDienstplanForm';

export default function DienstPlanPage() {
  return (
    <div >
      <HeroHeader 
        title="Dienstplan"
      />
      <div className="flex flex-col gap-4 p-10 items-center">
        <NewDienstplanForm />
      </div>
    </div>
  );
}