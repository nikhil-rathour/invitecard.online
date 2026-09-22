import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MagnifyingGlass, CaretDown } from '@phosphor-icons/react'
import { useTemplates } from '../../features/templates/useTemplates'
import TemplateCard from '../../components/invitation/TemplateCard'
import { TemplateCardSkeleton } from '../../components/ui/Skeleton'
import EmptyState from '../../components/ui/EmptyState'
import ErrorState from '../../components/ui/ErrorState'
import Button from '../../components/ui/Button'
import ScrollReveal from '../../components/ui/ScrollReveal'
import { CATEGORIES, LANGUAGES } from '../../constants/categories'

const SORTS = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'name', label: 'Alphabetical' },
]


export default function TemplatesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [language, setLanguage] = useState(searchParams.get('language') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')
  const [page, setPage] = useState(Number(searchParams.get('page') || 1))

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const params = {
    page,
    limit: 12,
    sort,
    ...(search && { search }),
    ...(category && { category }),
    ...(language && { language }),
  }

  const { data, isLoading, isError, error, refetch } = useTemplates(params)
  const templates = data?.data || []
  const meta = data?.meta || { page: 1, totalPages: 1, total: 0 }

  useEffect(() => {
    const next = {}
    if (search) next.search = search
    if (category) next.category = category
    if (language) next.language = language
    if (sort && sort !== 'newest') next.sort = sort
    if (page > 1) next.page = String(page)
    setSearchParams(next, { replace: true })
  }, [search, category, language, sort, page, setSearchParams])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Editorial Page header */}
      <div className="mb-12 border-b border-border pb-12 pt-4 text-center md:text-left">
        <div className="mx-auto max-w-3xl md:mx-0">
          <h1 className="font-display text-5xl font-medium tracking-tight text-text sm:text-6xl">
            The Gallery
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">
            Explore our curated collection of premium digital invitations. Perfectly crafted for your most cherished moments.
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-10 flex flex-col items-center justify-between gap-4 rounded-[16px] bg-surface p-2 ring-1 ring-border sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <MagnifyingGlass
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            placeholder="Search templates..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-full bg-transparent py-2.5 pl-11 pr-4 text-sm text-text placeholder:text-muted focus:outline-none"
          />
        </div>
        
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <select
              value={language}
              onChange={(e) => { setLanguage(e.target.value); setPage(1) }}
              className="w-full cursor-pointer appearance-none rounded-full bg-bg px-5 py-2.5 pr-11 text-sm font-medium text-text ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Languages</option>
              {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <CaretDown size={14} weight="bold" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
          </div>
          
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1) }}
              className="w-full cursor-pointer appearance-none rounded-full bg-bg px-5 py-2.5 pr-11 text-sm font-medium text-text ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <CaretDown size={14} weight="bold" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="mb-12 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => { setCategory(''); setPage(1) }}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
            !category
              ? 'bg-primary text-white shadow-md'
              : 'bg-surface text-muted ring-1 ring-border hover:text-primary hover:ring-primary/30'
          }`}
        >
          All Designs
        </button>
        {CATEGORIES.map((cat) => {
          const active = category === cat.slug
          return (
            <button
              key={cat.slug}
              onClick={() => { setCategory(cat.slug); setPage(1) }}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                active
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface text-muted ring-1 ring-border hover:text-primary hover:ring-primary/30'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <TemplateCardSkeleton key={i} />)}
        </div>
      )}

      {/* Error */}
      {isError && <ErrorState message={error?.message} onRetry={refetch} />}

      {/* Empty */}
      {!isLoading && !isError && templates.length === 0 && (
        <div className="py-12">
          <EmptyState
            icon={MagnifyingGlass}
            title="No templates found"
            description="We couldn't find any designs matching your current filters."
            action={
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchInput('')
                  setSearch('')
                  setCategory('')
                  setLanguage('')
                  setPage(1)
                }}
              >
                Clear Filters
              </Button>
            }
          />
        </div>
      )}

      {/* Results */}
      {!isLoading && !isError && templates.length > 0 && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium text-muted">
              Showing {templates.length} of {meta.total} {meta.total === 1 ? 'design' : 'designs'}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates.map((t, i) => (
              <ScrollReveal key={t._id} delay={i * 0.08}>
                <TemplateCard template={t} />
              </ScrollReveal>
            ))}
          </div>
          {meta.totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="w-24"
              >
                Previous
              </Button>
              <span className="flex items-center text-sm font-medium text-muted">
                Page {meta.page} of {meta.totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="w-24"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
