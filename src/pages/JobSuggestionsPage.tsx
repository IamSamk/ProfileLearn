import React, { useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, TrendingUp, Award, BookOpen, ExternalLink } from 'lucide-react';
import { mockJobSuggestions } from '../data/mockData';
import RadarChart from '../components/charts/RadarChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';

const JobSuggestionsPage: React.FC = () => {
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobRole) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setSuggestions(mockJobSuggestions);
      setSelectedJob(mockJobSuggestions.jobs[0]);
    }, 2000);
  };

  // Prepare data for skills match radar chart
  const skillsMatchRadarData = selectedJob ? {
    labels: selectedJob.skillsMatch.map((skill: any) => skill.name),
    datasets: [
      {
        label: 'Your Skills',
        data: selectedJob.skillsMatch.map((skill: any) => skill.matchPercentage),
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 2
      },
      {
        label: 'Required Skills',
        data: selectedJob.skillsMatch.map(() => 100),
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 2
      }
    ]
  } : { labels: [], datasets: [] };

  // Prepare data for similar roles chart
  const similarRolesData = selectedJob ? {
    labels: selectedJob.similarRoles.map((role: any) => role.title),
    datasets: [
      {
        label: 'Skill Overlap (%)',
        data: selectedJob.similarRoles.map((role: any) => role.skillOverlap),
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1
      }
    ]
  } : { labels: [], datasets: [] };

  // Prepare data for salary comparison pie chart
  const salaryComparisonData = selectedJob ? {
    labels: ['This Position', 'Industry Average'],
    datasets: [
      {
        data: [
          selectedJob.salary,
          selectedJob.marketInsights.industryAvgSalary
        ],
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',
          'rgba(249, 115, 22, 0.7)'
        ],
        borderColor: [
          'rgba(14, 165, 233, 1)',
          'rgba(249, 115, 22, 1)'
        ]
      }
    ]
  } : { labels: [], datasets: [] };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI-Powered Job Suggestions</h1>
        <p className="text-gray-400">
          Get personalized job recommendations based on your skills and preferences
        </p>
      </div>

      <div className="card mb-8">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Desired Job Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="input-field w-full pl-10"
                  placeholder="e.g., Software Engineer, Data Scientist"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  required
                />
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Location (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="input-field w-full pl-10"
                  placeholder="e.g., New York, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Experience Level
              </label>
              <select
                className="input-field w-full"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">Any Experience Level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (6+ years)</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="btn-primary flex items-center"
              disabled={isSearching || !jobRole}
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Find Job Matches
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {suggestions && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-4">Job Matches</h2>
            <div className="space-y-3">
              {suggestions.jobs.map((job: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedJob && selectedJob.id === job.id
                      ? 'bg-sky-500 bg-opacity-20 border border-sky-500'
                      : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <h3 className="font-medium text-white mb-2">{job.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{job.company}</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-gray-300">${job.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400 mr-2">Match:</span>
                      <span className="text-sm font-medium text-sky-500">{job.matchScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedJob && (
              <div className="space-y-6">
                <div className="card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{selectedJob.title}</h2>
                      <div className="flex items-center text-gray-400">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span>{selectedJob.company}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{selectedJob.location}</span>
                      </div>
                    </div>
                    <div className="bg-sky-500 bg-opacity-20 px-3 py-1 rounded-full">
                      <span className="text-sky-500 font-medium">{selectedJob.matchScore}% Match</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Salary Range</div>
                      <div className="text-lg font-semibold text-white flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                        ${selectedJob.salary.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Experience</div>
                      <div className="text-lg font-semibold text-white">
                        {selectedJob.experience}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Job Type</div>
                      <div className="text-lg font-semibold text-white">
                        {selectedJob.jobType}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Job Description</h3>
                    <p className="text-gray-300">
                      {selectedJob.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <a 
                      href="#" 
                      className="btn-primary flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Full Job <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-lg font-medium text-white mb-4">Skills Match Analysis</h3>
                  <div className="space-y-4 mb-6">
                    {selectedJob.skillsMatch.map((skill: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-gray-400">{skill.matchPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              skill.matchPercentage >= 80 ? 'bg-green-500' : 
                              skill.matchPercentage >= 50 ? 'bg-amber-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${skill.matchPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Skills Match Radar Chart */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-white mb-3">Skills Comparison</h4>
                    <RadarChart 
                      labels={skillsMatchRadarData.labels} 
                      datasets={skillsMatchRadarData.datasets}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-white mb-3">Skill Gap Recommendations</h4>
                    <div className="space-y-3">
                      {selectedJob.skillGapRecommendations.map((rec: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <BookOpen className="h-5 w-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">{rec.skill}</p>
                            <p className="text-gray-400 text-sm">{rec.course}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-lg font-medium text-white mb-4">Market Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-md font-medium text-white mb-3">Demand Trend</h4>
                      <div className="flex items-center mb-4">
                        <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-300">{selectedJob.marketInsights.demandTrend}</span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {selectedJob.marketInsights.demandDescription}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-white mb-3">Salary Comparison</h4>
                      
                      {/* Salary Comparison Pie Chart */}
                      <PieChart 
                        labels={salaryComparisonData.labels} 
                        datasets={salaryComparisonData.datasets}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-lg font-medium text-white mb-4">Similar Roles to Consider</h3>
                  
                  {/* Similar Roles Bar Chart */}
                  <div className="mb-6">
                    <BarChart 
                      labels={similarRolesData.labels} 
                      datasets={similarRolesData.datasets}
                      title="Skill Overlap with Current Role"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedJob.similarRoles.map((role: any, index: number) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">{role.title}</h4>
                        <div className="flex items-center text-sm text-gray-400 mb-3">
                          <span>Avg. Salary: </span>
                          <span className="text-white ml-1">${role.avgSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-sky-500 mr-1" />
                          <span className="text-sm text-gray-300">{role.skillOverlap}% skill overlap</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSuggestionsPage;