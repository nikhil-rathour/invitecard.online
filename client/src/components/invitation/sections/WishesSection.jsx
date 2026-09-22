import { useState, useEffect } from 'react'
import { ChatTeardropText, PaperPlaneRight, Heart } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'
import { wishesService } from '../../../services/wishesService'

export default function WishesSection({ data }) {
  const { wishes, theme, slug } = data
  const [list, setList] = useState(wishes?.initialWishes || [])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  useEffect(() => {
    async function loadWishes() {
      const res = await wishesService.getWishes(slug || 'royal-wedding')
      if (res && res.data && res.data.length > 0) {
        setList(res.data)
      }
    }
    loadWishes()
  }, [slug])

  async function handlePostWish(e) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setSubmitting(true)
    try {
      const payload = { name: name.trim(), message: message.trim() }
      const result = await wishesService.submitWish(slug || 'royal-wedding', payload)
      
      const newWish = result.data || {
        id: `wish_${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      }

      setList([newWish, ...list])
      setName('')
      setMessage('')
    } catch (err) {
      // Fallback local add
      const fallbackWish = {
        id: `wish_${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      }
      setList([fallbackWish, ...list])
      setName('')
      setMessage('')
    } finally {
      setSubmitting(false)
    }
  }

  if (!wishes || wishes.enabled === false) return null

  return (
    <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <ChatTeardropText size={32} weight="duotone" className="mx-auto mb-2 text-gold" />
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
            Guestbook
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
            Blessings & Good Wishes
          </h2>
          <MandalaFlourish color={colors.gold} className="my-4" />
        </div>

        {/* Wish Post Form */}
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-gold/30 bg-surface p-6 shadow-sm">
          <form onSubmit={handlePostWish} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-text">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh & Gayatri"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-text">
                Your Blessing or Message
              </label>
              <textarea
                rows={3}
                placeholder="Write your wishes for the couple..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              disabled={submitting || !name.trim() || !message.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow transition-all hover:bg-primary-dark disabled:opacity-50"
            >
              {submitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <PaperPlaneRight size={16} weight="bold" />
                  Send Blessing
                </>
              )}
            </button>
          </form>
        </div>

        {/* Wishes List */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {list.map((w) => (
            <div
              key={w.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <p className="text-sm italic leading-relaxed text-text">
                "{w.message}"
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border-light pt-3">
                <span className="font-display text-sm font-bold text-primary">
                  {w.name}
                </span>
                <Heart size={14} weight="fill" className="text-gold" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
