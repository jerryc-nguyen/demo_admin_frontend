import type { DateRangeMode } from "../types";

interface DateRangePickerProps {
  value: DateRangeMode;
  onChange: (value: DateRangeMode) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Range:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DateRangeMode)}
        className="h-9 w-[140px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        <option value="this_week">This Week</option>
        <option value="this_month">This Month</option>
        <option value="this_year">This Year</option>
      </select>
    </div>
  );
}
