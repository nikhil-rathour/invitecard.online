import { motion, useReducedMotion } from 'motion/react'
import { Heart } from '@phosphor-icons/react'
import { GaneshaIcon, JharokhaArch, MandalaFlourish } from '../common/OrnamentalDivider'

export default function HeroCoupleSection({ data }) {
  const shouldReduceMotion = useReducedMotion()
  const { couple, hosts, invitationMessage, theme } = data

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  return (
    <section className="relative overflow-hidden bg-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Decorative Jharokha Header */}
      <div className="mx-auto max-w-3xl text-center">
        <GaneshaIcon color={colors.gold} size={52} className="mb-4" />
        
        <p className="font-display text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: colors.gold }}>
          || Shree Ganeshay Namah ||
        </p>

        <JharokhaArch color={colors.gold} className="my-4" />

        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Together with their families
        </p>

        {/* Family Names */}
        <div className="my-3 space-y-1 text-sm font-medium text-text-secondary">
          {hosts.groomFamily && <p>{hosts.groomFamily}</p>}
          <p className="text-xs text-gold">&</p>
          {hosts.brideFamily && <p>{hosts.brideFamily}</p>}
        </div>

        <p className="my-4 text-xs italic text-muted">
          solicit your gracious presence at the wedding celebrations of
        </p>

        {/* Couple Names Centerpiece */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-8"
        >
          <h1 className="font-display text-5xl font-bold leading-tight text-text sm:text-6xl lg:text-7xl">
            <span style={{ color: colors.primary }}>{couple.groom.name}</span>
            <span className="mx-3 inline-block font-serif text-3xl font-normal text-gold sm:text-4xl">&</span>
            <span style={{ color: colors.primary }}>{couple.bride.name}</span>
          </h1>
        </motion.div>

        <MandalaFlourish color={colors.gold} className="my-6" />

        {/* Couple Portrayal Cards */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {/* Groom Card */}
          <div className="flex flex-col items-center rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="relative mb-4 h-44 w-44 overflow-hidden rounded-full border-4 border-gold/40 p-1 shadow-md">
              <img
                src={couple.groom.image}
                alt={couple.groom.fullName}
                className="h-full w-full rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="font-display text-2xl font-bold text-text">
              {couple.groom.fullName}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {couple.groom.family}
            </p>
          </div>

          {/* Bride Card */}
          <div className="flex flex-col items-center rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="relative mb-4 h-44 w-44 overflow-hidden rounded-full border-4 border-gold/40 p-1 shadow-md">
              <img
                src={couple.bride.image}
                alt={couple.bride.fullName}
                className="h-full w-full rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="font-display text-2xl font-bold text-text">
              {couple.bride.fullName}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {couple.bride.family}
            </p>
          </div>
        </div>

        {/* Invitation Message / Quote */}
        {invitationMessage.quote && (
          <div className="mt-12 rounded-2xl border border-gold/30 bg-bg-alt p-6 sm:p-8">
            <Heart size={24} weight="fill" className="mx-auto mb-3 text-gold" />
            <p className="font-display text-lg italic leading-relaxed text-text sm:text-xl">
              "{invitationMessage.quote}"
            </p>
            {invitationMessage.fullMessage && (
              <p className="mt-4 text-xs leading-relaxed text-muted sm:text-sm">
                {invitationMessage.fullMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
