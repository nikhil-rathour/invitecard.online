import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from '@phosphor-icons/react'
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
              <span className="font-display text-lg font-bold text-primary">
                InviteCard
              </span>
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

              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => handleNavigate('/dashboard')}
                    className="block w-full rounded-lg px-3 py-3 text-left text-base font-medium text-text transition-colors hover:bg-bg hover:text-primary"
                  >
                    My Invitations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('/login')}
                    className="block w-full rounded-lg px-3 py-3 text-left text-base font-medium text-muted transition-colors hover:bg-bg hover:text-primary"
                  >
                    Login
                  </button>
                </li>
              </ul>
            </nav>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
