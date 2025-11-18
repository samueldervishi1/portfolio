import React from 'react';
import { SKILLS } from '../../constants';
import { User, FileText, Menu, AlignLeft, Bold, Italic, Underline } from 'lucide-react';

const Word: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#F3F3F3] font-sans text-sm">
      {/* Top Bar */}
      <div className="bg-[#2B579A] text-white h-10 flex items-center justify-between px-3">
         <div className="flex items-center gap-4">
            <div className="text-xs flex flex-col -space-y-1">
               <span>AutoSave</span>
               <span className="font-bold">Off</span>
            </div>
            <div className="h-4 w-[1px] bg-white/30"></div>
            <div className="flex items-center gap-2 text-xs">
               <FileText size={16} />
               <span className="font-semibold">Skills.docx - Word</span>
            </div>
         </div>
         <div className="text-xs text-white/80">Samuel Dervishi</div>
      </div>

      {/* Ribbon */}
      <div className="bg-white border-b border-gray-300 flex flex-col shadow-sm z-10">
         <div className="flex gap-4 px-4 pt-2 text-xs text-gray-600">
            <span className="text-[#2B579A] font-bold border-b-2 border-[#2B579A] pb-1">Home</span>
            <span className="hover:bg-gray-100 px-1 rounded">Insert</span>
            <span className="hover:bg-gray-100 px-1 rounded">Layout</span>
            <span className="hover:bg-gray-100 px-1 rounded">References</span>
         </div>
         <div className="h-16 bg-[#F3F3F3] flex items-center px-4 gap-4 border-t border-gray-200">
            <div className="flex gap-1 text-gray-700">
               <div className="p-1 hover:bg-white rounded border border-transparent hover:border-gray-300"><Bold size={16} /></div>
               <div className="p-1 hover:bg-white rounded border border-transparent hover:border-gray-300"><Italic size={16} /></div>
               <div className="p-1 hover:bg-white rounded border border-transparent hover:border-gray-300"><Underline size={16} /></div>
            </div>
            <div className="w-[1px] h-10 bg-gray-300"></div>
            <div className="flex gap-1 text-gray-700">
               <div className="p-1 hover:bg-white rounded border border-transparent hover:border-gray-300"><AlignLeft size={16} /></div>
               <div className="p-1 hover:bg-white rounded border border-transparent hover:border-gray-300"><Menu size={16} /></div>
            </div>
         </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center relative">
         <div className="bg-white w-[600px] min-h-[800px] shadow-lg p-12 text-gray-800 relative">
            <h1 className="text-3xl font-bold text-[#2B579A] mb-2">Technical Skills</h1>
            <p className="text-gray-500 mb-8 text-sm italic">Last Updated: November 2025</p>
            
            <div className="space-y-6">
               {['Backend', 'Database', 'Tools', 'Cloud', 'Language'].map((category) => (
                  <div key={category}>
                     <h2 className="text-lg font-bold border-b-2 border-gray-200 mb-3 pb-1 uppercase text-gray-700">{category}</h2>
                     <div className="grid grid-cols-2 gap-4">
                        {SKILLS.filter(s => s.category === category).map(skill => (
                           <div key={skill.name} className="flex items-center justify-between">
                              <span className="font-medium">{skill.name}</span>
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                 <div className="h-full bg-[#2B579A]" style={{ width: `${skill.level}%` }}></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>

            {/* Footer of doc */}
            <div className="absolute bottom-12 left-12 right-12 border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
               Samuel Dervishi - Portfolio
            </div>
         </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#2B579A] text-white text-xs flex items-center justify-between px-2">
         <div className="flex gap-4">
            <span>Page 1 of 1</span>
            <span>245 words</span>
         </div>
         <div className="flex gap-4">
            <span>100%</span>
         </div>
      </div>
    </div>
  );
};

export default Word;