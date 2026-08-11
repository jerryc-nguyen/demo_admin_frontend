"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { VALUE_TYPE_OPTIONS, type ValueType } from "../mock-data";

interface ChartOptionsProps {
  value: ValueType[];
  comparePrevious?: boolean;
  onChange: (payload: { value_types: ValueType[]; compare_previous: boolean }) => void;
}

export function ChartOptions({
  value,
  comparePrevious = false,
  onChange,
}: ChartOptionsProps) {
  function handleToggle(key: ValueType, checked: boolean) {
    const next = checked
      ? [...value, key]
      : value.filter((item) => item !== key);

    onChange({ value_types: next, compare_previous: comparePrevious });
  }

  function handleCompareToggle() {
    onChange({ value_types: value, compare_previous: !comparePrevious });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        {VALUE_TYPE_OPTIONS.map((option) => (
          <label
            key={option.key}
            className="flex cursor-pointer items-center gap-2 text-sm font-medium"
          >
            <Checkbox
              checked={value.includes(option.key)}
              onCheckedChange={(checked) =>
                handleToggle(option.key, checked === true)
              }
              value={option.key}
            />
            {option.label}
          </label>
        ))}
      </div>
      <Button
        variant={comparePrevious ? "default" : "outline"}
        onClick={handleCompareToggle}
        className="cursor-pointer"
      >
        <History />
        Compare with previous
      </Button>
    </div>
  );
}

