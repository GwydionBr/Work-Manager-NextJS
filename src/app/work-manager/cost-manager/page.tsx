import HeroHeader from "@/components/heroHeader";
import TwoValueBarChart from "@/components/common/graphs/twoValueBarChart";
import TwoValueAreaChart from "@/components/common/graphs/twoValueAreaChart";
import NewExpenseForm from "@/components/time-tracker/forms/newExpenseForm";
import * as actions from "@/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import paths from "@/paths";
import Link from "next/link";

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

  const earnings = await actions.getMonthEarnings({
    userId: user.id ? String(user.id) : "",
  });
  for (let i = 0; i < earnings.length; i++) {
    chartData.push({
      name: earnings[i].month,
      value_1: earnings[i].totalEarnings,
      value_2: 0,
    });
  }

  const expenses = await actions.getMonthExpenses({
    userId: user.id ? String(user.id) : "",
  });
  for (let i = 0; i < expenses.length; i++) {
    const expenseMonth = expenses[i].month;
    const expenseValue = expenses[i].totalExpenses;
    const chartDataItem = chartData.find((item) => item.name === expenseMonth);
    if (chartDataItem) {
      chartDataItem.value_2 = expenseValue;
    } else {
      chartData.push({
        name: expenseMonth,
        value_1: 0,
        value_2: expenseValue,
      });
    }
  }

  return (
    <div>
      <HeroHeader title="Cost Manager" />
      <div className="grid grid-cols-2 gap-4 p-10">
        <div className="">
          <TwoValueBarChart chartData={chartData} />
          <TwoValueAreaChart chartData={chartData} />
        </div>
        <div className="">
          <NewExpenseForm />
          <Link href={paths.workManager.expenses()}>
            View Expenses
          </Link>
        </div>
      </div>
    </div>
  );
}
