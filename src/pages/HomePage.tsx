import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Upload, TrendingUp, Briefcase, Award, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 neon-text">
              Optimize Your Resume.<br />Land Your Dream Job.
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              JobLens uses AI to analyze your resume, match it with market demands, and provide personalized recommendations to boost your career.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/resume-analysis" className="btn-primary flex items-center justify-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Resume & Get Insights
              </Link>
              <Link to="/job-trends" className="btn-secondary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore Job Trends
              </Link>
            </div>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for job roles, skills, or industries..."
                  className="w-full py-4 px-6 pr-12 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Supercharge Your Job Search</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              JobLens provides AI-powered tools to help you understand the job market and optimize your career path.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="h-12 w-12 bg-sky-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Job Market Trends</h3>
              <p className="text-gray-300 mb-4">
                Visualize real-time job market trends and skill demands across industries and locations.
              </p>
              <Link to="/job-trends" className="text-sky-500 hover:text-sky-400 flex items-center">
                Explore Trends <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="card">
              <div className="h-12 w-12 bg-sky-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6">
                <Upload className="h-6 w-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Resume Analysis</h3>
              <p className="text-gray-300 mb-4">
                Upload your resume and get AI-powered analysis of your skills, experience, and improvement areas.
              </p>
              <Link to="/resume-analysis" className="text-sky-500 hover:text-sky-400 flex items-center">
                Analyze Resume <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="card">
              <div className="h-12 w-12 bg-sky-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Job Suggestions</h3>
              <p className="text-gray-300 mb-4">
                Get personalized job role suggestions based on your skills, experience, and career goals.
              </p>
              <Link to="/job-suggestions" className="text-sky-500 hover:text-sky-400 flex items-center">
                Get Suggestions <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How JobLens Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform analyzes your resume and the job market to provide actionable insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-sky-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-sky-500">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Upload Resume</h3>
              <p className="text-gray-300">
                Upload your resume in PDF or DOCX format to our secure platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-sky-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-sky-500">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Analysis</h3>
              <p className="text-gray-300">
                Our AI analyzes your skills, experience, and compares with market demands.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-sky-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-sky-500">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Insights</h3>
              <p className="text-gray-300">
                Receive detailed insights about your strengths, gaps, and improvement areas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-sky-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-sky-500">4</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Take Action</h3>
              <p className="text-gray-300">
                Follow personalized recommendations to improve your resume and skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how JobLens has helped professionals advance their careers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Sarah Johnson" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white">Sarah Johnson</h4>
                  <p className="text-gray-400">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "JobLens helped me identify key skills missing from my resume. After following their recommendations, I landed a job at a top tech company with a 30% salary increase."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Michael Chen" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white">Michael Chen</h4>
                  <p className="text-gray-400">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The job market trends feature gave me insights into which data science skills were most in demand. I focused my learning on those areas and received multiple job offers."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Emily Rodriguez" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white">Emily Rodriguez</h4>
                  <p className="text-gray-400">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-300">
                "JobLens suggested a career pivot based on my transferable skills. Their recommendations helped me transition from traditional marketing to digital marketing seamlessly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Supercharge Your Career?</h2>
            <p className="text-xl text-white opacity-90 max-w-3xl mx-auto mb-8">
              Join thousands of professionals who have optimized their resumes and landed their dream jobs with JobLens.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="bg-white text-sky-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg">
                Get Started for Free
              </Link>
              <Link to="/resume-analysis" className="bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 font-medium py-3 px-6 rounded-lg transition-all duration-300">
                Upload Your Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;