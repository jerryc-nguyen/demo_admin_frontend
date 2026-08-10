export const chartCategories: string[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export type ValueType = "pos_revenue" | "eatclub_revenue" | "labour_cost";

export const VALUE_TYPE_OPTIONS: ReadonlyArray<{
  key: ValueType;
  label: string;
}> = [
  { key: "pos_revenue", label: "Post Revenue" },
  { key: "eatclub_revenue", label: "Eatclub Revenue" },
  { key: "labour_cost", label: "Labour cost" },
];

export const financeData: Record<ValueType, number[]> = {
  pos_revenue: [320, 332, 301, 334, 390, 330, 320],
  eatclub_revenue: [120, 132, 101, 134, 90, 230, 210],
  labour_cost: [220, 182, 191, 234, 290, 330, 310],
};
