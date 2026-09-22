import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Calendar, Sparkle } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'

export default function DateRevealSection({ data }) {
  const [revealed, setRevealed] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { dateReveal, theme } = data

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  const rawDate = new Date(dateReveal.date || '2027-01-30')
  const validDate = !Number.isNaN(rawDate.getTime()) ? rawDate : new Date('2027-01-30')

  const dayNumber = validDate.getDate()
  const monthName = validDate.toLocaleDateString('en-IN', { month: 'long' }).toUpperCase()
  const yearNumber = validDate.getFullYear()
  const dayName = validDate.toLocaleDateString('en-IN', { weekday: 'long' })

  return (
    <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
          Save The Date
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
          The Auspicious Moment
        </h2>

        <MandalaFlourish color={colors.gold} className="my-4" />

        {/* Interactive Reveal Card */}
        <div className="mt-6 flex justify-center">
          <motion.div
            onClick={() => setRevealed(!revealed)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setRevealed(!revealed)
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={revealed}
            aria-label={`Wedding date: ${dayNumber} ${monthName} ${yearNumber}. Tap to ${revealed ? 'hide' : 'reveal'}`}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="group relative w-full max-w-md cursor-pointer overflow-hidden rounded-2xl border-2 border-gold/40 bg-bg p-8 shadow-md transition-all hover:border-gold hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Unrevealed Cover */}
            {!revealed ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkle size={32} weight="duotone" className="animate-pulse" />
                </div>
                <p className="font-display text-xl font-bold text-primary">
                  {dateReveal.revealText || 'Tap to Reveal Date'}
                </p>
                <p className="mt-2 text-xs text-muted">
                  Click or tap anywhere on this card
                </p>
              </div>
            ) : (
              /* Revealed Date Content */
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-4 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {dayName}
                </p>
                
                <div className="my-3 flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-gold/40" />
                  <span className="font-display text-6xl font-bold leading-none text-primary sm:text-7xl">
                    {dayNumber}
                  </span>
                  <div className="h-px w-12 bg-gold/40" />
                </div>

                <p className="font-display text-2xl font-bold uppercase tracking-wider text-text">
                  {monthName} {yearNumber}
                </p>

                {dateReveal.locationShort && (
                  <p className="mt-4 flex items-center justify-center gap-1 text-xs font-medium text-muted">
                    <Calendar size={14} className="text-gold" />
                    {dateReveal.locationShort}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
