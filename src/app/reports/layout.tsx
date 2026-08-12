import React from "react";
import { LogoutButton } from "./logout-button";
import { NavLinks } from "./nav-links";

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 shrink-0">
        <div className="flex items-center gap-6">
          <a href='/reports/finance-reports'>
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Admin Dashboard
            </span>
          </a>
          <NavLinks />
        </div>
        <LogoutButton />
      </header>
      <div className="flex-grow flex flex-col pt-14">
        {children}
      </div>
    </div>
  );
}
