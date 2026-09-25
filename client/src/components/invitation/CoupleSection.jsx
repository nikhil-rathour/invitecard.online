import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Feather } from "lucide-react";
import ASSETS from "../../assets/assetUrls";
import weddingData from "../../data/weddingData";

export default function CoupleSection() {
  return (
    <section className="relative w-full min-h-[100dvh] lg:h-[100dvh] py-6 sm:py-8 px-4 bg-gradient-to-b from-[#FFFDF9] via-[#FFE4EC]/40 to-[#FFFDF9] overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-[#FFB6C9]/40 to-[#D8A84E]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center flex flex-col items-center justify-center">
        {/* Section Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2"
        >
          <span className="h-[1px] w-8 sm:w-10 bg-[#D8A84E]" />
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C94F7C] fill-[#C94F7C]" />
          <span className="font-cinzel text-xs tracking-[0.25em] text-[#8B6255] uppercase font-semibold">
            The Royal Couple
          </span>
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C94F7C] fill-[#C94F7C]" />
          <span className="h-[1px] w-8 sm:w-10 bg-[#D8A84E]" />
        </motion.div>

        {/* Story Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#C94F7C] drop-shadow-sm mb-1 leading-tight"
        >
          {weddingData.story.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-xs sm:text-sm text-[#6B434E] max-w-lg mx-auto italic mb-3 sm:mb-5"
        >
          "{weddingData.story.subtitle}"
        </motion.p>

        {/* Centered Royal Arch Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto p-5 sm:p-6 md:p-7 rounded-[100px_100px_32px_32px] sm:rounded-[120px_120px_36px_36px] royal-glass-card border border-[#D8A84E]/50 shadow-2xl flex flex-col items-center"
        >
          {/* Subtle Royal Arch Header */}
          <div className="flex items-center space-x-2 text-[#D8A84E] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-cinzel text-[11px] sm:text-xs tracking-widest uppercase font-semibold text-[#8B6255]">
              {weddingData.hashtag}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Gentle Floating & Breathing Bride + Groom Transparent Image */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.015, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="my-1 relative"
          >
            <img
              src={ASSETS.couple}
              alt={`${weddingData.brideName} & ${weddingData.groomName}`}
              className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto max-h-[38vh] object-contain drop-shadow-[0_12px_24px_rgba(201,79,124,0.28)] filter contrast-[1.03]"
              loading="lazy"
            />
          </motion.div>

          {/* Names below couple */}
          <div className="text-center pt-2">
            <h3 className="font-script text-3xl sm:text-4xl text-[#C94F7C] leading-tight">
              {weddingData.brideName} & {weddingData.groomName}
            </h3>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <span className="h-[1px] w-6 bg-[#D8A84E]/60" />
              <p className="font-cinzel text-[10px] sm:text-xs font-semibold text-[#8B6255] uppercase tracking-widest">
                Forever & Always
              </p>
              <span className="h-[1px] w-6 bg-[#D8A84E]/60" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
