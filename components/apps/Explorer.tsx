import React, { useState } from "react";
import { PROJECTS, GITHUB_REPOS } from "../../constants";
import { useGitHubRepoData, formatGitHubDate, formatRepoSize } from "../../hooks/useGitHubRepoData";
import {
  Folder,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Star,
  Monitor,
  Download,
  FileCode,
  Clock,
  HardDrive,
  Database,
  Cpu,
  Info,
} from "lucide-react";

const Explorer: React.FC = () => {
  const [view, setView] = useState<"projects" | "disk" | "desktop" | "downloads">("projects");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { repoData, loading, error } = useGitHubRepoData(GITHUB_REPOS);

  // Helper function to get date (from GitHub API or fallback)
  const getProjectDate = (project: any) => {
    const repoName = project.id === "social-media-web" ? "social-media-web" : project.id;
    if (repoData[repoName]?.updated_at) {
      return formatGitHubDate(repoData[repoName].updated_at);
    }
    return project.date; // Fallback to hardcoded date
  };

  // Helper function to get size (from GitHub API or fallback)
  const getProjectSize = (project: any) => {
    const repoName = project.id === "social-media-web" ? "social-media-web" : project.id;
    if (repoData[repoName]?.size) {
      return formatRepoSize(repoData[repoName].size);
    }
    return project.size; // Fallback to hardcoded size
  };

  // Sort projects by date (most recent first)
  const sortedProjects = [...PROJECTS].sort((a, b) => {
    const dateA = getProjectDate(a);
    const dateB = getProjectDate(b);

    // Parse dates in MM/DD/YYYY format
    const parseDate = (dateStr: string) => {
      const [month, day, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    return parseDate(dateB) - parseDate(dateA); // Descending order
  });

  const desktopFiles = [
    {
      name: "About Me.txt",
      type: "Text Document",
      size: "2 KB",
      icon: FileCode,
      description: "Professional profile and skills overview",
    },
    {
      name: "My Projects",
      type: "Folder",
      size: "4 items",
      icon: Folder,
      description: "Portfolio of development projects",
    },
    {
      name: "Resume.pdf",
      type: "PDF Document",
      size: "44 KB",
      icon: FileCode,
      description: "Professional resume and experience",
    },
  ];

  const downloadFiles = [
    {
      name: "europa-fastagent-v1.2.zip",
      type: "Compressed Folder",
      size: "3.4 MB",
      date: "11/15/2025",
    },
    { name: "sage-cli-installer.exe", type: "Application", size: "1.8 MB", date: "10/20/2025" },
    { name: "project-documentation.pdf", type: "PDF Document", size: "856 KB", date: "09/12/2025" },
    { name: "meeting-notes-oct.docx", type: "Word Document", size: "124 KB", date: "10/05/2025" },
    { name: "profile-picture.jpg", type: "JPEG Image", size: "2.1 MB", date: "08/22/2025" },
  ];

  return (
    <div className="flex flex-col h-full bg-white text-sm select-none">
      {/* Ribbon Tabs */}
      <div className="flex bg-white border-b border-gray-200 pt-1 px-2 gap-4 text-xs">
        <div className="text-white bg-[#0078D7] px-4 py-1 rounded-t-sm">File</div>
        <div className="px-4 py-1 text-gray-600 hover:bg-gray-100 cursor-default border-b-2 border-[#0078D7]">
          Home
        </div>
        <div className="px-4 py-1 text-gray-600 hover:bg-gray-100 cursor-default">Share</div>
        <div className="px-4 py-1 text-gray-600 hover:bg-gray-100 cursor-default">View</div>
      </div>

      {/* Ribbon Toolbar (Simplified) */}
      <div className="h-20 bg-[#F5F6F7] border-b border-gray-200 flex items-center px-2 gap-2 text-xs text-gray-600">
        <div className="flex flex-col items-center justify-center h-full p-1 hover:bg-blue-100/50 rounded border border-transparent hover:border-blue-200 cursor-default">
          <div className="text-yellow-500">
            <Folder size={24} fill="currentColor" />
          </div>
          <span className="mt-1">New folder</span>
        </div>
        <div className="w-[1px] h-12 bg-gray-300 mx-1"></div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 px-1 hover:bg-blue-100/50 rounded cursor-default">
            <span className="text-red-500">✕</span> Delete
          </div>
          <div className="flex items-center gap-2 px-1 hover:bg-blue-100/50 rounded cursor-default">
            <span className="text-blue-500">✎</span> Rename
          </div>
        </div>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-white">
        <div className="flex gap-1 text-gray-400">
          <ArrowLeft size={14} className="hover:text-blue-500 cursor-pointer" />
          <ArrowRight size={14} className="hover:text-blue-500 cursor-pointer" />
          <ArrowUp size={14} className="hover:text-blue-500 cursor-pointer" />
        </div>
        <div className="flex-1 border border-gray-300 flex items-center px-2 py-1 gap-2 text-xs hover:border-blue-400">
          <Folder size={12} className="text-yellow-500" />
          <span className="text-gray-600 font-bold">{">"}</span>
          <span>This PC</span>
          <span className="text-gray-600 font-bold">{">"}</span>
          <span>Documents</span>
          <span className="text-gray-600 font-bold">{">"}</span>
          <span>Projects</span>
        </div>
        <div className="w-64 border border-gray-300 px-2 py-1 text-xs text-gray-500 hover:border-blue-400">
          Search Projects
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 overflow-y-auto py-2 text-xs hidden md:block">
          <div className="px-2 mb-2 text-gray-500 font-bold flex items-center gap-1">
            <Star size={10} /> Quick access
          </div>
          <div
            className={`pl-6 py-1 hover:bg-blue-100/50 cursor-pointer flex items-center gap-2 ${
              view === "desktop" ? "bg-blue-100/50 border-l-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setView("desktop");
              setSelectedProject(null);
            }}
          >
            <Monitor size={14} className="text-blue-500" /> Desktop
          </div>
          <div
            className={`pl-6 py-1 hover:bg-blue-100/50 cursor-pointer flex items-center gap-2 ${
              view === "downloads" ? "bg-blue-100/50 border-l-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setView("downloads");
              setSelectedProject(null);
            }}
          >
            <Download size={14} className="text-blue-500" /> Downloads
          </div>
          <div
            className={`pl-6 py-1 hover:bg-blue-100/50 cursor-pointer flex items-center gap-2 ${
              view === "projects" ? "bg-blue-100/50 border-l-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setView("projects");
              setSelectedProject(null);
            }}
          >
            <Folder size={14} className="text-yellow-500" /> Documents
          </div>

          <div className="px-2 mt-4 mb-2 text-gray-500 font-bold flex items-center gap-1">
            <Monitor size={10} /> This PC
          </div>
          <div
            className={`pl-6 py-1 hover:bg-blue-100/50 cursor-pointer flex items-center gap-2 ${
              view === "disk" ? "bg-blue-100/50 border-l-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setView("disk");
              setSelectedProject(null);
            }}
          >
            <HardDrive size={14} className="text-gray-500" /> Local Disk (C:)
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 bg-white flex flex-col">
          {view === "projects" ? (
            <>
              {/* Headers */}
              <div className="flex text-xs text-gray-600 border-b border-gray-200 px-2 py-1">
                <div className="flex-1 pl-2 border-r border-gray-100 hover:bg-gray-50">Name</div>
                <div className="w-32 pl-2 border-r border-gray-100 hover:bg-gray-50">
                  Date modified
                </div>
                <div className="w-24 pl-2 border-r border-gray-100 hover:bg-gray-50">Type</div>
                <div className="w-20 pl-2 hover:bg-gray-50">Size</div>
              </div>

              {/* Files */}
              <div className="flex-1 overflow-y-auto p-1 bg-white">
                {sortedProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`flex items-center px-2 py-1 hover:bg-blue-100/40 hover:border border ${
                      selectedProject?.id === project.id
                        ? "bg-blue-100/40 border-blue-200"
                        : "border-transparent"
                    } hover:border-blue-200 cursor-default group`}
                    onClick={() => setSelectedProject(project)}
                    onDoubleClick={() =>
                      project.githubUrl && window.open(project.githubUrl, "_blank")
                    }
                  >
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                      <Folder className="text-yellow-500 fill-yellow-500" size={18} />
                      <span className="text-xs truncate">{project.title}</span>
                    </div>
                    <div className="w-32 text-xs text-gray-500">{getProjectDate(project)}</div>
                    <div className="w-24 text-xs text-gray-500">{project.type}</div>
                    <div className="w-20 text-xs text-gray-500">{getProjectSize(project)}</div>
                  </div>
                ))}

                {/* Project Details Panel */}
                {selectedProject && (
                  <div className="m-4 p-4 border border-blue-300 bg-blue-50/50 rounded">
                    <div className="flex items-start gap-3 mb-3">
                      <Folder className="text-yellow-500 fill-yellow-500" size={32} />
                      <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-1">
                          {selectedProject.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">{selectedProject.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Type:</span>{" "}
                        <span className="font-medium">{selectedProject.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Size:</span>{" "}
                        <span className="font-medium">{getProjectSize(selectedProject)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Modified:</span>{" "}
                        <span className="font-medium">{getProjectDate(selectedProject)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Tech:</span>{" "}
                        <span className="font-medium">
                          {selectedProject.tech?.slice(0, 2).join(", ")}
                        </span>
                      </div>
                    </div>
                    {selectedProject.githubUrl && (
                      <button
                        onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                        className="mt-3 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
                      >
                        Open on GitHub
                      </button>
                    )}
                  </div>
                )}

                {/* Empty area click target */}
                <div className="flex-1 min-h-[50px]"></div>
              </div>

              {/* Status Bar */}
              <div className="bg-white border-t border-gray-200 px-2 py-1 text-xs text-gray-500 flex gap-4">
                <span>{sortedProjects.length} items</span>
                {selectedProject && <span>1 item selected</span>}
              </div>
            </>
          ) : view === "desktop" ? (
            /* Desktop View */
            <>
              <div className="flex text-xs text-gray-600 border-b border-gray-200 px-2 py-1">
                <div className="flex-1 pl-2 border-r border-gray-100 hover:bg-gray-50">Name</div>
                <div className="w-32 pl-2 border-r border-gray-100 hover:bg-gray-50">Type</div>
                <div className="w-20 pl-2 hover:bg-gray-50">Size</div>
              </div>

              <div className="flex-1 overflow-y-auto p-1 bg-white">
                {desktopFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center px-2 py-1 hover:bg-blue-100/40 hover:border border border-transparent hover:border-blue-200 cursor-default group"
                  >
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                      <file.icon className="text-blue-500" size={18} />
                      <span className="text-xs truncate">{file.name}</span>
                    </div>
                    <div className="w-32 text-xs text-gray-500">{file.type}</div>
                    <div className="w-20 text-xs text-gray-500">{file.size}</div>
                  </div>
                ))}
                <div className="flex-1 min-h-[50px]"></div>
              </div>

              <div className="bg-white border-t border-gray-200 px-2 py-1 text-xs text-gray-500 flex gap-4">
                <span>{desktopFiles.length} items</span>
              </div>
            </>
          ) : view === "downloads" ? (
            /* Downloads View */
            <>
              <div className="flex text-xs text-gray-600 border-b border-gray-200 px-2 py-1">
                <div className="flex-1 pl-2 border-r border-gray-100 hover:bg-gray-50">Name</div>
                <div className="w-32 pl-2 border-r border-gray-100 hover:bg-gray-50">
                  Date modified
                </div>
                <div className="w-24 pl-2 border-r border-gray-100 hover:bg-gray-50">Type</div>
                <div className="w-20 pl-2 hover:bg-gray-50">Size</div>
              </div>

              <div className="flex-1 overflow-y-auto p-1 bg-white">
                {downloadFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center px-2 py-1 hover:bg-blue-100/40 hover:border border border-transparent hover:border-blue-200 cursor-default group"
                  >
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                      <FileCode className="text-gray-500" size={18} />
                      <span className="text-xs truncate">{file.name}</span>
                    </div>
                    <div className="w-32 text-xs text-gray-500">{file.date}</div>
                    <div className="w-24 text-xs text-gray-500">{file.type}</div>
                    <div className="w-20 text-xs text-gray-500">{file.size}</div>
                  </div>
                ))}
                <div className="flex-1 min-h-[50px]"></div>
              </div>

              <div className="bg-white border-t border-gray-200 px-2 py-1 text-xs text-gray-500 flex gap-4">
                <span>{downloadFiles.length} items</span>
              </div>
            </>
          ) : (
            /* Disk Information View */
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <HardDrive size={48} className="text-gray-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Local Disk (C:)</h2>
                    <p className="text-sm text-gray-500">System Drive</p>
                  </div>
                </div>

                {/* Disk Usage Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>324 GB used</span>
                    <span>512 GB total</span>
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "63%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">188 GB free</p>
                </div>

                {/* Disk Details */}
                <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Info size={16} /> Drive Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-500">File System:</span>
                      <span className="ml-2 font-medium">NTFS</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2 font-medium">Local Disk</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Capacity:</span>
                      <span className="ml-2 font-medium">512 GB</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Available:</span>
                      <span className="ml-2 font-medium">188 GB</span>
                    </div>
                  </div>
                </div>

                {/* Fun Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 text-center">
                    <Database size={24} className="mx-auto text-blue-500 mb-2" />
                    <div className="text-lg font-bold text-gray-800">2,847</div>
                    <div className="text-xs text-gray-600">Files</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-3 text-center">
                    <Folder size={24} className="mx-auto text-green-500 mb-2" />
                    <div className="text-lg font-bold text-gray-800">142</div>
                    <div className="text-xs text-gray-600">Folders</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded p-3 text-center">
                    <Cpu size={24} className="mx-auto text-purple-500 mb-2" />
                    <div className="text-lg font-bold text-gray-800">95%</div>
                    <div className="text-xs text-gray-600">Health</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
