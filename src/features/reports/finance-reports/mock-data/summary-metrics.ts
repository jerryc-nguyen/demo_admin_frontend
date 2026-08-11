export interface SummaryMetric {
  title: string;
  value: number;
  previousValue?: number;
}

export const summaryMetrics: SummaryMetric[] = [
  { title: "Total Revenue", value: 1234567.89, previousValue: 987654.32 },
  { title: "Average per Day", value: 4567.89, previousValue: 4000 },
  { title: "Total Cover", value: 1250, previousValue: 1100 },
];