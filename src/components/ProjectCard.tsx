
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  reversed?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  demoUrl,
  repoUrl,
  reversed = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center",
        reversed && "lg:direction-rtl"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn("space-y-4", reversed && "lg:order-2")}>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="chip mr-2">Featured Project</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        
        <div className="relative glass-card p-6 rounded-xl">
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-400 bg-secondary/50 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4">
          {repoUrl && (
            <a 
              href={repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <Github className="w-4 h-4 mr-1" />
              <span className="text-sm">Code</span>
            </a>
          )}
          {demoUrl && (
            <a 
              href={demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
        </div>
      </div>
      
      <div className={cn("relative", reversed && "lg:order-1")}>
        <div className="glass-card p-1 rounded-xl overflow-hidden hover-lift group">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-secondary/50">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto rounded-full glass overflow-hidden mb-3">
                    <div className="w-full h-full bg-gradient-to-br from-primary to-accent opacity-30" />
                  </div>
                  <p className="text-sm">Project preview will appear here</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="ml-1 w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div 
          className={cn(
            "absolute -z-10 -bottom-3 w-full h-full rounded-xl border border-primary/20 transition-all duration-300",
            isHovered ? "-right-3" : "-right-1.5",
            reversed && "lg:-left-3 lg:-right-auto"
          )}
        />
      </div>
    </div>
  );
}
