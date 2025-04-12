import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=faces"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">John Doe</h1>
        <h2 className="text-xl text-indigo-600 mb-4">Full Stack Developer</h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-8">
          Passionate about creating beautiful, user-friendly applications that solve
          real-world problems. Specialized in React, Node.js, and modern web
          technologies.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:john@example.com"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;