import { GaneshaIcon, MandalaFlourish, JharokhaArch } from '../common/OrnamentalDivider'

export default function ClosingSection({ data }) {
  const { hosts, couple } = data

  return (
    <footer className="relative bg-[#5E142B] px-4 py-16 text-center text-[#FFF9F2] sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <GaneshaIcon color="#C89B3C" size={48} className="mb-4" />

        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-[#C89B3C]">
          || Warm Regards & Blessings ||
        </p>

        <JharokhaArch color="#C89B3C" className="my-4 opacity-70" />

        <h3 className="font-display text-3xl font-bold text-[#FFF9F2] sm:text-4xl">
          {couple.groom.name} & {couple.bride.name}
        </h3>

        <div className="my-6 space-y-1.5 text-xs text-[#FFF9F2]/80">
          <p className="font-medium text-[#C89B3C]">{hosts.brideFamily}</p>
          <p className="font-medium text-[#C89B3C]">{hosts.groomFamily}</p>
          {hosts.hostNames && (
            <p className="pt-2 text-[11px] italic text-[#FFF9F2]/60">
              {hosts.hostNames}
            </p>
          )}
        </div>

        <MandalaFlourish color="#C89B3C" className="my-6" />

        <p className="text-xs text-[#FFF9F2]/50">
          We look forward to welcoming you with joy and celebration.
        </p>

        <div className="mt-8 border-t border-[#C89B3C]/20 pt-6 text-[11px] uppercase tracking-widest text-[#C89B3C]/70">
          Crafted with love on InviteCard.online
        </div>
      </div>
    </footer>
  )
}
