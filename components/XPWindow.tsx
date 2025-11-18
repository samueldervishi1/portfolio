import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { WindowState } from '../types';
import { motion } from 'framer-motion';

interface XPWindowProps {
  window: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, w: number, h: number) => void;
}

const XPWindow: React.FC<XPWindowProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    // Only drag if clicking title bar
    const target = e.target as HTMLElement;
    if (target.closest('.window-controls')) return;
    
    onFocus(window.id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onMove(window.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, window.id, onMove]);

  if (!window.isOpen || window.isMinimized) return null;

  const Icon = window.icon;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.15 }}
      ref={windowRef}
      style={{
        position: 'absolute',
        left: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100%' : window.size.width,
        height: window.isMaximized ? 'calc(100% - 40px)' : window.size.height,
        zIndex: window.zIndex,
      }}
      className="flex flex-col bg-xp-beige rounded-t-lg xp-shadow"
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Title Bar */}
      <div
        className={`h-8 flex justify-between items-center px-2 select-none ${
          window.zIndex >= 10 
            ? 'bg-gradient-to-r from-xp-title-start via-xp-title-mid to-xp-title-end' 
            : 'bg-[#7697E7]'
        } rounded-t-lg cursor-default`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onMaximize(window.id)}
      >
        <div className="flex items-center gap-2 text-white font-bold text-shadow-sm truncate">
          <Icon size={16} />
          <span className="text-sm drop-shadow-md">{window.title}</span>
        </div>

        <div className="window-controls flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
            className="w-5 h-5 flex items-center justify-center bg-xp-blue-dark border border-white rounded hover:bg-blue-400 active:bg-blue-600 shadow-inner text-white"
          >
            <Minus size={12} strokeWidth={3} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }}
            className="w-5 h-5 flex items-center justify-center bg-xp-blue-dark border border-white rounded hover:bg-blue-400 active:bg-blue-600 shadow-inner text-white"
          >
            {window.isMaximized ? <Minimize2 size={12} strokeWidth={3} /> : <Maximize2 size={12} strokeWidth={3} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
            className="w-5 h-5 flex items-center justify-center bg-xp-red border border-white rounded hover:bg-red-400 active:bg-red-600 shadow-inner text-white"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Menu Bar (Decoration only) */}
      <div className="bg-xp-beige border-b border-gray-300 px-2 py-1 flex gap-4 text-xs text-black">
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white border-l-4 border-r-4 border-b-4 border-xp-beige p-1 relative">
         {window.content}
      </div>
      
      {/* Resizer (simple visual, functionality simplified for MVP) */}
      {!window.isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={(e) => {
             e.stopPropagation();
             // Simple resize implementation could go here
          }}
        >
           <svg width="100%" height="100%" viewBox="0 0 12 12">
             <path d="M8 10 L10 12 M5 10 L10 5 M2 10 L10 2" stroke="#888" strokeWidth="1" />
           </svg>
        </div>
      )}
    </motion.div>
  );
};

export default XPWindow;
