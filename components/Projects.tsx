import React from 'react';
import { PROJECTS } from '../constants';
import { Folder, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-accent font-mono text-lg">02.</span> Some Things I've Built
          </h2>
          <div className="h-px bg-slate-700 flex-grow max-w-[200px]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-surface rounded-lg p-6 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-accent/30 shadow-lg"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-accent">
                  <Folder size={40} strokeWidth={1} />
                </div>
                <div className="flex gap-4 text-slate-400">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>

              <p className="text-slate-400 text-sm mb-6 leading-relaxed min-h-[80px]">
                {project.description}
              </p>

              <ul className="flex flex-wrap gap-3 mt-auto text-xs font-mono text-slate-500">
                {project.tech.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;