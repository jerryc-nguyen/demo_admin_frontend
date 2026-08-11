"use client";

import { useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VALUE_TYPE_OPTIONS, type ValueType } from "@/features/reports/finance-reports/types";
import type { DailyReportRecord } from "../hooks/useReportDataManagement";

interface ReportRecordDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: DailyReportRecord | null;
  onSubmit: (date: string, valueType: ValueType, value: number) => Promise<boolean>;
}

export function ReportRecordDialog({
  isOpen,
  onOpenChange,
  initialData,
  onSubmit,
}: ReportRecordDialogProps) {
  const [formDate, setFormDate] = useState(initialData ? initialData.date : "");
  const [formType, setFormType] = useState<ValueType>(initialData ? initialData.value_type : "pos_revenue");
  const [formValue, setFormValue] = useState(initialData ? initialData.value.toString() : "");
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormErrors([]);

    if (!formDate) {
      setFormErrors(["Date is required."]);
      setSubmitting(false);
      return;
    }
    const numValue = parseFloat(formValue);
    if (isNaN(numValue) || numValue < 0) {
      setFormErrors(["Value must be a number greater than or equal to 0."]);
      setSubmitting(false);
      return;
    }

    try {
      const success = await onSubmit(formDate, formType, numValue);
      if (success && !initialData) {
        // Reset form on success when adding a new record
        setFormDate("");
        setFormType("pos_revenue");
        setFormValue("");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      } else if (err instanceof Error) {
        setFormErrors([err.message]);
      } else {
        setFormErrors(["An unexpected error occurred. Please try again."]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {!initialData && (
        <DialogTrigger
          render={
            <Button className="cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          }
        />
      )}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Edit Daily Finance Record" : "Add Daily Finance Record"}
            </DialogTitle>
            <DialogDescription>
              {initialData
                ? "Modify data point information below."
                : "Enter data point information below. A duplicate type on the same date is not allowed."}
            </DialogDescription>
          </DialogHeader>

          {formErrors.length > 0 && (
            <div className="my-3 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
              <ul className="list-disc pl-4 space-y-1">
                {formErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Date</label>
              <input
                type="date"
                required
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Type</label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as ValueType)}
                className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {VALUE_TYPE_OPTIONS.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Value</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="0.00"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : (initialData ? "Save Changes" : "Save Record")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
