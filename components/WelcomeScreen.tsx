import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Auto-transition to desktop after 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

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
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-black/50"></div>

      {/* Welcome Text */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h1 className="text-white text-6xl font-light mb-12">Welcome</h1>

        {/* Loading Spinner (Circular dots) */}
        <div className="relative w-16 h-16 mx-auto">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
