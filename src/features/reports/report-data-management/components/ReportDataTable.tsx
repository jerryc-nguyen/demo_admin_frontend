"use client";

import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VALUE_TYPE_OPTIONS, type ValueType } from "@/features/reports/finance-reports/types";
import type { DailyReportRecord } from "../hooks/useReportDataManagement";

interface ReportDataTableProps {
  reports: DailyReportRecord[];
  onEdit: (record: DailyReportRecord) => void;
  onDelete: (id: number) => void;
}

export function ReportDataTable({ reports, onEdit, onDelete }: ReportDataTableProps) {
  function formatValueType(type: ValueType) {
    return VALUE_TYPE_OPTIONS.find((opt) => opt.key === type)?.label ?? type;
  }

  return (
    <div className="relative overflow-x-auto border rounded-lg">
      <table className="w-full text-sm text-left text-muted-foreground">
        <thead className="text-xs uppercase bg-muted text-muted-foreground border-b font-medium">
          <tr>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Value Type</th>
            <th scope="col" className="px-6 py-3 text-right">Value</th>
            <th scope="col" className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {reports.map((report) => (
            <tr key={report.id} className="bg-background hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                {report.date}
              </td>
              <td className="px-6 py-4">
                {formatValueType(report.value_type)}
              </td>
              <td className="px-6 py-4 text-right font-mono text-foreground">
                {report.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(report)}
                  className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer mr-1"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(report.id)}
                  className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
