import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, ShoppingCart, MagnifyingGlass } from '@phosphor-icons/react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import InvitationRenderer from '../../components/invitation/InvitationRenderer'

const CATEGORIES = [
  { label: 'All', slug: 'all' },
  { label: 'Wedding', slug: 'wedding' },
  { label: 'Engagement', slug: 'engagement' },
  { label: 'Birthday', slug: 'birthday' },
  { label: 'Baby Shower', slug: 'baby-shower' },
  { label: 'Housewarming', slug: 'housewarming' },
  { label: 'Pooja', slug: 'pooja' },
]

const SAMPLE_TEMPLATES = [

  {
    id: 't1',
    name: 'Hawa Mahal Jaipur Shahi Vivah',
    category: 'wedding',
    price: '₹999',
    image: 'https://res.cloudinary.com/ncywzxpz/image/upload/v1790335991/ChatGPT_Image_Sep_25_2026_05_01_42_PM.png',
    demoRoute: '/templates/template2',
    description: 'A luxury Jaipur-inspired digital wedding invitation featuring scroll-driven Hawa Mahal zoom, clouds, and royal carpet.',
    demoData: {
      names: { primary: 'Rohan & Ananya', secondary: 'Together with their families' },
      basicInfo: { title: 'Rohan & Ananya', shortMessage: 'We request the honour of your presence at our wedding.' },
      events: [
        { title: 'Mehendi & Sangeet', date: '2026-11-23', startTime: '16:00', venueName: 'Lotus Mandap, Udaipur' },
        { title: 'Pheras', date: '2026-11-24', startTime: '10:00', venueName: 'Lake Palace, Udaipur' },
      ],
      hosts: { brideFamily: 'Kapur Family', groomFamily: 'Verma Family' },
      theme: { layout: 'floral', primaryColor: '#8B1E3F', goldColor: '#C89B3C', background: '#FFFDF9' },
    },
  }
 
]

export default function TemplatePage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = SAMPLE_TEMPLATES.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <Badge variant="primary" className="mb-3 rounded-full px-4 py-1">
          Invitation Studio
        </Badge>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Choose Your Design
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
          Browse curated invitation designs for Indian weddings and family celebrations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface text-muted ring-1 ring-border hover:text-text'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-xs font-medium text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:shadow-xl"
          >
            {/* Template Preview Card */}
            <div className="relative aspect-[4/3.5] sm:aspect-[4/3.6] w-full overflow-hidden bg-bg">
              {template.image ? (
                <img
                  src={template.image}
                  alt={template.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <InvitationRenderer data={template.demoData} />
              )}
              <div className="absolute top-3 right-3 z-10">
                <span className="rounded-full bg-surface/90 px-3 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur">
                  {template.price}
                </span>
              </div>
            </div>

            {/* Template Info */}
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-2 flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] uppercase">
                  {template.category}
                </Badge>
              </div>

              <h3 className="font-display text-2xl font-bold text-text">
                {template.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {template.description}
              </p>

              {/* Two Action Buttons: View Demo & Buy */}
              <div className="mt-6 flex gap-3 pt-4 border-t border-border-light">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-full text-xs"
                  onClick={() => window.open(template.demoRoute, '_blank')}
                >
                  <Eye size={16} />
                  View Demo
                </Button>
                <Button
                  size="sm"
                  className="flex-1 rounded-full text-xs"
                  onClick={() => {
                    const phone = '917505445202'
                    const text = `Hello! I would like to buy this invitation template:

📌 *Template Name*: ${template.name}
🏷️ *Category*: ${template.category}
💰 *Price*: ${template.price}
🔗 *Demo URL*: ${window.location.origin}${template.demoRoute}

Please share details to customize and finalize my order!`
                    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
                  }}
                >
                  <ShoppingCart size={16} />
                  Buy
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}