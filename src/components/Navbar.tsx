import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, User, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Zap className="h-8 w-8 text-sky-500" />
              <span className="ml-2 text-xl font-bold text-white neon-text">JobLens</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/job-trends" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/job-trends') ? 'text-sky-500 bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
            >
              Job Trends
            </Link>
            <Link 
              to="/resume-analysis" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/resume-analysis') ? 'text-sky-500 bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
            >
              Resume Analysis
            </Link>
            <Link 
              to="/job-suggestions" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/job-suggestions') ? 'text-sky-500 bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
            >
              Job Suggestions
            </Link>
            
            {user ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/profile" 
                    className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
                  >
                    <User className="h-5 w-5 mr-1" />
                    <span>{user.name}</span>
                  </Link>
                  <button 
                    onClick={logout}
                    className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-sky-500 text-white hover:bg-sky-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            <Link
              to="/job-trends"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/job-trends') ? 'text-sky-500 bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
              onClick={closeMenu}
            >
              Job Trends
            </Link>
            <Link
              to="/resume-analysis"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/resume-analysis') ? 'text-sky-500 bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
              onClick={closeMenu}
            >
              Resume Analysis
            </Link>
            <Link
              to="/job-suggestions"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/job-suggestions') ? 'text-sky-500 bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
              onClick={closeMenu}
            >
              Job Suggestions
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;