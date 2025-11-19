import React from "react";
import { SKILLS } from "../../constants";
import { Cpu } from "lucide-react";

const Skills: React.FC = () => {
  return (
    <div className="h-full p-4 bg-[#ECE9D8] font-sans text-xs">
      {/* Tabs Mock */}
      <div className="flex gap-1 mb-2 border-b border-white">
        <div className="bg-white border-t border-l border-r border-[#7F9DB9] px-3 py-1 rounded-t relative -bottom-[1px] z-10">
          General
        </div>
        <div className="bg-[#ECE9D8] border border-[#7F9DB9] px-3 py-1 rounded-t text-gray-600">
          Computer Name
        </div>
        <div className="bg-[#ECE9D8] border border-[#7F9DB9] px-3 py-1 rounded-t text-gray-600">
          Hardware
        </div>
        <div className="bg-[#ECE9D8] border border-[#7F9DB9] px-3 py-1 rounded-t text-gray-600">
          Advanced
        </div>
      </div>

      <div className="bg-white border border-[#7F9DB9] p-4 h-[calc(100%-40px)] flex gap-4">
        <div className="flex flex-col items-center gap-4 w-1/3 pt-4">
          <div className="w-32 h-24">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80"
              className="w-full h-full object-cover border border-gray-400 shadow-inner"
              alt="System"
            />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h4 className="font-bold text-sm mb-1">System:</h4>
            <p>Samuel Dervishi OS</p>
            <p>Professional Edition</p>
            <p>Version 2024</p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-1">Registered to:</h4>
            <p>Java Backend Developer</p>
            <p>Albania</p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-1">Computer:</h4>
            <div className="space-y-1">
              {SKILLS.filter((s) => s.level > 80).map((skill) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <Cpu size={12} className="text-blue-600" />
                  <span>{skill.name}</span>
                  <span className="text-gray-500"> @ {skill.level * 0.03} GHz</span>
                </div>
              ))}
              <p>{SKILLS.length} GB of RAM</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="px-4 py-1 border border-[#003C74] bg-gradient-to-b from-white to-[#ECE9D8] rounded shadow-sm active:shadow-inner text-black">
              Support Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
