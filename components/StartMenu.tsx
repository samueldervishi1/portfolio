import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Power,
  Settings,
  FileText,
  Folder,
  FileType,
  Github,
  Linkedin,
  Mail,
  Calendar,
} from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL } from "../constants";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (action: string) => void;
  onCalendarClick?: () => void;
  onLock?: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onItemClick,
  onCalendarClick,
  onLock,
}) => {
  if (!isOpen) return null;

  const Tile = ({ icon: Icon, title, color, size = "small", onClick }: any) => (
    <div
      onClick={onClick}
      className={`
        ${size === "medium" ? "col-span-2" : "col-span-1"} 
        ${size === "wide" ? "col-span-4" : ""} 
        h-24 bg-[${color}] hover:brightness-110 cursor-pointer p-3 flex flex-col justify-between relative group transition-all
      `}
      style={{ backgroundColor: color }}
    >
      <Icon size={28} className="text-white" />
      <span className="text-white text-xs font-medium">{title}</span>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-colors"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed bottom-10 left-0 h-[500px] flex bg-[#1f1f1f]/80 text-white z-[90] shadow-2xl border-t border-white/10"
      style={{
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left Sidebar */}
      <div className="w-12 flex flex-col justify-end items-center pb-4 gap-4 bg-[#1f1f1f]">
        <button
          onClick={onLock}
          className="p-2 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
          title="Lock"
        >
          <Power size={20} />
        </button>
      </div>

      {/* App List (Simplified) */}
      <div className="w-64 p-4 overflow-y-auto hidden sm:block scrollbar-hide">
        <div className="text-xs font-semibold text-gray-400 mb-2 pl-2">Recently Added</div>
        <button className="w-full text-left px-2 py-2 hover:bg-white/10 flex items-center gap-3 mb-4 rounded">
          <div className="w-8 h-8 bg-win-blue flex items-center justify-center text-xs">SD</div>
          <span className="text-sm">Samuel Dervishi</span>
        </button>

        <div className="text-xs font-semibold text-gray-400 mb-2 pl-2">A</div>
        <button
          className="w-full text-left px-2 py-2 hover:bg-white/10 flex items-center gap-3 rounded"
          onClick={() => onItemClick("about")}
        >
          <FileText size={16} className="text-blue-400" />
          <span className="text-sm">About Me</span>
        </button>

        <div className="text-xs font-semibold text-gray-400 mb-2 mt-2 pl-2">C</div>
        <button
          className="w-full text-left px-2 py-2 hover:bg-white/10 flex items-center gap-3 rounded"
          onClick={() => window.open("mailto:samuel@example.com")}
        >
          <Mail size={16} className="text-blue-400" />
          <span className="text-sm">Contact</span>
        </button>

        <div className="text-xs font-semibold text-gray-400 mb-2 mt-2 pl-2">P</div>
        <button
          className="w-full text-left px-2 py-2 hover:bg-white/10 flex items-center gap-3 rounded"
          onClick={() => onItemClick("projects")}
        >
          <Folder size={16} className="text-yellow-400" />
          <span className="text-sm">Projects</span>
        </button>

        <div className="text-xs font-semibold text-gray-400 mb-2 mt-2 pl-2">R</div>
        <button
          className="w-full text-left px-2 py-2 hover:bg-white/10 flex items-center gap-3 rounded"
          onClick={() => onItemClick("resume")}
        >
          <FileType size={16} className="text-red-400" />
          <span className="text-sm">Resume.pdf</span>
        </button>
      </div>

      {/* Tiles Area */}
      <div className="w-80 sm:w-[400px] p-4 pl-6 overflow-y-auto border-l border-white/5">
        <div className="text-xs font-semibold text-white mb-4">Life at a glance</div>

        <div className="grid grid-cols-4 gap-1">
          <Tile
            icon={FileText}
            title="About Me"
            color="#0078D7"
            size="medium"
            onClick={() => onItemClick("about")}
          />
          <Tile
            icon={Calendar}
            title="Calendar"
            color="#0099BC"
            size="medium"
            onClick={onCalendarClick}
          />
          <Tile
            icon={Folder}
            title="My Projects"
            color="#ECA517"
            size="wide"
            onClick={() => onItemClick("projects")}
          />
        </div>

        <div className="text-xs font-semibold text-white mb-4 mt-6">Productivity</div>

        <div className="grid grid-cols-4 gap-1">
          <Tile
            icon={FileType}
            title="Resume"
            color="#D93025"
            size="medium"
            onClick={() => onItemClick("resume")}
          />
          <Tile
            icon={Github}
            title="GitHub"
            color="#181717"
            size="medium"
            onClick={() => window.open(GITHUB_URL, "_blank")}
          />
          <Tile
            icon={Linkedin}
            title="LinkedIn"
            color="#0077B5"
            size="medium"
            onClick={() => window.open(LINKEDIN_URL, "_blank")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StartMenu;
