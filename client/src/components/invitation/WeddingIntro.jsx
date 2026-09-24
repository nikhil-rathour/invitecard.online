import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Heart, Sparkles, Clock } from "lucide-react";
import ASSETS from "../../assets/assetUrls";
import weddingData from "../../data/weddingData";

export default function WeddingIntro() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-12-12T18:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="intro"
      className="relative w-full min-h-[100dvh] py-20 px-4 flex flex-col items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${ASSETS.carpet})`,
      }}
    >
      {/* Dark Translucent Tinted Overlay for readability and soft atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D232A]/70 via-[#3D232A]/85 to-[#3D232A]/90 pointer-events-none" />

      {/* Subtle Rajasthani Gold Frame Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-3xl w-full mx-auto p-6 sm:p-12 text-center rounded-3xl royal-glass-dark border border-[#D8A84E]/50 shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Top Decorative Symbol */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D8A84E]" />
          <Sparkles className="w-5 h-5 text-[#D8A84E]" />
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F3E5AB]">
            With Love & Blessings
          </span>
          <Sparkles className="w-5 h-5 text-[#D8A84E]" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D8A84E]" />
        </div>

        {/* Family Invitation Note */}
        <p className="font-display text-base sm:text-lg md:text-xl text-[#F3E5AB]/90 max-w-xl mx-auto leading-relaxed mb-6 italic">
          {weddingData.welcomeText}
        </p>

        {/* Bride & Groom Main Typography */}
        <div className="my-8 py-4 border-y border-[#D8A84E]/30 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3D232A] px-4 text-[#D8A84E]">
            ✦
          </div>
          
          <h2 className="font-script text-6xl sm:text-7xl md:text-8xl text-gold-gradient drop-shadow-md my-2">
            {weddingData.brideFullName}
          </h2>

          <div className="flex items-center justify-center gap-3 my-1">
            <span className="font-display text-sm text-[#FFE4EC]/80 italic">
              {weddingData.brideParents}
            </span>
          </div>

          <div className="flex items-center justify-center my-4">
            <span className="font-cinzel text-3xl text-[#FFB6C9] font-bold px-4 py-1 rounded-full border border-[#D8A84E]/30 bg-[#FFE4EC]/10">
              &
            </span>
          </div>

          <h2 className="font-script text-6xl sm:text-7xl md:text-8xl text-gold-gradient drop-shadow-md my-2">
            {weddingData.groomFullName}
          </h2>

          <div className="flex items-center justify-center gap-3 my-1">
            <span className="font-display text-sm text-[#FFE4EC]/80 italic">
              {weddingData.groomParents}
            </span>
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#3D232A] px-4 text-[#D8A84E]">
            ✦
          </div>
        </div>

        {/* Request Presence Message */}
        <p className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.2em] text-[#FFE4EC] uppercase my-6 font-medium">
          Request the honour of your presence at their wedding celebration
        </p>

        {/* Date & Venue Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto my-8">
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-[#D8A84E]/30 text-left">
            <div className="w-10 h-10 rounded-full bg-[#D8A84E]/20 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#D8A84E]" />
            </div>
            <div>
              <p className="font-cinzel text-xs text-[#F3E5AB] uppercase tracking-wider">
                Date & Time
              </p>
              <p className="font-body text-sm font-semibold text-white">
                {weddingData.date}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-[#D8A84E]/30 text-left">
            <div className="w-10 h-10 rounded-full bg-[#D8A84E]/20 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#D8A84E]" />
            </div>
            <div>
              <p className="font-cinzel text-xs text-[#F3E5AB] uppercase tracking-wider">
                Location
              </p>
              <p className="font-body text-sm font-semibold text-white truncate max-w-[200px]">
                {weddingData.venue}, {weddingData.city}
              </p>
            </div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="mt-8 pt-6 border-t border-[#D8A84E]/20">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-4 h-4 text-[#D8A84E]" />
            <span className="font-cinzel text-xs tracking-widest text-[#F3E5AB] uppercase">
              Countdown to the Auspicious Moment
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto text-center">
            <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-[#D8A84E]/30">
              <span className="block font-display text-2xl sm:text-3xl font-bold text-white">
                {timeLeft.days}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs text-[#F3E5AB] uppercase">
                Days
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-[#D8A84E]/30">
              <span className="block font-display text-2xl sm:text-3xl font-bold text-white">
                {timeLeft.hours}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs text-[#F3E5AB] uppercase">
                Hours
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-[#D8A84E]/30">
              <span className="block font-display text-2xl sm:text-3xl font-bold text-white">
                {timeLeft.minutes}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs text-[#F3E5AB] uppercase">
                Mins
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-[#D8A84E]/30">
              <span className="block font-display text-2xl sm:text-3xl font-bold text-[#FFB6C9]">
                {timeLeft.seconds}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs text-[#F3E5AB] uppercase">
                Secs
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
