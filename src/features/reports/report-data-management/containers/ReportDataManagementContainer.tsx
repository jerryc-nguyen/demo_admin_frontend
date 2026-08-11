"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReportRecordDialog } from "../components/ReportRecordDialog";
import { ReportDataTable } from "../components/ReportDataTable";
import { useReportDataManagement } from "../hooks/useReportDataManagement";

export function ReportDataManagementContainer() {
  const {
    reports,
    loading,
    error,
    isOpen,
    setIsOpen,
    editingRecord,
    setEditingRecord,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useReportDataManagement();

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      setEditingRecord(null);
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between space-y-0 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/reports/finance-reports">
              <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle>Report Data Management</CardTitle>
          </div>
          <CardDescription>
            Create, view, and delete daily finance report entries
          </CardDescription>
        </div>

        <ReportRecordDialog
          key={editingRecord ? `edit-${editingRecord.id}-${isOpen}` : `add-${isOpen}`}
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
          initialData={editingRecord}
          onSubmit={(date, type, value) => {
            if (editingRecord) {
              return handleUpdate(editingRecord.id, date, type, value);
            } else {
              return handleCreate(date, type, value);
            }
          }}
        />
      </CardHeader>
      <CardContent>
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground animate-pulse">
            Loading report entries...
          </div>
        ) : reports.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground border border-dashed rounded-lg">
            No entries found. Click &quot;Add Record&quot; to create one.
          </div>
        ) : (
          <ReportDataTable
            reports={reports}
            onEdit={(record) => {
              setEditingRecord(record);
              setIsOpen(true);
            }}
            onDelete={handleDelete}
          />
        )}
      </CardContent>
    </Card>
  );
}
