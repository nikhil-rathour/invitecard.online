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
      className="relative w-full min-h-[100dvh] lg:h-[100dvh] py-6 sm:py-8 px-4 flex flex-col items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${ASSETS.carpet})`,
      }}
    >
      {/* Dark Translucent Tinted Overlay for readability and soft atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D232A]/70 via-[#3D232A]/85 to-[#3D232A]/90 pointer-events-none" />

      {/* Subtle Rajasthani Gold Frame Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl lg:max-w-4xl w-full mx-auto p-5 sm:p-6 md:p-8 text-center rounded-2xl sm:rounded-3xl royal-glass-dark border border-[#D8A84E]/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        {/* Ornate Gold Corner Borders */}
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#D8A84E]/60 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D8A84E]/60 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#D8A84E]/60 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#D8A84E]/60 rounded-br-sm pointer-events-none" />

        {/* Top Decorative Symbol */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-2 sm:mb-2.5">
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#D8A84E]" />
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D8A84E]" />
          <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#F3E5AB]">
            With Love & Blessings
          </span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D8A84E]" />
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#D8A84E]" />
        </div>

        {/* Family Invitation Note */}
        <p className="font-display text-sm sm:text-base text-[#F3E5AB]/90 max-w-xl mx-auto leading-relaxed mb-3 sm:mb-3.5 italic">
          {weddingData.welcomeText}
        </p>

        {/* Bride & Groom Main Typography */}
        <div className="my-2 sm:my-3 py-2.5 sm:py-3.5 border-y border-[#D8A84E]/30 relative">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#3D232A] px-3 text-[#D8A84E] text-xs">
            ✦
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-1 sm:gap-3 md:gap-6">
            {/* Bride */}
            <div className="flex flex-col items-center">
              <h2 className="font-script text-4xl sm:text-5xl lg:text-6xl text-gold-gradient drop-shadow-md leading-tight">
                {weddingData.brideFullName}
              </h2>
              <span className="font-display text-xs sm:text-sm text-[#FFE4EC]/85 italic mt-0.5">
                {weddingData.brideParents}
              </span>
            </div>

            {/* Ampersand */}
            <div className="flex items-center justify-center my-0.5 md:my-0">
              <span className="font-cinzel text-xl sm:text-2xl text-[#FFB6C9] font-bold px-3 py-0.5 rounded-full border border-[#D8A84E]/30 bg-[#FFE4EC]/10 shadow-[0_0_10px_rgba(216,168,78,0.2)]">
                &
              </span>
            </div>

            {/* Groom */}
            <div className="flex flex-col items-center">
              <h2 className="font-script text-4xl sm:text-5xl lg:text-6xl text-gold-gradient drop-shadow-md leading-tight">
                {weddingData.groomFullName}
              </h2>
              <span className="font-display text-xs sm:text-sm text-[#FFE4EC]/85 italic mt-0.5">
                {weddingData.groomParents}
              </span>
            </div>
          </div>

          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#3D232A] px-3 text-[#D8A84E] text-xs">
            ✦
          </div>
        </div>

        {/* Request Presence Message */}
        <p className="font-cinzel text-[11px] sm:text-xs md:text-sm tracking-[0.2em] text-[#FFE4EC] uppercase my-2.5 sm:my-3 font-medium">
          Request the honour of your presence at their wedding celebration
        </p>

        {/* Date & Venue Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-w-xl mx-auto my-2.5 sm:my-3">
          <div className="flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-[#D8A84E]/30 text-left">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D8A84E]/20 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-[#D8A84E]" />
            </div>
            <div>
              <p className="font-cinzel text-[10px] sm:text-xs text-[#F3E5AB] uppercase tracking-wider">
                Date & Time
              </p>
              <p className="font-body text-xs sm:text-sm font-semibold text-white">
                {weddingData.date}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-[#D8A84E]/30 text-left">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D8A84E]/20 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#D8A84E]" />
            </div>
            <div>
              <p className="font-cinzel text-[10px] sm:text-xs text-[#F3E5AB] uppercase tracking-wider">
                Location
              </p>
              <p className="font-body text-xs sm:text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-[220px]">
                {weddingData.venue}, {weddingData.city}
              </p>
            </div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-3 border-t border-[#D8A84E]/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-3.5 h-3.5 text-[#D8A84E]" />
            <span className="font-cinzel text-[10px] sm:text-xs tracking-widest text-[#F3E5AB] uppercase">
              Countdown to the Auspicious Moment
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm sm:max-w-md mx-auto text-center">
            <div className="py-1.5 sm:py-2 px-1 rounded-xl bg-black/40 border border-[#D8A84E]/30">
              <span className="block font-display text-lg sm:text-2xl font-bold text-white leading-tight">
                {timeLeft.days}
              </span>
              <span className="font-cinzel text-[9px] sm:text-[10px] text-[#F3E5AB] uppercase">
                Days
              </span>
            </div>
            <div className="py-1.5 sm:py-2 px-1 rounded-xl bg-black/40 border border-[#D8A84E]/30">
              <span className="block font-display text-lg sm:text-2xl font-bold text-white leading-tight">
                {timeLeft.hours}
              </span>
              <span className="font-cinzel text-[9px] sm:text-[10px] text-[#F3E5AB] uppercase">
                Hours
              </span>
            </div>
            <div className="py-1.5 sm:py-2 px-1 rounded-xl bg-black/40 border border-[#D8A84E]/30">
              <span className="block font-display text-lg sm:text-2xl font-bold text-white leading-tight">
                {timeLeft.minutes}
              </span>
              <span className="font-cinzel text-[9px] sm:text-[10px] text-[#F3E5AB] uppercase">
                Mins
              </span>
            </div>
            <div className="py-1.5 sm:py-2 px-1 rounded-xl bg-black/40 border border-[#D8A84E]/30">
              <span className="block font-display text-lg sm:text-2xl font-bold text-[#FFB6C9] leading-tight">
                {timeLeft.seconds}
              </span>
              <span className="font-cinzel text-[9px] sm:text-[10px] text-[#F3E5AB] uppercase">
                Secs
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
