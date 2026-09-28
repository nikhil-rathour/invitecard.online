import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X, WhatsappLogo, InstagramLogo } from '@phosphor-icons/react'
import Button from '../ui/Button'

const navLinks = [
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Features', to: '/#features' },
  { label: 'FAQ', to: '/#faq' },
]

export default function MobileMenu({ open, onClose }) {
  const navigate = useNavigate()
  const closeRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // Focus trap: focus close button when opened
  useEffect(() => {
    if (open && closeRef.current) {
      closeRef.current.focus()
    }
  }, [open])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  function handleNavigate(to) {
    onClose()
    navigate(to)
  }

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        transition: { type: 'spring', damping: 30, stiffness: 300 },
      }

  const overlayMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-text/30"
            onClick={onClose}
            aria-hidden="true"
            {...overlayMotion}
          />

          {/* Drawer */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-[280px] max-w-[85vw] flex-col bg-surface shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            {...motionProps}
          >
            {/* Close button */}
            <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
              <img
                src="/logo.png"
                alt="InviteCard"
                className="h-8 w-auto"
              />
              <button
                ref={closeRef}
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-bg hover:text-text"
                aria-label="Close menu"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-text transition-colors hover:bg-bg hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="my-6 h-px bg-border-light" />

              <div className="space-y-2 pt-2">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Connect With Us
                </p>
                <a
                  href="https://wa.me/917505445202?text=Hello%20InviteCard%20Team!%20%F0%9F%91%8B%20I%20would%20like%20to%20create%20a%20luxury%20digital%20invitation%20for%20my%20upcoming%20celebration.%20Please%20share%20details%20and%20pricing."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-2.5 rounded-xl bg-[#25D366]/10 px-3.5 py-2.5 text-sm font-semibold text-[#25D366] ring-1 ring-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-all"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  <span>WhatsApp (+91 7505445202)</span>
                </a>
                <a
                  href="https://instagram.com/invitecard.online_"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm font-semibold text-text hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 hover:text-[#E1306C] transition-all"
                >
                  <InstagramLogo size={20} weight="bold" />
                  <span>@invitecard.online_</span>
                </a>
              </div>
            </nav>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
