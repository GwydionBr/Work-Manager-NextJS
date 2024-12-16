import HeroHeader from "@/components/heroHeader";
import FirstGraph from "@/components/common/graphs/firstGraph";

export default function CostManager() {
  return (
    <div>
      <HeroHeader title="Cost Manager" />
      <div className="container mx-auto">
        <h1>Welcome to your Cost Manager</h1>
        <div className="w-1/2">
          <FirstGraph/>
        </div>
      </div>
    </div>
  );
}