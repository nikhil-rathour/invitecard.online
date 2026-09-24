import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Feather } from "lucide-react";
import ASSETS from "../../assets/assetUrls";
import weddingData from "../../data/weddingData";

export default function CoupleSection() {
  return (
    <section className="relative w-full py-20 px-4 bg-gradient-to-b from-[#FFFDF9] via-[#FFE4EC]/40 to-[#FFFDF9] overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-[#FFB6C9]/40 to-[#D8A84E]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center">
        {/* Section Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-3 mb-4"
        >
          <span className="h-[1px] w-10 bg-[#D8A84E]" />
          <Heart className="w-4 h-4 text-[#C94F7C] fill-[#C94F7C]" />
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#8B6255] uppercase font-semibold">
            The Royal Couple
          </span>
          <Heart className="w-4 h-4 text-[#C94F7C] fill-[#C94F7C]" />
          <span className="h-[1px] w-10 bg-[#D8A84E]" />
        </motion.div>

        {/* Story Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-script text-5xl sm:text-6xl md:text-7xl text-[#C94F7C] drop-shadow-sm mb-6"
        >
          {weddingData.story.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-base sm:text-lg text-[#6B434E] max-w-xl mx-auto italic mb-10"
        >
          "{weddingData.story.subtitle}"
        </motion.p>

        {/* Decorative Couple Arch Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-sm sm:max-w-md w-full p-6 sm:p-8 rounded-[120px_120px_40px_40px] royal-glass-card border border-[#D8A84E]/50 shadow-2xl flex flex-col items-center my-4"
        >
          {/* Subtle Royal Arch Header */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-[#D8A84E]">
            <Sparkles className="w-4 h-4" />
            <span className="font-cinzel text-[11px] tracking-widest uppercase">
              {weddingData.hashtag}
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Gentle Floating & Breathing Bride + Groom Transparent Image */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.02, 1],
              rotate: [0, 0.5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="my-6 relative"
          >
            <img
              src={ASSETS.couple}
              alt={`${weddingData.brideName} & ${weddingData.groomName}`}
              className="w-56 sm:w-64 md:w-72 h-auto object-contain drop-shadow-[0_15px_25px_rgba(201,79,124,0.3)] filter contrast-[1.03]"
              loading="lazy"
            />
          </motion.div>

          {/* Names below couple */}
          <div className="text-center pt-2">
            <h3 className="font-script text-4xl sm:text-5xl text-[#C94F7C]">
              {weddingData.brideName} & {weddingData.groomName}
            </h3>
            <p className="font-cinzel text-xs font-semibold text-[#8B6255] uppercase tracking-widest mt-1">
              Forever & Always
            </p>
          </div>
        </motion.div>

        {/* Love Milestones Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-12 text-left">
          {weddingData.story.milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * idx }}
              className="p-6 rounded-2xl bg-white/90 border border-[#F3C6D3] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#FFB6C9]/30 to-transparent rounded-bl-full pointer-events-none" />
              <span className="font-cinzel text-sm font-bold text-[#D8A84E] tracking-widest uppercase block mb-1">
                {m.year}
              </span>
              <h4 className="font-display text-xl font-bold text-[#3D232A] mb-2">
                {m.title}
              </h4>
              <p className="font-body text-sm text-[#6B434E] leading-relaxed">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
