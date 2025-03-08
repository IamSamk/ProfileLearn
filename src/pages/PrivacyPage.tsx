import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Your privacy is our top priority. Learn how we protect and handle your data.
        </p>
      </div>

      <div className="card mb-8">
        <div className="flex items-center mb-6">
          <Shield className="h-8 w-8 text-sky-500 mr-4" />
          <h2 className="text-2xl font-bold text-white">Data Protection</h2>
        </div>
        <p className="text-gray-300 mb-4">
          We implement industry-standard security measures to protect your personal information 
          and ensure it remains confidential. Your data is encrypted both in transit and at rest.
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>End-to-end encryption for all data transmission</li>
          <li>Regular security audits and penetration testing</li>
          <li>Compliance with GDPR and other privacy regulations</li>
          <li>Secure data centers with 24/7 monitoring</li>
        </ul>
      </div>

      <div className="card mb-8">
        <div className="flex items-center mb-6">
          <Database className="h-8 w-8 text-sky-500 mr-4" />
          <h2 className="text-2xl font-bold text-white">Data Collection</h2>
        </div>
        <p className="text-gray-300 mb-4">
          We collect only the information necessary to provide our services:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Basic profile information (name, email)</li>
          <li>Resume data for analysis</li>
          <li>LinkedIn profile information (with your consent)</li>
          <li>Usage statistics to improve our service</li>
        </ul>
      </div>

      <div className="card mb-8">
        <div className="flex items-center mb-6">
          <Eye className="h-8 w-8 text-sky-500 mr-4" />
          <h2 className="text-2xl font-bold text-white">Data Usage</h2>
        </div>
        <p className="text-gray-300 mb-4">
          Your data is used exclusively for:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Providing personalized career insights</li>
          <li>Improving our AI analysis algorithms</li>
          <li>Generating anonymous market trends</li>
          <li>Service optimization and enhancement</li>
        </ul>
      </div>

      <div className="card mb-8">
        <div className="flex items-center mb-6">
          <Lock className="h-8 w-8 text-sky-500 mr-4" />
          <h2 className="text-2xl font-bold text-white">Your Rights</h2>
        </div>
        <p className="text-gray-300 mb-4">
          You have full control over your data:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Right to access your personal data</li>
          <li>Right to request data deletion</li>
          <li>Right to modify your information</li>
          <li>Right to export your data</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
        <p className="text-gray-300 mb-4">
          If you have any questions about our privacy policy or how we handle your data, 
          please contact our Data Protection Officer:
        </p>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-300">Email: privacy@joblens.com</p>
          <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-300">Address: 123 Privacy Street, Tech City, TC 12345</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;