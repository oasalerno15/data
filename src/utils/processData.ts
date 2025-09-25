// Process the survey data for visualization

export interface StudentData {
  college: string;
  major: string;
  studyLocation: string;
  subject: string;
  studyHours: string;
  financialStress: string;
}

export const rawData: StudentData[] = [
  { college: "University of Richmond", major: "Political Science and History", studyLocation: "An Empty Classroom", subject: "History", studyHours: "3-4 hours", financialStress: "No" },
  { college: "University of Richmond", major: "Art History major, journalism minor", studyLocation: "The Library", subject: "History", studyHours: "3-4 hours", financialStress: "Depends" },
  { college: "University of Richmond", major: "Psychology", studyLocation: "The Library", subject: "Philosophy / History", studyHours: "3-4 hours", financialStress: "No" },
  { college: "University of Richmond", major: "Undecided", studyLocation: "The Library", subject: "Italian", studyHours: "3-4 hours", financialStress: "Depends" },
  { college: "University of Richmond", major: "Political Science and History", studyLocation: "The Library", subject: "History and political science", studyHours: "3-4 hours", financialStress: "No" },
  { college: "University of Richmond", major: "Geography", studyLocation: "The Library", subject: "Calculus II", studyHours: "1-2 hours", financialStress: "No" },
  { college: "University of Richmond", major: "N/A", studyLocation: "The Library", subject: "Chemistry", studyHours: "3-4 hours", financialStress: "Depends" },
  { college: "University of Richmond", major: "International Business", studyLocation: "The Library", subject: "Dsst 289 Intro to Data Science", studyHours: "1-2 hours", financialStress: "Depends" },
  { college: "University of Richmond", major: "Business Analytics with a Concentration in Marketing", studyLocation: "University of Richmond Well-Being Center", subject: "Major classes", studyHours: "1-2 hours", financialStress: "No" },
  { college: "University of Richmond", major: "Business Administration with a Concentration in Marketing", studyLocation: "University of Richmond Well-Being Center", subject: "Major classes", studyHours: "1-2 hours", financialStress: "No" },
  { college: "University of Richmond", major: "Business", studyLocation: "An Empty Classroom", subject: "Accounting", studyHours: "5+ hours", financialStress: "No" },
  { college: "University of Richmond", major: "Biochemistry", studyLocation: "Dorm", subject: "Leadership studies and social sciences", studyHours: "1-2 hours", financialStress: "Yes" },
  { college: "University of Richmond", major: "Intended Health Studies", studyLocation: "An Empty Classroom", subject: "Chemistry", studyHours: "1-2 hours", financialStress: "Yes" },
  { college: "University of Richmond", major: "PPEL, Business Admin", studyLocation: "The Library", subject: "Microeconomics", studyHours: "1-2 hours", financialStress: "Yes" },
  { college: "University of Virginia", major: "Systems Engineering w/ sustainability", studyLocation: "The Library", subject: "Math", studyHours: "3-4 hours", financialStress: "No" },
  { college: "University of Virginia", major: "Commerce, minor in statistics", studyLocation: "The Library", subject: "Accounting", studyHours: "3-4 hours", financialStress: "No" },
  { college: "University of Virginia", major: "Political Science", studyLocation: "The Library", subject: "Law", studyHours: "5+ hours", financialStress: "Yes" },
  { college: "University of Virginia", major: "Biology and Environmental Science Major, American Sign Language Minor", studyLocation: "Dorm", subject: "Biology", studyHours: "3-4 hours", financialStress: "No" },
  { college: "University of Virginia", major: "Nursing", studyLocation: "Coffee Shop", subject: "Pharmacology", studyHours: "3-4 hours", financialStress: "No" },
  { college: "Franklin and Marshall", major: "Economics+Public Policy", studyLocation: "Dorm", subject: "Mathematics", studyHours: "1-2 hours", financialStress: "Yes" },
  { college: "Franklin and Marshall", major: "Business", studyLocation: "The Library", subject: "N/A", studyHours: "1-2 hours", financialStress: "Depends" },
  { college: "Franklin and Marshall", major: "Physics + Math", studyLocation: "College Union", subject: "Physics", studyHours: "3-4 hours", financialStress: "No" },
  { college: "Gettysburg College", major: "Chemistry and Health Sciences", studyLocation: "Empty Classroom", subject: "Biochemistry", studyHours: "3-4 hours", financialStress: "depends" },
  { college: "Franklin and Marshall", major: "Psychology", studyLocation: "The Library", subject: "Government", studyHours: "1-2 hours", financialStress: "No" },
  { college: "Franklin and Marshall", major: "Government + History", studyLocation: "The Library", subject: "Lab", studyHours: "1-2 hours", financialStress: "No" },
  { college: "Franklin and Marshall", major: "English", studyLocation: "The Library", subject: "English", studyHours: "1-2 hours", financialStress: "Depends" },
  { college: "Franklin and Marshall", major: "English", studyLocation: "The Library", subject: "English", studyHours: "1-2 hours", financialStress: "yes" },
  { college: "Franklin and Marshall", major: "Business", studyLocation: "Dorm", subject: "Psychology", studyHours: "1-2 hours", financialStress: "no" },
  { college: "Franklin and Marshall", major: "English for Journalism", studyLocation: "An Empty Classroom", subject: "Business", studyHours: "3-4 hours", financialStress: "no" }
];

