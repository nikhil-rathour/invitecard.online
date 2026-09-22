import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { EnvelopeSimple, Sparkle } from '@phosphor-icons/react'
import { GaneshaIcon, MandalaFlourish, RoyalFrame } from '../common/OrnamentalDivider'

export default function OpeningOverlay({ data, onOpen, isOpen }) {
  const [opened, setOpened] = useState(isOpen || false)
  const shouldReduceMotion = useReducedMotion()

  const { blessingText, blessingSubtitle, title, subtitle, openButtonText } = data.opening

  function handleOpen() {
    setOpened(true)
    if (onOpen) onOpen()
  }

  if (opened) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#5E142B] p-4 text-center text-[#FFF9F2]"
        initial={{ opacity: 1 }}
        exit={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 1.05, filter: 'blur(10px)' }
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Opening invitation envelope"
      >
        {/* Background Subtle Royal Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C89B3C_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 w-full max-w-md">
          <RoyalFrame color="#C89B3C" className="bg-[#5E142B]/90 border-[#C89B3C]/50 py-12 px-6 shadow-2xl backdrop-blur-md">
            {/* Ganesha Motif */}
            <GaneshaIcon color="#C89B3C" size={56} className="mb-4" />

            {/* Blessing Header */}
            {blessingText && (
              <p className="font-display text-sm font-semibold tracking-[0.25em] text-[#C89B3C] uppercase">
                {blessingText}
              </p>
            )}
            {blessingSubtitle && (
              <p className="mt-1 text-xs font-light text-[#FFF9F2]/70">
                {blessingSubtitle}
              </p>
            )}

            <MandalaFlourish color="#C89B3C" className="my-4" />

            {/* Title & Subtitle */}
            <p className="text-xs uppercase tracking-[0.3em] text-[#C89B3C]/90">
              Wedding Invitation
            </p>
            <h1 className="my-3 font-display text-4xl font-bold text-[#FFF9F2] sm:text-5xl">
              {title}
            </h1>
            <p className="text-sm font-medium italic text-[#FFF9F2]/80">
              {subtitle}
            </p>

            {/* Wax Seal Open Button */}
            <div className="mt-8 flex justify-center">
              <motion.button
                onClick={handleOpen}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="group relative inline-flex items-center gap-2 rounded-full border-2 border-[#C89B3C] bg-[#8B1E3F] px-8 py-3.5 text-base font-semibold text-[#FFF9F2] shadow-lg transition-all hover:bg-[#C89B3C] hover:text-[#241F20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
                aria-label="Open digital invitation"
              >
                <Sparkle size={18} weight="fill" className="text-[#C89B3C] group-hover:text-[#241F20]" />
                <span>{openButtonText || 'Open Invitation'}</span>
                <EnvelopeSimple size={20} weight="duotone" />
              </motion.button>
            </div>

            <p className="mt-6 text-[11px] tracking-wider text-[#FFF9F2]/50 uppercase">
              InviteCard.online
            </p>
          </RoyalFrame>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
