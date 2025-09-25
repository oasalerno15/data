'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, DollarSign, TrendingDown, TrendingUp, Users } from "lucide-react";

interface AnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    label: string;
    studentCount: number;
    studyRange: string;
    averageStudyHours: number;
    stressed: number;
    notStressed: number;
    depends: number;
  };
}

export function AnalyticsPanel({ isOpen, onClose, data }: AnalyticsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <Card className="h-full border-0 rounded-none">
              <CardHeader className="border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Financial Stress Analytics
                  </CardTitle>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{data.label} - {data.studyRange}</p>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {/* Overview */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Student Overview</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{data.studentCount}</div>
                  <div className="text-sm text-blue-700">students surveyed</div>
                </div>

                {/* Financial Stress Breakdown */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Financial Stress Breakdown
                  </h3>
                  
                  <div className="space-y-4">
                    {/* High Stress */}
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium text-red-800">High Stress</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-900">{data.stressed.toFixed(0)}%</div>
                        <div className="text-xs text-red-700">
                          {Math.round((data.stressed / 100) * data.studentCount)} students
                        </div>
                      </div>
                    </div>

                    {/* Moderate Stress */}
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium text-yellow-800">Depends</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-900">{data.depends.toFixed(0)}%</div>
                        <div className="text-xs text-yellow-700">
                          {Math.round((data.depends / 100) * data.studentCount)} students
                        </div>
                      </div>
                    </div>

                    {/* Low Stress */}
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-800">Low Stress</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-900">{data.notStressed.toFixed(0)}%</div>
                        <div className="text-xs text-green-700">
                          {Math.round((data.notStressed / 100) * data.studentCount)} students
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Pattern Insights */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Study Pattern Analysis
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Average study time: <span className="font-medium">{data.averageStudyHours.toFixed(1)} hours</span></div>
                    <div>• Study range: <span className="font-medium">{data.studyRange}</span></div>
                    <div>• Total stress response: <span className="font-medium">{(data.stressed + data.depends).toFixed(0)}%</span></div>
                  </div>
                </div>

                {/* Key Insight */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4" />
                    <span className="font-semibold">Key Insight</span>
                  </div>
                  <p className="text-sm">
                    {data.stressed > 30 
                      ? "High financial stress levels indicate potential impact on academic performance."
                      : data.depends > 40
                      ? "Mixed stress responses suggest situational financial concerns."
                      : "Low financial stress levels may support better academic focus."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
