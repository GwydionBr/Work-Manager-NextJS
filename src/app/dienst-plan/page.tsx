import HeroHeader from '@/components/heroHeader';
import NewDienstplanForm from '@/components/dienstplan/forms/newDienstplanForm';
import paths from "@/paths";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DienstPlanPage() {
  const session = await auth()
  const user = session?.user
  if (!session || !user) {
    redirect(paths.home())
  }

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