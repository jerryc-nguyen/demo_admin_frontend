import type { SummaryMetric as SummaryMetricData } from "../mock-data/summary-metrics";
import { CardMetric } from "./CardMetric";

interface SummaryMetricProps {
  metrics: SummaryMetricData[];
}

export function SummaryMetric({ metrics }: SummaryMetricProps) {
  if (metrics.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No data available</div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {metrics.map((metric) => (
        <CardMetric key={metric.title} title={metric.title} value={metric.value} />
      ))}
    </div>
  );
}