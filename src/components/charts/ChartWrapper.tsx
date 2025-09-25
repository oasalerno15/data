'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ChartWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ChartWrapper({ title, description, children, className = "" }: ChartWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
