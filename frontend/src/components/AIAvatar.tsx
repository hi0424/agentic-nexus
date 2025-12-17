import { motion } from "motion/react";
import { Bot } from "lucide-react";

interface AIAvatarProps {
  isActive?: boolean;
}

export function AIAvatar({ isActive = false }: AIAvatarProps) {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/30"
        animate={
          isActive
            ? {
                rotate: 360,
                scale: [1, 1.1, 1],
              }
            : {}
        }
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          },
          scale: { duration: 2, repeat: Infinity },
        }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-secondary/30"
        animate={
          isActive
            ? {
                rotate: -360,
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          },
          scale: { duration: 2, repeat: Infinity, delay: 0.5 },
        }}
      />

      {/* Inner glow */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20"
        animate={
          isActive
            ? {
                opacity: [0.3, 0.6, 0.3],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Avatar core */}
      <motion.div
        className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center"
        animate={
          isActive
            ? {
                boxShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.5)",
                  "0 0 40px rgba(0, 255, 255, 0.8)",
                  "0 0 20px rgba(0, 255, 255, 0.5)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Bot className="w-8 h-8 text-primary" />
      </motion.div>

      {/* Particles */}
      {isActive &&
        [0, 120, 240].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [0, Math.cos((angle * Math.PI) / 180) * 60],
              y: [0, Math.sin((angle * Math.PI) / 180) * 60],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
    </div>
  );
}