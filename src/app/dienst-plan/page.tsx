import DienstPlanHeader from "@/components/dienst-plan/dienstPlanHeader";
import CreateDienstPlanForm from "@/components/dienst-plan/forms/createDienstPlanForm";
import ListPläne from "@/components/dienst-plan/lists/listPläne";

export default function DienstPlanPage() {
  return (
    <div >
      <DienstPlanHeader />
      <div className="flex flex-col items-center p-5">
        <CreateDienstPlanForm />
        <ListPläne />
      </div>
    </div>
  );
}