export type ValueType = "pos_revenue" | "eatclub_revenue" | "labour_cost";

export const VALUE_TYPE_OPTIONS: ReadonlyArray<{
  key: ValueType;
  label: string;
}> = [
  { key: "pos_revenue", label: "POS Revenue" },
  { key: "eatclub_revenue", label: "Eatclub Revenue" },
  { key: "labour_cost", label: "Labour Cost" },
];
