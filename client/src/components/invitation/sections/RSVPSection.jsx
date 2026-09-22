import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, PaperPlaneRight, EnvelopeSimple } from '@phosphor-icons/react'
import { MandalaFlourish } from '../common/OrnamentalDivider'
import { rsvpService } from '../../../services/rsvpService'

const rsvpSchema = z.object({
  guestName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  response: z.enum(['attending', 'declined']),
  guestCount: z.coerce.number().min(1, 'Minimum 1 guest').max(10, 'Maximum 10 guests'),
  mealPreference: z.string().optional(),
  message: z.string().optional(),
})

export default function RSVPSection({ data }) {
  const { rsvp, events = [], theme, slug } = data
  const [submitted, setSubmitted] = useState(false)
  const [selectedEvents, setSelectedEvents] = useState(events.map((e) => e.title))
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const colors = {
    primary: theme.primaryColor || '#8B1E3F',
    gold: theme.goldColor || '#C89B3C',
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      response: 'attending',
      guestCount: 1,
    },
  })

  const responseVal = watch('response')

  function toggleEvent(title) {
    if (selectedEvents.includes(title)) {
      setSelectedEvents(selectedEvents.filter((t) => t !== title))
    } else {
      setSelectedEvents([...selectedEvents, title])
    }
  }

  async function onSubmit(formData) {
    setSubmitting(true)
    setErrorMessage('')
    try {
      const payload = {
        ...formData,
        eventResponses: selectedEvents,
      }
      await rsvpService.submitRsvp(slug || 'royal-wedding', payload)
      setSubmitted(true)
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit RSVP. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!rsvp || rsvp.enabled === false) return null

  return (
    <section id="rsvp" className="bg-surface py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <EnvelopeSimple size={32} weight="duotone" className="mx-auto mb-2 text-gold" />
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: colors.gold }}>
            R.S.V.P.
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
            Confirm Your Presence
          </h2>
          <MandalaFlourish color={colors.gold} className="my-4" />
          <p className="text-xs leading-relaxed text-muted">
            Kindly respond by 15th January 2027 to help us welcome you with royal warmth.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border-2 border-gold/30 bg-bg p-6 sm:p-10 shadow-md">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckCircle size={36} weight="fill" />
              </div>
              <h3 className="font-display text-3xl font-bold text-primary">
                Thank You!
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Your RSVP response has been received. We look forward to celebrating with you!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary underline"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {errorMessage && (
                <div className="rounded-xl bg-error/10 p-4 text-xs font-medium text-error">
                  {errorMessage}
                </div>
              )}

              {/* Attendance Selection Toggle */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-text">
                  Will You Be Attending?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3.5 text-xs font-bold transition-all ${
                      responseVal === 'attending'
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-border bg-surface text-muted hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      value="attending"
                      className="sr-only"
                      {...register('response')}
                    />
                    Joyfully Accepts
                  </label>
                  <label
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3.5 text-xs font-bold transition-all ${
                      responseVal === 'declined'
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-border bg-surface text-muted hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      value="declined"
                      className="sr-only"
                      {...register('response')}
                    />
                    Regretfully Declines
                  </label>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikramaditya Kapur"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  {...register('guestName')}
                />
                {errors.guestName && (
                  <p className="mt-1 text-xs text-error">{errors.guestName.message}</p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="guest@example.com"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-error">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {responseVal === 'attending' && (
                <>
                  {/* Guest Count */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-text">
                      Number of Guests Attending
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      {...register('guestCount')}
                    />
                    {errors.guestCount && (
                      <p className="mt-1 text-xs text-error">{errors.guestCount.message}</p>
                    )}
                  </div>

                  {/* Ceremonies Attending */}
                  {events.length > 0 && (
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-text">
                        Which Events Will You Attend?
                      </label>
                      <div className="space-y-2">
                        {events.map((evt) => (
                          <label
                            key={evt.title}
                            className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 text-xs font-medium text-text cursor-pointer hover:border-gold/40"
                          >
                            <input
                              type="checkbox"
                              checked={selectedEvents.includes(evt.title)}
                              onChange={() => toggleEvent(evt.title)}
                              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <span>{evt.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dietary Preferences */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-text">
                      Dietary Preferences / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jain Vegetarian, Pure Veg"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      {...register('mealPreference')}
                    />
                  </div>
                </>
              )}

              {/* Personal Message */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text">
                  Message for the Couple (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Leave a sweet note or blessings..."
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  {...register('message')}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:bg-primary-dark disabled:opacity-50"
              >
                {submitting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <PaperPlaneRight size={18} weight="bold" />
                    Submit R.S.V.P.
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
