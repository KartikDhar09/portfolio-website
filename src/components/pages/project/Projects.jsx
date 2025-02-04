import React from 'react';
import { Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      name: 'E-Commerce Platform',
      description: 'React-based online shopping website with Redux state management',
      technologies: ['React', 'Redux', 'Tailwind CSS'],
      githubLink: '#'
    },
    {
      name: 'Task Management App',
      description: 'Productivity app with real-time collaboration features',
      technologies: ['React', 'Firebase', 'TypeScript'],
      githubLink: '#'
    },
    {
      name: 'Weather Forecast App',
      description: 'Real-time weather tracking application with geolocation',
      technologies: ['React', 'OpenWeatherAPI', 'Tailwind'],
      githubLink: '#'
    }
  ];

  return (
    <div className="min-h-screen flex items-center">
      <div>
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.name} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <Github className="mr-2" /> View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;