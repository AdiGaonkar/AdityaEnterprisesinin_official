
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { AnimatedTitle } from './ui/AnimatedText';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('all');
  
  const projects = [
    {
      title: 'Gogas Site',
      description: 'A full-featured gas agency site with online fast booking. site was created using MERN stack.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'gogas.png',
      demoUrl: 'https://www.gogas.site/',
      repoUrl: 'https://github.com/AdiGaonkar/gogas',
      category: 'MERN Stack',
    },
    {
      title: 'Trendvise Pro',
      description: 'Trendvise Pro is a stock market platform where you can receive expert guidance from experienced traders to help you make informed investment decisions. .',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'trendvise pro.png',
      demoUrl: 'https://www.trendvisepro.in/',
      repoUrl: 'https://github.com/AdiGaonkar/trendvise-pro',
      category: 'MERN Stack',
    },
    {
      title: 'AppleVisionPro',
      description: 'A comprehensive collection of reusable UI components for building modern admin dashboards and data visualization interfaces.',
      tags: ['HTML','CSS','JavaScript'],
      image: 'apple.png',
      demoUrl: 'https://vision-pro-adi.netlify.app/',
      repoUrl: 'https://github.com/AdiGaonkar/Applevisionpro',
      category: 'ui',
    },
    {
      title: 'TheSearchifi - Developers Hub',
      description: 'A responsive messaging platform with real-time updates, user authentication, and file sharing capabilities using Socket.io.',
      tags: ['React', 'Node.js', 'Socket.io', 'Firebase'],
      image: '2025-07-02.png',
      demoUrl: '#',
      repoUrl: '#',
      category: 'web',
    },
  ];
  
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);
  
  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'ui', label: 'UI Design' },
    { id: '3d', label: '3D Projects' },
  ];

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-background/95 to-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl opacity-20" />
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="chip mb-3">My Work</span>
          <AnimatedTitle 
            text="Featured Projects & Case Studies" 
            className="text-3xl md:text-4xl lg:text-5xl font-normal ml-72 font-display tracking-tight mb-6"
            wordsClassName="text-gradient"
          />
          <p className="text-gray-300 text-normal max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work, personal projects, and experiments in web development and design.
          </p>
        </div>
        
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "glass bg-primary/20 text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-24">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                demoUrl={project.demoUrl}
                repoUrl={project.repoUrl}
                reversed={index % 2 !== 0}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
