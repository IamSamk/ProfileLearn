import React from 'react';
import { Users, Target, Shield, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">About JobLens</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Empowering careers through AI-driven insights and analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300">
            JobLens was founded with a clear mission: to bridge the gap between talent and opportunity. 
            We leverage cutting-edge AI technology to provide job seekers with actionable insights and 
            help them make informed career decisions.
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-gray-300">
            We envision a future where every professional has access to personalized career guidance 
            powered by AI. Our goal is to democratize career development and make expert-level insights 
            accessible to everyone.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <div className="card text-center">
          <Users className="h-12 w-12 text-sky-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">10K+</h3>
          <p className="text-gray-400">Active Users</p>
        </div>

        <div className="card text-center">
          <Target className="h-12 w-12 text-sky-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">95%</h3>
          <p className="text-gray-400">Accuracy Rate</p>
        </div>

        <div className="card text-center">
          <Shield className="h-12 w-12 text-sky-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">100%</h3>
          <p className="text-gray-400">Data Security</p>
        </div>

        <div className="card text-center">
          <Award className="h-12 w-12 text-sky-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">50+</h3>
          <p className="text-gray-400">Industry Partners</p>
        </div>
      </div>

      <div className="card mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Our Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">AI Analysis</h3>
            <p className="text-gray-300">
              We use advanced machine learning algorithms to analyze resumes and provide 
              personalized recommendations based on market trends and industry requirements.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Market Intelligence</h3>
            <p className="text-gray-300">
              Our platform continuously monitors job market trends, salary data, and skill 
              demands to provide up-to-date insights for career development.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Data Security</h3>
            <p className="text-gray-300">
              We implement enterprise-grade security measures to ensure your personal data 
              and career information remain private and protected.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
              alt="CEO" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-white mb-1">John Smith</h3>
            <p className="text-gray-400">CEO & Founder</p>
          </div>

          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
              alt="CTO" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-white mb-1">Sarah Johnson</h3>
            <p className="text-gray-400">CTO</p>
          </div>

          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
              alt="Head of AI" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-white mb-1">Michael Chen</h3>
            <p className="text-gray-400">Head of AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;