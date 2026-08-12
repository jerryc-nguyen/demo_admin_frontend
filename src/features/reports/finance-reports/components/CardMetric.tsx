import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardMetricProps {
  title: string;
  value: number;
  previousValue?: number;
}

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatPercentChange(value: number, previousValue: number): string | null {
  if (previousValue <= 0) {
    return null;
  }

  const pct = ((value - previousValue) / previousValue) * 100;

  if (pct > 0) {
    return `(+${percentFormatter.format(pct)}%)`;
  }

  if (pct < 0) {
    return `(${percentFormatter.format(pct)}%)`;
  }

  return "(0%)";
}

export function CardMetric({ title, value, previousValue }: CardMetricProps) {
  const change =
    previousValue != null ? formatPercentChange(value, previousValue) : null;

  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle className='text-muted-foreground'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold tracking-tight">
          {numberFormatter.format(value)}
          {change && (
            <>
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                vs {numberFormatter.format(previousValue ?? 0)}
              </span>
              <span
                className={
                  change === "(0%)"
                    ? "ml-2 text-sm font-medium text-muted-foreground"
                    : change.startsWith("(+")
                      ? "ml-2 text-sm font-medium text-emerald-600"
                      : "ml-2 text-sm font-medium text-red-600"
                }
              >
                {change}
              </span>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
