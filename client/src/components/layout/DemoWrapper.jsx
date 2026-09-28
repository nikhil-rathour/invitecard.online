import { useLocation } from 'react-router-dom'

const WHATSAPP_NUMBER = '917505445202'

/** Converts a URL slug like "jaipur-shahi-vivah" → "Jaipur Shahi Vivah" */
function slugToTitle(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * DemoWrapper
 * Wraps any invitation template in demo mode:
 *  - A sticky top banner prompting users to buy
 *  - A full-page tiled watermark grid using the site logo
 * The watermark is pointer-events-none so the invitation
 * remains fully interactive underneath.
 */
export default function DemoWrapper({ children }) {
  const { pathname } = useLocation()

  // Extract slug from /invitations/demo/<slug>
  const slug = pathname.split('/invitations/demo/')[1] || ''
  const invitationName = slugToTitle(slug)
  const demoUrl = `${window.location.origin}${pathname}`

  function handleBuy() {
    const message =
      `Hello! I viewed the *${invitationName}* invitation demo and I'd like to purchase it.\n\n` +
      `🔗 Demo: ${demoUrl}\n\n` +
      `Please share the details to customize and finalize my order!`
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  return (
    <div className="relative">
      {/* ── STICKY DEMO BANNER ── */}
      <div className="sticky top-0 z-[200] flex items-center justify-between gap-3 bg-[#3D232A] px-4 py-2.5 shadow-lg">
        <div className="flex items-center gap-2.5 min-w-0">
          <img src="/logo.png" alt="InviteCard" className="h-7 w-auto shrink-0" />
          <p className="text-xs text-[#FFE4EC]/80 truncate">
            <span className="font-semibold text-[#D8A84E]">Demo Preview</span>
            {' '}— This is a sample invitation. Watermarks will be removed after purchase.
          </p>
        </div>
        <button
          onClick={handleBuy}
          className="shrink-0 rounded-full bg-[#D8A84E] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#3D232A] transition-opacity hover:opacity-90"
        >
          Buy Now
        </button>
      </div>

      {/* ── CONTENT + WATERMARK LAYER ── */}
      <div className="relative">
        {/* Invitation content renders here */}
        {children}

        {/* Full-page tiled watermark — sits above content, pointer-events-none */}
        <div
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none"
          aria-hidden="true"
        >
          <WatermarkGrid />
        </div>
      </div>
    </div>
  )
}

/** Renders a grid of rotated logo watermarks that covers the entire viewport */
function WatermarkGrid() {
  // 4 columns × 6 rows = 24 tiles, enough to fill any screen
  const tiles = Array.from({ length: 24 })

  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-0">
      {tiles.map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-center"
          style={{ minHeight: '16.66vh' }}
        >
          <img
            src="/logo.png"
            alt=""
            className="w-32 opacity-[0.07]"
            style={{ transform: 'rotate(-30deg)', filter: 'grayscale(1)' }}
          />
        </div>
      ))}
    </div>
  )
}
