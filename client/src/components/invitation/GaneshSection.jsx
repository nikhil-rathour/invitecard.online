import React from "react";
import { motion } from "motion/react";
import { Sparkles, Sun } from "lucide-react";
import ASSETS from "../../assets/assetUrls";

export default function GaneshSection() {
  return (
    <section className="relative w-full py-20 px-4 bg-[#FFE4EC]/40 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Soft Gold Radial Aura */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(243,229,171,0.4)_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full mx-auto p-6 sm:p-10 rounded-3xl royal-glass-card border border-[#D8A84E]/60 shadow-[0_20px_40px_rgba(201,79,124,0.12)] text-center flex flex-col items-center"
      >
        {/* Sacred Frame / Jharokha Container - Ganesh Image Covers Whole Circle */}
        <div className="relative my-4 rounded-full border-4 border-[#D8A84E] shadow-2xl flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFE4EC] to-[#FFF8F3] group">
          {/* Subtle Outer Glowing Ring */}
          <div className="absolute inset-[-8px] rounded-full border-2 border-[#D8A84E]/40 animate-pulse-gold pointer-events-none" />

          {/* Render Ganesh Ji Asset or Large Royal Sacred Image filling the whole circle */}
          {ASSETS.ganeshJi ? (
            <img
              src={ASSETS.ganeshJi}
              alt="Lord Ganesha"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-[#FFF8F3] via-[#FFE4EC] to-[#FFFDF9] text-[#D8A84E] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,168,78,0.25)_0%,transparent_75%)]" />
              
              {/* Grand Lord Ganesha Symbol & Calligraphy covering the circle */}
              <span className="font-display text-7xl sm:text-8xl font-bold text-[#C94F7C] drop-shadow-md select-none z-10 my-1">
                🕉️
              </span>
              
              {/* Auspicious Beginning Ribbon overlay inside circle */}
              <div className="z-10 px-4 py-1 rounded-full bg-[#C94F7C]/90 text-white font-cinzel text-xs font-bold uppercase tracking-widest border border-[#D8A84E] shadow-md my-1">
                Auspicious Beginning
              </div>

              <span className="font-cinzel text-xs font-bold tracking-wider text-[#8B6255] z-10">
                || श्री गणेशाय नमः ||
              </span>
            </div>
          )}
        </div>

        {/* Devanagari Calligraphy Mantra */}
        <div className="mt-4 space-y-2">
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#C94F7C] tracking-widest">
            || वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ||
          </h3>
          <p className="font-cinzel text-sm sm:text-base text-[#8B6255] tracking-wider font-semibold">
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा
          </p>
        </div>

        {/* Divider Line */}
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D8A84E] to-transparent my-6" />

        {/* Shubh Vivah Tag */}
        <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-[#C94F7C]/10 border border-[#C94F7C]/30">
          <Sun className="w-4 h-4 text-[#D8A84E]" />
          <span className="font-cinzel text-base sm:text-lg font-bold tracking-[0.2em] text-[#C94F7C] uppercase">
            शुभ विवाह
          </span>
          <Sun className="w-4 h-4 text-[#D8A84E]" />
        </div>
      </motion.div>
    </section>
  );
}
