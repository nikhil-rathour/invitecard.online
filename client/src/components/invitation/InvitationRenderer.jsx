import { normalizeInvitationData } from './data/normalizeInvitationData'
import RoyalTemplate from './templates/RoyalTemplate'
import FloralTemplate from './templates/FloralTemplate'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'

const TEMPLATE_COMPONENTS = {
  royal: RoyalTemplate,
  floral: FloralTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate,
}

function CompactCardPreview({ data }) {
  const { couple, theme, events = [] } = data
  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }
  const dark = theme.background && theme.background.toLowerCase() !== '#fff9f2'

  return (
    <div
      className={`mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-sm ${
        dark ? 'text-white' : ''
      }`}
      style={{
        background: theme.background || '#FFF9F2',
        fontFamily: 'Cormorant Garamond, Georgia, serif',
      }}
    >
      <div
        className="px-6 py-10 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.gold})` }}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
          Wedding Invitation
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight">
          {couple?.groom?.name} & {couple?.bride?.name}
        </h1>
        <div className="mx-auto mt-4 h-px w-12 bg-white/40" />
      </div>

      <div className="space-y-3 px-6 py-6 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-gold">
          Celebrations
        </p>
        {events.slice(0, 2).map((evt, idx) => (
          <div key={idx} className="rounded-xl border border-border p-3 text-xs">
            <p className="font-bold text-text">{evt.title}</p>
            <p className="text-muted">{evt.date} &middot; {evt.venueName}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-surface px-6 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
          InviteCard.online
        </p>
      </div>
    </div>
  )
}

/**
 * Reusable Invitation Renderer.
 * Accepts raw or template data and renders either:
 * - Full interactive standalone experience (`standalone={true}`)
 * - Full interactive preview (`preview={true}`)
 * - Compact preview for cards/dashboard (`compact={true}`)
 */
export default function InvitationRenderer({
  data,
  standalone = false,
  preview = false,
  compact = false,
}) {
  if (!data) return null

  const normalized = normalizeInvitationData(data)
  const layoutKey = (normalized.theme.layout || 'royal').toLowerCase()
  const TemplateComponent = TEMPLATE_COMPONENTS[layoutKey] || RoyalTemplate

  if (compact) {
    return <CompactCardPreview data={normalized} />
  }

  return (
    <TemplateComponent
      data={normalized}
      previewMode={preview && !standalone}
    />
  )
}
