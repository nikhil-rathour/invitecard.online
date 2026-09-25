import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Camera, ExternalLink } from "lucide-react";
import weddingData from "../../data/weddingData";

// Custom SVG Instagram Icon
const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function GalleryInstagramSection() {
  const { instagramSection } = weddingData;

  return (
    <section className="relative w-full min-h-[100dvh] lg:h-[100dvh] py-6 sm:py-8 px-4 bg-gradient-to-b from-[#FFFDF9] via-[#FFE4EC]/30 to-[#FFFDF9] overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full mx-auto text-center relative z-10 flex flex-col items-center justify-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-1 sm:space-y-1.5 mb-2.5 sm:mb-3"
        >
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE4EC] border border-[#F3C6D3]">
            <InstagramIcon className="w-3 h-3 text-[#C94F7C]" />
            <span className="font-cinzel text-[9px] sm:text-[10px] font-semibold tracking-widest text-[#C94F7C] uppercase">
              Social Handles & Moments
            </span>
          </div>

          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#C94F7C] leading-tight">
            {instagramSection.title}
          </h2>

          <p className="font-display text-xs text-[#6B434E] max-w-lg mx-auto italic">
            "{instagramSection.subtitle}"
          </p>

          {/* Instagram Handle Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <a
              href={`https://instagram.com/${instagramSection.brideHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#F3C6D3] text-[#C94F7C] hover:bg-[#C94F7C] hover:text-white transition-all shadow-sm font-cinzel text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            >
              <InstagramIcon className="w-3 h-3" />
              <span>Bride: @{weddingData.brideName.toLowerCase()}</span>
            </a>

            <a
              href={`https://instagram.com/${instagramSection.groomHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#F3C6D3] text-[#C94F7C] hover:bg-[#C94F7C] hover:text-white transition-all shadow-sm font-cinzel text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            >
              <InstagramIcon className="w-3 h-3" />
              <span>Groom: @{weddingData.groomName.toLowerCase()}</span>
            </a>

            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D8A84E] to-[#F3E5AB] text-[#3D232A] shadow-sm font-cinzel text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#3D232A]" />
              <span>{instagramSection.hashtag}</span>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid - Compact Post Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-3xl mx-auto">
          {instagramSection.gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative rounded-xl overflow-hidden royal-glass-card border border-[#F3C6D3] shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Photo */}
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 text-left text-white">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-cinzel text-[8px] uppercase font-bold text-[#F3E5AB] tracking-widest bg-black/60 px-1.5 py-0.5 rounded-full border border-[#D8A84E]/40">
                      {item.tag}
                    </span>
                    <div className="flex items-center space-x-0.5 text-[10px] text-[#FFB6C9]">
                      <Heart className="w-2.5 h-2.5 fill-[#FFB6C9]" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                  <p className="font-body text-[10px] font-medium text-white/90 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Bottom Tag Bar */}
              <div className="py-1 px-2 bg-white/95 flex items-center justify-between text-[10px] font-body text-[#6B434E] border-t border-[#F3C6D3]">
                <span className="font-semibold truncate max-w-[100px]">{item.tag}</span>
                <Camera className="w-3 h-3 text-[#C94F7C] opacity-70 group-hover:opacity-100 shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
