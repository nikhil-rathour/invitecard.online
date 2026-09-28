import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { List, WhatsappLogo, InstagramLogo } from '@phosphor-icons/react'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Invitations', to: '/invitations' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Features', to: '/#features' },
  { label: 'FAQ', to: '/#faq' },
]

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello InviteCard Team! 👋 I would like to create a luxury digital invitation for my upcoming celebration. Please share details and pricing."
)
const WHATSAPP_URL = `https://wa.me/917505445202?text=${WHATSAPP_MESSAGE}`
const INSTAGRAM_URL = 'https://instagram.com/invitecard.online_'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Brand */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="InviteCard"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted hover:text-text'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Connect & Social actions */}
            <div className="hidden items-center gap-2.5 md:flex">
              {/* Instagram link */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg text-muted transition-all hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 hover:text-[#E1306C]"
                title="Follow us on Instagram (@invitecard.online_)"
                aria-label="Instagram"
              >
                <InstagramLogo size={19} weight="bold" />
              </a>

              {/* WhatsApp direct chat button */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-3.5 py-1.5 text-xs font-semibold text-[#25D366] ring-1 ring-[#25D366]/30 transition-all hover:bg-[#25D366] hover:text-white hover:shadow-md"
                title="Chat with us on WhatsApp (7505445202)"
                aria-label="WhatsApp"
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg text-muted hover:text-[#E1306C]"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramLogo size={18} weight="bold" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] ring-1 ring-[#25D366]/30 hover:bg-[#25D366] hover:text-white"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <WhatsappLogo size={18} weight="fill" />
              </a>

              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-text transition-colors hover:bg-bg ml-1"
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <List size={22} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
