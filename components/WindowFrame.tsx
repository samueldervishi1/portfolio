import React, { useState, useRef, useEffect } from "react";
import { X, Square, Minus } from "lucide-react";
import { WindowState } from "../types";
import { motion } from "framer-motion";

interface WindowFrameProps {
  window: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, w: number, h: number) => void;
}

const WindowFrame: React.FC<WindowFrameProps> = ({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [initialResizeState, setInitialResizeState] = useState({
    w: 0,
    h: 0,
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });

  const windowRef = useRef<HTMLDivElement>(null);

  // Drag Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    if ((e.target as HTMLElement).closest(".resize-handle")) return;

    onFocus(win.id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y,
    });
  };

  // Resize Logic Start
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);
    setInitialResizeState({
      w: win.size.width,
      h: win.size.height,
      x: win.position.x,
      y: win.position.y,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
    onFocus(win.id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onMove(win.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }

      if (isResizing && resizeDirection) {
        const deltaX = e.clientX - initialResizeState.mouseX;
        const deltaY = e.clientY - initialResizeState.mouseY;

        let newW = initialResizeState.w;
        let newH = initialResizeState.h;
        // Only implementing simple right/bottom/corner resizing for MVP
        // to avoid complex coordinate math for top/left resizing

        if (resizeDirection.includes("e")) newW = Math.max(300, initialResizeState.w + deltaX);
        if (resizeDirection.includes("s")) newH = Math.max(200, initialResizeState.h + deltaY);

        onResize(win.id, newW, newH);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    dragOffset,
    win.id,
    initialResizeState,
    resizeDirection,
    onMove,
    onResize,
  ]);

  if (!win.isOpen || win.isMinimized) return null;

  const Icon = win.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      ref={windowRef}
      style={{
        position: "absolute",
        left: win.isMaximized ? 0 : win.position.x,
        top: win.isMaximized ? 0 : win.position.y,
        width: win.isMaximized ? "100%" : win.size.width,
        height: win.isMaximized ? "calc(100% - 40px)" : win.size.height,
        zIndex: win.zIndex,
      }}
      className={`flex flex-col bg-white ${win.isMaximized ? "" : "shadow-win-active"} overflow-hidden font-sans border border-gray-400`}
      onMouseDown={() => onFocus(win.id)}
    >
      {/* Title Bar */}
      <div
        className={`h-8 min-h-[32px] flex justify-between items-center select-none bg-white ${!win.isMaximized && "cursor-default"}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onMaximize(win.id)}
      >
        <div className="flex items-center gap-2 pl-3 text-xs text-gray-700">
          <Icon size={14} className="text-blue-500" />
          <span className="pt-0.5">{win.title}</span>
        </div>

        <div className="window-controls flex h-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(win.id);
            }}
            className="w-12 h-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-800"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(win.id);
            }}
            className="w-12 h-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-800"
          >
            <Square size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(win.id);
            }}
            className="w-12 h-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors text-gray-800 group"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative flex flex-col">{win.content}</div>

      {/* Resize Handles */}
      {!win.isMaximized && (
        <>
          <div
            className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
          <div className="resize-handle absolute bottom-0 left-0 w-1 h-full cursor-w-resize z-40" />
          <div
            className="resize-handle absolute top-0 right-0 w-1 h-full cursor-e-resize z-40"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
          <div
            className="resize-handle absolute bottom-0 left-0 w-full h-1 cursor-s-resize z-40"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
        </>
      )}
    </motion.div>
  );
};

export default WindowFrame;
