"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface ChartDataProps {
  name: string;
  value_1: number;
  value_2: number;
}

const chartConfig = {
  value_1: {
    label: "Earnings",
    color: "#2563eb",
  },
  value_2: {
    label: "Expenses",
    color: "#dc2626",
  },
} satisfies ChartConfig;

export default function TwoValueBarChart({
  chartData,
}: {
  chartData: ChartDataProps[];
}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="value_1" fill="var(--color-value_1)" radius={4} />
        <Bar dataKey="value_2" fill="var(--color-value_2)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
