function formatEventDate(date, startTime) {
  if (!date) return ''
  const parsed = new Date(date)
  const label = Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString('en-IN', { dateStyle: 'long' })
  return startTime ? `${label}, ${startTime}` : label
}

function ClassicLayout({ data, colors }) {
  const { names, basicInfo, events = [], hosts = {}, story } = data
  return (
    <>
      <div
        className="relative px-8 py-14 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.gold})` }}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] opacity-80">
          You are invited to
        </p>
        <h1 className="mb-3 font-display text-4xl font-bold leading-tight">
          {names?.primary || basicInfo?.title || 'Your Invitation'}
        </h1>
        {names?.secondary && (
          <p className="text-base font-medium leading-relaxed opacity-90">{names.secondary}</p>
        )}
        <div className="mx-auto mt-8 h-px w-16 bg-white/50" />
      </div>

      {basicInfo?.shortMessage && (
        <div className="border-b border-border px-8 py-6 text-center">
          <p className="text-base italic leading-relaxed text-muted">
            {basicInfo.shortMessage}
          </p>
        </div>
      )}

      {events.length > 0 && (
        <div className="px-8 py-8">
          <h2
            className="mb-6 text-center font-display text-xl font-bold tracking-wide"
            style={{ color: colors.primary }}
          >
            Celebrations
          </h2>
          <div className="space-y-4">
            {events.map((event, i) => (
              <div
                key={`${event.title}-${i}`}
                className="rounded-xl border border-border p-5 text-center transition-colors hover:bg-surface"
              >
                <h3 className="text-base font-bold text-text">
                  {event.title}
                </h3>
                {event.date && (
                  <p className="mt-2 text-sm font-medium text-primary">
                    {formatEventDate(event.date, event.startTime)}
                  </p>
                )}
                {event.venueName && (
                  <p className="mt-2 text-sm font-medium text-text">{event.venueName}</p>
                )}
                {event.address && (
                  <p className="mt-1 text-sm text-muted">{event.address}</p>
                )}
                {event.mapsUrl && (
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-bold uppercase tracking-wider underline underline-offset-4 transition-opacity hover:opacity-80"
                    style={{ color: colors.primary }}
                  >
                    Open Map
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(hosts.brideFamily || hosts.groomFamily || hosts.hostNames) && (
        <div className="border-t border-border bg-surface px-8 py-6 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Hosted by
          </p>
          <div className="space-y-1">
            {hosts.hostNames && (
              <p className="text-base font-medium text-text">{hosts.hostNames}</p>
            )}
            {hosts.brideFamily && (
              <p className="text-base font-medium text-text">{hosts.brideFamily}</p>
            )}
            {hosts.groomFamily && (
              <p className="text-base font-medium text-text">{hosts.groomFamily}</p>
            )}
          </div>
        </div>
      )}

      {(story?.message || story?.coupleStory || story?.familyMessage) && (
        <div className="space-y-4 border-t border-border bg-bg px-8 py-8 text-center">
          {story.coupleStory && (
            <p className="text-base italic leading-relaxed text-muted">
              {story.coupleStory}
            </p>
          )}
          {story.familyMessage && (
            <p className="text-base leading-relaxed text-muted">
              {story.familyMessage}
            </p>
          )}
          {story.message && (
            <p className="text-base italic leading-relaxed text-muted">
              {story.message}
            </p>
          )}
        </div>
      )}
    </>
  )
}

function FloralLayout({ data, colors }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-4 text-center z-10">
        <svg
          width="48"
          height="24"
          viewBox="0 0 40 20"
          fill="none"
          className="mx-auto opacity-30 drop-shadow-sm"
        >
          <path
            d="M20 0C14 6 6 8 0 10c6 2 14 4 20 10 6-6 14-8 20-10-6-2-14-4-20-10Z"
            fill={colors.gold}
          />
        </svg>
      </div>
      <ClassicLayout data={data} colors={colors} />
    </div>
  )
}

function ModernLayout({ data, colors }) {
  const { names, basicInfo, events = [] } = data
  return (
    <>
      <div
        className="px-8 py-12 text-left"
        style={{ background: colors.primary, color: '#fff' }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] opacity-70">
          Invitation
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight">
          {names?.primary || basicInfo?.title}
        </h1>
        {basicInfo?.shortMessage && (
          <p className="mt-6 max-w-[90%] text-base font-light leading-relaxed opacity-90">
            {basicInfo.shortMessage}
          </p>
        )}
      </div>

      <div className="space-y-6 px-8 py-10">
        {events.map((event, i) => (
          <div
            key={`${event.title}-${i}`}
            className="border-l-2 pl-5 transition-colors hover:border-l-4"
            style={{ borderColor: colors.gold }}
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary" style={{ color: colors.primary }}>
              {formatEventDate(event.date, event.startTime)}
            </p>
            <h3 className="mb-1 text-lg font-bold text-text">{event.title}</h3>
            {event.venueName && (
              <p className="text-sm font-medium text-text">{event.venueName}</p>
            )}
            {event.address && (
              <p className="mt-1 text-sm text-muted">{event.address}</p>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

/**
 * Data-driven invitation renderer.
 * Template theme + invitation data -> preview.
 */
export default function InvitationRenderer({ data }) {
  if (!data) return null
  const theme = data.theme || {}
  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }
  const dark =
    theme.background && theme.background.toLowerCase() !== '#fff9f2'
  const Layout =
    theme.layout === 'modern'
      ? ModernLayout
      : theme.layout === 'floral'
        ? FloralLayout
        : ClassicLayout

  return (
    <div
      className={`mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-sm border border-border ${
        dark ? 'text-white' : ''
      }`}
      style={{
        background: theme.background || '#FFF9F2',
        fontFamily: 'Cormorant Garamond, Georgia, serif',
      }}
    >
      <Layout data={data} colors={colors} />
      <div className="border-t border-border bg-surface px-6 py-4 text-center">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          InviteCard.online
        </p>
      </div>
    </div>
  )
}
