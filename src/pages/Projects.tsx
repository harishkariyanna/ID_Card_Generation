import React from 'react';

const Projects = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project cards will be added here when data is available */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Sample Project</h2>
          <p className="text-gray-600 mb-4">
            This is a placeholder project card. The actual projects will be populated here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;