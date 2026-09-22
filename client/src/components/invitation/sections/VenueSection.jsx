import { MapPin, NavigationArrow } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'

export default function VenueSection({ data }) {
  const { venues = [], theme } = data

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  if (!venues || venues.length === 0) return null

  return (
    <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
            Destination & Directions
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
            Wedding Venues
          </h2>
          <MandalaFlourish color={colors.gold} className="my-4" />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {venues.map((venue, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:border-gold/40 hover:shadow-md"
            >
              {venue.image && (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                {venue.role && (
                  <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">
                    {venue.role}
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-primary">
                  {venue.name}
                </h3>
                
                <div className="mt-3 flex items-start gap-2 text-sm text-text-secondary">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                  <p className="leading-relaxed">{venue.address}</p>
                </div>

                <div className="mt-auto pt-6">
                  {venue.mapsUrl && (
                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-primary/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-white"
                    >
                      <NavigationArrow size={16} weight="bold" />
                      Get Directions
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
