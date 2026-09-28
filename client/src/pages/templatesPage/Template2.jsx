import React from "react";
import HeroHawaMahal from "../../components/invitation/HeroHawaMahal";
import WeddingIntro from "../../components/invitation/WeddingIntro";
import CoupleSection from "../../components/invitation/CoupleSection";
import ElephantDecor from "../../components/invitation/ElephantDecor";
import WeddingDetails from "../../components/invitation/WeddingDetails";
import GalleryInstagramSection from "../../components/invitation/GalleryInstagramSection";
import WishesSection from "../../components/invitation/WishesSection";
import FloatingDecorations from "../../components/invitation/FloatingDecorations";
import MusicControl from "../../components/invitation/MusicControl";
import weddingData from "../../data/weddingData";

/** Tiled logo watermark that covers the full page */
function PageWatermark() {
  const tiles = Array.from({ length: 24 });
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none grid grid-cols-4 gap-0"
      aria-hidden="true"
    >
      {tiles.map((_, i) => (
        <div key={i} className="flex items-center justify-center" style={{ minHeight: "16.66vh" }}>
          <img
            src="/logo.png"
            alt=""
            className="w-32 opacity-[0.07]"
            style={{ transform: "rotate(-30deg)", filter: "grayscale(1)" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Template2() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FFFDF9] text-[#3D232A] overflow-x-hidden selection:bg-[#FFB6C9] selection:text-[#3D232A]">
      {/* Watermark — always visible on this template */}
      <PageWatermark />

      {/* Floating Ambient Rose Petals */}
      <FloatingDecorations />

      {/* Music Audio Toggle Button */}
      <MusicControl />

      {/* 1. HERO SECTION: Full-Screen Hawa Mahal Smooth Scroll Sequence */}
      <HeroHawaMahal onScrollExplore={() => scrollToSection("intro")} />

      {/* 2. ROYAL CARPET SECTION: Main Wedding Invitation & Countdown */}
      <WeddingIntro />

      {/* 3. INSTAGRAM HANDLES & COUPLE MOMENTS GALLERY */}
      <GalleryInstagramSection />

      {/* 4. WEDDING DETAILS SECTION: Event Itinerary */}
      <WeddingDetails />

      {/* 5. COUPLE SECTION: Decorative Bride & Groom PNG */}
      <div className="relative">
        <ElephantDecor side="left" />
        <CoupleSection />
        <ElephantDecor side="right" />
      </div>

      {/* 6. WISHES & BLESSINGS GUESTBOOK SECTION */}
      <WishesSection />

      {/* Footer Branding Note */}
      <footer className="w-full py-8 text-center bg-[#3D232A] text-[#FFE4EC]/70 text-xs font-cinzel border-t border-[#D8A84E]/30">
        <p className="tracking-widest uppercase mb-1">
          {weddingData.hashtag} • Designed with Love
        </p>
        <p className="text-[10px] text-[#D8A84E]/80">
          Created for {weddingData.brideName} & {weddingData.groomName}'s Royal Rajasthan Wedding
        </p>
      </footer>
    </div>
  );
}
