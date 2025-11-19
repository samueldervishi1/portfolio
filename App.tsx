import React, { useState, useEffect } from "react";
import { FileText, Folder, FileType } from "lucide-react";
import { WindowState } from "./types";
import WindowFrame from "./components/WindowFrame";
import Taskbar from "./components/Taskbar";
import DesktopIcon from "./components/DesktopIcon";
import StartMenu from "./components/StartMenu";
import Notepad from "./components/apps/Notepad";
import Explorer from "./components/apps/Explorer";
import PDFViewer from "./components/apps/PDFViewer";
import BootScreen from "./components/BootScreen";
import LoginScreen from "./components/LoginScreen";
import WelcomeScreen from "./components/WelcomeScreen";

// Initial Windows Config
const INITIAL_WINDOWS: Record<string, WindowState> = {
  about: {
    id: "about",
    title: "About Me.txt - Notepad",
    icon: FileText,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 100, y: 50 },
    size: { width: 600, height: 400 },
    content: <Notepad />,
    type: "notepad",
  },
  projects: {
    id: "projects",
    title: "Projects",
    icon: Folder,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 150, y: 80 },
    size: { width: 800, height: 500 },
    content: <Explorer />,
    type: "explorer",
  },
  resume: {
    id: "resume",
    title: "Resume.pdf - Reader",
    icon: FileType,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    position: { x: 120, y: 60 },
    size: { width: 700, height: 800 },
    content: <PDFViewer />,
    type: "pdf",
  },
};

type BootStage = "boot" | "login" | "welcome" | "desktop";

const App: React.FC = () => {
  const [bootStage, setBootStage] = useState<BootStage>("boot");
  const [windows, setWindows] = useState<WindowState[]>(Object.values(INITIAL_WINDOWS));
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(10);

  // Check if user has already logged in (for returning visitors)
  useEffect(() => {
    const hasLoggedIn = sessionStorage.getItem("hasLoggedIn");
    if (hasLoggedIn === "true") {
      setBootStage("desktop");
    }
  }, []);

  // Window Management
  const updateWindow = (id: string, updates: Partial<WindowState>) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, ...updates } : w)));
  };

  const handleOpen = (id: string) => {
    const win = windows.find((w) => w.id === id);
    // If window doesn't exist in initial (like 'pc'), ignore or map to something
    if (!win) return;

    if (win.isOpen) {
      if (win.isMinimized) {
        updateWindow(id, { isMinimized: false, zIndex: maxZIndex + 1 });
      } else {
        updateWindow(id, { zIndex: maxZIndex + 1 });
      }
      setActiveWindowId(id);
      setMaxZIndex((prev) => prev + 1);
    } else {
      // Calculate centered position for new window
      // On mobile (< 768px), maximize the window; otherwise center it
      const isMobile = window.innerWidth < 768;
      const centerX = isMobile ? 0 : Math.max(0, (window.innerWidth - win.size.width) / 2);
      const centerY = isMobile ? 0 : Math.max(0, (window.innerHeight - win.size.height - 40) / 2); // 40px for taskbar

      updateWindow(id, {
        isOpen: true,
        zIndex: maxZIndex + 1,
        position: { x: centerX, y: centerY },
        isMaximized: isMobile,
      });
      setActiveWindowId(id);
      setMaxZIndex((prev) => prev + 1);
    }
    setIsStartOpen(false);
    setIsCalendarOpen(false);
  };

  const handleClose = (id: string) => {
    updateWindow(id, { isOpen: false, isMinimized: false, isMaximized: false });
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMinimize = (id: string) => {
    updateWindow(id, { isMinimized: true });
    setActiveWindowId(null);
  };

  const handleMaximize = (id: string) => {
    const win = windows.find((w) => w.id === id);
    if (win) updateWindow(id, { isMaximized: !win.isMaximized });
  };

  const handleFocus = (id: string) => {
    if (activeWindowId === id) return;
    updateWindow(id, { zIndex: maxZIndex + 1 });
    setActiveWindowId(id);
    setMaxZIndex((prev) => prev + 1);
    setIsStartOpen(false);
    setIsCalendarOpen(false);
  };

  const handleMove = (id: string, x: number, y: number) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;

    // Add bounds checking to keep window within viewport
    const maxX = window.innerWidth - win.size.width;
    const maxY = window.innerHeight - win.size.height - 40; // 40px for taskbar

    const boundedX = Math.max(0, Math.min(x, maxX));
    const boundedY = Math.max(0, Math.min(y, maxY));

    updateWindow(id, { position: { x: boundedX, y: boundedY } });
  };

  const handleResize = (id: string, width: number, height: number) => {
    updateWindow(id, { size: { width, height } });
  };

  // Boot sequence handlers
  const handleBootComplete = () => {
    setBootStage("login");
  };

  const handleLogin = () => {
    sessionStorage.setItem("hasLoggedIn", "true");
    setBootStage("welcome");
  };

  const handleWelcomeComplete = () => {
    setBootStage("desktop");
  };

  // Lock/Power button handler
  const handleLock = () => {
    setIsStartOpen(false);
    setIsCalendarOpen(false);
    // Close all windows
    setWindows((prev) => prev.map((w) => ({ ...w, isOpen: false, isMinimized: false })));
    setActiveWindowId(null);
    // Clear session and return to login
    sessionStorage.removeItem("hasLoggedIn");
    setBootStage("login");
  };

  // Show boot/login/welcome screens
  if (bootStage === "boot") {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  if (bootStage === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (bootStage === "welcome") {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  // Desktop view
  return (
    <div
      className="w-full h-screen overflow-hidden relative font-sans text-gray-900"
      onClick={() => {
        setIsStartOpen(false);
        setIsCalendarOpen(false);
        // Panels will close via Taskbar's closeAllPanels on body click
      }}
      onContextMenu={(e) => e.preventDefault()} // Disable default context menu
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-0 pb-16">
        <DesktopIcon
          id="about"
          title="About Me.txt"
          icon={FileText}
          iconColor="text-gray-100"
          onDoubleClick={handleOpen}
        />
        <DesktopIcon
          id="projects"
          title="My Projects"
          icon={Folder}
          iconColor="text-yellow-500"
          onDoubleClick={handleOpen}
        />
        <DesktopIcon
          id="resume"
          title="Resume.pdf"
          icon={FileType}
          iconColor="text-red-600"
          onDoubleClick={handleOpen}
        />
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <WindowFrame
          key={window.id}
          window={window}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onMove={handleMove}
          onResize={handleResize}
        />
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onItemClick={handleOpen}
        onCalendarClick={() => {
          setIsStartOpen(false);
          setIsCalendarOpen(true);
        }}
        onLock={handleLock}
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={handleOpen}
        isStartOpen={isStartOpen}
        onStartClick={(e) => {
          e.stopPropagation();
          setIsStartOpen(!isStartOpen);
        }}
        isCalendarOpen={isCalendarOpen}
        onCalendarToggle={() => setIsCalendarOpen(!isCalendarOpen)}
      />
    </div>
  );
};

export default App;
