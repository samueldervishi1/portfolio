import { Project, Skill, NavItem } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "europa-fastagent",
    title: "europa-fastagent",
    description:
      "AI automation agent powered by Google Gemini. Automates complex backend workflows.",
    tech: ["Java", "Spring Boot", "Gemini API", "WebSockets"],
    githubUrl: "https://github.com/samueldervishii/europa-fastagent",
    date: "11/15/2025",
    size: "245 KB",
    type: "Java Project",
  },
  {
    id: "sage-cli",
    title: "sage-cli",
    description:
      "Command Line Interface AI assistant for developer productivity.",
    tech: ["Java", "GraalVM", "CLI", "Process API"],
    githubUrl: "https://github.com/samueldervishii/sage-cli",
    date: "10/02/2025",
    size: "1.2 MB",
    type: "CLI Tool",
  },
  {
    id: "llm-token-toolkit",
    title: "llm-token-toolkit",
    description:
      "High-performance tokenization utility for preparing LLM datasets.",
    tech: ["Python", "C++", "NLP", "HuggingFace"],
    githubUrl: "https://github.com/samueldervishii/llm-token-toolkit",
    date: "09/20/2025",
    size: "89 KB",
    type: "Python Script",
  },
  {
    id: "social-media-web",
    title: "Social Platform",
    description:
      "Scalable social media architecture with real-time feed generation.",
    tech: ["Java", "Spring Cloud", "Kafka", "Neo4j"],
    githubUrl: "https://github.com/samueldervishii/social-media-web",
    date: "08/14/2025",
    size: "5.6 MB",
    type: "Web App",
  },
];

export const SKILLS: Skill[] = [
  { name: "Java / JVM", level: 95, category: "Backend" },
  { name: "Spring Boot", level: 90, category: "Backend" },
  { name: "Oracle PL/SQL", level: 85, category: "Backend" },
  { name: "Talend", level: 80, category: "Backend" },
  { name: "Oracle DB", level: 85, category: "Database" },
  { name: "PostgreSQL", level: 85, category: "Database" },
  { name: "Docker", level: 75, category: "Tools" },
  { name: "Git / GitHub", level: 85, category: "Tools" },
  { name: "AWS", level: 60, category: "Cloud" },
  { name: "Azure", level: 60, category: "Cloud" },
  { name: "Albanian", level: 100, category: "Language" },
  { name: "English", level: 95, category: "Language" },
];

export const BIO_TEXT = `Hi, I'm Samuel Dervishi

Backend Developer based in Albania

I specialize in building scalable solutions using Java, Spring Boot, 
Oracle databases, and modern backend architectures.

When I'm not coding, you'll find me playing basketball, watching movies,
or working on side projects that solve real problems.

Tech Stack: Java, Oracle, PL/SQL, Talend, Spring Boot, APIs`;

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const EMAIL = "samueldervishi03@gmail.com";
export const LOCATION = "Tirana, Albania";
export const GITHUB_URL = "https://github.com/samueldervishii";
export const LINKEDIN_URL = "https://linkedin.com/in/samueldervishi";
