import React from 'react';
import { FileText, AlertCircle, HelpCircle, Mail } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Please read these terms carefully before using JobLens
        </p>
      </div>

      <div className="card mb-8">
        <div className="flex items-center mb-6">
          <FileText className="h-8 w-8 text-sky-500 mr-4" />
          <h2 className="text-2xl font-bold text-white">Agreement to Terms</h2>
        </div>
        <p className="text-gray-300 mb-4">
          By accessing or using JobLens, you agree to be bound by these Terms of Service 
          and our Privacy Policy. If you disagree with any part of the terms, you may 
          not access the service.
        </p>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">1. User Accounts</h2>
        <div className="space-y-4 text-gray-300">
          <p>When you create an account with us, you must provide accurate information.</p>
          <p>You are responsible for maintaining the security of your account.</p>
          <p>You must notify us immediately of any unauthorized access.</p>
          <p>We reserve the right to terminate accounts for violations of these terms.</p>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">2. Service Usage</h2>
        <div className="space-y-4 text-gray-300">
          <p>You may use our service only for lawful purposes.</p>
          <p>You may not use our service for any illegal or unauthorized purpose.</p>
          <p>You may not interfere with or disrupt the service.</p>
          <p>We reserve the right to modify or terminate the service at any time.</p>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">3. Intellectual Property</h2>
        <div className="space-y-4 text-gray-300">
          <p>The service and its original content are and will remain the exclusive property of JobLens.</p>
          <p>Our trademarks may not be used without prior written consent.</p>
          <p>You retain ownership of your data but grant us license to use it for service improvement.</p>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">4. Limitation of Liability</h2>
        <div className="space-y-4 text-gray-300">
          <p>We provide the service "as is" without any warranty.</p>
          <p>We are not responsible for any indirect, consequential, or punitive damages.</p>
          <p>Our liability is limited to the amount paid for the service.</p>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">5. Changes to Terms</h2>
        <div className="space-y-4 text-gray-300">
          <p>We reserve the right to modify these terms at any time.</p>
          <p>Changes will be effective immediately upon posting.</p>
          <p>Continued use of the service constitutes acceptance of new terms.</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center mb-6">
          <HelpCircle className="h-8 w-8 text-sky-500 mr-4" />
          <h2 className="text-2xl font-bold text-white">Questions or Concerns?</h2>
        </div>
        <p className="text-gray-300 mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Mail className="h-5 w-5 text-sky-500 mr-2" />
            <p className="text-gray-300">legal@joblens.com</p>
          </div>
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-sky-500 mr-2" />
            <p className="text-gray-300">Last updated: March 1, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;