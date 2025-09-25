'use client';

import { ReactNode } from "react";
import { Database } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ 
  children, 
  title = "Data Visualization Dashboard",
  subtitle = "Beautiful, interactive charts and dashboards"
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2">
            <Database className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {subtitle && (
          <div className="mb-8 text-center">
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              {subtitle}
            </p>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
