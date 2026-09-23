import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  SpeakerHigh,
  SpeakerSimpleSlash,
  Heart,
  Calendar,
  MapPin,
  Sparkle,
  Clock,
  EnvelopeOpen,
  Copy,
  InstagramLogo,
  YoutubeLogo,
  CaretLeft,
  CaretRight,
  X,
  ChatTeardropDots,
  ShareNetwork,
  ShoppingCart,
} from '@phosphor-icons/react'

// Demo data strictly based on https://api.aamantran.online/demo/destination-84111?storefront=IN
const DEMO_INVITE = {
  bride_name: 'Aastha',
  groom_name: 'Adarsh',
  groom_grandfather_name: 'Sm. Radhakrishna Sharma',
  groom_grandmother_name: 'Smt. Anasuaya Devi',
  groom_father_name: 'Mr. Anil Sharma',
  groom_mother_name: 'Mrs. Pushpa',
  bride_father_name: 'Mr. Amit Shah',
  bride_mother_name: 'Mrs. Sonal',
  wedding_date: '31 January 2027',
  venue_name: 'The Taj Palace',
  venue_city: 'New Delhi',
  instagram_url: 'https://www.instagram.com/aamantran_online/',
  music_url:
    'https://media.aamantran.online/uploads/demo/56f7005a-1a75-4a3f-871e-dff5ecd99fe2/background_music-1776802676276.mp3',
  hashtag: '#AadarshkiAastha',
  hashtag_invite_text:
    'When your stories go live, tuck our day into the caption—tag your reels and candids with our wedding hashtag so every toast you raise can boomerang back to us.',
  couple_message:
    'We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply. We would like to take this opportunity to thank everyone most sincerely for their kindness. We are looking forward to seeing you at the wedding.',
  functions: [
    {
      id: 'f1',
      name: 'Engagement',
      display_date: '22 May 2026',
      time: '7:00 PM',
      venue_name: 'The Taj Palace',
      dress_code: 'Western Elegant',
      color: '#C89B3C',
    },
    {
      id: 'f2',
      name: 'Sangeet & Mehendi',
      display_date: '23 May 2026',
      time: '7:00 PM',
      venue_name: 'The Taj Palace',
      dress_code: 'Traditional Royal',
      color: '#8B1E3F',
    },
    {
      id: 'f3',
      name: 'Grand Reception',
      display_date: '24 May 2026',
      time: '7:00 PM',
      venue_name: 'The Taj Palace',
      dress_code: 'Shimmer & Black Tie',
      color: '#A8345A',
    },
  ],
  couple_photos: [
    {
      id: 'p1',
      url: 'https://media.aamantran.online/uploads/demo/56f7005a-1a75-4a3f-871e-dff5ecd99fe2/couple_photos-1775956345038.jpg',
      caption: 'The Royal Beginning',
    },
    {
      id: 'p2',
      url: 'https://media.aamantran.online/uploads/demo/56f7005a-1a75-4a3f-871e-dff5ecd99fe2/couple_photos-1775956350319.jpg',
      caption: 'Moments of Grace',
    },
    {
      id: 'p3',
      url: 'https://media.aamantran.online/uploads/demo/56f7005a-1a75-4a3f-871e-dff5ecd99fe2/couple_photos-1775956354067.jpg',
      caption: 'Laughter & Love',
    },
    {
      id: 'p4',
      url: 'https://media.aamantran.online/uploads/demo/56f7005a-1a75-4a3f-871e-dff5ecd99fe2/couple_photos-1775956358101.jpg',
      caption: 'Forever Entwined',
    },
  ],
}

function GaneshaIcon({ className = 'h-12 w-12' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 5 C55 20 60 25 70 30 C75 32 80 30 80 25 C80 20 70 20 65 25 C60 30 55 40 55 50 C55 60 65 65 70 70 C75 75 75 85 65 85 C55 85 48 75 50 60 C52 50 48 45 45 45 C42 45 40 50 40 55 C40 65 45 70 45 75 C45 85 35 90 25 80 C20 75 25 65 30 65 C35 65 35 70 30 75 C30 78 35 80 40 75 C42 70 38 60 35 50 C32 40 35 30 42 20 C46 15 48 10 50 5 Z" />
    </svg>
  )
}

