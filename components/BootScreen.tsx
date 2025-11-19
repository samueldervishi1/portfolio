import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Auto-transition to login screen after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000]"
    >
      {/* Windows Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 3.42857L9.42857 2.14286V11.5714H0V3.42857Z" fill="white" />
          <path d="M10.2857 2L24 0V11.5714H10.2857V2Z" fill="white" />
          <path d="M0 12.4286H9.42857V20.5714L0 19.2857V12.4286Z" fill="white" />
          <path d="M10.2857 12.4286H24V24L10.2857 22V12.4286Z" fill="white" />
        </svg>
      </motion.div>

      {/* Loading Spinner */}
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BootScreen;
