'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { HumanSilhouette } from "./HumanSilhouette";
import { AnalyticsPanel } from "./AnalyticsPanel";
import { processStudentData } from "@/utils/processData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StudentStressVisualization() {
  const data = processStudentData();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const handleFigureClick = (groupKey: string) => {
    setSelectedGroup(groupKey);
    setIsAnalyticsOpen(true);
  };

  const handleCloseAnalytics = () => {
    setIsAnalyticsOpen(false);
    setSelectedGroup(null);
  };

  const getSelectedGroupData = () => {
    if (!selectedGroup) return null;
    
    switch (selectedGroup) {
      case 'low':
        return {
          label: data.lowStudy.label,
          studentCount: data.lowStudy.students,
          studyRange: data.lowStudy.range,
          averageStudyHours: data.lowStudy.averageStudyHours,
          stressed: data.lowStudy.stressed,
          notStressed: data.lowStudy.notStressed,
          depends: data.lowStudy.depends
        };
      case 'medium':
        return {
          label: data.mediumStudy.label,
          studentCount: data.mediumStudy.students,
          studyRange: data.mediumStudy.range,
          averageStudyHours: data.mediumStudy.averageStudyHours,
          stressed: data.mediumStudy.stressed,
          notStressed: data.mediumStudy.notStressed,
          depends: data.mediumStudy.depends
        };
      case 'high':
        return {
          label: data.highStudy.label,
          studentCount: data.highStudy.students,
          studyRange: data.highStudy.range,
          averageStudyHours: data.highStudy.averageStudyHours,
          stressed: data.highStudy.stressed,
          notStressed: data.highStudy.notStressed,
          depends: data.highStudy.depends
        };
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Study Intensity vs Financial Stress
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Each figure shows study hours through glow color - green for light study, orange for moderate, red for intense. Click on any figure to see detailed financial stress analytics.
        </p>
      </motion.div>

      {/* Main Visualization */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Light Studiers */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <HumanSilhouette
                studyHours={data.lowStudy.averageStudyHours}
                financialStressLevel={data.lowStudy.stressed}
                label={data.lowStudy.label}
                studyRange={data.lowStudy.range}
                studentCount={data.lowStudy.students}
                onFigureClick={() => handleFigureClick('low')}
              />
            </motion.div>

            {/* Moderate Studiers */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <HumanSilhouette
                studyHours={data.mediumStudy.averageStudyHours}
                financialStressLevel={data.mediumStudy.stressed}
                label={data.mediumStudy.label}
                studyRange={data.mediumStudy.range}
                studentCount={data.mediumStudy.students}
                onFigureClick={() => handleFigureClick('medium')}
              />
            </motion.div>

            {/* Intense Studiers */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <HumanSilhouette
                studyHours={data.highStudy.averageStudyHours}
                financialStressLevel={data.highStudy.stressed}
                label={data.highStudy.label}
                studyRange={data.highStudy.range}
                studentCount={data.highStudy.students}
                onFigureClick={() => handleFigureClick('high')}
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">Visual Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-3">Study Hours (Glow Color)</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>Green: 1-2 hours daily</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span>Orange: 3-4 hours daily</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span>Red: 5+ hours daily</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Data Summary</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• {data.overall.totalStudents} students surveyed across multiple universities</div>
                  <div>• Average study time: {data.overall.averageStudyHours.toFixed(1)} hours daily</div>
                  <div>• Financial stress affects {data.overall.stressed.toFixed(0)}% of students</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{data.overall.totalStudents}</div>
                <div className="text-sm text-gray-600">Students Surveyed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{data.overall.averageStudyHours.toFixed(1)}h</div>
                <div className="text-sm text-gray-600">Average Study Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{data.overall.stressed.toFixed(0)}%</div>
                <div className="text-sm text-gray-600">Experience Financial Stress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comprehensive Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Data Analysis & Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visual Description */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Visual Description</h3>
              <p className="text-blue-800 leading-relaxed">
                This interactive data visualization presents three human silhouettes representing distinct student study intensity groups. 
                Each figure uses colored glow effects to represent daily study hours: <span className="font-semibold text-green-600">green for light studiers (1-2 hours)</span>, 
                <span className="font-semibold text-orange-600"> orange for moderate studiers (3-4 hours)</span>, and 
                <span className="font-semibold text-red-600"> red for intense studiers (5+ hours)</span>. 
                The visualization allows users to click on any figure to reveal detailed financial stress analytics through a sliding panel interface, 
                creating an engaging, human-centered approach to understanding complex data relationships.
              </p>
            </div>

            {/* Key Findings */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Key Findings from the Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Study Intensity Distribution</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• <strong>Light Studiers:</strong> {data.lowStudy.students} students ({((data.lowStudy.students / data.overall.totalStudents) * 100).toFixed(1)}%)</li>
                    <li>• <strong>Moderate Studiers:</strong> {data.mediumStudy.students} students ({((data.mediumStudy.students / data.overall.totalStudents) * 100).toFixed(1)}%)</li>
                    <li>• <strong>Intense Studiers:</strong> {data.highStudy.students} students ({((data.highStudy.students / data.overall.totalStudents) * 100).toFixed(1)}%)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Financial Stress Patterns</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• <strong>Highest Stress:</strong> Intense studiers ({data.highStudy.stressed.toFixed(0)}%)</li>
                    <li>• <strong>Moderate Stress:</strong> Light studiers ({data.lowStudy.stressed.toFixed(0)}%)</li>
                    <li>• <strong>Lowest Stress:</strong> Moderate studiers ({data.mediumStudy.stressed.toFixed(0)}%)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Insights */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Critical Insights Discovered</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">1. The Study-Finance Paradox</h4>
                  <p className="text-purple-700 text-sm mt-1">
                    Contrary to expectations, students who study the most (5+ hours daily) experience the highest financial stress ({data.highStudy.stressed.toFixed(0)}%), 
                    while moderate studiers (3-4 hours) show the lowest stress levels ({data.mediumStudy.stressed.toFixed(0)}%). This suggests that intense academic 
                    commitment may correlate with reduced work opportunities or increased financial pressure from academic expenses.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">2. The Sweet Spot of Balance</h4>
                  <p className="text-purple-700 text-sm mt-1">
                    Moderate studiers represent the optimal balance, maintaining {data.mediumStudy.averageStudyHours.toFixed(1)} hours of daily study while experiencing 
                    the lowest financial stress. This group may have better time management skills, allowing them to work part-time jobs or manage their finances 
                    more effectively alongside their studies.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">3. Light Studiers' Hidden Burden</h4>
                  <p className="text-purple-700 text-sm mt-1">
                    Despite studying only {data.lowStudy.averageStudyHours.toFixed(1)} hours daily, light studiers still experience significant financial stress ({data.lowStudy.stressed.toFixed(0)}%). 
                    This may indicate underlying factors such as lower family income, need for full-time work, or other financial responsibilities that limit 
                    their ability to dedicate time to studies.
                  </p>
                </div>
              </div>
            </div>

            {/* Implications */}
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">Implications for Student Support</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">For Institutions</h4>
                  <ul className="text-orange-700 space-y-1 text-sm">
                    <li>• Develop flexible work-study programs</li>
                    <li>• Offer financial literacy workshops</li>
                    <li>• Create time management resources</li>
                    <li>• Provide emergency financial assistance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">For Students</h4>
                  <ul className="text-orange-700 space-y-1 text-sm">
                    <li>• Find the optimal study-work balance</li>
                    <li>• Seek financial counseling early</li>
                    <li>• Explore scholarship opportunities</li>
                    <li>• Consider part-time study options</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Quality */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Data Quality & Methodology</h4>
              <p className="text-gray-600 text-sm">
                This analysis is based on {data.overall.totalStudents} student responses from multiple universities. The visualization uses 
                interactive elements to reveal granular insights, with financial stress levels calculated as percentages of students 
                reporting stress within each study intensity group. Click on any figure above to explore detailed breakdowns.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics Panel */}
      {getSelectedGroupData() && (
        <AnalyticsPanel
          isOpen={isAnalyticsOpen}
          onClose={handleCloseAnalytics}
          data={getSelectedGroupData()!}
        />
      )}
    </div>
  );
}
