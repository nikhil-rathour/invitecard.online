import React from "react";
import { motion } from "motion/react";
import ASSETS from "../../assets/assetUrls";

export default function ElephantDecor({ side = "left" }) {
  const isLeft = side === "left";

  return (
    <div
      className={`absolute bottom-0 pointer-events-none hidden md:block z-0 ${
        isLeft
          ? "left-0 sm:left-2 xl:left-6"
          : "right-0 sm:right-2 xl:right-6"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative opacity-80 xl:opacity-95 hover:opacity-100 transition-opacity"
        >
          {ASSETS.elephant ? (
            <img
              src={ASSETS.elephant}
              alt="Rajasthani Royal Wedding Elephant"
              className={`w-32 sm:w-40 md:w-44 lg:w-52 xl:w-60 h-auto object-contain select-none filter drop-shadow-[0_12px_24px_rgba(216,168,78,0.25)] ${
                isLeft ? "" : "scale-x-[-1]"
              }`}
              loading="lazy"
            />
          ) : (
            <div
              className={`w-24 h-24 rounded-full border border-[#D8A84E]/30 bg-white/40 backdrop-blur-sm flex items-center justify-center p-4 shadow-sm text-[#D8A84E] ${
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
      </motion.div>
    </div>
  );
}
  