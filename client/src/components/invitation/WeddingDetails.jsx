import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Music,
  Sun,
  Crown,
  Wine,
  Shirt,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import weddingData from "../../data/weddingData";

const iconMap = {
  Sparkles: Sparkles,
  Music: Music,
  Sun: Sun,
  Crown: Crown,
  Wine: Wine,
};

export default function WeddingDetails() {
  const [selectedEvent, setSelectedEvent] = useState(weddingData.events[0]);

  return (
    <section className="relative w-full min-h-[100dvh] lg:h-[100dvh] py-6 sm:py-8 px-4 bg-gradient-to-b from-[#FFFDF9] via-[#FFE4EC]/30 to-[#FFFDF9] overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full mx-auto text-center relative z-10 flex flex-col items-center justify-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4"
        >
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FFE4EC] border border-[#F3C6D3]">
            <Sparkles className="w-3.5 h-3.5 text-[#C94F7C]" />
            <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-widest text-[#C94F7C] uppercase">
              Sacred Celebrations
            </span>
          </div>
          <h2 className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#C94F7C] leading-tight">
            Wedding Itinerary
          </h2>
          <p className="font-display text-xs sm:text-sm text-[#6B434E] max-w-lg mx-auto italic">
            Join us in marking each precious ceremony with love, music, and royal festivities.
          </p>
        </motion.div>

        {/* Tab Selection for Events */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {weddingData.events.map((evt) => {
            const IconComponent = iconMap[evt.icon] || Sparkles;
            const isSelected = selectedEvent.id === evt.id;

            return (
              <button
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-full font-cinzel text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-[#C94F7C] text-white shadow-md shadow-[#C94F7C]/30 scale-105 border border-[#C94F7C]"
                    : "bg-white/80 text-[#6B434E] border border-[#F3C6D3] hover:border-[#C94F7C]/50 hover:bg-[#FFE4EC]"
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isSelected ? "text-[#F3E5AB]" : "text-[#C94F7C]"}`} />
                <span>{evt.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Event Details Card */}
        <motion.div
          key={selectedEvent.id}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-3xl mx-auto p-4 sm:p-6 rounded-2xl sm:rounded-3xl royal-glass-card border border-[#D8A84E]/40 text-left shadow-xl relative overflow-hidden"
        >
          {/* Top Decorative Banner */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F48FB1] via-[#D8A84E] to-[#C94F7C]" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-[#F3C6D3]">
            <div>
              <span className="font-cinzel text-[10px] font-bold text-[#D8A84E] tracking-widest uppercase block">
                {selectedEvent.tagline}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#3D232A]">
                {selectedEvent.name}
              </h3>
            </div>
            <a
              href={weddingData.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FFE4EC] text-[#C94F7C] border border-[#F3C6D3] hover:bg-[#C94F7C] hover:text-white transition-colors text-[10px] sm:text-xs font-cinzel font-semibold uppercase tracking-wider shrink-0"
            >
              <MapPin className="w-3 h-3" />
              <span>Get Directions</span>
              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </a>
          </div>

          <p className="font-body text-xs sm:text-sm text-[#6B434E] leading-relaxed my-2.5 sm:my-3">
            {selectedEvent.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2.5 border-t border-[#F3C6D3]">
            {/* Date */}
            <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-white/70 border border-[#F3C6D3]/60">
              <Calendar className="w-4 h-4 text-[#C94F7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-cinzel text-[9px] text-[#8B6255] uppercase tracking-wider block">
                  Date
                </span>
                <span className="font-body text-xs sm:text-sm font-semibold text-[#3D232A]">
                  {selectedEvent.date}
                </span>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-white/70 border border-[#F3C6D3]/60">
              <Clock className="w-4 h-4 text-[#C94F7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-cinzel text-[9px] text-[#8B6255] uppercase tracking-wider block">
                  Time
                </span>
                <span className="font-body text-xs sm:text-sm font-semibold text-[#3D232A]">
                  {selectedEvent.time}
                </span>
              </div>
            </div>

            {/* Dress Code */}
            <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-white/70 border border-[#F3C6D3]/60">
              <Shirt className="w-4 h-4 text-[#C94F7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-cinzel text-[9px] text-[#8B6255] uppercase tracking-wider block">
                  Dress Code
                </span>
                <span className="font-body text-xs sm:text-sm font-semibold text-[#3D232A]">
                  {selectedEvent.dressCode}
                </span>
              </div>
            </div>
          </div>

          {/* Venue Location Banner */}
          <div className="mt-2.5 p-2.5 rounded-xl bg-[#FFE4EC]/50 border border-[#F3C6D3] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#C94F7C]" />
              <span className="font-body text-xs font-semibold text-[#3D232A]">
                {selectedEvent.venue}
              </span>
            </div>
            <span className="font-cinzel text-[10px] text-[#C94F7C] font-semibold uppercase">
              {weddingData.city}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
