import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CalendarDots, ChatCircleDots, MapPin, Images, Timer, EnvelopeSimple, ArrowRight, Sparkle } from '@phosphor-icons/react'
import Button from '../../components/ui/Button'
import ScrollReveal from '../../components/ui/ScrollReveal'
import InvitationRenderer from '../../components/invitation/InvitationRenderer'

const CATEGORIES = [
  { label: 'Wedding', slug: 'wedding' },
  { label: 'Engagement', slug: 'engagement' },
  { label: 'Birthday', slug: 'birthday' },
  { label: 'Baby Shower', slug: 'baby-shower' },
  { label: 'Housewarming', slug: 'housewarming' },
  { label: 'Pooja', slug: 'pooja' },
  { label: 'Anniversary', slug: 'anniversary' },
  { label: 'Other', slug: 'other' },
]

const FEATURES = [
  { icon: CalendarDots, title: 'Multiple Events', desc: 'Add Haldi, Mehendi, Wedding and Reception in one invitation.' },
  { icon: EnvelopeSimple, title: 'RSVP Collection', desc: 'Know who is attending before the big day.' },
  { icon: ChatCircleDots, title: 'WhatsApp Sharing', desc: 'Share your invitation link instantly with guests.' },
  { icon: MapPin, title: 'Venue and Maps', desc: 'Add venue details with a Google Maps link.' },
  { icon: Images, title: 'Photo Gallery', desc: 'Showcase your favourite moments in the invitation.' },
  { icon: Timer, title: 'Countdown Timer', desc: 'Build excitement with a live countdown to the day.' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Enter Details', desc: 'Fill in your ceremony times, venues, and family names.' },
  { step: '02', title: 'Personalise Style', desc: 'Customize colors, text messages, and celebration details.' },
  { step: '03', title: 'Share Instantly', desc: 'Save your draft or share with guests when ready.' },
]

const FAQS = [
  { q: 'Which celebrations are supported?', a: 'Wedding, engagement, birthday, baby shower, housewarming, pooja, anniversary and other family occasions.' },
  { q: 'Can I add more than one event?', a: 'Yes. A wedding week can include Haldi, Mehendi, the ceremony and reception in a single invitation.' },
  { q: 'Which languages are available?', a: 'English, Hindi and Gujarati in this release. More languages can be added later.' },
  { q: 'Do I need to download an app?', a: 'No. Everything works in the browser on any device. Your guests just need a link.' },
]

const HERO_PREVIEW = {
  names: { primary: 'Aarav & Kavya', secondary: 'With the blessings of our families' },
  basicInfo: { shortMessage: 'Join us as we begin this new chapter together.' },
  events: [
    { title: 'Wedding Ceremony', date: '2026-02-14', startTime: '10:00', venueName: 'The Marigold Courtyard' },
    { title: 'Reception', date: '2026-02-14', startTime: '19:00', venueName: 'Sea Breeze Banquet' },
  ],
  hosts: { brideFamily: 'Sharma Family', groomFamily: 'Mehta Family' },
  theme: { layout: 'classic', primaryColor: '#8B1E3F', goldColor: '#C89B3C', background: '#FFF9F2' },
}

export default function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [openFaq, setOpenFaq] = useState(-1)

  useEffect(() => {
    if (!location.hash) return
    const el = document.querySelector(location.hash)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-bg py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Copy */}
            <div>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-text sm:text-5xl lg:text-[3.5rem]">
                Invitations made for moments worth remembering.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                Create a beautiful digital invitation, personalise every detail,
                and share your celebration with the people who matter.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => navigate('/create-invitation')}>
                  Create Your Invitation
                  <ArrowRight size={18} weight="bold" />
                </Button>
              </div>
            </div>

            {/* Right: Invitation preview */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px]">
                <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
                  <div className="max-h-[500px] overflow-hidden">
                    <InvitationRenderer data={HERO_PREVIEW} />
                  </div>
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-2xl bg-primary/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section id="categories" className="bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-3 font-display text-3xl font-bold text-text sm:text-4xl">
              Every celebration deserves a beautiful invitation
            </h2>
            <p className="mb-10 max-w-xl text-muted">
              Choose a category to start customizing your invitation
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((cat, i) => (
              <ScrollReveal key={cat.slug} delay={i * 0.05}>
                <button
                  onClick={() => navigate('/create-invitation')}
                  className="group flex w-full items-center gap-3 rounded-xl border border-border bg-bg px-5 py-4 text-left transition-all hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98]"
                >
                  <Sparkle
                    size={20}
                    weight="duotone"
                    className="shrink-0 text-gold transition-colors group-hover:text-primary"
                  />
                  <span className="text-sm font-medium text-text">
                    {cat.label}
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="bg-bg py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-3 font-display text-3xl font-bold text-text sm:text-4xl">
              Everything your invitation needs
            </h2>
            <p className="mb-10 max-w-xl text-muted">
              Packed with details that Indian celebrations actually use
            </p>
          </ScrollReveal>

          {/* Lead feature - larger */}
          <ScrollReveal>
            <div className="mb-6 grid gap-6 lg:grid-cols-2">
              <div className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-8 lg:p-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <CalendarDots size={24} weight="duotone" className="text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text">
                  Multiple Events in One Invitation
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  Indian celebrations are never just one event. Add Haldi,
                  Mehendi, Wedding ceremony, Reception, and more. Each event
                  gets its own date, time, and venue.
                </p>
              </div>
              <div className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-8 lg:p-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <EnvelopeSimple size={24} weight="duotone" className="text-gold" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text">
                  RSVP Collection
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  Know who is coming before the big day. Guests can confirm
                  attendance, choose events they will attend, and leave a
                  message.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Supporting features - compact grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.slice(2).map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.06}>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <f.icon
                    size={22}
                    weight="duotone"
                    className="mb-3 text-primary"
                  />
                  <h3 className="mb-1 text-sm font-semibold text-text">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-3 text-center font-display text-3xl font-bold text-text sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mb-12 max-w-md text-center text-muted">
              Your invitation can be ready in minutes
            </p>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1}>
                <div className="relative pl-14">
                  <span className="absolute left-0 top-0 font-display text-4xl font-bold text-primary/15">
                    {item.step}
                  </span>
                  <h3 className="mb-2 font-semibold text-text">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="bg-bg py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="mb-8 text-center font-display text-3xl font-bold text-text sm:text-4xl">
              Frequently asked questions
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {FAQS.map((item, index) => (
              <ScrollReveal key={item.q} delay={index * 0.05}>
                <div className="rounded-xl border border-border bg-surface">
                  <button
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                    aria-expanded={openFaq === index}
                  >
                    <span className="pr-4 text-sm font-semibold text-text">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 text-muted transition-transform duration-200 ${
                        openFaq === index ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index
                        ? 'max-h-40 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-bg px-8 py-12 sm:px-12">
              <h2 className="mb-4 font-display text-3xl font-bold text-text sm:text-4xl">
                Your invitation can be ready in minutes
              </h2>
              <p className="mb-8 text-muted">
                Fill in your details and create a beautiful digital invitation.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/create-invitation')}
              >
                Create Invitation Now
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
