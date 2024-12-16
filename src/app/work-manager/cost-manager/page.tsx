import HeroHeader from "@/components/heroHeader";
import TwoValueBarChart from "@/components/common/graphs/twoValueBarChart";
import TwoValueAreaChart from "@/components/common/graphs/twoValueAreaChart";
import * as actions from "@/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import paths from "@/paths";

interface ChartDataProps {
  name: string;
  value_1: number;
  value_2: number;
}

export default async function CostManager() {
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    redirect(paths.home());
  }

  const chartData: ChartDataProps[] = [];

  const data = await actions.getMonthEarnings({ userId: user.id ? String(user.id) : "" });
  for (let i = 0; i < data.length; i++) {
      chartData.push({
        name: data[i].month,
        value_1: data[i].totalEarnings,
        value_2: 0,
      });
    }
  console.log(data);

  return (
    <div>
      <HeroHeader title="Cost Manager" />
      <div className="container mx-auto">
        <div className="w-1/2">
          <TwoValueBarChart chartData={chartData} />
        </div>
        <div className="w-1/2">
          <TwoValueAreaChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
