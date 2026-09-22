import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, ArrowRight, Plus, Trash, Eye, FloppyDisk, CheckCircle } from '@phosphor-icons/react'
import { useCreateInvitation } from '../../features/invitations/useInvitations'
import { invitationService } from '../../services/invitationService'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Textarea from '../../components/ui/Textarea'
import InvitationRenderer from '../../components/invitation/InvitationRenderer'
import Toast from '../../components/ui/Toast'
import { LANGUAGES } from '../../constants/categories'

const STEPS = ['Details', 'Events', 'Hosts', 'Message', 'Preview']

const basicSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  primaryName: z.string().min(2, 'Name is required'),
  secondaryName: z.string().optional(),
  shortMessage: z.string().optional(),
  language: z.enum(['English', 'Hindi', 'Gujarati']),
})

const eventSchema = z.object({
  title: z.string().min(1, 'Event name is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  venueName: z.string().optional(),
  address: z.string().optional(),
  mapsUrl: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\//i.test(value),
      'Enter a valid URL'
    ),
  description: z.string().optional(),
})

const eventsSchema = z.object({
  events: z.array(eventSchema).min(1, 'Add at least one event'),
})

const hostsSchema = z.object({
  brideFamily: z.string().optional(),
  groomFamily: z.string().optional(),
  hostNames: z.string().optional(),
})

const storySchema = z.object({
  coupleStory: z.string().optional(),
  familyMessage: z.string().optional(),
  message: z.string().optional(),
})

const LANGUAGE_OPTIONS = LANGUAGES.map((value) => ({ value, label: value }))
const emptyEvent = {
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  venueName: '',
  address: '',
  mapsUrl: '',
  description: '',
}

