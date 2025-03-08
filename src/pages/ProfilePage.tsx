import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Briefcase, MapPin, FileText, Settings, Save, Upload } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { mockUserProfile, mockResumeHistory } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<any>(null);
  const [resumeHistory, setResumeHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    location: '',
    bio: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProfile(mockUserProfile);
      setResumeHistory(mockResumeHistory);
      setFormData({
        name: mockUserProfile.name,
        email: mockUserProfile.email,
        jobTitle: mockUserProfile.jobTitle,
        location: mockUserProfile.location,
        bio: mockUserProfile.bio
      });
      setIsLoading(false);
    }, 1000);
  }, [isAuthenticated, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setProfile(prev => ({
        ...prev,
        ...formData
      }));
      setIsEditing(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-gray-400">
          Manage your account and view your resume history
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="card mb-6">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-sky-500 bg-opacity-20 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-sky-500" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{profile.name}</h2>
              <p className="text-gray-400 mb-4">{profile.jobTitle}</p>
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <button
              className={`w-full text-left px-4 py-3 flex items-center ${
                activeTab === 'profile' ? 'bg-sky-500 bg-opacity-20 text-sky-500' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <User className="h-5 w-5 mr-3" />
              Profile Information
            </button>
            <button
              className={`w-full text-left px-4 py-3 flex items-center ${
                activeTab === 'resumes' ? 'bg-sky-500 bg-opacity-20 text-sky-500' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('resumes')}
            >
              <FileText className="h-5 w-5 mr-3" />
              Resume History
            </button>
            <button
              className={`w-full text-left px-4 py-3 flex items-center ${
                activeTab === 'settings' ? 'bg-sky-500 bg-opacity-20 text-sky-500' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5 mr-3" />
              Account Settings
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Profile Information</h2>
                {!isEditing ? (
                  <button 
                    className="btn-secondary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: profile.name,
                        email: profile.email,
                        jobTitle: profile.jobTitle,
                        location: profile.location,
                        bio: profile.bio
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
              
              {!isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Full Name</h3>
                      <p className="text-white">{profile.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Email</h3>
                      <p className="text-white">{profile.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Job Title</h3>
                      <p className="text-white">{profile.jobTitle}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Location</h3>
                      <p className="text-white">{profile.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Bio</h3>
                    <p className="text-white">{profile.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills.map((skill: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            className="input-field w-full pl-10"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            className="input-field w-full pl-10"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Job Title
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="jobTitle"
                            className="input-field w-full pl-10"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                          />
                          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Location
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="location"
                            className="input-field w-full pl-10"
                            value={formData.location}
                            onChange={handleInputChange}
                          />
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        rows={4}
                        className="input-field w-full"
                        value={formData.bio}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button type="submit" className="btn-primary flex items-center">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
          
          {activeTab === 'resumes' && (
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Resume History</h2>
                <button className="btn-primary flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Resume
                </button>
              </div>
              
              <div className="space-y-4">
                {resumeHistory.map((resume, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <FileText className="h-10 w-10 text-sky-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-white">{resume.filename}</h3>
                          <p className="text-gray-400 text-sm">Uploaded on {resume.uploadDate}</p>
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500 bg-opacity-20 text-sky-400">
                              Score: {resume.score}/100
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn-secondary text-sm py-1 px-3">View Analysis</button>
                        <button className="btn-secondary text-sm py-1 px-3">Download</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Password</h3>
                  <button className="btn-secondary">Change Password</button>
                </div>
                
                <div className="pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive emails about your account activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Job Alerts</p>
                        <p className="text-sm text-gray-400">Receive notifications about new job matches</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-3">Connected Accounts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Github className="h-6 w-6 mr-3 text-white" />
                        <div>
                          <p className="text-white">GitHub</p>
                          <p className="text-sm text-gray-400">Not connected</p>
                        </div>
                      </div>
                      <button className="btn-secondary text-sm py-1 px-3">Connect</button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Linkedin className="h-6 w-6 mr-3 text-white" />
                        <div>
                          <p className="text-white">LinkedIn</p>
                          <p className="text-sm text-gray-400">Connected as {profile.name}</p>
                        </div>
                      </div>
                      <button className="btn-secondary text-sm py-1 px-3">Disconnect</button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-medium text-red-500 mb-3">Danger Zone</h3>
                  <button className="bg-red-500 bg-opacity-20 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;