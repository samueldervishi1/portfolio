import { LucideIcon } from 'lucide-react';

export interface WindowState {
  id: string;
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: React.ReactNode;
  type: 'notepad' | 'explorer' | 'word' | 'pdf' | 'browser';
}

export interface DesktopIconProps {
  id: string;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  onDoubleClick: (id: string) => void;
  shortcut?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  date: string;
  size: string;
  type: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Backend' | 'Frontend' | 'Tools' | 'Cloud' | 'Database' | 'Language' | 'Framework';
  icon?: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
}