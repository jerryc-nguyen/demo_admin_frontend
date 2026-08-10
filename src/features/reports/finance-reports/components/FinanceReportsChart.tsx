"use client";

import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

interface FinanceReportsChartProps {
  option: EChartsOption | null;
}

export function FinanceReportsChart({ option }: FinanceReportsChartProps) {
  if (!option) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-muted-foreground">
        No data available
      </div>
    );
  }

  return <ReactECharts option={option} style={{ height: 384 }} notMerge lazyUpdate />;
}
