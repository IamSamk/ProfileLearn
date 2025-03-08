import React, { useState, useEffect } from 'react';
import { TrendingUp, Filter, Download, RefreshCw } from 'lucide-react';
import { mockJobTrendsData } from '../data/mockData';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import DoughnutChart from '../components/charts/DoughnutChart';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';

const JobTrendsPage: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('last30days');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('global');
  const [isLoading, setIsLoading] = useState(true);
  const [trendingSkills, setTrendingSkills] = useState<any[]>([]);
  const [jobGrowthData, setJobGrowthData] = useState<any[]>([]);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Filter options
  const timeframes = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'last12months', label: 'Last 12 Months' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const locations = [
    { value: 'global', label: 'Global' },
    { value: 'us', label: 'United States' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' }
  ];

  useEffect(() => {
    fetchData();
  }, [selectedTimeframe, selectedCategory, selectedLocation]);

  const fetchData = () => {
    setIsLoading(true);
    // Simulate API call with filters
    setTimeout(() => {
      let filteredData = { ...mockJobTrendsData };

      // Apply category filter
      if (selectedCategory !== 'all') {
        filteredData.trendingSkills = mockJobTrendsData.trendingSkills.filter(
          skill => skill.category === selectedCategory
        );
        filteredData.jobGrowthByRole = mockJobTrendsData.jobGrowthByRole.filter(
          job => job.role.toLowerCase().includes(selectedCategory)
        );
      }

      setTrendingSkills(filteredData.trendingSkills);
      setJobGrowthData(filteredData.jobGrowthByRole);
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    const exportData = {
      timeframe: selectedTimeframe,
      category: selectedCategory,
      location: selectedLocation,
      trendingSkills,
      jobGrowthData
    };

    if (format === 'pdf') {
      exportToPDF(exportData, 'Job Market Trends Report');
    } else {
      exportToExcel(exportData, 'Job Market Trends Report');
    }

    setShowExportMenu(false);
  };

  // Prepare data for job growth chart
  const jobGrowthChartData = {
    labels: jobGrowthData.map(job => job.role),
    datasets: [
      {
        label: 'Growth Rate (%)',
        data: jobGrowthData.map(job => job.growthRate),
        backgroundColor: jobGrowthData.map(job => 
          job.growthRate > 25 ? 'rgba(16, 185, 129, 0.7)' : 
          job.growthRate > 15 ? 'rgba(14, 165, 233, 0.7)' : 
          'rgba(249, 115, 22, 0.7)'
        ),
        borderColor: jobGrowthData.map(job => 
          job.growthRate > 25 ? 'rgba(16, 185, 129, 1)' : 
          job.growthRate > 15 ? 'rgba(14, 165, 233, 1)' : 
          'rgba(249, 115, 22, 1)'
        )
      }
    ]
  };

  // Prepare data for salary comparison chart
  const salaryComparisonData = {
    labels: jobGrowthData.map(job => job.role),
    datasets: [
      {
        label: 'Average Salary ($)',
        data: jobGrowthData.map(job => job.averageSalary),
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1
      }
    ]
  };

  // Prepare data for job openings pie chart
  const jobOpeningsPieData = {
    labels: jobGrowthData.slice(0, 5).map(job => job.role),
    datasets: [
      {
        data: jobGrowthData.slice(0, 5).map(job => job.openings),
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)'
        ],
        borderColor: [
          'rgba(14, 165, 233, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)'
        ]
      }
    ]
  };

  // Prepare data for skills demand trend
  const skillsDemandData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Technical Skills',
        data: [65, 70, 75, 82, 85, 90],
        borderColor: 'rgba(14, 165, 233, 1)',
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        fill: true
      },
      {
        label: 'Soft Skills',
        data: [70, 72, 75, 78, 82, 85],
        borderColor: 'rgba(249, 115, 22, 1)',
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        fill: true
      }
    ]
  };

  // Prepare data for technical skills breakdown
  const technicalSkillsData = {
    labels: trendingSkills
      .filter(skill => skill.category === 'technical')
      .slice(0, 5)
      .map(skill => skill.name),
    datasets: [
      {
        data: trendingSkills
          .filter(skill => skill.category === 'technical')
          .slice(0, 5)
          .map(skill => skill.demandPercentage),
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',
          'rgba(16, 185, 129,  0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)'
        ],
        borderColor: [
          'rgba(14, 165, 233, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)'
        ]
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Job Market Trends</h1>
          <p className="text-gray-400">
            Real-time insights into job market demands and skill trends
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <div className="relative">
            <button 
              className="btn-secondary flex items-center"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu">
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left"
                    onClick={() => handleExport('pdf')}
                  >
                    Export as PDF
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left"
                    onClick={() => handleExport('excel')}
                  >
                    Export as Excel
                  </button>
                </div>
              </div>
            )}
          </div>
          <button 
            className="btn-secondary flex items-center"
            onClick={fetchData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Timeframe</label>
            <select 
              className="input-field w-full"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              {timeframes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <select 
              className="input-field w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
            <select 
              className="input-field w-full"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mb-4"></div>
          <p className="text-gray-400">Loading job market data...</p>
        </div>
      ) : (
        <>
          {/* Job Growth Chart */}
          <div className="card mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-sky-500" />
              Job Growth by Role
            </h2>
            <BarChart 
              labels={jobGrowthChartData.labels} 
              datasets={jobGrowthChartData.datasets}
              title="Annual Growth Rate (%)"
            />
          </div>

          {/* Skills Demand Trend */}
          <div className="card mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Skills Demand Trend</h2>
            <LineChart 
              labels={skillsDemandData.labels} 
              datasets={skillsDemandData.datasets}
              title="Demand Trend Over Time"
            />
          </div>

          {/* Top Skills Section with Charts */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-sky-500" />
              Top In-Demand Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Technical Skills</h3>
                <div className="space-y-4">
                  {trendingSkills
                    .filter(skill => skill.category === 'technical')
                    .slice(0, 5)
                    .map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-sky-500">+{skill.growth}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-sky-500 h-2 rounded-full" 
                              style={{ width: `${skill.demandPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-8">
                  <DoughnutChart 
                    labels={technicalSkillsData.labels} 
                    datasets={technicalSkillsData.datasets}
                    title="Technical Skills Breakdown"
                  />
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Soft Skills</h3>
                <div className="space-y-4">
                  {trendingSkills
                    .filter(skill => skill.category === 'soft')
                    .slice(0, 5)
                    .map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-sky-500">+{skill.growth}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-sky-500 h-2 rounded-full" 
                              style={{ width: `${skill.demandPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-8">
                  <PieChart 
                    labels={trendingSkills
                      .filter(skill => skill.category === 'soft')
                      .slice(0, 5)
                      .map(skill => skill.name)} 
                    datasets={[{
                      data: trendingSkills
                        .filter(skill => skill.category === 'soft')
                        .slice(0, 5)
                        .map(skill => skill.demandPercentage),
                      backgroundColor: [
                        'rgba(249, 115, 22, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(236, 72, 153, 0.7)',
                        'rgba(14, 165, 233, 0.7)'
                      ],
                      borderColor: [
                        'rgba(249, 115, 22, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(139, 92, 246, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(14, 165, 233, 1)'
                      ]
                    }]}
                    title="Soft Skills Breakdown"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Salary Comparison */}
          <div className="card mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Salary Comparison by Role</h2>
            <BarChart 
              labels={salaryComparisonData.labels} 
              datasets={salaryComparisonData.datasets}
              title="Average Annual Salary ($)"
            />
          </div>

          {/* Job Openings Distribution */}
          <div className="card mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Job Openings Distribution</h2>
            <PieChart 
              labels={jobOpeningsPieData.labels} 
              datasets={jobOpeningsPieData.datasets}
              title="Top 5 Roles by Number of Openings"
            />
          </div>

          {/* Industry Insights */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Industry Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-3">Technology</h3>
                <p className="text-gray-300 mb-4">
                  AI and machine learning skills continue to dominate the tech industry, with a 35% increase in demand over the past year.
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Top skill: Machine Learning</span>
                  <span className="text-sky-500">+42%</span>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-3">Finance</h3>
                <p className="text-gray-300 mb-4">
                  Blockchain and cryptocurrency expertise are seeing rapid growth, while traditional banking roles are experiencing a slight decline.
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Top skill: Blockchain</span>
                  <span className="text-sky-500">+28%</span>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-3">Healthcare</h3>
                <p className="text-gray-300 mb-4">
                  Telehealth and health informatics professionals are in high demand, reflecting the industry's digital transformation.
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Top skill: Health Informatics</span>
                  <span className="text-sky-500">+31%</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobTrendsPage;