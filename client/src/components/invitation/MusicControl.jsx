import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // High quality royalty-free Indian wedding shehnai / tanpura ambient audio track
  const audioUrl =
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8b417d4.mp3?filename=indian-wedding-background-music-110243.mp3";

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio autoplay blocked by browser", err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      <button
        onClick={toggleMusic}
        className={`relative flex items-center space-x-2 px-4 py-3 rounded-full font-cinzel text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl cursor-pointer ${
          isPlaying
            ? "bg-[#C94F7C] text-white border border-[#D8A84E] shadow-[0_0_20px_rgba(201,79,124,0.6)]"
            : "bg-[#FFFDF9]/90 text-[#3D232A] border border-[#F3C6D3] hover:bg-[#FFE4EC]"
        }`}
        title={isPlaying ? "Pause Wedding Music" : "Play Wedding Music"}
      >
        <span className="text-base leading-none animate-pulse">
          {isPlaying ? "♪" : "♫"}
        </span>

        <span className="hidden sm:inline">
          {isPlaying ? "Music Playing" : "Play Music"}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#F3E5AB] animate-bounce" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#8B6255]" />
        )}

        {/* Pulsing ring indicator when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-[#D8A84E] animate-ping opacity-40 pointer-events-none" />
        )}
      </button>
    </div>
  );
}
