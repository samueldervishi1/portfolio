import React, { useState, useEffect } from 'react';
import { WindowState } from '../types';
import { Search, Wifi, Volume2, MessageSquare, Calendar } from 'lucide-react';
import { WiFiPanel, VolumePanel, CalendarPanel, NotificationPanel } from './SystemTrayPanels';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  isStartOpen: boolean;
  onStartClick: (e: React.MouseEvent) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onWindowClick,
  isStartOpen,
  onStartClick
}) => {
  const [time, setTime] = useState(new Date());
  const [isWiFiPanelOpen, setIsWiFiPanelOpen] = useState(false);
  const [isVolumePanelOpen, setIsVolumePanelOpen] = useState(false);
  const [isCalendarPanelOpen, setIsCalendarPanelOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      closeAllPanels();
    };

    if (isWiFiPanelOpen || isVolumePanelOpen || isCalendarPanelOpen || isNotificationPanelOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isWiFiPanelOpen, isVolumePanelOpen, isCalendarPanelOpen, isNotificationPanelOpen]);

  const closeAllPanels = () => {
    setIsWiFiPanelOpen(false);
    setIsVolumePanelOpen(false);
    setIsCalendarPanelOpen(false);
    setIsNotificationPanelOpen(false);
  };

  const toggleWiFiPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVolumePanelOpen(false);
    setIsCalendarPanelOpen(false);
    setIsNotificationPanelOpen(false);
    setIsWiFiPanelOpen(!isWiFiPanelOpen);
  };

  const toggleVolumePanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWiFiPanelOpen(false);
    setIsCalendarPanelOpen(false);
    setIsNotificationPanelOpen(false);
    setIsVolumePanelOpen(!isVolumePanelOpen);
  };

  const toggleCalendarPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWiFiPanelOpen(false);
    setIsVolumePanelOpen(false);
    setIsNotificationPanelOpen(false);
    setIsCalendarPanelOpen(!isCalendarPanelOpen);
  };

  const toggleNotificationPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWiFiPanelOpen(false);
    setIsVolumePanelOpen(false);
    setIsCalendarPanelOpen(false);
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-win-taskbar flex items-center z-[100] glass border-t border-white/10">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className={`h-full w-12 flex items-center justify-center hover:bg-white/10 transition-colors group ${isStartOpen ? 'bg-white/10' : ''}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3.42857L9.42857 2.14286V11.5714H0V3.42857Z" fill={isStartOpen ? "#0078D7" : "white"} className="group-hover:fill-[#0078D7] transition-colors"/>
          <path d="M10.2857 2L24 0V11.5714H10.2857V2Z" fill={isStartOpen ? "#0078D7" : "white"} className="group-hover:fill-[#0078D7] transition-colors"/>
          <path d="M0 12.4286H9.42857V20.5714L0 19.2857V12.4286Z" fill={isStartOpen ? "#0078D7" : "white"} className="group-hover:fill-[#0078D7] transition-colors"/>
          <path d="M10.2857 12.4286H24V24L10.2857 22V12.4286Z" fill={isStartOpen ? "#0078D7" : "white"} className="group-hover:fill-[#0078D7] transition-colors"/>
        </svg>
      </button>


      {/* Windows List */}
      <div className="flex-1 flex items-center px-1 h-full overflow-hidden">
        {windows.filter(w => w.isOpen).map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`
              h-full px-3 min-w-[140px] max-w-[200px] flex items-center gap-2 text-xs transition-all border-b-2
              ${activeWindowId === window.id && !window.isMinimized
                ? 'bg-white/10 border-win-blue text-white' 
                : 'hover:bg-white/5 border-transparent text-gray-300 hover:text-white'}
            `}
          >
            <window.icon size={16} className={activeWindowId === window.id ? 'text-blue-400' : 'text-gray-400'} />
            <span className="truncate pt-0.5 font-light">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="h-full flex items-center px-2 gap-1 relative">
         <button className="h-full px-2 hover:bg-white/10 text-white rounded-sm">
           <span className="text-xs">ENG</span>
         </button>

         <button
           onClick={toggleWiFiPanel}
           className={`h-full px-2 hover:bg-white/10 flex items-center justify-center cursor-pointer text-white rounded-sm transition-colors ${
             isWiFiPanelOpen ? 'bg-white/10' : ''
           }`}
         >
           <Wifi size={16} />
         </button>

         <button
           onClick={toggleVolumePanel}
           className={`h-full px-2 hover:bg-white/10 flex items-center justify-center cursor-pointer text-white rounded-sm transition-colors ${
             isVolumePanelOpen ? 'bg-white/10' : ''
           }`}
         >
           <Volume2 size={16} />
         </button>

         <button
           onClick={toggleCalendarPanel}
           className={`h-full px-2 hover:bg-white/10 flex flex-col items-end justify-center cursor-pointer text-white min-w-[70px] rounded-sm transition-colors ${
             isCalendarPanelOpen ? 'bg-white/10' : ''
           }`}
         >
           <span className="text-xs leading-none mb-[2px]">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
           <span className="text-[10px] leading-none text-gray-300">{time.toLocaleDateString()}</span>
         </button>

         <button
           onClick={toggleNotificationPanel}
           className={`h-full w-10 hover:bg-white/10 flex items-center justify-center cursor-pointer text-white border-l border-gray-600/30 ml-1 rounded-sm transition-colors relative ${
             isNotificationPanelOpen ? 'bg-white/10' : ''
           }`}
         >
           <MessageSquare size={16} className="fill-current" />
           {/* Notification Badge */}
           <span className="absolute top-1 right-1 bg-win-blue text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-win-dark">
             2
           </span>
         </button>

         <div className="w-1 h-full border-l border-gray-500 ml-1"></div>

         {/* System Tray Panels */}
         <WiFiPanel isOpen={isWiFiPanelOpen} onClose={closeAllPanels} />
         <VolumePanel isOpen={isVolumePanelOpen} onClose={closeAllPanels} />
         <CalendarPanel isOpen={isCalendarPanelOpen} onClose={closeAllPanels} />
         <NotificationPanel isOpen={isNotificationPanelOpen} onClose={closeAllPanels} />
      </div>
    </div>
  );
};

export default Taskbar;