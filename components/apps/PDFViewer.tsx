import React from "react";
import { Mail, Linkedin, Globe, MapPin, Award, Briefcase, GraduationCap } from "lucide-react";

const PDFViewer: React.FC = () => {
  return (
    <div className="h-full flex bg-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto hidden md:flex flex-col py-6 px-5">
        {/* Contact Section */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Contact
          </h3>
          <div className="space-y-3">
            <a
              href="https://www.linkedin.com/in/samueldervishi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900"
            >
              <Linkedin size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="break-all">samueldervishi</span>
            </a>
            <a
              href="https://samueldervishi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900"
            >
              <Globe size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="break-all">samueldervishi.vercel.app</span>
            </a>
          </div>
        </div>

        {/* Top Skills */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Top Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {["Azure App Service", "Scaling Web Apps", "Deployment Slots"].map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-xs text-gray-700 bg-white border border-gray-200 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Certifications
          </h3>
          <div className="space-y-2 text-xs text-gray-700">
            <div className="flex items-start gap-2">
              <Award size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <span>Microsoft .NET Advanced</span>
            </div>
            <div className="flex items-start gap-2">
              <Award size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <span>AWS Cloud Practitioner</span>
            </div>
            <div className="flex items-start gap-2">
              <Award size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <span>Develop Generative AI Apps in Azure</span>
            </div>
            <div className="flex items-start gap-2">
              <Award size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <span>Microsoft .NET Fundamentals</span>
            </div>
            <div className="flex items-start gap-2">
              <Award size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <span>Implement Azure App Service web apps</span>
            </div>
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
                <p className="text-xl text-gray-600 mb-3">Software Engineer @ Tegeria</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  <span>Tirana, Albania</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Java Developer at Tegeria specializing in backend architecture and scalable solutions.
              I design and implement systems that solve complex technical challenges through clean,
              maintainable code. My approach combines analytical thinking with practical
              problem-solving, focusing on fundamental principles to deliver robust applications in
              fast-paced environments.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Always open to connecting with fellow developers and technical professionals.
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-6 pt-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={16} />
              Experience
            </h2>

            <div className="space-y-6">
              {/* Tegeria */}
              <div className="relative pl-6 border-l-2 border-gray-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-white"></div>
                <div className="mb-1">
                  <h3 className="text-lg font-bold text-gray-900">Software Engineer</h3>
                  <div className="text-sm text-gray-600">Tegeria</div>
                  <div className="text-xs text-gray-500 mt-1">
                    December 2023 - Present (2 years) • Tirana, Albania
                  </div>
                </div>
              </div>

              {/* Taleas */}
              <div className="relative pl-6 border-l-2 border-gray-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-300"></div>
                <div className="mb-1">
                  <h3 className="text-lg font-bold text-gray-900">Software Engineer Intern</h3>
                  <div className="text-sm text-gray-600">Taleas</div>
                  <div className="text-xs text-gray-500 mt-1">
                    July 2023 - October 2023 (4 months) • Tirana, Albania
                  </div>
                </div>
              </div>

              {/* Coders SHPK */}
              <div className="relative pl-6 border-l-2 border-gray-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-300"></div>
                <div className="mb-1">
                  <h3 className="text-lg font-bold text-gray-900">Software Engineer Intern</h3>
                  <div className="text-sm text-gray-600">Coders SHPK</div>
                  <div className="text-xs text-gray-500 mt-1">
                    April 2023 - May 2023 (2 months) • Tirana, Albania
                  </div>
                </div>
              </div>

              {/* Yellow Pages */}
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-300"></div>
                <div className="mb-1">
                  <h3 className="text-lg font-bold text-gray-900">Sales Representative</h3>
                  <div className="text-sm text-gray-600">Yellow Pages / Pages Jaunes – Canada</div>
                  <div className="text-xs text-gray-500 mt-1">
                    June 2022 - September 2022 (4 months) • Tirana, Albania
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4 pt-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap size={16} />
              Education
            </h2>
            <div className="pl-6 border-l-2 border-gray-200 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-white"></div>
              <h3 className="text-lg font-bold text-gray-900">University of Tirana</h3>
              <div className="text-sm text-gray-600">Bachelor's degree, Business Informatics</div>
              <div className="text-xs text-gray-500 mt-1">October 2021 - October 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
