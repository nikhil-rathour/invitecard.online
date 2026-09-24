import React from "react";
import { motion } from "motion/react";
import ASSETS from "../../assets/assetUrls";

export default function ElephantDecor({ side = "left" }) {
  const isLeft = side === "left";

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block z-20 ${
        isLeft ? "left-4 xl:left-8" : "right-4 xl:right-8"
      }`}
    >
      <motion.div
        animate={{
          y: [0, -12, 0],
          x: isLeft ? [0, 5, 0] : [0, -5, 0],
          rotate: isLeft ? [-1, 1, -1] : [1, -1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="opacity-75 hover:opacity-100 transition-opacity"
      >
        {ASSETS.elephant ? (
          <img
            src={ASSETS.elephant}
            alt="Rajasthani Royal Wedding Elephant"
            className={`w-36 xl:w-44 h-auto object-contain filter drop-shadow-md ${
              isLeft ? "" : "scale-x-[-1]"
            }`}
            loading="lazy"
          />
        ) : (
          <div
            className={`w-28 h-28 rounded-full border border-[#D8A84E]/30 bg-white/40 backdrop-blur-sm flex items-center justify-center p-4 shadow-sm text-[#D8A84E] ${
              isLeft ? "" : "scale-x-[-1]"
            }`}
          >
            {/* Elegant Royal Rajasthani Elephant Silhouette Motif */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full fill-current opacity-80"
            >
              <path d="M20 70 Q 25 40 50 35 Q 70 30 85 45 Q 90 55 85 70 Q 80 80 75 70 Q 70 60 65 65 Q 60 70 55 85 L 45 85 Q 40 70 35 85 L 25 85 Z M 40 45 Q 45 40 50 45 Q 45 55 40 45 Z" />
              <circle cx="75" cy="40" r="3" />
              <path d="M 80 48 Q 95 55 90 75" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
        )}
      </motion.div>
    </div>
  );
}
