import { useParams, useNavigate, Link } from 'react'
import { ArrowLeft, CheckCircle, Globe, Eye } from '@phosphor-icons/react'
import { useTemplate } from '../../features/templates/useTemplates'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { Skeleton } from '../../components/ui/Skeleton'
import ErrorState from '../../components/ui/ErrorState'
import InvitationRenderer from '../../components/invitation/InvitationRenderer'
import TemplateCard from '../../components/invitation/TemplateCard'
import TemplatePreview from '../../components/invitation/TemplatePreview'
import ScrollReveal from '../../components/ui/ScrollReveal'

export default function TemplateDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, error, refetch } = useTemplate(slug)
  const template = data?.data
  const related = template?.related || []

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
          </div>
          <div className="space-y-6 lg:col-span-5 lg:pt-8">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-12 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-14 w-full rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />
  if (!template) return null

  const demoData = {
    ...(template.demoData || {}),
    theme: template.themeConfig || {},
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <button
        onClick={() => navigate('/templates')}
        className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        Back to Collection
      </button>

      {/* Main grid - Editorial Asymmetric Layout */}
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Preview Container */}
        <div className="lg:sticky lg:top-8 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
            <div className="aspect-[3/4] w-full">
              <TemplatePreview template={template} />
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col lg:col-span-5 lg:pt-8">
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge variant="primary" className="rounded-full px-3 py-1">
              {template.category}
            </Badge>
          </div>
          
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
            {template.name}
          </h1>
          
          <p className="mb-10 text-lg leading-relaxed text-muted">
            {template.description}
          </p>

          {/* Languages Section */}
          {template.supportedLanguages?.length > 0 && (
            <div className="mb-10 border-t border-border pt-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-text">
                <Globe size={18} className="text-primary" />
                Available Languages
              </div>
              <div className="flex flex-wrap gap-2">
                {template.supportedLanguages.map((lang) => (
                  <span key={lang} className="rounded-full bg-surface px-4 py-1.5 text-sm font-medium text-text border border-border">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          {template.features?.length > 0 && (
            <div className="mb-10 border-t border-border pt-6">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-text">
                Template Features
              </h3>
              <ul className="space-y-4">
                {template.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-base text-muted">
                    <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-gold" />
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Area */}
          <div className="mt-auto border-t border-border pt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 rounded-full text-base"
              onClick={() => navigate(`/create-invitation/${template.slug}`)}
            >
              Create Invitation
            </Button>
            <Link to={`/demo/${template.slug}`} target="_blank" className="flex-1">
              <Button
                size="lg"
                variant="secondary"
                className="w-full rounded-full text-base"
              >
                <Eye size={18} />
                Live Demo
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            Start drafting for free. No payment required.
          </p>
        </div>
      </div>

      {/* Demo invitation */}
      <ScrollReveal>
        <section className="mt-32 border-t border-border pt-16">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Experience the Invitation
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted">
              Interactive preview of the invitation flow. Open live demo in full screen for the complete royal envelope reveal.
            </p>
          </div>
          <div className="mx-auto max-w-md overflow-hidden rounded-2xl shadow-xl border border-border">
            <InvitationRenderer data={demoData} preview={true} />
          </div>
        </section>
      </ScrollReveal>

      {/* Related templates */}
      {related.length > 0 && (
        <ScrollReveal>
          <section className="mt-32 border-t border-border pt-16">
            <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Curated Alternatives
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TemplateCard key={item._id} template={item} />
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </div>
  )
}