function MandalaDivider({ className = 'my-8' }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`}>
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/60" />
      <svg className="h-5 w-5 animate-pulse text-gold" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  )
}

function JharokhaFrame({ children }) {
  return (
    <div className="relative mx-auto rounded-[3rem] border-2 border-gold/40 bg-surface/90 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
      <div className="absolute -top-3 -left-3 h-8 w-8 rounded-tl-xl border-t-2 border-l-2 border-gold" />
      <div className="absolute -top-3 -right-3 h-8 w-8 rounded-tr-xl border-t-2 border-r-2 border-gold" />
      <div className="absolute -bottom-3 -left-3 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-gold" />
      <div className="absolute -bottom-3 -right-3 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-gold" />
      {children}
    </div>
  )
}

export default function Template1() {
  const [isCoverOpen, setIsCoverOpen] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [toastMessage, setToastMessage] = useState('')
  const [showVideoModal, setShowVideoModal] = useState(false)

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Guestbook Wishes state
  const [wishes, setWishes] = useState([
    { id: 1, name: 'Vikram & Radhika Sharma', wish: 'Wishing Adarsh and Aastha a lifetime of joy, laughter, and endless love!', date: 'Today' },
    { id: 2, name: 'Ananya Kapur', wish: 'Can’t wait to celebrate the Sangeet night! So happy for you both.', date: 'Yesterday' },
  ])
  const [newWishName, setNewWishName] = useState('')
  const [newWishText, setNewWishText] = useState('')

  const audioRef = useRef(null)

  // Countdown effect to 31 Jan 2027
  useEffect(() => {
    const targetDate = new Date('2027-01-31T10:00:00')
    const interval = setInterval(() => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / 1000 / 60) % 60)
        const seconds = Math.floor((diff / 1000) % 60)
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function triggerToast(msg) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  function handleOpenEnvelope() {
    setIsCoverOpen(true)
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false))
    }
  }

  function toggleAudio() {
    if (!audioRef.current) return
    if (isMusicPlaying) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false))
    }
  }

  function handleAddWish(e) {
    e.preventDefault()
    if (!newWishName.trim() || !newWishText.trim()) return
    const wishObj = {
      id: Date.now(),
      name: newWishName.trim(),
      wish: newWishText.trim(),
      date: 'Just now',
    }
    setWishes([wishObj, ...wishes])
    setNewWishName('')
    setNewWishText('')
    triggerToast('Your blessing has been posted to the Guestbook!')
  }

  function copyHashtag() {
    navigator.clipboard.writeText(DEMO_INVITE.hashtag)
    triggerToast(`Copied ${DEMO_INVITE.hashtag} to clipboard!`)
  }

  return (
    <div className="relative min-h-screen bg-bg text-text font-body selection:bg-gold/30">
      {/* Background Audio Element */}
      <audio ref={audioRef} loop src={DEMO_INVITE.music_url} preload="auto" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-full border border-gold/40 bg-primary px-6 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur-md"
          >
            <Sparkle size={18} className="text-gold animate-spin" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Equalizer Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleAudio}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 rounded-full border border-gold/40 bg-surface/90 px-4 py-2.5 text-xs font-bold text-primary shadow-xl backdrop-blur-md transition-all hover:bg-primary hover:text-white"
        title={isMusicPlaying ? 'Mute Music' : 'Play Background Music'}
      >
        {isMusicPlaying ? (
          <>
            <SpeakerHigh size={18} className="text-gold animate-bounce" />
            <span className="hidden sm:inline">Playing Shehnai Tune</span>
            <div className="flex items-center gap-0.5">
              <span className="h-3 w-0.5 bg-gold animate-pulse" />
              <span className="h-4 w-0.5 bg-gold animate-pulse delay-75" />
              <span className="h-2 w-0.5 bg-gold animate-pulse delay-150" />
            </div>
          </>
        ) : (
          <>
            <SpeakerSimpleSlash size={18} className="text-muted" />
            <span className="hidden sm:inline">Play Music</span>
          </>
        )}
      </motion.button>

      {/* ========================================================================= */}
      {/* 1. OPENING COVER ENVELOPE OVERLAY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {!isCoverOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#5E142B] px-4 py-8 text-center text-white"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative max-w-md w-full rounded-3xl border-2 border-gold/50 bg-[#8B1E3F]/80 p-8 sm:p-12 shadow-2xl backdrop-blur-xl border-dashed"
            >
              <div className="mb-4 text-gold flex justify-center">
                <GaneshaIcon className="h-16 w-16 text-gold drop-shadow-md" />
              </div>
              <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-light">
                ॥ श्री गणेशाय नमः ॥
              </p>

              <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {DEMO_INVITE.groom_name}
                <span className="block text-2xl font-serif text-gold-light my-1">&amp;</span>
                {DEMO_INVITE.bride_name}
              </h1>

              <p className="mt-4 font-serif text-base italic text-gold/90">
                Together with their families request the pleasure of your company
              </p>

              <div className="my-8 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.06, shadow: '0 0 25px rgba(200,155,60,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="group relative flex items-center gap-3 rounded-full border-2 border-gold bg-gradient-to-r from-gold to-gold-dark px-8 py-4 text-sm font-bold tracking-wider text-white shadow-xl transition-all"
                >
                  <EnvelopeOpen size={20} className="text-white transition-transform group-hover:scale-110" />
                  <span>OPEN INVITATION</span>
                </motion.button>
              </div>

              <p className="text-[11px] uppercase tracking-widest text-gold/70">
                Tap to open &amp; play royal melody
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. MAIN FULL PAGE INVITATION LAYOUT (NO WEBSITE HEADER/FOOTER) */}
      {/* ========================================================================= */}
      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section className="relative text-center py-12 sm:py-16">
          <JharokhaFrame>
            <div className="mx-auto mb-4 flex justify-center text-primary">
              <GaneshaIcon className="h-14 w-14 text-gold" />
            </div>

            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-dark">
              ॥ श्री गणेशाय नमः ॥
            </p>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-muted">
              WITH THE BLESSINGS OF OUR ANCESTORS &amp; FAMILIES
            </p>

            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold tracking-tight text-primary">
              {DEMO_INVITE.groom_name}
              <span className="mx-3 text-3xl sm:text-4xl font-serif text-gold font-normal italic">
                &amp;
              </span>
              {DEMO_INVITE.bride_name}
            </h1>

            <p className="mt-4 font-serif text-lg italic text-text-secondary">
              Invite you to celebrate their wedding union
            </p>

            <MandalaDivider />

            {/* Date & Venue Badge */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-gold/40 bg-bg-alt px-6 py-4 shadow-inner">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <Calendar size={22} className="text-gold" />
                <span>{DEMO_INVITE.wedding_date}</span>
              </div>
              <span className="hidden sm:inline text-gold">|</span>
              <div className="flex items-center gap-2 text-text font-semibold text-sm">
                <MapPin size={20} className="text-primary" />
                <span>{DEMO_INVITE.venue_name}, {DEMO_INVITE.venue_city}</span>
              </div>
            </div>
          </JharokhaFrame>
        </section>

        {/* HOST FAMILY BLESSINGS SECTION */}
        <section className="my-12 rounded-3xl border border-border bg-surface p-8 sm:p-12 text-center shadow-lg">
          <h2 className="font-display text-3xl font-bold text-text">Host Families</h2>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted">
            Soliciting your presence &amp; blessings
          </p>

          <MandalaDivider className="my-6" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Grandparents */}
            <div className="rounded-2xl border border-border-light bg-bg-alt p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                Paternal Grandparents
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-primary">
                {DEMO_INVITE.groom_grandmother_name}
              </h3>
              <p className="text-sm text-muted">&amp; {DEMO_INVITE.groom_grandfather_name}</p>
            </div>

            {/* Groom's Parents */}
            <div className="rounded-2xl border border-border-light bg-bg-alt p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                Groom's Parents
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-primary">
                {DEMO_INVITE.groom_mother_name}
              </h3>
              <p className="text-sm text-muted">&amp; {DEMO_INVITE.groom_father_name}</p>
            </div>

            {/* Bride's Parents */}
            <div className="rounded-2xl border border-border-light bg-bg-alt p-6 sm:col-span-2 lg:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                Bride's Parents
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-primary">
                {DEMO_INVITE.bride_mother_name}
              </h3>
              <p className="text-sm text-muted">&amp; {DEMO_INVITE.bride_father_name}</p>
            </div>
          </div>
        </section>

        {/* COUPLE MESSAGE SECTION */}
        <section className="my-12 text-center">
          <div className="rounded-3xl border-2 border-gold/30 bg-gradient-to-b from-surface via-bg-alt to-surface p-8 sm:p-12 shadow-xl">
            <Heart size={32} weight="duotone" className="mx-auto text-primary mb-4" />
            <h2 className="font-display text-3xl font-bold text-text">A Message From Us</h2>
            <p className="mx-auto mt-4 max-w-2xl font-serif text-lg leading-relaxed text-text-secondary italic">
              "{DEMO_INVITE.couple_message}"
            </p>
            <p className="mt-6 font-display text-xl font-bold text-primary">
              — {DEMO_INVITE.groom_name} &amp; {DEMO_INVITE.bride_name}
            </p>
          </div>
        </section>

        {/* CEREMONIES / FUNCTIONS ITINERARY SECTION */}
        <section className="my-16">
          <div className="text-center mb-10">
            <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Wedlock Celebrations
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-text sm:text-5xl">
              Ceremony Functions
            </h2>
            <p className="mt-2 text-muted max-w-md mx-auto">
              Join us for each auspicious ceremony as we embark on this sacred journey together.
            </p>
          </div>

          <div className="space-y-6">
            {DEMO_INVITE.functions.map((fn, index) => (
              <motion.div
                key={fn.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-lg transition-all hover:border-gold/50 hover:shadow-2xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: fn.color }}
                    >
                      {fn.name}
                    </span>
                    <h3 className="font-display text-3xl font-bold text-text">
                      {fn.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                      <div className="flex items-center gap-1.5 font-semibold text-primary">
                        <Calendar size={18} className="text-gold" />
                        <span>{fn.display_date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Clock size={18} className="text-gold" />
                        <span>{fn.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2 border-t sm:border-t-0 border-border-light pt-4 sm:pt-0">
                    <div className="flex items-center gap-1.5 font-bold text-text">
                      <MapPin size={18} className="text-primary" />
                      <span>{fn.venue_name}</span>
                    </div>
                    <p className="text-xs font-medium text-muted">
                      Dress Code: <span className="font-semibold text-text">{fn.dress_code}</span>
                    </p>
                    <button
                      onClick={() => triggerToast(`Added ${fn.name} to calendar`)}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      <Calendar size={14} />
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* COUNTDOWN TIMER SECTION */}
        <section className="my-16 text-center">
          <div className="rounded-3xl border border-gold/40 bg-gradient-to-r from-primary-dark via-primary to-primary-dark px-6 py-12 text-white shadow-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Countdown to the Big Day
            </h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-gold-light">
              31 January 2027 &middot; The Taj Palace
            </p>

            <MandalaDivider className="my-6" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl mx-auto">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Minutes', val: timeLeft.minutes },
                { label: 'Seconds', val: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-md"
                >
                  <span className="font-display text-4xl sm:text-5xl font-bold text-gold-light">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest opacity-80">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COUPLE PHOTO GALLERY SECTION */}
        <section className="my-16">
          <div className="text-center mb-10">
            <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Captured Moments
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-text sm:text-5xl">
              Couple Gallery
            </h2>
            <p className="mt-2 text-muted">Tap any portrait to enlarge in full-screen gallery</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {DEMO_INVITE.couple_photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface aspect-[3/4] shadow-md"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-4">
                  <p className="text-xs font-bold text-white">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {lightboxIndex >= 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
              >
                <button
                  onClick={() => setLightboxIndex(-1)}
                  className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
                >
                  <X size={24} weight="bold" />
                </button>

                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev > 0 ? prev - 1 : DEMO_INVITE.couple_photos.length - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
                >
                  <CaretLeft size={28} weight="bold" />
                </button>

                <div className="max-h-[85vh] max-w-3xl text-center">
                  <img
                    src={DEMO_INVITE.couple_photos[lightboxIndex].url}
                    alt="Gallery modal"
                    className="max-h-[75vh] w-auto mx-auto rounded-2xl shadow-2xl object-contain"
                  />
                  <p className="mt-4 font-display text-xl font-bold text-white">
                    {DEMO_INVITE.couple_photos[lightboxIndex].caption}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev < DEMO_INVITE.couple_photos.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
                >
                  <CaretRight size={28} weight="bold" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* PRE-WEDDING FILM TEASER SECTION */}
        <section className="my-16 rounded-3xl border border-border bg-surface p-8 sm:p-12 text-center shadow-xl">
          <YoutubeLogo size={40} className="mx-auto text-red-600 mb-3 animate-pulse" />
          <h2 className="font-display text-3xl font-bold text-text">Pre-Wedding Film Teaser</h2>
          <p className="mt-2 text-sm text-muted max-w-lg mx-auto">
            Watch our journey unfolded into film reels before we say our vows.
          </p>

          <div className="mt-8 relative max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl bg-black">
            {!showVideoModal ? (
              <div
                className="relative h-full w-full cursor-pointer group"
                onClick={() => setShowVideoModal(true)}
              >
                <img
                  src={DEMO_INVITE.couple_photos[0].url}
                  alt="Video thumbnail"
                  className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-transform group-hover:scale-110">
                    <YoutubeLogo size={32} weight="fill" />
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/MoAtfIepQmc?autoplay=1"
                title="Pre-wedding film"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </section>

        {/* HASHTAG & INSTAGRAM SECTION */}
        <section className="my-16 text-center">
          <div className="rounded-3xl border border-gold/40 bg-bg-alt p-8 sm:p-12 shadow-lg">
            <InstagramLogo size={36} className="mx-auto text-primary mb-3" />
            <h2 className="font-display text-3xl font-bold text-text">Social &amp; Hashtag</h2>

            <div className="my-6 inline-flex items-center gap-3 rounded-full border border-gold bg-surface px-6 py-3 shadow-md">
              <span className="font-display text-2xl font-bold text-primary">
                {DEMO_INVITE.hashtag}
              </span>
              <button
                onClick={copyHashtag}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold-dark hover:bg-gold hover:text-white"
                title="Copy Hashtag"
              >
                <Copy size={16} />
              </button>
            </div>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
              {DEMO_INVITE.hashtag_invite_text}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={DEMO_INVITE.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-white shadow-md transition-transform hover:scale-105"
              >
                <InstagramLogo size={18} />
                Follow Instagram Feed
              </a>
            </div>
          </div>
        </section>

        {/* WISHES & GUESTBOOK WALL SECTION */}
        <section className="my-16">
          <div className="text-center mb-10">
            <ChatTeardropDots size={36} className="mx-auto text-gold mb-2" />
            <h2 className="font-display text-4xl font-bold text-text">Guestbook &amp; Blessings</h2>
            <p className="mt-2 text-sm text-muted">Leave your warm blessings for the couple</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Post Wish Form */}
            <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-md">
              <h3 className="font-display text-2xl font-bold text-text mb-4">Post Your Blessing</h3>
              <form onSubmit={handleAddWish} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name(s)"
                  value={newWishName}
                  onChange={(e) => setNewWishName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="May your journey together be filled with boundless joy..."
                  value={newWishText}
                  onChange={(e) => setNewWishText(e.target.value)}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-gold py-3 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.01]"
                >
                  Post Blessing
                </button>
              </form>
            </div>

            {/* Wishes Feed */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="rounded-2xl border border-border-light bg-surface p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-border-light pb-2 mb-2">
                    <span className="font-display text-lg font-bold text-primary">{w.name}</span>
                    <span className="text-[10px] text-muted">{w.date}</span>
                  </div>
                  <p className="text-sm italic text-text-secondary leading-relaxed font-serif">
                    "{w.wish}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VENUE & MAP DIRECTIONS SECTION */}
        <section className="my-16 text-center">
          <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 shadow-xl">
            <MapPin size={36} className="mx-auto text-primary mb-3" />
            <h2 className="font-display text-3xl font-bold text-text">Venue &amp; Location</h2>
            <p className="mt-2 text-xl font-bold text-primary">{DEMO_INVITE.venue_name}</p>
            <p className="text-sm text-muted">{DEMO_INVITE.venue_city}</p>

            <MandalaDivider className="my-6" />

            <div className="flex justify-center gap-4">
              <a
                href="https://maps.google.com/?q=The+Taj+Palace+New+Delhi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-white shadow-md transition-transform hover:scale-105"
              >
                <MapPin size={18} />
                Open Directions in Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* INVITATION FOOTER */}
        <footer className="my-16 border-t border-border pt-8 text-center text-xs text-muted">
          <p className="font-display text-xl font-bold text-primary">
            {DEMO_INVITE.groom_name} &amp; {DEMO_INVITE.bride_name}
          </p>
          <p className="mt-1">31 January 2027 &middot; The Taj Palace</p>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-muted">
            Crafted with love by InviteCard.online
          </p>
        </footer>
      </div>

      {/* Floating Buy Template WhatsApp Action Pill */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          const phone = '917505445202'
          const text = `Hello! I am viewing Template 1: Royal Marigold Wedding (${DEMO_INVITE.groom_name} & ${DEMO_INVITE.bride_name}) and would like to buy this template.

📌 *Template Name*: Royal Marigold Wedding (Template 1)
💰 *Price*: ₹1,499
🔗 *Demo Link*: ${window.location.href}

Please share ordering and customization details!`
          window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-gold/40 bg-gold px-5 py-3 text-xs font-bold text-white shadow-2xl transition-all hover:bg-gold-dark"
      >
        <ShoppingCart size={18} />
        <span>Buy This Template</span>
      </motion.button>
    </div>
  )
}
