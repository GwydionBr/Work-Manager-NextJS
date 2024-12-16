"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
    label: "Wert 1",
    color: "#2563eb",
  },
  value_2: {
    label: "Wert 2",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function TwoValueAreaChart({
  chartData,
}: {
  chartData: ChartDataProps[];
}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          type="monotone"
          dataKey="value_1"
          stroke="var(--color-value_1)"
          fill="var(--color-value_1)"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="value_2"
          stroke="var(--color-value_2)"
          fill="var(--color-value_2)"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
