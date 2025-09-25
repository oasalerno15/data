'use client';

import { motion } from "framer-motion";

interface HumanSilhouetteProps {
  studyHours: number;
  financialStressLevel: number; // 0-100 percentage
  label: string;
  studyRange: string;
  studentCount: number;
  onFigureClick: () => void;
}

export function HumanSilhouette({ 
  studyHours, 
  financialStressLevel, 
  label, 
  studyRange, 
  studentCount,
  onFigureClick
}: HumanSilhouetteProps) {
  
  // Body fill configuration based on financial stress
  const getBodyFillConfig = () => {
    if (financialStressLevel <= 25) {
      return {
        fillPercentage: 0,
        fillColor: "#22c55e", // Green
        description: "Low Stress"
      };
    } else if (financialStressLevel <= 75) {
      return {
        fillPercentage: 50,
        fillColor: "#eab308", // Yellow
        description: "Moderate Stress"
      };
    } else {
      return {
        fillPercentage: 100,
        fillColor: "#ef4444", // Red
        description: "High Stress"
      };
    }
  };

  // Study intensity glow color
  const getStudyGlowColor = () => {
    if (studyHours <= 2) return "#10b981"; // Green
    if (studyHours <= 4) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  const bodyFill = getBodyFillConfig();
  const glowColor = getStudyGlowColor();

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* Figure Container */}
      <div className="relative w-56 h-72 flex items-center justify-center">
        {/* Study Hours Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0 rounded-full blur-xl"
          style={{ backgroundColor: glowColor }}
        />
        
        {/* Human Figure - Centered within glow */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
          className="relative z-10 w-48 h-64 flex items-center justify-center cursor-pointer"
          onClick={onFigureClick}
        >
          <img
            src="/guy.png"
            alt="Human silhouette"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="text-center space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-600">{studyRange} daily • {studentCount} students</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <div 
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor: glowColor,
              color: 'white'
            }}
          >
            {studyHours.toFixed(1)}h study time
          </div>
        </div>
      </div>
    </div>
  );
}
