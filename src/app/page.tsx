'use client';

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StudentStressVisualization } from "@/components/charts/StudentStressVisualization";

export default function Home() {
  return (
    <DashboardLayout
      title="Student Life Analytics"
      subtitle="Exploring the relationship between study habits and financial stress through innovative human-centered visualization"
    >
      <StudentStressVisualization />
    </DashboardLayout>
  );
}