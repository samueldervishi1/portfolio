import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const About: React.FC = () => {
  const languages = SKILLS.filter(s => s.category === 'Language');
  const frameworks = SKILLS.filter(s => s.category === 'Framework');
  const databases = SKILLS.filter(s => s.category === 'Database');
  const tools = SKILLS.filter(s => s.category === 'Tools');

  const SkillTag = ({ name, icon: Icon }: { name: string; icon?: any }) => (
    <div className="flex items-center gap-2 bg-surface border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300 hover:border-accent/50 hover:text-accent transition-colors cursor-default">
      {Icon && <Icon size={14} />}
      <span>{name}</span>
    </div>
  );

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <span className="text-accent font-mono text-lg">01.</span> About Me
              </h2>
              <div className="h-px bg-slate-700 flex-grow max-w-[200px]"></div>
            </div>

            <div className="text-slate-400 space-y-4 leading-relaxed">
              <p>
                Hello! My name is Samuel and I enjoy creating things that live on the internet. My interest in backend development started back in university when I first worked with Java and realized the power of strictly typed, robust systems.
              </p>
              <p>
                Fast-forward to today, I've had the privilege of building software for diverse clients. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
              </p>
              <p>
                When I'm not coding, you can find me on the basketball court, watching the latest sci-fi movies, or solving logic puzzles to keep my mind sharp.
              </p>
            </motion.div>

          {/* Skills */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             id="skills"
          >
            <h3 className="text-xl font-bold text-slate-200 mb-6">Technical Skills</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-mono text-accent mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {languages.map(s => <SkillTag key={s.name} name={s.name} icon={s.icon} />)}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-mono text-accent mb-3">Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map(s => <SkillTag key={s.name} name={s.name} icon={s.icon} />)}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-mono text-accent mb-3">Databases</h4>
                <div className="flex flex-wrap gap-2">
                  {databases.map(s => <SkillTag key={s.name} name={s.name} icon={s.icon} />)}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-mono text-accent mb-3">Tools & Infrastructure</h4>
                <div className="flex flex-wrap gap-2">
                  {tools.map(s => <SkillTag key={s.name} name={s.name} icon={s.icon} />)}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;