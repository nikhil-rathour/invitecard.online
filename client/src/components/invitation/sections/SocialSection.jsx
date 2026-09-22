import { InstagramLogo, ShareNetwork } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'

export default function SocialSection({ data }) {
  const { social, theme } = data

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  if (!social || (!social.hashtag && !social.instagramUsername)) return null

  const hashtagText = social.hashtag || '#AaravWedsAnanya'
  const cleanHashtag = hashtagText.replace('#', '')
  const instagramUrl = `https://www.instagram.com/explore/tags/${cleanHashtag}/`

  return (
    <section className="bg-surface py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <InstagramLogo size={32} weight="duotone" />
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
          Social Celebrations
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
          Let's Make It Insta Official
        </h2>

        <MandalaFlourish color={colors.gold} className="my-4" />

        <div className="my-6 rounded-2xl border-2 border-dashed border-gold/40 bg-bg p-8 shadow-sm">
          <p className="font-display text-3xl font-bold text-primary sm:text-4xl tracking-wide">
            {hashtagText}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {social.subtitle || 'Share your photos, stories, and blessings with our wedding hashtag!'}
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark active:scale-[0.98]"
            >
              <ShareNetwork size={18} weight="bold" />
              View / Tag on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
