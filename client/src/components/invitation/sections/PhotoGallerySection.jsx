import { useState } from 'react'
import { MagnifyingGlassPlus } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'
import LightboxModal from '../common/LightboxModal'

export default function PhotoGallerySection({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const { gallery = [], theme } = data

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  if (!gallery || gallery.length === 0) return null

  return (
    <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
            Memories
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
            Pre-Wedding Gallery
          </h2>
          <MandalaFlourish color={colors.gold} className="my-4" />
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, idx) => {
            const url = typeof item === 'string' ? item : item.url
            const caption = typeof item === 'string' ? '' : item.caption
            const aspectClass = idx % 5 === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'

            return (
              <div
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedIndex(idx)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View photo ${idx + 1}: ${caption || 'Pre-wedding memory'}`}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm cursor-pointer ${aspectClass}`}
              >
                <img
                  src={url}
                  alt={caption || `Gallery photo ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center justify-between text-white">
                    <p className="text-xs font-medium truncate max-w-[80%]">
                      {caption || 'Pre-wedding moments'}
                    </p>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                      <MagnifyingGlassPlus size={16} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          images={gallery}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onSelectIndex={setSelectedIndex}
        />
      </div>
    </section>
  )
}
