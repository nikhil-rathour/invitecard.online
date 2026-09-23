import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { List } from '@phosphor-icons/react'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Templates', to: '/templates' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Features', to: '/#features' },
  { label: 'FAQ', to: '/#faq' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-1.5">
              <span className="font-display text-xl font-bold text-primary">
                InviteCard
              </span>
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

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 md:flex">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-text transition-colors hover:bg-bg"
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
