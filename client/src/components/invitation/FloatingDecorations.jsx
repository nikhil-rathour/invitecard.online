import React, { useMemo } from "react";
import { motion } from "motion/react";

export default function FloatingDecorations() {
  // Generate a small array of randomized petal data
  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7 + 3) % 95}%`,
      size: 14 + (i % 4) * 6,
      duration: 12 + (i % 5) * 4,
      delay: (i % 6) * 2,
      rotate: (i * 30) % 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: "-10vh",
            x: 0,
            opacity: 0,
            rotate: p.rotate,
          }}
          animate={{
            y: "110vh",
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
            opacity: [0, 0.7, 0.7, 0],
            rotate: p.rotate + 360,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          {/* Subtle Pink Rose Petal SVG Shape */}
          <svg
            viewBox="0 0 30 30"
            className="w-full h-full text-[#F48FB1] fill-current drop-shadow-sm opacity-80"
          >
            <path d="M15 0 C 25 5, 30 20, 15 30 C 0 20, 5 5, 15 0 Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
