import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CalendarDots,
  ChatCircleDots,
  MapPin,
  Images,
  Timer,
  ArrowRight,
  Sparkle,
  Eye,
  ShoppingCart,
  MagnifyingGlass,
  Heart,
} from '@phosphor-icons/react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ScrollReveal from '../../components/ui/ScrollReveal'
import FlipCard from '../../components/ui/FlipCard'

const CATEGORIES = [
  { label: 'All', slug: 'all' },
  { label: 'Wedding', slug: 'wedding' },
  { label: 'Engagement', slug: 'engagement' },
  { label: 'Birthday', slug: 'birthday' },
  { label: 'Baby Shower', slug: 'baby-shower' },
  { label: 'Housewarming', slug: 'housewarming' },
  { label: 'Pooja', slug: 'pooja' },
]

export const ALL_TEMPLATES = [
  {
    id: 'jaipur-shahi-vivah',
    name: 'Hawa Mahal Jaipur Shahi Vivah',
    category: 'wedding',
    price: '₹999',
    image:
      'https://res.cloudinary.com/ncywzxpz/image/upload/v1790335991/ChatGPT_Image_Sep_25_2026_05_01_42_PM.png',
    demoRoute: '/invitations/demo/jaipur-shahi-vivah',
    description:
      'A luxury Jaipur-inspired digital wedding invitation featuring scroll-driven Hawa Mahal zoom, royal carpet, countdown & live guest blessings.',
    tag: 'Featured',
  },
]

const FEATURES = [
  {
    icon: CalendarDots,
    title: 'Multiple Events in One',
    desc: 'Add Haldi, Mehendi, Wedding ceremony, Reception, and more. Each event gets its own date, time, and venue.',
  },
  {
    icon: ChatCircleDots,
    title: 'WhatsApp Instant Sharing',
    desc: 'Share your personalized invitation link instantly on WhatsApp with one click.',
  },
  {
    icon: MapPin,
    title: 'Venue & Google Maps',
    desc: 'Provide exact palace/hall locations with direct Google Maps navigation for guests.',
  },
  {
    icon: Images,
    title: 'Couple Photo Gallery',
    desc: 'Showcase your favourite moments and pre-wedding photo memories beautifully.',
  },
  {
    icon: Timer,
    title: 'Live Countdown Timer',
    desc: 'Build excitement with real-time countdown to the auspicious wedding moment.',
  },
  {
    icon: Heart,
    title: 'Warm Wishes & Blessings',
    desc: 'Collect and showcase heartfelt blessings from family and friends in real-time.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Pick a Template',
    desc: 'Choose from our luxury handcrafted royal invitation designs.',
  },
  {
    step: '02',
    title: 'Personalise Details',
    desc: 'Add couple profiles, ceremony dates, palace venues, and love story.',
  },
  {
    step: '03',
    title: 'Share Instantly',
    desc: 'Get a clean short link to share with all your guests on WhatsApp.',
  },
]

