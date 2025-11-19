import React, { useState } from "react";
import { Mail, User, Send, AlertCircle } from "lucide-react";

const Contact: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  if (status === "sent") {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white text-center p-8">
        <div className="bg-green-100 p-4 rounded-full mb-4 border border-green-300">
          <Send size={32} className="text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-[#245DDA]">Message Sent!</h3>
        <p className="text-gray-600 mt-2 text-xs">
          Your message has been successfully delivered to Samuel's inbox.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 px-4 py-1 border border-gray-400 bg-gray-100 hover:bg-gray-200 text-xs"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#ECE9D8] font-sans text-xs">
      {/* Header */}
      <div className="bg-white border-b border-[#9FBBE3] p-2 flex items-center gap-2 shadow-sm">
        <Mail size={24} className="text-[#245DDA]" />
        <span className="font-bold text-lg text-gray-700">New Message</span>
      </div>

      {/* Fields */}
      <div className="bg-white p-2 flex flex-col gap-2 border-b border-[#9FBBE3]">
        <div className="flex items-center gap-2">
          <label className="w-16 text-right text-gray-500">To:</label>
          <div className="flex-1 border border-[#7F9DB9] px-1 py-0.5 bg-gray-50 text-gray-700 cursor-not-allowed">
            samuel.dervishi@example.com
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="w-16 text-right text-gray-500">From:</label>
          <input
            className="flex-1 border border-[#7F9DB9] px-1 py-0.5 outline-none focus:border-[#245DDA]"
            placeholder="Your Email Address"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-16 text-right text-gray-500">Subject:</label>
          <input
            className="flex-1 border border-[#7F9DB9] px-1 py-0.5 outline-none focus:border-[#245DDA]"
            placeholder="Project Inquiry..."
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#ECE9D8] p-1 flex gap-1 border-b border-gray-300">
        <button
          className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-gray-400 hover:bg-white active:bg-gray-200"
          onClick={() => document.querySelector("form")?.requestSubmit()}
        >
          <Send size={14} />
          <span>Send</span>
        </button>
        <div className="w-[1px] bg-gray-400 h-4 my-auto mx-1"></div>
        <button className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-gray-400 hover:bg-white text-gray-500">
          <AlertCircle size={14} />
          <span>Priority: High</span>
        </button>
      </div>

      {/* Body */}
      <form id="contact-form" onSubmit={handleSubmit} className="flex-1 bg-white p-2">
        <textarea
          className="w-full h-full resize-none outline-none font-sans"
          placeholder="Type your message here..."
          required
        ></textarea>
      </form>
    </div>
  );
};

export default Contact;
