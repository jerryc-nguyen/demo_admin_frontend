"use client";

import { useState } from "react";
import type { EChartsOption } from "echarts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartOptions } from "../components/ChartOptions";
import { FinanceReportsChart } from "../components/FinanceReportsChart";
import { SummaryMetric } from "../components/SummaryMetric";
import {
  chartCategories,
  financeData,
  VALUE_TYPE_OPTIONS,
  type ValueType,
} from "../mock-data";
import { summaryMetrics } from "../mock-data/summary-metrics";

function buildChartOption(selected: ValueType[]): EChartsOption | null {
  if (selected.length === 0) {
    return null;
  }

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {},
    xAxis: [{ type: "category", data: chartCategories }],
    yAxis: [{ type: "value" }],
    series: selected.map((key) => ({
      name: VALUE_TYPE_OPTIONS.find((option) => option.key === key)?.label ?? key,
      type: "bar",
      stack: "total",
      emphasis: { focus: "series" },
      data: financeData[key],
    })),
  };
}

const ALL_VALUE_TYPES = VALUE_TYPE_OPTIONS.map((option) => option.key);

export function FinanceReportsContainer() {
  const [selected, setSelected] = useState<ValueType[]>(ALL_VALUE_TYPES);

  const option = buildChartOption(selected);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Finance Reports</CardTitle>
        <CardDescription>
          Weekly revenue by channel — stacked bar chart
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">

        <ChartOptions
          value={selected}
          onChange={({ value_types }) => setSelected(value_types)}
        />
        <SummaryMetric metrics={summaryMetrics} />
        <FinanceReportsChart option={option} />
      </CardContent>
    </Card>
  );
}
