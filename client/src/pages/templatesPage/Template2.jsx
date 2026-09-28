import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroHawaMahal from "../../components/invitation/HeroHawaMahal";
import WeddingIntro from "../../components/invitation/WeddingIntro";
import CoupleSection from "../../components/invitation/CoupleSection";
import ElephantDecor from "../../components/invitation/ElephantDecor";
import WeddingDetails from "../../components/invitation/WeddingDetails";
import GalleryInstagramSection from "../../components/invitation/GalleryInstagramSection";
import WishesSection from "../../components/invitation/WishesSection";
import FloatingDecorations from "../../components/invitation/FloatingDecorations";
import MusicControl from "../../components/invitation/MusicControl";
import defaultWeddingData from "../../data/weddingData";
import { WeddingDataProvider, useWeddingData } from "../../context/WeddingDataContext";
import { template2Service } from "../../services/template2Service";

/** Tiled logo watermark that covers the full page */
function PageWatermark() {
  const tiles = Array.from({ length: 24 });
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none grid grid-cols-2 sm:grid-cols-4 gap-0"
      aria-hidden="true"
    >
      {tiles.map((_, i) => (
        <div key={i} className="flex items-center justify-center" style={{ minHeight: "16.66vh" }}>
          <img
            src="/logo.png"
            alt=""
            className="w-24 sm:w-32 opacity-[0.06] select-none"
            style={{ transform: "rotate(-30deg)", filter: "grayscale(1)" }}
          />
        </div>
      ))}
    </div>
  );
}

function Template2Content() {
  const weddingData = useWeddingData();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FFFDF9] text-[#3D232A] overflow-x-hidden selection:bg-[#FFB6C9] selection:text-[#3D232A]">
      {/* Watermark — visible on template */}
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
          {weddingData.hashtag || "#RoyalVivah"} • Designed with Love
        </p>
        <p className="text-[10px] text-[#D8A84E]/80">
          Created for {weddingData.brideName || "Bride"} & {weddingData.groomName || "Groom"}'s Royal Rajasthan Wedding
        </p>
      </footer>
    </div>
  );
}

export default function Template2({ initialData }) {
  const { slug, id } = useParams();
  const [data, setData] = useState(initialData || defaultWeddingData);
  const [loading, setLoading] = useState(Boolean(slug || id));

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setLoading(false);
      return;
    }

    if (slug) {
      template2Service
        .getBySlug(slug)
        .then((res) => {
          if (res?.data) setData(res.data);
        })
        .catch((err) => {
          console.warn("Could not load customized invitation, falling back to default:", err);
        })
        .finally(() => setLoading(false));
    } else if (id) {
      template2Service
        .getById(id)
        .then((res) => {
          if (res?.data) setData(res.data);
        })
        .catch((err) => {
          console.warn("Could not load customized invitation by ID, falling back to default:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug, id, initialData]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a0a10] text-[#D8A84E]">
        <div className="text-center font-cinzel">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#D8A84E] border-t-transparent" />
          <p className="tracking-widest text-sm uppercase">Loading Royal Invitation...</p>
        </div>
      </div>
    );
  }

  return (
    <WeddingDataProvider data={data}>
      <Template2Content />
    </WeddingDataProvider>
  );
}
