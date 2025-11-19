import React from "react";
import { DesktopIconProps } from "../types";

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  title,
  icon: Icon,
  iconColor,
  onDoubleClick,
  shortcut,
}) => {
  return (
    <div
      className="group w-20 flex flex-col items-center gap-1 p-1 hover:bg-white/10 hover:border hover:border-white/20 rounded-sm cursor-default mb-2 transition-colors active:bg-white/20"
      onDoubleClick={() => onDoubleClick(id)}
      onClick={(e) => {
        e.stopPropagation();
        // Could select logic here
        if (window.innerWidth < 768) onDoubleClick(id);
      }}
    >
      <div className={`relative ${iconColor} drop-shadow-md`}>
        <Icon size={42} strokeWidth={1.2} />
        {shortcut && (
          <div className="absolute bottom-0 left-0 bg-white rounded-sm shadow-sm">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 10l5 5-5 5" />
              <path d="M4 4v7a4 4 0 0 0 4 4h12" />
            </svg>
          </div>
        )}
      </div>
      <span
        className="text-white text-[11px] text-center leading-tight drop-shadow-md line-clamp-2"
        style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.8)" }}
      >
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon;
