import React from "react";
import { Github, Code, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectCard = ({ project, theme }) => {
  return (
    <Card className="group h-full transition-all duration-300 hover:scale-[1.02]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold">{project.name}</span>
          <Button variant="ghost" size="icon" asChild>
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Github className="w-5 h-5" />
            </a>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const projects = [
    {
      name: "E-Commerce Platform",
      description: "React-based online shopping website with Redux state management and modern UI/UX principles.",
      technologies: ["React", "Redux", "Tailwind CSS"],
      githubLink: "#",
    },
    {
      name: "Task Management App",
      description: "Productivity app featuring real-time collaboration, drag-and-drop interface, and data persistence.",
      technologies: ["React", "Firebase", "TypeScript"],
      githubLink: "#",
    },
    {
      name: "Weather Forecast App",
      description: "Real-time weather tracking application with geolocation and detailed meteorological data visualization.",
      technologies: ["React", "OpenWeatherAPI", "Tailwind"],
      githubLink: "#",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Code className="w-8 h-8" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
              My Projects
            </h2>
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-lg max-w-2xl mx-auto">
            A showcase of my latest web development projects and experiments.
            Each project represents a unique challenge and learning opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;