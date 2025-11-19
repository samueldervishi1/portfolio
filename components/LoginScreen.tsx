import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, Volume2, Power } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [time, setTime] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleClick = () => {
    setShowPassword(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
      style={{
        background:
          'url("https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=1920") no-repeat center center',
        backgroundSize: "cover",
      }}
      onClick={!showPassword ? handleClick : undefined}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* User Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-32 h-32 rounded-full bg-win-blue flex items-center justify-center text-white text-4xl font-bold mb-6 border-4 border-white/20 shadow-2xl"
        >
          SD
        </motion.div>

        {/* User Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-3xl font-light mb-8"
        >
          Samuel Dervishi
        </motion.h1>

        {/* Password Input */}
        {showPassword ? (
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="w-80"
          >
            <div className="relative">
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/30 rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:border-win-blue focus:ring-2 focus:ring-win-blue/50"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onLogin();
                  }
                }}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/20 rounded transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <p className="text-white/70 text-sm mt-4 text-center">
              Press Enter or click arrow to continue
            </p>
          </motion.form>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-sm"
          >
            Click anywhere to sign in
          </motion.p>
        )}
      </div>

      {/* Bottom Bar - Time and Icons */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
        {/* Date and Time */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white"
        >
          <div className="text-5xl font-light mb-1">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="text-lg font-light">
            {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
        </motion.div>

        {/* System Icons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 text-white"
        >
          <button className="p-3 hover:bg-white/10 rounded transition-colors">
            <Wifi size={20} />
          </button>
          <button className="p-3 hover:bg-white/10 rounded transition-colors">
            <Volume2 size={20} />
          </button>
          <button className="p-3 hover:bg-white/10 rounded transition-colors">
            <Power size={20} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginScreen;
