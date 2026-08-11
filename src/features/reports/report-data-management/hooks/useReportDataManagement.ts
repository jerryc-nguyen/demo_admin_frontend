import { useState, useEffect } from "react";
import { apiClient } from "@/commons/api-client";
import type { ValueType } from "@/features/reports/finance-reports/types";

export interface DailyReportRecord {
  id: number;
  date: string;
  value_type: ValueType;
  value: number;
}

export function useReportDataManagement() {
  const [reports, setReports] = useState<DailyReportRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DailyReportRecord | null>(null);

  useEffect(() => {
    let active = true;
    async function fetchReports() {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<DailyReportRecord[]>("/api/v1/reports/daily_finance_reports");
        if (active) {
          setReports(response.data);
        }
      } catch {
        if (active) {
          setError("Failed to fetch reports list. Make sure backend is running.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    fetchReports();
    return () => {
      active = false;
    };
  }, []);

  async function handleCreate(date: string, valueType: ValueType, value: number): Promise<boolean> {
    try {
      const response = await apiClient.post<DailyReportRecord>(
        "/api/v1/reports/daily_finance_reports",
        {
          daily_finance_report: {
            date,
            value_type: valueType,
            value,
          },
        }
      );
      setReports((prev) => [response.data, ...prev]);
      setIsOpen(false);
      return true;
    } catch (err: unknown) {
      throw err;
    }
  }

  async function handleUpdate(id: number, date: string, valueType: ValueType, value: number): Promise<boolean> {
    try {
      const response = await apiClient.put<DailyReportRecord>(
        `/api/v1/reports/daily_finance_reports/${id}`,
        {
          daily_finance_report: {
            date,
            value_type: valueType,
            value,
          },
        }
      );
      setReports((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
      setIsOpen(false);
      setEditingRecord(null);
      return true;
    } catch (err: unknown) {
      throw err;
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this data point?")) {
      return;
    }

    try {
      await apiClient.delete(`/api/v1/reports/daily_finance_reports/${id}`);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete the record. Please try again.");
    }
  }

  return {
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
  };
}
