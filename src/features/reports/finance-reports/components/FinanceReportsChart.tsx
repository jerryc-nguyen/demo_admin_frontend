"use client";

import React, { useRef, useEffect, useState } from "react";
import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

interface EChartsInstance {
  resize: () => void;
}

interface FinanceReportsChartProps {
  option: EChartsOption | null;
}

export function FinanceReportsChart({ option }: FinanceReportsChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<EChartsInstance | null>(null);

  useEffect(() => {
    if (!chartInstance || !containerRef.current) return;

    // Trigger initial resize once the chart instance is ready
    chartInstance.resize();

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [chartInstance]);

  if (!option) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-muted-foreground">
        No data available
      </div>
    );
  }

  // Override grid configuration to reduce unused left and right margin spaces
  const modifiedOption: EChartsOption = {
    ...option,
    grid: {
      top: "40px",
      containLabel: true,
      ...option.grid,
      // Force compact left and right margins (with containLabel ensuring labels remain visible)
      left: "4px",
      right: "4px",
    },
  };

  return (
    <div ref={containerRef} className="w-full">
      <ReactECharts
        option={modifiedOption}
        style={{ height: 400, width: "100%" }}
        notMerge
        lazyUpdate
        onChartReady={setChartInstance}
      />
    </div>
  );
}
