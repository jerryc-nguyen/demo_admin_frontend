import React from "react";
import { LogoutButton } from "./logout-button";

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 font-sans">
      <header className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 shrink-0">
        <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Admin Dashboard
        </span>
        <LogoutButton />
      </header>
      <div className="flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
}
