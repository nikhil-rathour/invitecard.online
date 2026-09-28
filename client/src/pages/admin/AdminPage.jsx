import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  LockKey,
  UserCheck,
  SignOut,
  Plus,
  Trash,
  PencilSimple,
  FileText,
  CheckCircle,
  Eye,
  Copy,
  Sparkle,
  ArrowSquareOut,
  X,
  CaretRight,
  ArrowsClockwise,
} from '@phosphor-icons/react'
import { authService } from '../../services/authService'
import { template2Service } from '../../services/template2Service'
import defaultWeddingData from '../../data/weddingData'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Badge from '../../components/ui/Badge'
import Toast from '../../components/ui/Toast'
import { Skeleton } from '../../components/ui/Skeleton'

const STATUS_COLORS = {
  draft: 'default',
  ready: 'primary',
  published: 'success',
  archived: 'outline',
}

const TEMPLATE_TABS = [
  { id: 'template2', label: 'Jaipur Shahi Vivah (Template 2)', live: true },
  { id: 'template1', label: 'Royal Garden Wedding', live: false },
  { id: 'template3', label: 'Udaipur Lake Palace', live: false },
  { id: 'template4', label: 'Mughal Opulence', live: false },
]

function SectionHeader({ title, subtitle }) {
  return (
    <div className="col-span-full border-b border-border/70 pb-2 pt-4">
      <h3 className="font-display text-base font-bold text-[#D8A84E] uppercase tracking-wider">
        {title}
      </h3>
      {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
    </div>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-muted">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function AdminPage() {
  const queryClient = useQueryClient()
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '')
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('admin_user') || 'null')
    } catch {
      return null
    }
  })
  const [activeTab, setActiveTab] = useState('template2')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [toast, setToast] = useState('')
  const [view, setView] = useState('list') // 'list' | 'form'
  const [editingInv, setEditingInv] = useState(null)

  // Full Template2 form state initialized with empty or default structure
  const [form, setForm] = useState(createBlankForm())

  function createBlankForm() {
    return {
      title: '',
      slug: '',
      status: 'draft',
      language: 'English',
      brideName: '',
      brideFullName: '',
      brideParents: '',
      brideGrandparents: '',
      brideInsta: '',
      groomName: '',
      groomFullName: '',
      groomParents: '',
      groomGrandparents: '',
      groomInsta: '',
      hashtag: '',
      date: '',
      formattedDate: '',
      venue: '',
      venueSubtext: '',
      city: 'Jaipur, Rajasthan',
      mapUrl: '',
      welcomeText: '',
      story: {
        title: 'Our Jaipur Fairytale',
        subtitle: 'Two hearts, two souls, bound together under the royal skies of Rajasthan.',
        milestones: [],
      },
      events: [],
      instagramSection: {
        title: 'Couple Moments & Instagram Handles',
        subtitle: 'Follow our journey and tag your photos with our official hashtag',
        brideHandle: '',
        groomHandle: '',
        hashtag: '',
        gallery: [],
      },
      initialWishes: [],
      hostContact: {
        phone1: '',
        phone2: '',
        email: '',
      },
    }
  }

  const setF = (key, val) => setForm((prev) => ({ ...prev, [key]: val }))

  function loadSampleData() {
    setForm({
      title: `${defaultWeddingData.brideName} & ${defaultWeddingData.groomName}'s Shahi Vivah`,
      slug: `${defaultWeddingData.brideName.toLowerCase()}-weds-${defaultWeddingData.groomName.toLowerCase()}`,
      status: 'published',
      language: 'English',
      brideName: defaultWeddingData.brideName,
      brideFullName: defaultWeddingData.brideFullName,
      brideParents: defaultWeddingData.brideParents,
      brideGrandparents: defaultWeddingData.brideGrandparents,
      brideInsta: defaultWeddingData.brideInsta,
      groomName: defaultWeddingData.groomName,
      groomFullName: defaultWeddingData.groomFullName,
      groomParents: defaultWeddingData.groomParents,
      groomGrandparents: defaultWeddingData.groomGrandparents,
      groomInsta: defaultWeddingData.groomInsta,
      hashtag: defaultWeddingData.hashtag,
      date: defaultWeddingData.date,
      formattedDate: defaultWeddingData.formattedDate,
      venue: defaultWeddingData.venue,
      venueSubtext: defaultWeddingData.venueSubtext,
      city: defaultWeddingData.city,
      mapUrl: defaultWeddingData.mapUrl,
      welcomeText: defaultWeddingData.welcomeText,
      story: JSON.parse(JSON.stringify(defaultWeddingData.story || {})),
      events: JSON.parse(JSON.stringify(defaultWeddingData.events || [])),
      instagramSection: JSON.parse(
        JSON.stringify(defaultWeddingData.instagramSection || { gallery: [] })
      ),
      initialWishes: JSON.parse(JSON.stringify(defaultWeddingData.initialWishes || [])),
      hostContact: JSON.parse(JSON.stringify(defaultWeddingData.hostContact || {})),
    })
    setToast('Sample template data loaded into form ✨')
  }

  function openCreate() {
    setEditingInv(null)
    setForm(createBlankForm())
    setView('form')
  }

  function openEdit(inv) {
    setEditingInv(inv)
    setForm({
      title: inv.title || '',
      slug: inv.slug || '',
      status: inv.status || 'draft',
      language: inv.language || 'English',
      brideName: inv.brideName || '',
      brideFullName: inv.brideFullName || '',
      brideParents: inv.brideParents || '',
      brideGrandparents: inv.brideGrandparents || '',
      brideInsta: inv.brideInsta || '',
      groomName: inv.groomName || '',
      groomFullName: inv.groomFullName || '',
      groomParents: inv.groomParents || '',
      groomGrandparents: inv.groomGrandparents || '',
      groomInsta: inv.groomInsta || '',
      hashtag: inv.hashtag || '',
      date: inv.date || '',
      formattedDate: inv.formattedDate || '',
      venue: inv.venue || '',
      venueSubtext: inv.venueSubtext || '',
      city: inv.city || 'Jaipur, Rajasthan',
      mapUrl: inv.mapUrl || '',
      welcomeText: inv.welcomeText || '',
      story: inv.story || { title: '', subtitle: '', milestones: [] },
      events: inv.events || [],
      instagramSection: inv.instagramSection || { gallery: [] },
      initialWishes: inv.initialWishes || [],
      hostContact: inv.hostContact || {},
    })
    setView('form')
  }

  // Query template2 invitations
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['template2-invitations'],
    queryFn: template2Service.getAll,
    enabled: !!token && activeTab === 'template2',
  })
  const invitations = data?.data || []

  // Mutations
  const createMutation = useMutation({
    mutationFn: template2Service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['template2-invitations'] })
      setToast('Jaipur Shahi Vivah invitation created successfully!')
      setView('list')
    },
    onError: (err) => setToast(err.message),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => template2Service.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['template2-invitations'] })
      setToast('Invitation updated successfully!')
      setView('list')
    },
    onError: (err) => setToast(err.message),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => template2Service.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['template2-invitations'] })
      setToast('Invitation deleted.')
    },
    onError: (err) => setToast(err.message),
  })

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await authService.login(email, password)
      const jwtToken = res.data?.token
      const user = res.data?.user
      if (jwtToken) {
        setToken(jwtToken)
        if (user) {
          setAdminUser(user)
          localStorage.setItem('admin_user', JSON.stringify(user))
        }
        localStorage.setItem('admin_token', jwtToken)
        setToast('Admin logged in successfully')
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid admin credentials')
    }
  }

  function handleLogout() {
    setToken('')
    setAdminUser(null)
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setToast('Logged out')
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.title || !form.brideName || !form.groomName) {
      setToast('Please fill in title, bride name, and groom name')
      return
    }

    if (editingInv) {
      updateMutation.mutate({ id: editingInv._id, payload: form })
    } else {
      createMutation.mutate(form)
    }
  }

  function copyLink(slugOrId) {
    const fullUrl = `${window.location.origin}/${slugOrId}`
    navigator.clipboard.writeText(fullUrl)
    setToast('Short invitation link copied to clipboard!')
  }

  const isBusy = createMutation.isPending || updateMutation.isPending

  // ── 1. LOGIN SCREEN ──────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LockKey size={28} weight="duotone" />
            </div>
            <h1 className="font-display text-3xl font-bold text-text">Admin Portal</h1>
            <p className="mt-1 text-xs text-muted">
              Dedicated Template & Invitation Management
            </p>
          </div>

          {loginError && (
            <div className="mb-4 rounded-xl bg-red-500/10 p-3 text-xs font-semibold text-red-500">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              <UserCheck size={18} /> Login to Admin
            </Button>
          </form>
        </div>
      </div>
    )
  }

  // ── 2. SINGLE PAGE FORM FOR TEMPLATE 2 ─────────────────────────────────────
  if (view === 'form') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Toast message={toast} onClose={() => setToast('')} />

        {/* Form Top Navigation Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#D8A84E]">
                Template 2 Editor
              </span>
              <Badge variant="primary">Hawa Mahal Jaipur Shahi Vivah</Badge>
            </div>
            <h1 className="mt-0.5 font-display text-2xl font-bold text-text">
              {editingInv ? `Edit: ${form.title || 'Invitation'}` : 'New Jaipur Shahi Vivah Invitation'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={loadSampleData}
              title="Pre-fill form with full Jaipur Shahi Vivah sample data"
            >
              <Sparkle size={15} /> Load Sample Data
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setView('list')}>
              <X size={18} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* SECTION 1: CORE & URL */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SectionHeader
                title="1. Invitation Details & Custom URL"
                subtitle="Define title, unique link slug, and publishing status."
              />

              <div className="sm:col-span-2">
                <Input
                  label="Invitation Title *"
                  placeholder="e.g. Rohan & Ananya's Royal Shahi Vivah"
                  value={form.title}
                  onChange={(e) => setF('title', e.target.value)}
                  required
                />
              </div>

              <Input
                label="Custom URL Slug (Optional, auto-generated if blank)"
                placeholder="e.g. rohan-weds-ananya"
                value={form.slug}
                onChange={(e) => setF('slug', e.target.value)}
              />

              <Input
                label="Official Wedding Hashtag"
                placeholder="#RohanWedsAnanya"
                value={form.hashtag}
                onChange={(e) => setF('hashtag', e.target.value)}
              />

              <SelectField
                label="Status"
                value={form.status}
                onChange={(e) => setF('status', e.target.value)}
                options={['draft', 'ready', 'published', 'archived']}
              />

              <SelectField
                label="Language"
                value={form.language}
                onChange={(e) => setF('language', e.target.value)}
                options={['English', 'Hindi', 'Gujarati']}
              />
            </div>
          </div>

          {/* SECTION 2: BRIDE & GROOM DETAILS */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SectionHeader
                title="2. Bride & Groom Royal Profiles"
                subtitle="Names, parents, grandparents, and personal Instagram handles."
              />

              {/* Bride Column */}
              <div className="space-y-3 rounded-xl border border-[#D8A84E]/30 bg-bg/60 p-4">
                <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#C94F7C]">
                  👰 Bride's Information
                </h4>
                <Input
                  label="Bride First Name *"
                  placeholder="Ananya"
                  value={form.brideName}
                  onChange={(e) => setF('brideName', e.target.value)}
                  required
                />
                <Input
                  label="Bride Full Name"
                  placeholder="Ananya Sharma"
                  value={form.brideFullName}
                  onChange={(e) => setF('brideFullName', e.target.value)}
                />
                <Input
                  label="Parents (D/o)"
                  placeholder="D/o Mrs. Sunita & Mr. Rajesh Sharma"
                  value={form.brideParents}
                  onChange={(e) => setF('brideParents', e.target.value)}
                />
                <Input
                  label="Grandparents"
                  placeholder="Granddaughter of Late Sh. Ramcharan Sharma"
                  value={form.brideGrandparents}
                  onChange={(e) => setF('brideGrandparents', e.target.value)}
                />
                <Input
                  label="Instagram Handle"
                  placeholder="@ananya_sharma"
                  value={form.brideInsta}
                  onChange={(e) => setF('brideInsta', e.target.value)}
                />
              </div>

              {/* Groom Column */}
              <div className="space-y-3 rounded-xl border border-[#D8A84E]/30 bg-bg/60 p-4">
                <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#D8A84E]">
                  🤵 Groom's Information
                </h4>
                <Input
                  label="Groom First Name *"
                  placeholder="Rohan"
                  value={form.groomName}
                  onChange={(e) => setF('groomName', e.target.value)}
                  required
                />
                <Input
                  label="Groom Full Name"
                  placeholder="Rohan Varma"
                  value={form.groomFullName}
                  onChange={(e) => setF('groomFullName', e.target.value)}
                />
                <Input
                  label="Parents (S/o)"
                  placeholder="S/o Mrs. Meenakshi & Mr. Vikram Varma"
                  value={form.groomParents}
                  onChange={(e) => setF('groomParents', e.target.value)}
                />
                <Input
                  label="Grandparents"
                  placeholder="Grandson of Late Sh. Harishchandra Varma"
                  value={form.groomGrandparents}
                  onChange={(e) => setF('groomGrandparents', e.target.value)}
                />
                <Input
                  label="Instagram Handle"
                  placeholder="@rohan_varma"
                  value={form.groomInsta}
                  onChange={(e) => setF('groomInsta', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: DATES, VENUE & BLESSINGS */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SectionHeader
                title="3. Wedding Dates, Venue & Blessings Note"
                subtitle="Location, Google Maps link, and sacred welcome message."
              />

              <Input
                label="Date (Short Display)"
                placeholder="December 12, 2026"
                value={form.date}
                onChange={(e) => setF('date', e.target.value)}
              />
              <Input
                label="Formatted Date (Hero Banner)"
                placeholder="Saturday, 12th December 2026"
                value={form.formattedDate}
                onChange={(e) => setF('formattedDate', e.target.value)}
              />

              <Input
                label="Main Palace / Venue Name"
                placeholder="The Raj Palace"
                value={form.venue}
                onChange={(e) => setF('venue', e.target.value)}
              />
              <Input
                label="Venue Subtext / Address"
                placeholder="Amber Road, Chokhi Dhani Enclave"
                value={form.venueSubtext}
                onChange={(e) => setF('venueSubtext', e.target.value)}
              />

              <Input
                label="City & State"
                placeholder="Jaipur, Rajasthan"
                value={form.city}
                onChange={(e) => setF('city', e.target.value)}
              />
              <Input
                label="Google Maps Location URL"
                placeholder="https://maps.google.com/?q=The+Raj+Palace+Jaipur"
                value={form.mapUrl}
                onChange={(e) => setF('mapUrl', e.target.value)}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Sacred Welcome Message"
                  placeholder="With the celestial blessings of Lord Ganesha and our elders, we cordially invite you..."
                  value={form.welcomeText}
                  onChange={(e) => setF('welcomeText', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: STORY MILESTONES */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <SectionHeader
              title="4. Our Love Story Timeline"
              subtitle="Milestones displayed in the royal arch story section."
            />

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Story Title"
                placeholder="Our Jaipur Fairytale"
                value={form.story?.title || ''}
                onChange={(e) =>
                  setF('story', { ...form.story, title: e.target.value })
                }
              />
              <Input
                label="Story Subtitle"
                placeholder="Two hearts, two souls, bound together..."
                value={form.story?.subtitle || ''}
                onChange={(e) =>
                  setF('story', { ...form.story, subtitle: e.target.value })
                }
              />
            </div>

            <div className="mt-4 space-y-3">
              {(form.story?.milestones || []).map((m, i) => (
                <div
                  key={i}
                  className="relative grid grid-cols-1 gap-3 rounded-xl border border-border bg-bg p-3 sm:grid-cols-3"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = form.story.milestones.filter((_, idx) => idx !== i)
                      setF('story', { ...form.story, milestones: updated })
                    }}
                    className="absolute right-2 top-2 text-muted hover:text-red-500"
                  >
                    <X size={15} />
                  </button>
                  <Input
                    label="Year"
                    placeholder="2024"
                    value={m.year}
                    onChange={(e) => {
                      const updated = [...form.story.milestones]
                      updated[i].year = e.target.value
                      setF('story', { ...form.story, milestones: updated })
                    }}
                  />
                  <Input
                    label="Milestone Title"
                    placeholder="The Royal Proposal"
                    value={m.title}
                    onChange={(e) => {
                      const updated = [...form.story.milestones]
                      updated[i].title = e.target.value
                      setF('story', { ...form.story, milestones: updated })
                    }}
                  />
                  <div className="sm:col-span-3">
                    <Input
                      label="Description"
                      placeholder="Under the golden sunset of Nahargarh Fort..."
                      value={m.desc}
                      onChange={(e) => {
                        const updated = [...form.story.milestones]
                        updated[i].desc = e.target.value
                        setF('story', { ...form.story, milestones: updated })
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const milestones = form.story?.milestones || []
                  setF('story', {
                    ...form.story,
                    milestones: [
                      ...milestones,
                      { year: '2026', title: 'The Wedding', desc: 'A royal celebration.' },
                    ],
                  })
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2.5 text-xs font-semibold text-muted hover:border-primary/50 hover:text-primary"
              >
                <Plus size={15} /> Add Story Milestone
              </button>
            </div>
          </div>

          {/* SECTION 5: CEREMONIES & EVENTS ITINERARY */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <SectionHeader
              title="5. Ceremonies & Events Itinerary"
              subtitle="Mehndi, Sangeet, Haldi, Pheras, Reception with dress code and timings."
            />

            <div className="mt-4 space-y-4">
              {(form.events || []).map((ev, i) => (
                <div
                  key={i}
                  className="relative space-y-3 rounded-xl border border-[#D8A84E]/30 bg-bg p-4"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="font-cinzel text-xs font-bold uppercase text-[#D8A84E]">
                      Ceremony #{i + 1}: {ev.name || 'Untitled Event'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = form.events.filter((_, idx) => idx !== i)
                        setF('events', updated)
                      }}
                      className="text-xs text-red-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    <Input
                      label="Event Name *"
                      placeholder="Mehndi Ki Raat"
                      value={ev.name}
                      onChange={(e) => {
                        const updated = [...form.events]
                        updated[i].name = e.target.value
                        setF('events', updated)
                      }}
                      required
                    />
                    <Input
                      label="Tagline"
                      placeholder="Henna, Music & Festive Elegance"
                      value={ev.tagline}
                      onChange={(e) => {
                        const updated = [...form.events]
                        updated[i].tagline = e.target.value
                        setF('events', updated)
                      }}
                    />
                    <SelectField
                      label="Theme Icon"
                      value={ev.icon || 'Sparkles'}
                      onChange={(e) => {
                        const updated = [...form.events]
                        updated[i].icon = e.target.value
                        setF('events', updated)
                      }}
                      options={[
                        { value: 'Sparkles', label: '✨ Sparkles' },
                        { value: 'Music', label: '🎵 Music / Sangeet' },
                        { value: 'Sun', label: '☀️ Sun / Haldi' },
                        { value: 'Crown', label: '👑 Crown / Pheras' },
                        { value: 'Wine', label: '🍷 Wine / Reception' },
                      ]}
                    />

                    <Input
                      label="Date"
                      placeholder="Friday, Dec 11, 2026"
                      value={ev.date}
                      onChange={(e) => {
                        const updated = [...form.events]
                        updated[i].date = e.target.value
                        setF('events', updated)
                      }}
                    />
                    <Input
                      label="Time"
                      placeholder="4:00 PM Onwards"
                      value={ev.time}
                      onChange={(e) => {
                        const updated = [...form.events]
                        updated[i].time = e.target.value
                        setF('events', updated)
                      }}
                    />
                    <Input
                      label="Dress Code"
                      placeholder="Bright Floral & Pink"
                      value={ev.dressCode}
                      onChange={(e) => {
                        const updated = [...form.events]
                        updated[i].dressCode = e.target.value
                        setF('events', updated)
                      }}
                    />

                    <div className="sm:col-span-2 md:col-span-3">
                      <Input
                        label="Venue Name"
                        placeholder="Gulab Bagh Lawn, The Raj Palace"
                        value={ev.venue}
                        onChange={(e) => {
                          const updated = [...form.events]
                          updated[i].venue = e.target.value
                          setF('events', updated)
                        }}
                      />
                    </div>

                    <div className="sm:col-span-2 md:col-span-3">
                      <Textarea
                        label="Description"
                        placeholder="An evening of vibrant henna, soulful folk melodies..."
                        value={ev.desc}
                        onChange={(e) => {
                          const updated = [...form.events]
                          updated[i].desc = e.target.value
                          setF('events', updated)
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setF('events', [
                    ...form.events,
                    {
                      id: `event-${Date.now()}`,
                      name: 'Ceremony Name',
                      tagline: 'Celebration',
                      date: 'Saturday, Dec 12, 2026',
                      time: '7:00 PM',
                      venue: form.venue || 'The Raj Palace',
                      dressCode: 'Royal Ethnic',
                      icon: 'Crown',
                      desc: 'Sacred wedding celebration.',
                    },
                  ])
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-xs font-semibold text-muted hover:border-primary/50 hover:text-primary"
              >
                <Plus size={16} /> Add Ceremony / Event
              </button>
            </div>
          </div>

          {/* SECTION 6: INSTAGRAM & GALLERY MOMENTS */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <SectionHeader
              title="6. Instagram Handles & Couple Moments Gallery"
              subtitle="Showcase couple photos, photo tags, and follower handles."
            />

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Gallery Title"
                placeholder="Couple Moments & Instagram Handles"
                value={form.instagramSection?.title || ''}
                onChange={(e) =>
                  setF('instagramSection', {
                    ...form.instagramSection,
                    title: e.target.value,
                  })
                }
              />
              <Input
                label="Gallery Subtitle"
                placeholder="Follow our journey and tag your photos..."
                value={form.instagramSection?.subtitle || ''}
                onChange={(e) =>
                  setF('instagramSection', {
                    ...form.instagramSection,
                    subtitle: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-4 space-y-3">
              {(form.instagramSection?.gallery || []).map((pic, i) => (
                <div
                  key={i}
                  className="relative grid grid-cols-1 gap-3 rounded-xl border border-border bg-bg p-3 sm:grid-cols-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = form.instagramSection.gallery.filter(
                        (_, idx) => idx !== i
                      )
                      setF('instagramSection', {
                        ...form.instagramSection,
                        gallery: updated,
                      })
                    }}
                    className="absolute right-2 top-2 text-muted hover:text-red-500"
                  >
                    <X size={15} />
                  </button>

                  <div className="sm:col-span-2">
                    <Input
                      label="Image URL"
                      placeholder="https://images.unsplash.com/..."
                      value={pic.image}
                      onChange={(e) => {
                        const updated = [...form.instagramSection.gallery]
                        updated[i].image = e.target.value
                        setF('instagramSection', {
                          ...form.instagramSection,
                          gallery: updated,
                        })
                      }}
                    />
                  </div>
                  <Input
                    label="Caption"
                    placeholder="Sunset at Nahargarh Fort 🌅"
                    value={pic.caption}
                    onChange={(e) => {
                      const updated = [...form.instagramSection.gallery]
                      updated[i].caption = e.target.value
                      setF('instagramSection', {
                        ...form.instagramSection,
                        gallery: updated,
                      })
                    }}
                  />
                  <Input
                    label="Tag / Handle"
                    placeholder="@ananya_sharma"
                    value={pic.tag}
                    onChange={(e) => {
                      const updated = [...form.instagramSection.gallery]
                      updated[i].tag = e.target.value
                      setF('instagramSection', {
                        ...form.instagramSection,
                        gallery: updated,
                      })
                    }}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const gallery = form.instagramSection?.gallery || []
                  setF('instagramSection', {
                    ...form.instagramSection,
                    gallery: [
                      ...gallery,
                      {
                        caption: 'Memorable moment in Jaipur 🪷',
                        image:
                          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
                        tag: form.hashtag || '#RoyalVivah',
                        likes: '1,500',
                      },
                    ],
                  })
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2.5 text-xs font-semibold text-muted hover:border-primary/50 hover:text-primary"
              >
                <Plus size={15} /> Add Photo to Gallery
              </button>
            </div>
          </div>

          {/* SECTION 7: INITIAL GUEST WISHES & HOST CONTACT */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <SectionHeader
                title="7. Host RSVP Contacts"
                subtitle="Phone numbers and contact email for guest inquiries."
              />

              <Input
                label="Host Phone 1"
                placeholder="+91 98765 43210"
                value={form.hostContact?.phone1 || ''}
                onChange={(e) =>
                  setF('hostContact', { ...form.hostContact, phone1: e.target.value })
                }
              />
              <Input
                label="Host Phone 2"
                placeholder="+91 91234 56789"
                value={form.hostContact?.phone2 || ''}
                onChange={(e) =>
                  setF('hostContact', { ...form.hostContact, phone2: e.target.value })
                }
              />
              <Input
                label="RSVP Email"
                placeholder="celebrate@rohanananya.online"
                value={form.hostContact?.email || ''}
                onChange={(e) =>
                  setF('hostContact', { ...form.hostContact, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Bottom Save & Cancel Bar */}
          <div className="sticky bottom-4 z-40 flex items-center justify-between rounded-2xl border border-primary/40 bg-surface/95 p-4 shadow-2xl backdrop-blur-md">
            <Button type="button" variant="ghost" onClick={() => setView('list')}>
              Cancel
            </Button>
            <div className="flex items-center gap-3">
              <Button type="submit" loading={isBusy} size="lg">
                <CheckCircle size={18} weight="bold" />
                {editingInv ? 'Save Changes' : 'Create & Publish Invitation'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  // ── 3. LIST VIEW & MANAGEMENT PORTAL ───────────────────────────────────────
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Toast message={toast} onClose={() => setToast('')} />

      {/* Top Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display text-3xl font-bold text-text">Admin Portal</h1>
            <Badge variant="primary">Template Studio</Badge>
          </div>
          <p className="mt-1 text-xs text-muted">
            Logged in as <span className="font-semibold text-text">{adminUser?.email || 'Admin'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" onClick={openCreate}>
            <Plus size={16} weight="bold" /> Create Jaipur Invitation
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <SignOut size={16} /> Logout
          </Button>
        </div>
      </div>

      {/* Template Switcher Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-border pb-3">
        {TEMPLATE_TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface text-muted hover:border-primary/40 hover:text-text'
              }`}
            >
              <span>{tab.label}</span>
              {tab.live && (
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          )
        })}
      </div>

      {/* Non-active template notice */}
      {activeTab !== 'template2' && (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <Sparkle size={36} className="mx-auto mb-3 text-[#D8A84E]" />
          <h3 className="font-display text-xl font-bold text-text">
            Template Model & API Coming Soon
          </h3>
          <p className="mt-1 text-xs text-muted">
            Template 2 (Hawa Mahal Jaipur Shahi Vivah) is currently active and fully operational.
          </p>
          <Button
            size="sm"
            className="mt-4"
            onClick={() => setActiveTab('template2')}
          >
            Switch to Template 2
          </Button>
        </div>
      )}

      {/* TEMPLATE 2 CONTENT */}
      {activeTab === 'template2' && (
        <div>
          {/* Stats Bar */}
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {['published', 'draft', 'ready', 'archived'].map((st) => {
              const count = invitations.filter((inv) => inv.status === st).length
              return (
                <div
                  key={st}
                  className="rounded-xl border border-border bg-surface p-4 shadow-sm"
                >
                  <p className="font-display text-2xl font-bold text-text">{count}</p>
                  <p className="text-xs uppercase tracking-wider text-muted">{st}</p>
                </div>
              )
            })}
          </div>

          {/* Invitation List */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-text">
              Customized Jaipur Shahi Vivah Invitations ({invitations.length})
            </h2>
            <Button size="sm" variant="outline" onClick={() => refetch()}>
              <ArrowsClockwise size={14} /> Refresh
            </Button>
          </div>

          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-xl bg-red-500/10 p-4 text-xs font-semibold text-red-500">
              Failed to load invitations: {error?.message}
              <button onClick={() => refetch()} className="ml-3 underline">
                Retry
              </button>
            </div>
          )}

          {!isLoading && !isError && invitations.length === 0 && (
            <div className="rounded-2xl border border-border bg-surface p-16 text-center">
              <FileText size={44} className="mx-auto mb-3 text-muted opacity-40" />
              <h3 className="font-display text-xl font-bold text-text">
                No Jaipur Shahi Vivah Invitations Yet
              </h3>
              <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
                Create a personalized wedding invitation using the dedicated Template 2 builder.
              </p>
              <Button size="sm" className="mt-4" onClick={openCreate}>
                <Plus size={16} /> Create First Jaipur Invitation
              </Button>
            </div>
          )}

          {!isLoading && !isError && invitations.length > 0 && (
            <div className="space-y-3">
              {invitations.map((inv) => (
                <div
                  key={inv._id}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-[#D8A84E]/40 sm:flex-row sm:items-center sm:justify-between shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <p className="font-display text-base font-bold text-text truncate">
                        {inv.title}
                      </p>
                      <Badge variant={STATUS_COLORS[inv.status] || 'default'}>
                        {inv.status}
                      </Badge>
                      <span className="font-cinzel text-[10px] font-semibold text-[#D8A84E]">
                        {inv.hashtag}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-4 text-xs text-muted flex-wrap">
                      <span>
                        👑 <strong>{inv.brideName} & {inv.groomName}</strong>
                      </span>
                      <span>📅 {inv.date || 'Dec 12, 2026'}</span>
                      <span>📍 {inv.venue || 'The Raj Palace, Jaipur'}</span>
                      <span>
                        Created:{' '}
                        {new Date(inv.createdAt).toLocaleDateString('en-IN', {
                          dateStyle: 'medium',
                        })}
                      </span>
                    </div>

                    <div className="mt-1 text-[11px] text-[#D8A84E]/80">
                      <span>Short Link: </span>
                      <code className="rounded bg-bg px-1.5 py-0.5 font-mono text-text">
                        /{inv.slug || inv._id}
                      </code>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => copyLink(inv.slug || inv._id)}
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-bg px-3 text-xs font-semibold text-text transition-colors hover:border-[#D8A84E] hover:text-[#D8A84E]"
                      title="Copy short invitation link"
                    >
                      <Copy size={15} /> Copy Link
                    </button>

                    <a
                      href={`/${inv.slug || inv._id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-bg px-3 text-xs font-semibold text-text transition-colors hover:border-primary hover:text-primary"
                      title="View live personalized invitation"
                    >
                      <Eye size={15} /> Live View
                      <ArrowSquareOut size={13} />
                    </a>

                    <Button size="sm" variant="outline" onClick={() => openEdit(inv)}>
                      <PencilSimple size={14} /> Edit
                    </Button>

                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                      title="Delete invitation"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete "${inv.title}"?`
                          )
                        ) {
                          deleteMutation.mutate(inv._id)
                        }
                      }}
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