const FAQS = [
  {
    q: 'Which celebrations are supported?',
    a: 'Weddings, Shahi Vivah, engagements, birthdays, baby showers, housewarmings, poojas, anniversaries, and other family occasions.',
  },
  {
    q: 'Can I add multiple wedding ceremonies?',
    a: 'Yes! A complete wedding can include Mehndi, Sangeet, Haldi, Pheras, and Grand Reception in a single interactive invitation.',
  },
  {
    q: 'Can guests leave wishes and blessings?',
    a: 'Yes, guests can post their warm blessings and congratulations directly on the live invitation wall, which are saved in real-time.',
  },
  {
    q: 'Do guests need an app to view the invitation?',
    a: 'No. Everything opens instantly in any mobile or desktop web browser with smooth animations and background music.',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(-1)

  useEffect(() => {
    if (!location.hash) return
    const el = document.querySelector(location.hash)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  const filteredTemplates = ALL_TEMPLATES.filter((t) => {
    const matchesCategory =
      selectedCategory === 'all' || t.category === selectedCategory
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-bg py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Copy */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold text-primary">
                <Sparkle size={14} weight="fill" />
                <span>Next-Gen Royal Indian Invitations</span>
              </div>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-text sm:text-5xl lg:text-[3.5rem]">
                Invitations made for moments worth remembering.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                Create a luxury digital invitation, personalise every ceremony detail,
                and share your celebration with the people who matter.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => navigate('/invitations')}>
                  Explore Invitations
                  <ArrowRight size={18} weight="bold" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const el = document.getElementById('invitations-grid')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Browse Designs
                </Button>
              </div>
            </div>

            {/* Right: Invitation preview — FlipCard */}
            <div className="flex justify-center lg:justify-end">
              <FlipCard
                axis="y"
                flipOnClick
                draggable
                dragDistance={0}
                tilt
                tiltMax={12}
                glare
                glareOpacity={0.18}
                hoverScale={1.03}
                perspective={1100}
                stiffness={170}
                damping={20}
                width={300}
                height={400}
                radius={20}
                background="#1a0a10"
                color="#FFE4EC"
                shadow
                shadowColor="#3D232A"
                shadowOpacity={0.55}
                ariaLabel="Hawa Mahal Jaipur Shahi Vivah invitation — click to flip"
                front={
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src="https://res.cloudinary.com/ncywzxpz/image/upload/v1790335991/ChatGPT_Image_Sep_25_2026_05_01_42_PM.png"
                      alt="Hawa Mahal Jaipur Shahi Vivah"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Bottom title strip */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background:
                          'linear-gradient(to top, rgba(26,10,16,0.97) 0%, rgba(26,10,16,0.6) 70%, transparent 100%)',
                        padding: '20px 16px 14px',
                        textAlign: 'center',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'Cinzel, serif',
                          fontSize: 10,
                          letterSpacing: '0.25em',
                          textTransform: 'uppercase',
                          color: '#F3E5AB',
                          opacity: 0.75,
                          margin: '0 0 4px',
                        }}
                      >
                        Featured Invitation
                      </p>
                      <p
                        style={{
                          fontFamily: 'Cinzel, serif',
                          fontSize: 13,
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#D8A84E',
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        Hawa Mahal Jaipur<br />Shahi Vivah
                      </p>
                    </div>
                  </div>
                }
                back={
                  <div
                    className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
                    style={{
                      background:
                        'linear-gradient(160deg, #1a0a10 0%, #3D232A 100%)',
                      borderRadius: 20,
                    }}
                  >
                    {/* Gold divider top */}
                    <div className="flex items-center gap-2 w-full justify-center">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D8A84E]" />
                      <span className="text-[#D8A84E] text-sm">✦</span>
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D8A84E]" />
                    </div>

                    <div>
                      <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#F3E5AB]/70 mb-1">
                        Featured Invitation
                      </p>
                      <h3 className="font-cinzel text-lg font-bold leading-snug text-[#D8A84E]">
                        Hawa Mahal<br />Jaipur Shahi Vivah
                      </h3>
                    </div>

                    <p className="text-xs leading-relaxed text-[#FFE4EC]/75 max-w-[220px]">
                      A luxury Jaipur-inspired digital wedding invitation featuring
                      scroll-driven Hawa Mahal zoom, royal carpet, and cinematic animations.
                    </p>

                    {/* Gold divider */}
                    <div className="flex items-center gap-2 w-full justify-center">
                      <span className="h-px flex-1 bg-[#D8A84E]/30" />
                      <span className="text-[#D8A84E]/50 text-xs">✦</span>
                      <span className="h-px flex-1 bg-[#D8A84E]/30" />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate('/invitations/demo/jaipur-shahi-vivah')
                        }}
                        className="w-full rounded-full bg-[#D8A84E] py-2 text-[11px] font-bold uppercase tracking-widest text-[#3D232A] transition-opacity hover:opacity-90"
                      >
                        View Demo
                      </button>
                      <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate('/invitations')
                        }}
                        className="w-full rounded-full border border-[#D8A84E]/40 py-2 text-[11px] font-semibold uppercase tracking-widest text-[#D8A84E] transition-colors hover:border-[#D8A84E]/80"
                      >
                        Browse All
                      </button>
                    </div>

                    <p className="font-cinzel text-[9px] tracking-[0.2em] text-[#D8A84E]/50 uppercase">
                      #RohanWedsAnanya
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== ALL INVITATION CARDS & FILTER SECTION ========== */}
      <section id="invitations-grid" className="bg-surface py-16 lg:py-24 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
                Explore Invitations
              </h2>
            </div>
          </ScrollReveal>

          {/* Filter Bar: Categories + Search */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-bg text-muted ring-1 ring-border hover:text-text hover:border-primary/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search designs (Jaipur, Royal, etc.)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-bg py-2.5 pl-10 pr-4 text-xs font-medium text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <MagnifyingGlass
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          {/* Invitation Cards Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <ScrollReveal key={template.id}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-primary/40">
                  {/* Template Preview Image */}
                  <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-surface">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Price & Tag Badges */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-[#D8A84E] shadow-sm backdrop-blur-md border border-[#D8A84E]/40 font-cinzel">
                        {template.tag}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="rounded-full bg-surface/95 px-3 py-1 text-xs font-bold text-primary shadow-md backdrop-blur border border-primary/20">
                        {template.price}
                      </span>
                    </div>
                  </div>

                  {/* Template Details */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                        {template.category}
                      </Badge>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-text leading-snug">
                      {template.name}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted line-clamp-3">
                      {template.description}
                    </p>

                    {/* Action Buttons: View Demo & Buy */}
                    <div className="mt-auto pt-6 flex gap-3 border-t border-border/70">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-full text-xs"
                        onClick={() => window.open(template.demoRoute, '_blank')}
                      >
                        <Eye size={15} />
                        View Demo
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 rounded-full text-xs bg-primary hover:bg-primary-hover"
                        onClick={() => {
                          const phone = '917505445202'
                          const text = `Hello! I would like to purchase the *${template.name}* digital invitation.\n\nPrice: ${template.price}\nDemo: ${window.location.origin}${template.demoRoute}\n\nPlease share details to customize and finalize my order!`
                          window.open(
                            `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
                            '_blank'
                          )
                        }}
                      >
                        <ShoppingCart size={15} />
                        Buy
                      </Button>
                    </div>
                  </div>
                </div>
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
              Packed with details and interactive moments that Indian celebrations actually use
            </p>
          </ScrollReveal>

          {/* Lead feature */}
          <ScrollReveal>
            <div className="mb-6 grid gap-6 lg:grid-cols-2">
              <div className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-8 lg:p-10 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <CalendarDots size={24} weight="duotone" className="text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text">
                  Multiple Events in One Invitation
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  Indian celebrations are never just one event. Add Haldi, Mehendi,
                  Sangeet, Wedding ceremony, Reception, and more. Each event gets its
                  own date, time, dress code, and palace venue.
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-8 lg:p-10 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D8A84E]/10">
                  <ChatCircleDots size={24} weight="duotone" className="text-[#D8A84E]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text">
                  WhatsApp Instant Sharing & Delivery
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  Deliver your personalized invitation to all family members and friends
                  across the globe with one tap. Clean, elegant short links that load
                  instantly on any phone.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Supporting features - compact grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.slice(2).map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.06}>
                <div className="rounded-xl border border-border bg-surface p-5 shadow-sm hover:border-primary/30 transition-colors">
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
      <section id="how-it-works" className="bg-surface py-16 lg:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-3 text-center font-display text-3xl font-bold text-text sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mb-12 max-w-md text-center text-muted">
              Your royal invitation can be ready in minutes
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
                <div className="rounded-xl border border-border bg-surface shadow-sm">
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
      <section className="bg-surface py-16 lg:py-20 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <div className="rounded-2xl border border-[#D8A84E]/30 bg-bg px-8 py-12 sm:px-12 shadow-lg">
              <h2 className="mb-4 font-display text-3xl font-bold text-text sm:text-4xl">
                Your royal celebration deserves the perfect invitation
              </h2>
              <p className="mb-8 text-muted max-w-lg mx-auto">
                Explore our full suite of digital wedding and event themes, personalized for your special day.
              </p>
              <Button
                size="lg"
                onClick={() => {
                  const el = document.getElementById('invitations-grid')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Browse All Invitations
                <ArrowRight size={18} weight="bold" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
