import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const Certifications = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Certifications</h1>
      
      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Sample Certification
            </h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            This is a placeholder certification. The actual certifications will be populated here.
          </p>
          
          <div className="flex space-x-4">
            <a
              href="#"
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View Certificate
            </a>
            <a
              href="#"
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Verify Certificate
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;