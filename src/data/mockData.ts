// Mock data for job trends
export const mockJobTrendsData = {
  trendingSkills: [
    { name: 'Machine Learning', category: 'technical', growth: 42, demandPercentage: 85 },
    { name: 'React.js', category: 'technical', growth: 38, demandPercentage: 78 },
    { name: 'Cloud Computing', category: 'technical', growth: 35, demandPercentage: 82 },
    { name: 'Data Analysis', category: 'technical', growth: 32, demandPercentage: 75 },
    { name: 'DevOps', category: 'technical', growth: 30, demandPercentage: 70 },
    { name: 'Communication', category: 'soft', growth: 25, demandPercentage: 90 },
    { name: 'Problem Solving', category: 'soft', growth: 22, demandPercentage: 85 },
    { name: 'Adaptability', category: 'soft', growth: 20, demandPercentage: 80 },
    { name: 'Leadership', category: 'soft', growth: 18, demandPercentage: 75 },
    { name: 'Teamwork', category: 'soft', growth: 15, demandPercentage: 88 }
  ],
  jobGrowthByRole: [
    { role: 'Data Scientist', growthRate: 35, averageSalary: 120000, openings: 15000, trend: 'up' },
    { role: 'Machine Learning Engineer', growthRate: 32, averageSalary: 135000, openings: 12000, trend: 'up' },
    { role: 'DevOps Engineer', growthRate: 28, averageSalary: 115000, openings: 18000, trend: 'up' },
    { role: 'Full Stack Developer', growthRate: 25, averageSalary: 105000, openings: 25000, trend: 'up' },
    { role: 'Cloud Architect', growthRate: 22, averageSalary: 140000, openings: 10000, trend: 'up' },
    { role: 'Product Manager', growthRate: 18, averageSalary: 125000, openings: 14000, trend: 'up' },
    { role: 'UX/UI Designer', growthRate: 15, averageSalary: 95000, openings: 20000, trend: 'stable' },
    { role: 'Cybersecurity Analyst', growthRate: 30, averageSalary: 110000, openings: 16000, trend: 'up' },
    { role: 'Blockchain Developer', growthRate: 27, averageSalary: 130000, openings: 8000, trend: 'up' },
    { role: 'Project Manager', growthRate: 10, averageSalary: 100000, openings: 22000, trend: 'stable' }
  ]
};

// Mock data for resume analysis
export const mockResumeAnalysis = {
  overallScore: 78,
  contentScore: 82,
  skillsMatchScore: 75,
  formatScore: 85,
  atsScore: 70,
  overallFeedback: "Your resume shows strong technical skills and experience, but could benefit from more quantifiable achievements and better ATS optimization.",
  
  detectedSkills: [
    "JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", 
    "Git", "REST APIs", "MongoDB", "Express", "Agile"
  ],
  
  missingSkills: [
    {
      name: "Cloud Services (AWS/Azure)",
      description: "Adding cloud experience would make you more competitive for modern development roles."
    },
    {
      name: "CI/CD Pipelines",
      description: "Experience with continuous integration tools is increasingly required for developer positions."
    },
    {
      name: "GraphQL",
      description: "This is becoming a popular alternative to REST APIs in many companies."
    }
  ],
  
  skillsGapAnalysis: [
    { category: "Frontend Development", score: 8 },
    { category: "Backend Development", score: 7 },
    { category: "DevOps", score: 3 },
    { category: "Data Management", score: 6 },
    { category: "Testing", score: 5 }
  ],
  
  recommendedCourses: [
    { 
      title: "AWS Certified Developer - Associate", 
      platform: "Udemy", 
      duration: "25 hours" 
    },
    { 
      title: "CI/CD with Jenkins and GitHub Actions", 
      platform: "Coursera", 
      duration: "15 hours" 
    },
    { 
      title: "GraphQL Masterclass", 
      platform: "Pluralsight", 
      duration: "10 hours" 
    }
  ],
  
  contentAnalysis: {
    strengths: [
      "Strong technical skills section with relevant technologies",
      "Clear job titles and company names",
      "Good use of action verbs in experience descriptions",
      "Education section is well-formatted and complete"
    ],
    
    improvementAreas: [
      "Lack of quantifiable achievements and metrics",
      "Some job descriptions are too generic",
      "Missing relevant keywords for ATS optimization",
      "Summary section could be more impactful"
    ],
    
    keyAchievements: [
      "Developed a React application that increased user engagement by 35%",
      "Implemented API optimizations resulting in 50% faster load times",
      "Led a team of 5 developers to deliver project ahead of schedule"
    ],
    
    atsTips: [
      "Include more industry-specific keywords throughout your resume",
      "Use standard section headings (Experience, Education, Skills)",
      "Avoid using tables, headers/footers, or complex formatting",
      "Save your resume as a standard PDF or DOCX file"
    ]
  },
  
  jobMatches: [
    {
      title: "Senior Frontend Developer",
      matchPercentage: 85,
      averageSalary: 120000,
      openings: 5000
    },
    {
      title: "Full Stack Engineer",
      matchPercentage: 80,
      averageSalary: 115000,
      openings: 8000
    },
    {
      title: "JavaScript Developer",
      matchPercentage: 90,
      averageSalary: 105000,
      openings: 12000
    }
  ]
};

