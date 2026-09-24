import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Sparkles } from "lucide-react";
import ASSETS from "../../assets/assetUrls";
import weddingData from "../../data/weddingData";

gsap.registerPlugin(ScrollTrigger);

export default function HeroHawaMahal({ onScrollExplore }) {
  const containerRef = useRef(null);
  const cloudsRef = useRef(null);
  const mahalRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create lightweight, silky-smooth master timeline pinned to the hero container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. FIRST SCROLL: Text fades out fast & smooth, Clouds move up, Hawa Mahal rises
      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -60,
          ease: "power1.out",
          duration: 0.8,
          force3D: true,
        },
        0
      )
        .to(
          cloudsRef.current,
          {
            y: "-15%",
            opacity: 0.2,
            ease: "power1.inOut",
            duration: 1,
            force3D: true,
          },
          0
        )
        .to(
          mahalRef.current,
          {
            y: "-12vh",
            ease: "power1.out",
            duration: 1,
            force3D: true,
          },
          0
        );

      // 2. SECOND SCROLL: Full-screen Hawa Mahal Zooms cinematically into venue transition
      tl.to(
        mahalRef.current,
        {
          scale: 1.45,
          y: "-25vh",
          ease: "power1.inOut",
          duration: 1.2,
          force3D: true,
        },
        0.8
      ).to(
        overlayRef.current,
        {
          opacity: 0.9,
          ease: "power1.inOut",
          duration: 1.2,
          force3D: true,
        },
        0.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#FFE4EC] select-none"
    >
      {/* 1. Atmospheric Cloud Background Layer */}
      <div
        ref={cloudsRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${ASSETS.clouds})`,
          transform: "translate3d(0,0,0)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FFE4EC]/70" />
      </div>

      {/* 2. Warm Transition Overlay Layer */}
      <div
        ref={overlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 transition-opacity duration-300 z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,228,236,0.2) 0%, rgba(201,79,124,0.5) 60%, rgba(61,35,42,0.9) 100%)",
        }}
      />

      {/* 3. Full-Screen Hawa Mahal PNG Foreground Layer */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        <img
          ref={mahalRef}
          src={ASSETS.hawaMahal}
          alt="Hawa Mahal Full Screen Architecture"
          className="w-full h-full object-cover sm:object-contain drop-shadow-[0_20px_40px_rgba(201,79,124,0.3)] will-change-transform transform-gpu translate-y-4 sm:translate-y-8 scale-105"
          loading="eager"
        />
      </div>

      {/* 4. Ambient Sparkles Glow */}
      <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
        <div className="w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full bg-gradient-to-r from-[#FFB6C9]/30 via-[#F3E5AB]/35 to-[#C94F7C]/20 blur-2xl" />
      </div>

      {/* 5. Hero Invitation Typography */}
      <div
        ref={textRef}
        className="relative z-30 flex flex-col items-center justify-between h-full pt-10 sm:pt-14 pb-10 px-4 text-center max-w-4xl mx-auto will-change-transform"
      >
        {/* Top Sacred Shloka Tag */}
        <div className="flex flex-col items-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-sm border border-[#D8A84E]/40 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D8A84E]" />
            <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-[#8B6255] uppercase">
              || श्री गणेशाय नमः ||
            </span>
            <Sparkles className="w-4 h-4 text-[#D8A84E]" />
          </div>
          <span className="font-cinzel text-[#C94F7C] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase drop-shadow-sm">
            Shahi Vivah Nimantran
          </span>
        </div>

        {/* Center Couple Title */}
        <div className="my-auto space-y-2 sm:space-y-3">
          <p className="font-display text-lg sm:text-xl md:text-2xl italic tracking-wide text-[#6B434E] drop-shadow-sm">
            We request the pleasure of your company at the wedding of
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
            <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#C94F7C] drop-shadow-[0_4px_16px_rgba(255,255,255,0.95)] tracking-wide">
              {weddingData.brideName}
            </h1>
            <span className="font-cinzel text-2xl sm:text-3xl text-[#D8A84E] font-bold">
              &
            </span>
            <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#C94F7C] drop-shadow-[0_4px_16px_rgba(255,255,255,0.95)] tracking-wide">
              {weddingData.groomName}
            </h1>
          </div>

          <p className="font-cinzel text-xs sm:text-sm md:text-base font-bold text-[#8B6255] tracking-[0.25em] uppercase">
            {weddingData.formattedDate} • {weddingData.city}
          </p>
        </div>

        {/* Bottom Scroll Indicator */}
        <div
          className="flex flex-col items-center space-y-1.5 cursor-pointer group pointer-events-auto"
          onClick={onScrollExplore}
        >
          <span className="font-cinzel text-xs font-bold tracking-widest text-[#C94F7C] group-hover:text-[#D8A84E] transition-colors uppercase">
            Scroll To Experience
          </span>
          <div className="w-7 h-10 rounded-full border-2 border-[#C94F7C]/60 flex items-start justify-center p-1 shadow-sm group-hover:border-[#D8A84E] transition-colors">
            <div className="w-1.5 h-2 rounded-full bg-[#C94F7C] group-hover:bg-[#D8A84E] animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 text-[#C94F7C] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
