import { MapPin, Clock, TShirt, NavigationArrow } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'

function formatEventDate(dateStr) {
  if (!dateStr) return ''
  const parsed = new Date(dateStr)
  return Number.isNaN(parsed.getTime())
    ? dateStr
    : parsed.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
}

export default function EventsTimelineSection({ data }) {
  const { events = [], theme } = data

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  if (!events || events.length === 0) return null

  return (
    <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
            Wedding Ceremonies
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
            Celebration Itinerary
          </h2>
          <MandalaFlourish color={colors.gold} className="my-4" />
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12 space-y-8 before:absolute before:left-4 before:top-4 before:h-[calc(100%-32px)] before:w-0.5 before:bg-gold/30 sm:before:left-1/2 sm:before:-translate-x-1/2">
          {events.map((evt, idx) => {
            const isEven = idx % 2 === 0
            return (
              <div
                key={evt.id || idx}
                className={`relative flex flex-col gap-6 pl-10 sm:pl-0 ${
                  isEven ? 'sm:flex-row-reverse' : 'sm:flex-row'
                }`}
              >
                {/* Timeline Center Dot */}
                <div className="absolute left-1.5 top-6 z-10 h-5 w-5 rounded-full border-4 border-bg bg-primary ring-2 ring-gold sm:left-1/2 sm:-translate-x-1/2" />

                {/* Event Card Content */}
                <div className="w-full sm:w-1/2 sm:px-6">
                  <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-gold/40 hover:shadow-md">
                    <div className="mb-3 flex items-center justify-between border-b border-border-light pb-3">
                      <h3 className="font-display text-2xl font-bold text-primary">
                        {evt.title}
                      </h3>
                      <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">
                        {formatEventDate(evt.date)}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-sm text-text">
                      {/* Time */}
                      {evt.startTime && (
                        <div className="flex items-center gap-2 text-muted">
                          <Clock size={16} className="text-gold shrink-0" />
                          <span>
                            {evt.startTime} {evt.endTime ? `- ${evt.endTime}` : 'onwards'}
                          </span>
                        </div>
                      )}

                      {/* Venue & Address */}
                      {evt.venueName && (
                        <div className="flex items-start gap-2">
                          <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-text">{evt.venueName}</p>
                            {evt.address && (
                              <p className="text-xs text-muted leading-relaxed mt-0.5">
                                {evt.address}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Dress Code */}
                      {evt.dressCode && (
                        <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                          <TShirt size={16} className="text-gold shrink-0" />
                          <span>Dress Code: <strong className="text-text">{evt.dressCode}</strong></span>
                        </div>
                      )}

                      {/* Description */}
                      {evt.description && (
                        <p className="pt-2 text-xs italic text-muted leading-relaxed border-t border-border-light">
                          {evt.description}
                        </p>
                      )}
                    </div>

                    {/* Maps CTA */}
                    {evt.mapsUrl && (
                      <div className="mt-5 border-t border-border-light pt-3">
                        <a
                          href={evt.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-dark transition-colors"
                        >
                          <NavigationArrow size={14} weight="bold" />
                          View Route / Directions
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty Half for Desktop Timeline Balance */}
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
