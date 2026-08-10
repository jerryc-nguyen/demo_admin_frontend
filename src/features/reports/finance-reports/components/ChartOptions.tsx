"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { VALUE_TYPE_OPTIONS, type ValueType } from "../mock-data";

interface ChartOptionsProps {
  value: ValueType[];
  onChange: (payload: { value_types: ValueType[] }) => void;
}

export function ChartOptions({ value, onChange }: ChartOptionsProps) {
  function handleToggle(key: ValueType, checked: boolean) {
    const next = checked
      ? [...value, key]
      : value.filter((item) => item !== key);

    onChange({ value_types: next });
  }

  return (
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
  );
}