export default function CreateInvitationPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [savedId, setSavedId] = useState(null)
  const [toast, setToast] = useState('')
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  const { mutateAsync: createInvitation, isPending: creating } =
    useCreateInvitation()

  const basicForm = useForm({
    resolver: zodResolver(basicSchema),
    defaultValues: { language: 'English' },
  })
  const eventsForm = useForm({
    resolver: zodResolver(eventsSchema),
    defaultValues: { events: [{ ...emptyEvent }] },
  })
  const { fields, append, remove } = useFieldArray({
    control: eventsForm.control,
    name: 'events',
  })
  const hostsForm = useForm({ resolver: zodResolver(hostsSchema) })
  const storyForm = useForm({ resolver: zodResolver(storySchema) })

  const previewData = {
    names: {
      primary: formData.primaryName,
      secondary: formData.secondaryName,
    },
    basicInfo: { title: formData.title, shortMessage: formData.shortMessage },
    events: formData.events || [],
    hosts: formData.hosts || {},
    story: formData.story || {},
    theme: { primaryColor: '#8B1E3F', goldColor: '#C89B3C', background: '#FFF9F2' },
  }

  async function handleSaveDraft() {
    const payload = {
      title: formData.title,
      language: formData.language,
      basicInfo: {
        primaryName: formData.primaryName,
        secondaryName: formData.secondaryName,
        shortMessage: formData.shortMessage,
      },
      hosts: formData.hosts,
      story: formData.story,
      events: formData.events,
      status: 'draft',
    }
    try {
      let result
      if (savedId) {
        result = await invitationService.update(savedId, payload)
      } else {
        result = await createInvitation(payload)
        setSavedId(result.data?._id)
      }
      setToast('Draft saved')
      setTimeout(() => navigate('/dashboard'), 700)
      return result
    } catch (e) {
      setToast(e.message)
    }
  }

  function nextStep(data) {
    if (step === 0) setFormData((p) => ({ ...p, ...data }))
    if (step === 1) setFormData((p) => ({ ...p, events: data.events }))
    if (step === 2) setFormData((p) => ({ ...p, hosts: data }))
    if (step === 3) setFormData((p) => ({ ...p, story: data }))
    setStep((s) => s + 1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Toast
        message={toast}
        type={toast === 'Draft saved' ? 'success' : 'error'}
        onClose={() => setToast('')}
      />

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-bg hover:text-text"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold text-text">
              Create New Invitation
            </h1>
          </div>
        </div>
        {/* Mobile preview toggle */}
        <button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-primary/30 hover:text-primary lg:hidden"
        >
          <Eye size={14} />
          {showMobilePreview ? 'Show Form' : 'Preview'}
        </button>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-1 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all ${
                i < step
                  ? 'bg-primary/10 text-primary'
                  : i === step
                    ? 'bg-primary text-white ring-4 ring-primary/10'
                    : 'bg-border-light text-muted'
              }`}
            >
              {i < step ? (
                <CheckCircle size={16} weight="fill" />
              ) : (
                i + 1
              )}
            </button>
            <span
              className={`text-xs ${
                i === step ? 'font-semibold text-text' : 'text-muted'
              }`}
            >
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div className="mx-1 h-px w-4 bg-border sm:w-6" />
            )}
          </div>
        ))}
      </div>

      {/* Main layout: form + preview */}
      <div className="grid gap-10 lg:grid-cols-[1fr,380px]">
        {/* Form column */}
        <div className={showMobilePreview ? 'hidden lg:block' : ''}>
          {/* Step 0: Basic Info */}
          {step === 0 && (
            <form
              onSubmit={basicForm.handleSubmit(nextStep)}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl font-bold text-text">
                Basic Information
              </h2>
              <p className="text-sm text-muted">
                Start with the key details for your invitation
              </p>
              <Input
                label="Invitation Title"
                placeholder="e.g. Aarav & Kavya's Wedding"
                error={basicForm.formState.errors.title?.message}
                {...basicForm.register('title')}
              />
              <Input
                label="Person / couple names"
                placeholder="e.g. Aarav & Kavya"
                error={basicForm.formState.errors.primaryName?.message}
                {...basicForm.register('primaryName')}
              />
              <Input
                label="Secondary line (optional)"
                placeholder="e.g. With the blessings of our families"
                {...basicForm.register('secondaryName')}
              />
              <Input
                label="Short message (optional)"
                placeholder="Together with their families..."
                {...basicForm.register('shortMessage')}
              />
              <Select
                label="Language"
                options={LANGUAGE_OPTIONS}
                error={basicForm.formState.errors.language?.message}
                {...basicForm.register('language')}
              />
              <div className="flex justify-end pt-2">
                <Button type="submit">
                  Next: Events
                  <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          )}

          {/* Step 1: Events */}
          {step === 1 && (
            <form
              onSubmit={eventsForm.handleSubmit(nextStep)}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl font-bold text-text">
                Events
              </h2>
              <p className="text-sm text-muted">
                Add each ceremony or event in your celebration
              </p>

              {fields.map((field, i) => (
                <div
                  key={field.id}
                  className="space-y-4 rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-text">
                      Event {i + 1}
                    </h3>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="flex items-center gap-1 text-xs text-error transition-colors hover:underline"
                      >
                        <Trash size={12} />
                        Remove
                      </button>
                    )}
                  </div>
                  <Input
                    label="Event name"
                    placeholder="e.g. Haldi, Mehendi, Wedding, Reception"
                    error={
                      eventsForm.formState.errors.events?.[i]?.title?.message
                    }
                    {...eventsForm.register(`events.${i}.title`)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Date"
                      type="date"
                      error={
                        eventsForm.formState.errors.events?.[i]?.date?.message
                      }
                      {...eventsForm.register(`events.${i}.date`)}
                    />
                    <Input
                      label="Start time"
                      type="time"
                      {...eventsForm.register(`events.${i}.startTime`)}
                    />
                  </div>
                  <Input
                    label="End time"
                    type="time"
                    {...eventsForm.register(`events.${i}.endTime`)}
                  />
                  <Input
                    label="Venue"
                    placeholder="e.g. The Grand Palace"
                    {...eventsForm.register(`events.${i}.venueName`)}
                  />
                  <Input
                    label="Address"
                    placeholder="Full address"
                    {...eventsForm.register(`events.${i}.address`)}
                  />
                  <Input
                    label="Google Maps URL"
                    placeholder="https://maps.google.com/..."
                    error={
                      eventsForm.formState.errors.events?.[i]?.mapsUrl?.message
                    }
                    {...eventsForm.register(`events.${i}.mapsUrl`)}
                  />
                  <Textarea
                    label="Description (optional)"
                    rows={2}
                    {...eventsForm.register(`events.${i}.description`)}
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ ...emptyEvent })}
              >
                <Plus size={14} />
                Add Another Event
              </Button>

              {eventsForm.formState.errors.events?.message && (
                <p className="text-sm text-error">
                  {eventsForm.formState.errors.events.message}
                </p>
              )}

              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(0)}
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>
                <Button type="submit">
                  Next: Hosts
                  <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Hosts */}
          {step === 2 && (
            <form
              onSubmit={hostsForm.handleSubmit(nextStep)}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl font-bold text-text">
                Hosts and Family
              </h2>
              <p className="text-sm text-muted">
                Add family names and hosting details
              </p>
              <Input
                label="Bride / person's family"
                placeholder="e.g. Sharma Family"
                {...hostsForm.register('brideFamily')}
              />
              <Input
                label="Groom / partner's family"
                placeholder="e.g. Patel Family"
                {...hostsForm.register('groomFamily')}
              />
              <Input
                label="Host names"
                placeholder="e.g. Mr. & Mrs. Sharma, Mr. & Mrs. Patel"
                {...hostsForm.register('hostNames')}
              />
              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>
                <Button type="submit">
                  Next: Message
                  <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Story/Message */}
          {step === 3 && (
            <form
              onSubmit={storyForm.handleSubmit(nextStep)}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl font-bold text-text">
                Story and Message
              </h2>
              <p className="text-sm text-muted">
                All fields are optional. Add a personal touch to your invitation.
              </p>
              <Textarea
                label="Couple / person story"
                rows={3}
                placeholder="How did you meet? Share your story..."
                {...storyForm.register('coupleStory')}
              />
              <Textarea
                label="Family message"
                rows={3}
                placeholder="A note from the families..."
                {...storyForm.register('familyMessage')}
              />
              <Textarea
                label="Invitation message"
                rows={3}
                placeholder="With the blessings of our families, we joyfully invite you..."
                {...storyForm.register('message')}
              />
              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>
                <Button type="submit">
                  Preview
                  <Eye size={16} />
                </Button>
              </div>
            </form>
          )}

          {/* Step 4: Preview */}
          {step === 4 && (
            <div>
              <h2 className="mb-2 font-display text-2xl font-bold text-text">
                Preview your invitation
              </h2>
              <p className="mb-6 text-sm text-muted">
                Review how your invitation looks. You can go back and edit any
                section.
              </p>

              {/* Mobile inline preview */}
              <div className="mb-6 lg:hidden">
                <InvitationRenderer data={previewData} />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="ghost" onClick={() => setStep(3)}>
                  <ArrowLeft size={16} />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(0)}
                >
                  Edit from start
                </Button>
                <Button
                  className="flex-1"
                  loading={creating}
                  onClick={handleSaveDraft}
                >
                  <FloppyDisk size={16} />
                  Save Draft
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Preview column */}
        <div
          className={`${showMobilePreview ? 'block' : 'hidden'} lg:block`}
        >
          <div className="lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
              Live Preview
            </p>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <InvitationRenderer data={previewData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
