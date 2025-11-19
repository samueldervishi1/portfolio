import React from "react";
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react";
import { EMAIL, LOCATION, GITHUB_URL, LINKEDIN_URL } from "../constants";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend service
    alert("Thank you for your message! I'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-mono mb-4">03. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">Get In Touch</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            I'm currently looking for new opportunities. Whether you have a question or just want to
            say hi, my inbox is always open!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-surface rounded-lg text-accent">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-slate-100 font-semibold mb-1">Location</h3>
                <p className="text-slate-400">{LOCATION}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-surface rounded-lg text-accent">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-slate-100 font-semibold mb-1">Email</h3>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-slate-400 hover:text-accent transition-colors"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-surface rounded-lg text-slate-400 hover:text-accent hover:-translate-y-1 transition-all"
              >
                <Github size={24} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-surface rounded-lg text-slate-400 hover:text-accent hover:-translate-y-1 transition-all"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-surface p-6 rounded-xl border border-slate-800"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-xs font-mono text-slate-400">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-background border border-slate-700 rounded p-3 text-slate-200 focus:outline-none focus:border-accent transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-mono text-slate-400">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-background border border-slate-700 rounded p-3 text-slate-200 focus:outline-none focus:border-accent transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="message" className="text-xs font-mono text-slate-400">
                MESSAGE
              </label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full bg-background border border-slate-700 rounded p-3 text-slate-200 focus:outline-none focus:border-accent transition-colors"
                placeholder="Hello, I'd like to talk about..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-accent/10 text-accent border border-accent/20 rounded hover:bg-accent/20 transition-all font-medium flex justify-center items-center gap-2"
            >
              Send Message <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
