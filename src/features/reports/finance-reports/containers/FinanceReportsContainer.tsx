"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartOptions } from "../components/ChartOptions";
import { DateRangePicker } from "../components/DateRangePicker";
import { FinanceReportsChart } from "../components/FinanceReportsChart";
import { SummaryMetric } from "../components/SummaryMetric";
import { useFinanceReport } from "../hooks/useFinanceReport";
import { VALUE_TYPE_OPTIONS, type ValueType, type DateRangeMode } from "../types";

const ALL_VALUE_TYPES = VALUE_TYPE_OPTIONS.map((option) => option.key);

export function FinanceReportsContainer() {
  const [selected, setSelected] = useState<ValueType[]>(ALL_VALUE_TYPES);
  const [comparePrevious, setComparePrevious] = useState(false);
  const [dateRangeMode, setDateRangeMode] = useState<DateRangeMode>("this_week");

  const { data, loading, error } = useFinanceReport(selected, comparePrevious, dateRangeMode);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Finance Reports</CardTitle>
        <CardDescription>
          Weekly revenue by channel — stacked bar chart
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ChartOptions
            value={selected}
            comparePrevious={comparePrevious}
            onChange={({ value_types, compare_previous }) => {
              setSelected(value_types);
              setComparePrevious(compare_previous);
            }}
          />
          <DateRangePicker value={dateRangeMode} onChange={setDateRangeMode} />
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load finance reports. Please try again later.
          </div>
        )}

        {loading && !data && (
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground animate-pulse">
            Loading report data...
          </div>
        )}

        {data && (
          <>
            <SummaryMetric metrics={data.metrics} />
            <FinanceReportsChart option={data.chart_options} />
          </>
        )}
      </CardContent>
    </Card>
  );
}

