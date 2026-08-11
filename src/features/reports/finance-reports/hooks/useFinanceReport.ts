import { useState, useEffect } from "react";
import axios from "axios";
import { apiClient } from "@/commons/api-client";
import type { EChartsOption } from "echarts";
import type { ValueType } from "../types";

export interface SummaryMetricData {
  title: string;
  value: number;
  previousValue?: number;
}

export interface FinanceReportResponse {
  chart_options: EChartsOption;
  metrics: SummaryMetricData[];
}

export function useFinanceReport(
  valueTypes: ValueType[],
  comparePrevious: boolean
) {
  const [data, setData] = useState<FinanceReportResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<FinanceReportResponse>(
          "/api/v1/reports/finance_reports",
          {
            signal: controller.signal,
            params: {
              compare_with_previous: comparePrevious,
              value_types: valueTypes.join(","),
            },
          }
        );
        setData(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
            setError(err);
          }
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    }

    if (valueTypes.length > 0) {
      fetchData();
    } else {
      const timer = setTimeout(() => {
        setData({
          chart_options: {
            xAxis: { type: "category", data: [] },
            yAxis: { type: "value" },
            series: [],
          },
          metrics: [],
        });
        setLoading(false);
      }, 0);

      return () => {
        clearTimeout(timer);
        controller.abort();
      };
    }

    return () => {
      controller.abort();
    };
  }, [valueTypes, comparePrevious]);

  return { data, loading, error };
}