export function processStudentData() {
  // Convert study hours to numeric values for analysis
  const convertStudyHours = (hours: string): number => {
    switch (hours) {
      case "1-2 hours": return 1.5;
      case "3-4 hours": return 3.5;
      case "5+ hours": return 5.5;
      default: return 0;
    }
  };

  // Normalize financial stress responses
  const normalizeFinancialStress = (stress: string): "Yes" | "No" | "Depends" => {
    const normalized = stress.toLowerCase();
    if (normalized === "yes") return "Yes";
    if (normalized === "no") return "No";
    return "Depends";
  };

  // Process data and group by study hours and financial stress
  const processedData = rawData.map(student => ({
    ...student,
    studyHoursNumeric: convertStudyHours(student.studyHours),
    financialStressNormalized: normalizeFinancialStress(student.financialStress)
  }));

  // Create three groups based on study hours
  const lowStudyGroup = processedData.filter(s => s.studyHoursNumeric <= 2);
  const mediumStudyGroup = processedData.filter(s => s.studyHoursNumeric > 2 && s.studyHoursNumeric <= 4);
  const highStudyGroup = processedData.filter(s => s.studyHoursNumeric > 4);

  // Calculate financial stress percentages for each group
  const calculateFinancialStress = (group: typeof processedData) => {
    const total = group.length;
    const stressed = group.filter(s => s.financialStressNormalized === "Yes").length;
    const notStressed = group.filter(s => s.financialStressNormalized === "No").length;
    const depends = group.filter(s => s.financialStressNormalized === "Depends").length;
    
    return {
      total,
      stressed: (stressed / total) * 100,
      notStressed: (notStressed / total) * 100,
      depends: (depends / total) * 100,
      averageStudyHours: group.reduce((sum, s) => sum + s.studyHoursNumeric, 0) / total
    };
  };

  return {
    lowStudy: {
      label: "Light Studiers",
      range: "1-2 hours",
      students: lowStudyGroup.length,
      ...calculateFinancialStress(lowStudyGroup)
    },
    mediumStudy: {
      label: "Moderate Studiers", 
      range: "3-4 hours",
      students: mediumStudyGroup.length,
      ...calculateFinancialStress(mediumStudyGroup)
    },
    highStudy: {
      label: "Intense Studiers",
      range: "5+ hours", 
      students: highStudyGroup.length,
      ...calculateFinancialStress(highStudyGroup)
    },
    overall: {
      totalStudents: processedData.length,
      averageStudyHours: processedData.reduce((sum, s) => sum + s.studyHoursNumeric, 0) / processedData.length,
      ...calculateFinancialStress(processedData)
    }
  };
}
