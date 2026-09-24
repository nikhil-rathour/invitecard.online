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
    <section className="relative w-full py-20 px-4 bg-gradient-to-b from-[#FFFDF9] via-[#FFE4EC]/30 to-[#FFFDF9] overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3 mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFE4EC] border border-[#F3C6D3]">
            <InstagramIcon className="w-4 h-4 text-[#C94F7C]" />
            <span className="font-cinzel text-xs font-semibold tracking-widest text-[#C94F7C] uppercase">
              Social Handles & Moments
            </span>
          </div>

          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#C94F7C]">
            {instagramSection.title}
          </h2>

          <p className="font-display text-base sm:text-lg text-[#6B434E] max-w-xl mx-auto italic">
            "{instagramSection.subtitle}"
          </p>

          {/* Instagram Handle Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href={`https://instagram.com/${instagramSection.brideHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white/90 border border-[#F3C6D3] text-[#C94F7C] hover:bg-[#C94F7C] hover:text-white transition-all shadow-sm font-cinzel text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Bride: @{weddingData.brideName.toLowerCase()}</span>
            </a>

            <a
              href={`https://instagram.com/${instagramSection.groomHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white/90 border border-[#F3C6D3] text-[#C94F7C] hover:bg-[#C94F7C] hover:text-white transition-all shadow-sm font-cinzel text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Groom: @{weddingData.groomName.toLowerCase()}</span>
            </a>

            <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D8A84E] to-[#F3E5AB] text-[#3D232A] shadow-md font-cinzel text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#3D232A]" />
              <span>{instagramSection.hashtag}</span>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instagramSection.gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-2xl overflow-hidden royal-glass-card border border-[#F3C6D3] shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Photo */}
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter contrast-[1.02]"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-cinzel text-[10px] uppercase font-bold text-[#F3E5AB] tracking-widest bg-black/50 px-2 py-1 rounded-full border border-[#D8A84E]/40">
                      {item.tag}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-[#FFB6C9]">
                      <Heart className="w-3.5 h-3.5 fill-[#FFB6C9]" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                  <p className="font-body text-xs font-medium text-white/90 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Bottom Tag Bar */}
              <div className="p-3 bg-white/90 flex items-center justify-between text-xs font-body text-[#6B434E] border-t border-[#F3C6D3]">
                <span className="font-semibold">{item.tag}</span>
                <Camera className="w-4 h-4 text-[#C94F7C] opacity-70 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
