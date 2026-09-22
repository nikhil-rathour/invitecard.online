import { useState } from 'react'
import { Play, X } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'

export default function VideoSection({ data }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { video, theme } = data

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  if (!video || !video.youtubeUrl) return null

  return (
    <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
            Cinematic Highlights
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
            {video.title || 'Our Pre-Wedding Film'}
          </h2>
          <MandalaFlourish color={colors.gold} className="my-4" />
          {video.subtitle && (
            <p className="text-xs text-muted leading-relaxed">
              {video.subtitle}
            </p>
          )}
        </div>

        {/* Video Thumbnail / Modal Trigger */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border-2 border-gold/30 bg-surface shadow-md">
          {!isPlaying ? (
            <div
              className="group relative aspect-[16/9] cursor-pointer overflow-hidden"
              onClick={() => setIsPlaying(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setIsPlaying(true)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Play pre-wedding video"
            >
              <img
                src={video.thumbnail}
                alt="Video thumbnail"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-colors group-hover:bg-black/50">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-primary/90 text-white shadow-2xl transition-transform group-hover:scale-110">
                  <Play size={32} weight="fill" className="ml-1" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative aspect-[16/9]">
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                aria-label="Close video"
              >
                <X size={20} weight="bold" />
              </button>
              <iframe
                src={`${video.youtubeUrl}?autoplay=1`}
                title="Pre-wedding video"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