// Mock data for job suggestions
export const mockJobSuggestions = {
  jobs: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      salary: 130000,
      experience: "5+ years",
      jobType: "Full-time",
      matchScore: 92,
      description: "We're looking for a Senior Frontend Developer to join our product team. You'll be responsible for building user interfaces for our SaaS platform, collaborating with designers and backend engineers, and mentoring junior developers.",
      skillsMatch: [
        { name: "React.js", matchPercentage: 95 },
        { name: "TypeScript", matchPercentage: 90 },
        { name: "CSS/SCSS", matchPercentage: 85 },
        { name: "State Management", matchPercentage: 80 },
        { name: "Testing", matchPercentage: 75 }
      ],
      skillGapRecommendations: [
        { skill: "GraphQL", course: "GraphQL for React Developers (Udemy)" },
        { skill: "Performance Optimization", course: "Web Performance Fundamentals (Frontend Masters)" }
      ],
      marketInsights: {
        demandTrend: "High demand, growing 25% annually",
        demandDescription: "Frontend developers with React expertise are in high demand across industries, with particularly strong growth in fintech and healthcare sectors.",
        industryAvgSalary: 125000
      },
      similarRoles: [
        { title: "UI Engineer", avgSalary: 125000, skillOverlap: 85 },
        { title: "Frontend Architect", avgSalary: 145000, skillOverlap: 75 },
        { title: "React Developer", avgSalary: 115000, skillOverlap: 90 }
      ]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "GrowthStartup",
      location: "New York, NY (Hybrid)",
      salary: 125000,
      experience: "3-5 years",
      jobType: "Full-time",
      matchScore: 88,
      description: "Join our fast-growing startup as a Full Stack Developer. You'll work on both frontend and backend aspects of our platform, implement new features, and help scale our architecture as we grow.",
      skillsMatch: [
        { name: "JavaScript", matchPercentage: 95 },
        { name: "React.js", matchPercentage: 90 },
        { name: "Node.js", matchPercentage: 85 },
        { name: "MongoDB", matchPercentage: 70 },
        { name: "API Design", matchPercentage: 80 }
      ],
      skillGapRecommendations: [
        { skill: "Docker", course: "Docker for Developers (Pluralsight)" },
        { skill: "AWS", course: "AWS for JavaScript Developers (A Cloud Guru)" }
      ],
      marketInsights: {
        demandTrend: "Steady demand, growing 18% annually",
        demandDescription: "Full Stack Developers remain in high demand as companies seek versatile engineers who can work across the entire application stack.",
        industryAvgSalary: 120000
      },
      similarRoles: [
        { title: "MERN Stack Developer", avgSalary: 115000, skillOverlap: 90 },
        { title: "JavaScript Engineer", avgSalary: 120000, skillOverlap: 85 },
        { title: "Web Application Developer", avgSalary: 110000, skillOverlap: 80 }
      ]
    },
    {
      id: 3,
      title: "Frontend Team Lead",
      company: "Enterprise Solutions",
      location: "Austin, TX (On-site)",
      salary: 145000,
      experience: "7+ years",
      jobType: "Full-time",
      matchScore: 85,
      description: "We're seeking a Frontend Team Lead to manage a team of 5-7 developers. You'll be responsible for technical direction, code quality, mentoring team members, and collaborating with product and design teams.",
      skillsMatch: [
        { name: "React.js", matchPercentage: 90 },
        { name: "JavaScript", matchPercentage: 95 },
        { name: "Team Leadership", matchPercentage: 75 },
        { name: "Architecture", matchPercentage: 70 },
        { name: "Code Reviews", matchPercentage: 85 }
      ],
      skillGapRecommendations: [
        { skill: "Team Management", course: "Engineering Management 101 (Coursera)" },
        { skill: "Technical Planning", course: "Software Architecture & Design (edX)" }
      ],
      marketInsights: {
        demandTrend: "Growing demand, especially for experienced leaders",
        demandDescription: "Companies are increasingly looking for technical leaders who can both code and manage teams effectively.",
        industryAvgSalary: 140000
      },
      similarRoles: [
        { title: "Engineering Manager", avgSalary: 160000, skillOverlap: 70 },
        { title: "Senior Frontend Engineer", avgSalary: 135000, skillOverlap: 85 },
        { title: "Technical Lead", avgSalary: 150000, skillOverlap: 80 }
      ]
    },
    {
      id: 4,
      title: "React Native Developer",
      company: "MobileFirst Apps",
      location: "Remote",
      salary: 120000,
      experience: "2-4 years",
      jobType: "Full-time",
      matchScore: 82,
      description: "Join our mobile development team to build cross-platform mobile applications using React Native. You'll work on new features, optimize performance, and ensure a smooth user experience across iOS and Android.",
      skillsMatch: [
        { name: "JavaScript", matchPercentage: 95 },
        { name: "React", matchPercentage: 90 },
        { name: "React Native", matchPercentage: 60 },
        { name: "Mobile Development", matchPercentage: 65 },
        { name: "API Integration", matchPercentage: 85 }
      ],
      skillGapRecommendations: [
        { skill: "React Native", course: "React Native - The Practical Guide (Udemy)" },
        { skill: "Mobile UX", course: "Mobile User Experience Design (Interaction Design Foundation)" }
      ],
      marketInsights: {
        demandTrend: "High demand for cross-platform developers",
        demandDescription: "Companies are increasingly adopting React Native for cost-effective cross-platform mobile development.",
        industryAvgSalary: 115000
      },
      similarRoles: [
        { title: "Mobile Developer", avgSalary: 110000, skillOverlap: 75 },
        { title: "Frontend Developer", avgSalary: 105000, skillOverlap: 80 },
        { title: "Cross-Platform Developer", avgSalary: 115000, skillOverlap: 85 }
      ]
    }
  ]
};

// Mock user profile data
export const mockUserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  jobTitle: "Senior Frontend Developer",
  location: "San Francisco, CA",
  bio: "Experienced frontend developer with 6+ years of experience building modern web applications. Passionate about user experience, performance optimization, and clean code.",
  skills: [
    "JavaScript", "React", "TypeScript", "HTML/CSS", "Redux", 
    "Node.js", "GraphQL", "Webpack", "Jest", "Git"
  ]
};

// Mock resume history
export const mockResumeHistory = [
  {
    filename: "Alex_Johnson_Resume_2023.pdf",
    uploadDate: "June 15, 2023",
    score: 78
  },
  {
    filename: "Alex_Johnson_Resume_2022.pdf",
    uploadDate: "November 10, 2022",
    score: 65
  },
  {
    filename: "Alex_Johnson_Resume_Frontend.pdf",
    uploadDate: "August 22, 2022",
    score: 72
  }
];