import { motion } from "framer-motion";

const Particles = ({ count = 15 }) => {
  const particles = Array.from({ length: count });

  return (
    <div className="absolute bottom-0 left-0 w-full h-100 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 8 + 4; // 4–12px
        const duration = Math.random() * 4 + 4; // 4–8s
        const delay = Math.random() * 2;
        const startX = Math.random() * 100; // % from left
        const driftX = Math.random() * 40 - 20; // horizontal drift
        const glowColor = `rgba(0, 255, 128, 0.6)`; // greenish glow

        return (
          <motion.div
            key={i}
            className="absolute bg-green-400 rounded-full opacity-70"
            style={{
              width: size,
              height: size,
              left: `${startX}%`,
              bottom: 0,
              filter: `drop-shadow(0 0 ${size / 2}px ${glowColor}) blur(${size / 4}px)`,
            }}
            animate={{
              y: -200, // float upward
              x: driftX,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default Particles;
