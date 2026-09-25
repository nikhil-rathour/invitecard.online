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

      // 1. FIRST SCROLL: Title fades up, clouds drift, Hawa Mahal rises
      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -50,
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

      // 2. SECOND SCROLL: Hawa Mahal zooms cinematically
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
      className="relative w-full h-[100dvh] overflow-hidden bg-[#1a0a10] select-none"
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
        {/* Bottom-heavy vignette so the top text pops clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-[#FFE4EC]/50" />
      </div>

      {/* 2. Warm Transition Overlay (activates on second scroll phase) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,228,236,0.2) 0%, rgba(201,79,124,0.5) 60%, rgba(61,35,42,0.9) 100%)",
        }}
      />

      {/* 3. Full-Screen Hawa Mahal PNG — bottom-anchored so it rises upward on scroll */}
      <div className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none z-10 overflow-hidden">
        <img
          ref={mahalRef}
          src={ASSETS.hawaMahal}
          alt="Hawa Mahal Jaipur"
          className="w-full sm:w-[90%] h-auto object-contain drop-shadow-[0_-10px_50px_rgba(201,79,124,0.25)] will-change-transform transform-gpu"
          style={{ marginBottom: "-2%" }}
          loading="eager"
        />
      </div>

      {/* 4. Ambient Golden Glow — sits between mahal and text */}
      {/* <div className="absolute inset-0 pointer-events-none z-20 flex items-start justify-center pt-[38vh]">
        <div className="w-[340px] sm:w-[520px] h-[180px] sm:h-[240px] rounded-full bg-gradient-to-b from-[#FFB6C9]/20 via-[#F3E5AB]/25 to-transparent blur-3xl" />
      </div> */}

      {/* 5. COUPLE TITLE — Pinned to the TOP, overlaying Hawa Mahal image */}
      <div
        ref={textRef}
        className="absolute inset-x-0 top-0 z-30 flex flex-col items-center justify-start pt-8 sm:pt-10 px-4 text-center will-change-transform"
      >
  

        {/* Request line */}
        <p className="font-display text-base sm:text-lg md:text-xl italic tracking-wide text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-2">
          We request the pleasure of your company at the wedding of
        </p>

        {/* Bride & Groom Names — large, bold, centered at top */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-5 my-1">
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-[0_4px_20px_rgba(201,79,124,0.9)] tracking-wide leading-none">
            {weddingData.brideName}
          </h1>
          <span className="font-cinzel text-2xl sm:text-4xl text-[#D8A84E] font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] px-2">
            &
          </span>
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-[0_4px_20px_rgba(201,79,124,0.9)] tracking-wide leading-none">
            {weddingData.groomName}
          </h1>
        </div>

        {/* Date & City */}
        <p className="font-cinzel text-[11px] sm:text-xs md:text-sm font-bold text-[#F3E5AB] tracking-[0.3em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] mt-2">
          {weddingData.formattedDate} &nbsp;•&nbsp; {weddingData.city}
        </p>
      </div>

      {/* 6. Bottom Scroll Indicator — fixed at base */}
      <div
        className="absolute bottom-8 inset-x-0 z-30 flex flex-col items-center space-y-1.5 cursor-pointer group pointer-events-auto"
        onClick={onScrollExplore}
      >
        <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-widest text-white/80 group-hover:text-[#D8A84E] transition-colors uppercase drop-shadow">
          Scroll To Experience
        </span>
        <div className="w-6 h-9 rounded-full border-2 border-white/50 flex items-start justify-center p-1 group-hover:border-[#D8A84E] transition-colors">
          <div className="w-1.5 h-2 rounded-full bg-white group-hover:bg-[#D8A84E] animate-bounce" />
        </div>
        <ChevronDown className="w-4 h-4 text-white/60 animate-pulse" />
      </div>
    </div>
  );
}
