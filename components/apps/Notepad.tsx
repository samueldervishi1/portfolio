import React from "react";
import { SKILLS, GITHUB_URL, LINKEDIN_URL, EMAIL, LOCATION } from "../../constants";
import { Github, Linkedin, Mail, MapPin, User } from "lucide-react";

const Notepad: React.FC = () => {
  const skillsByCategory = SKILLS.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof SKILLS>
  );

  return (
    <div className="h-full flex bg-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto hidden md:flex flex-col py-6 px-5">
        {/* Social Links Section */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Connect
          </h3>
          <div className="space-y-1">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-md transition-all group"
            >
              <Github size={16} className="text-gray-500 group-hover:text-gray-900" />
              <span>GitHub</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-md transition-all group"
            >
              <Linkedin size={16} className="text-gray-500 group-hover:text-gray-900" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-md transition-all group"
            >
              <Mail size={16} className="text-gray-500 group-hover:text-gray-900" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Technical Skills
          </h3>
          <div className="space-y-4">
            {Object.entries(skillsByCategory)
              .filter(([category]) => category !== "Language")
              .map(([category, skills]) => (
                <div key={category}>
                  <div className="text-xs font-medium text-gray-600 mb-2">{category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-2 py-0.5 text-xs text-gray-700 bg-white border border-gray-200 rounded"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Languages Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Languages
          </h3>
          <div className="space-y-2">
            {skillsByCategory["Language"]?.map((lang) => (
              <div key={lang.name} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{lang.name}</span>
                <span className="text-xs text-gray-500">
                  {lang.level === 100 ? "Native" : "Fluent"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="pb-8 border-b border-gray-200">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                SD
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Samuel Dervishi</h1>
                <p className="text-xl text-gray-600 mb-3">Backend Developer</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  <span>{LOCATION}</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">About</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Hi! I'm Samuel Dervishi, a{" "}
                <strong className="text-gray-900">Backend Developer</strong> based in Albania. I
                specialize in building scalable solutions using{" "}
                <strong className="text-gray-900">Java, Spring Boot, Oracle databases</strong>, and
                modern backend architectures.
              </p>
              <p>
                I'm passionate about creating robust, efficient systems that solve real-world
                problems. My expertise includes backend development, database optimization, and
                building scalable microservices architectures.
              </p>
              <p>
                When I'm not coding, you'll find me playing basketball, watching movies, or working
                on side projects that push the boundaries of what's possible with technology.
              </p>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="space-y-4 pt-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Primary Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Java", "Spring Boot", "Oracle", "PL/SQL", "Talend", "APIs"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <div className="space-y-4 pt-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Interests & Hobbies
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Basketball",
                "Movies",
                "Side Projects",
                "Open Source",
                "Backend Architecture",
                "Problem Solving",
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-md"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notepad;
