import React from 'react';
import { GITHUB_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center text-slate-500 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono mb-2">Designed & Built by Samuel Dervishi</p>
        <div className="flex justify-center items-center gap-4 mt-4">
           <a 
             href={GITHUB_URL} 
             target="_blank" 
             rel="noreferrer" 
             className="hover:text-accent transition-colors"
           >
             GitHub
           </a>
           <span>&bull;</span>
           <span className="hover:text-accent transition-colors cursor-default">
             2023 - Present
           </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;