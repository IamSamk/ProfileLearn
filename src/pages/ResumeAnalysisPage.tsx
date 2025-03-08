import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertTriangle, Award, BookOpen, Download, Linkedin } from 'lucide-react';
import { mockResumeAnalysis } from '../data/mockData';
import RadarChart from '../components/charts/RadarChart';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';

const ResumeAnalysisPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isLinkedInValid, setIsLinkedInValid] = useState(true);

  const validateLinkedInUrl = (url: string) => {
    const linkedInRegex = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/;
    setIsLinkedInValid(linkedInRegex.test(url));
    return linkedInRegex.test(url);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || 
          droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(droppedFile);
      } else {
        alert('Please upload a PDF or DOCX file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
      } else {
        alert('Please upload a PDF or DOCX file');
      }
    }
  };

  const handleAnalyzeResume = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult(mockResumeAnalysis);
      }, 3000);
    }, 1500);
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysisResult(null);
  };

  // Prepare data for radar chart
  const skillsRadarData = {
    labels: analysisResult?.skillsGapAnalysis.map((item: any) => item.category) || [],
    datasets: [
      {
        label: 'Your Skills',
        data: analysisResult?.skillsGapAnalysis.map((item: any) => item.score) || [],
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 2
      },
      {
        label: 'Industry Average',
        data: analysisResult?.skillsGapAnalysis.map(() => 7) || [], // Mock industry average
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 2
      }
    ]
  };

  // Prepare data for pie chart
  const scoresPieData = {
    labels: ['Content', 'Skills Match', 'Format', 'ATS Compatibility'],
    datasets: [
      {
        data: analysisResult ? [
          analysisResult.contentScore,
          analysisResult.skillsMatchScore,
          analysisResult.formatScore,
          analysisResult.atsScore
        ] : [],
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderColor: [
          'rgba(14, 165, 233, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(139, 92, 246, 1)'
        ]
      }
    ]
  };

  // Prepare data for job matches bar chart
  const jobMatchesData = {
    labels: analysisResult?.jobMatches.map((job: any) => job.title) || [],
    datasets: [
      {
        label: 'Match Percentage',
        data: analysisResult?.jobMatches.map((job: any) => job.matchPercentage) || [],
        backgroundColor: 'rgba(14, 165, 233, 0.7)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Resume Analysis</h1>
        <p className="text-gray-400">
          Upload your resume to get AI-powered insights and recommendations
        </p>
      </div>

      {!analysisResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center h-80 ${
                  isDragging ? 'border-sky-500 bg-sky-500 bg-opacity-5' : 'border-gray-700 hover:border-gray-600'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!file ? (
                  <>
                    <Upload className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">Drag & Drop Your Resume</h3>
                    <p className="text-gray-400 text-center mb-4">
                      Supported formats: PDF, DOCX
                    </p>
                    <p className="text-gray-500 text-sm text-center mb-6">
                      Your resume will be analyzed securely and privately
                    </p>
                    <label className="btn-primary cursor-pointer">
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.docx" 
                        onChange={handleFileChange}
                      />
                      Browse Files
                    </label>
                  </>
                ) : (
                  <>
                    <FileText className="h-12 w-12 text-sky-500 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">File Selected</h3>
                    <p className="text-gray-300 text-center mb-6">
                      {file.name}
                    </p>
                    <div className="flex space-x-4">
                      <button 
                        className="btn-primary"
                        onClick={handleAnalyzeResume}
                        disabled={isUploading || isAnalyzing}
                      >
                        {isUploading ? 'Uploading...' : isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                      </button>
                      <button 
                        className="btn-secondary"
                        onClick={() => setFile(null)}
                        disabled={isUploading || isAnalyzing}
                      >
                        Change File
                      </button>
                    </div>
                    {(isUploading || isAnalyzing) && (
                      <div className="mt-6 w-full max-w-xs">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>{isUploading ? 'Uploading...' : 'Analyzing with AI...'}</span>
                          <span>{isUploading ? '50%' : '75%'}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-sky-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: isUploading ? '50%' : '75%' }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-white mb-4">LinkedIn Profile Analysis</h3>
                <div className="relative">
                  <input
                    type="url"
                    className={`input-field w-full pl-10 ${!isLinkedInValid && linkedInUrl ? 'border-red-500' : ''}`}
                    placeholder="Enter your LinkedIn profile URL"
                    value={linkedInUrl}
                    onChange={(e) => {
                      setLinkedInUrl(e.target.value);
                      validateLinkedInUrl(e.target.value);
                    }}
                  />
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
                {!isLinkedInValid && linkedInUrl && (
                  <p className="text-red-500 text-sm mt-2">Please enter a valid LinkedIn profile URL</p>
                )}
                <button 
                  className="btn-primary mt-4"
                  disabled={!isLinkedInValid || !linkedInUrl}
                  onClick={() => {/* Handle LinkedIn analysis */}}
                >
                  Analyze LinkedIn Profile
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="card h-full">
              <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm font-medium text-sky-500">1</span>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      Upload your resume in PDF or DOCX format
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm font-medium text-sky-500">2</span>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      Our AI analyzes your skills, experience, and achievements
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm font-medium text-sky-500">3</span>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      Get detailed insights about your strengths and improvement areas
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sky-500 bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-sm font-medium text-sky-500">4</span>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      Receive personalized recommendations to improve your resume
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  Your resume data is processed securely and is never shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
            <div className="flex space-x-3">
              <button className="btn-secondary flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </button>
              <button 
                className="btn-secondary"
                onClick={resetAnalysis}
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
          
          {/* Overall Score */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Overall Resume Score</h3>
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative w-40 h-40 mb-6 md:mb-0 md:mr-8">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="3"
                    strokeDasharray={`${analysisResult.overallScore}, 100`}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-3xl font-bold text-white">{analysisResult.overallScore}</span>
                  <span className="text-gray-400 text-sm block">/100</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-300 mb-4">
                  {analysisResult.overallFeedback}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Content</div>
                    <div className="text-lg font-semibold text-white">{analysisResult.contentScore}/100</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Skills Match</div>
                    <div className="text-lg font-semibold text-white">{analysisResult.skillsMatchScore}/100</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Format</div>
                    <div className="text-lg font-semibold text-white">{analysisResult.formatScore}/100</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">ATS Compatibility</div>
                    <div className="text-lg font-semibold text-white">{analysisResult.atsScore}/100</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Score Breakdown Pie Chart */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">Score Breakdown</h4>
              <PieChart 
                labels={scoresPieData.labels} 
                datasets={scoresPieData.datasets}
              />
            </div>
          </div>
          
          {/* Skills Analysis */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Skills Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-white mb-3">Detected Skills</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {analysisResult.detectedSkills.map((skill: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-sky-500 bg-opacity-20 text-sky-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <h4 className="text-lg font-medium text-white mb-3 mt-6">Missing In-Demand Skills</h4>
                <div className="space-y-3">
                  {analysisResult.missingSkills.map((skill: any, index: number) => (
                    <div key={index} className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">{skill.name}</p>
                        <p className="text-gray-400 text-sm">{skill.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-3">Skills Gap Analysis</h4>
                <div className="space-y-4">
                  {analysisResult.skillsGapAnalysis.map((category: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{category.category}</span>
                        <span className="text-gray-400">{category.score}/10</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            category.score >= 7 ? 'bg-green-500' : 
                            category.score >= 4 ? 'bg-amber-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${category.score * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-white mb-3">Recommended Courses</h4>
                  <div className="space-y-3">
                    {analysisResult.recommendedCourses.map((course: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <BookOpen className="h-5 w-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">{course.title}</p>
                          <p className="text-gray-400 text-sm">{course.platform} • {course.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skills Radar Chart */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">Skills Comparison</h4>
              <RadarChart 
                labels={skillsRadarData.labels} 
                datasets={skillsRadarData.datasets}
                title="Your Skills vs. Industry Average"
              />
            </div>
          </div>
          
          {/* Content Analysis */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Content Analysis</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Strengths</h4>
                  <div className="space-y-3">
                    {analysisResult.contentAnalysis.strengths.map((item: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Improvement Areas</h4>
                  <div className="space-y-3">
                    {analysisResult.contentAnalysis.improvementAreas.map((item: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-3">Key Achievements</h4>
                <div className="space-y-3">
                  {analysisResult.contentAnalysis.keyAchievements.map((achievement: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <Award className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-3">ATS Optimization Tips</h4>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-300">
                    {analysisResult.contentAnalysis.atsTips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-sky-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Match */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Job Match Recommendations</h3>
            <p className="text-gray-300 mb-6">
              Based on your resume, here are job roles that match your skills and experience:
            </p>
            
            {/* Job Matches Bar Chart */}
            <div className="mb-8">
              <BarChart 
                labels={jobMatchesData.labels} 
                datasets={jobMatchesData.datasets}
                title="Job Role Match Percentages"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysisResult.jobMatches.map((job: any, index: number) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-medium text-white mb-2">{job.title}</h4>
                  <div className="flex items-center mb-3">
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Match Score</span>
                        <span className="text-sm text-sky-500">{job.matchPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-sky-500 h-2 rounded-full" 
                          style={{ width: `${job.matchPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    Avg. Salary: <span className="text-white">${job.averageSalary.toLocaleString()}</span>
                  </p>
                  <p className="text-gray-400 text-sm">
                    Job Openings: <span className="text-white">{job.openings.toLocaleString()}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysisPage;