import { Heart, Quotes } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'

export default function CoupleStorySection({ data }) {
  const { story, theme } = data

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  if (!story || !story.chapters || story.chapters.length === 0) return null

  return (
    <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
            Love Story
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
            {story.title || 'How Our Paths Crossed'}
          </h2>
          <MandalaFlourish color={colors.gold} className="my-4" />

          {story.quote && (
            <div className="mx-auto max-w-xl text-center">
              <Quotes size={24} weight="fill" className="mx-auto mb-2 text-gold/60" />
              <p className="font-display text-lg italic text-muted">
                "{story.quote}"
              </p>
            </div>
          )}
        </div>

        {/* Chapters */}
        <div className="mt-12 space-y-12">
          {story.chapters.map((chap, idx) => {
            const isReverse = idx % 2 === 1
            return (
              <div
                key={chap.year || idx}
                className={`flex flex-col items-center gap-8 rounded-2xl border border-border bg-bg p-6 sm:p-8 lg:flex-row ${
                  isReverse ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Chapter Image */}
                {chap.image && (
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md border-2 border-gold/30">
                      <img
                        src={chap.image}
                        alt={chap.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                {/* Chapter Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-display text-sm font-bold text-primary">
                      {chap.year}
                    </span>
                    <Heart size={14} weight="fill" className="text-gold" />
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-text">
                    {chap.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {chap.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
