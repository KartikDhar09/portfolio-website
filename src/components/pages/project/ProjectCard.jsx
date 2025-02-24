import React, { memo } from 'react';
import { Github, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectLink = memo(({ href, icon: Icon, title }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 transition-all duration-200 hover:scale-110"
    title={title}
  >
    <Icon className="h-4 w-4 md:h-5 md:w-5" />
  </a>
));

const TechnologyBadge = memo(({ tech }) => (
  <Badge
    variant="secondary"
    className="px-2 py-0.5 text-xs font-medium bg-white/20 dark:bg-zinc-700/30 text-slate-700 dark:text-zinc-200 backdrop-blur-sm border border-white/10 dark:border-zinc-700/50 hover:bg-white/30 dark:hover:bg-zinc-600/50 transition-colors duration-200 hover:scale-105"
  >
    {tech}
  </Badge>
));

export const ProjectCard = memo(({ project }) => {
  const { image, name, technologies = [], githubLink, liveLink } = project;

  return (
    <Card className="group w-full flex flex-col overflow-hidden rounded-xl bg-white/10 dark:bg-zinc-800/10 backdrop-blur-lg border border-white/20 dark:border-zinc-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/20 dark:hover:bg-zinc-800/20">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width="400"
          height="192"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <CardContent className="flex flex-col justify-between flex-grow p-4 backdrop-blur-xl bg-white/30 dark:bg-zinc-800/30 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800 dark:text-zinc-100 line-clamp-1 md:text-lg lg:text-xl">
            {name}
          </h3>
          <div className="flex gap-2 md:gap-3">
            {githubLink && (
              <ProjectLink 
                href={githubLink}
                icon={Github}
                title="View on GitHub"
              />
            )}
            {liveLink && (
              <ProjectLink 
                href={liveLink}
                icon={ExternalLink}
                title="View Live"
              />
            )}
          </div>
        </div>
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 overflow-hidden">
            {technologies.map((tech) => (
              <TechnologyBadge key={tech} tech={tech} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

ProjectCard.displayName = 'ProjectCard';