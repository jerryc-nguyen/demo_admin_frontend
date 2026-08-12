"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();

  const links = [
    {
      href: "/reports/finance-reports",
      label: "Finance Report",
    },
    {
      href: "/reports/report-data-management",
      label: "Data Management",
    },
  ];

  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/80"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
