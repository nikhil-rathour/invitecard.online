import { useState, useEffect } from 'react'
import { Hourglass } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'

function getTimeRemaining(targetDateStr) {
  const target = new Date(targetDateStr || '2027-01-30T10:00:00').getTime()
  const now = new Date().getTime()
  const diff = target - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isPast: false }
}

export default function CountdownSection({ data }) {
  const { countdown, theme } = data
  const [time, setTime] = useState(() => getTimeRemaining(countdown.targetDate))

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining(countdown.targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown.targetDate])

  return (
    <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Hourglass size={32} weight="duotone" className="mx-auto mb-2 text-gold" />
        
        <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
          The Countdown
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
          {countdown.title || 'Counting Down To The Celebration'}
        </h2>

        <MandalaFlourish color={colors.gold} className="my-4" />

        {time.isPast ? (
          <div className="mt-6 rounded-2xl border border-gold/30 bg-bg p-8">
            <p className="font-display text-2xl font-bold text-primary">
              The Celebration Has Arrived!
            </p>
            <p className="mt-2 text-xs text-muted">
              Thank you for being part of our special journey.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-6">
            {[
              { label: 'Days', value: time.days },
              { label: 'Hours', value: time.hours },
              { label: 'Minutes', value: time.minutes },
              { label: 'Seconds', value: time.seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-gold/30 bg-bg p-4 shadow-sm sm:p-6"
              >
                <span className="font-display text-3xl font-bold text-primary sm:text-5xl">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
