import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { FileText, PencilSimple, Clock, Globe, Plus, ArrowRight } from '@phosphor-icons/react'
import { invitationService } from '../../services/invitationService'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import ErrorState from '../../components/ui/ErrorState'
import { Skeleton } from '../../components/ui/Skeleton'

// Isolated development identity. Replace with JWT auth context in Phase 3.
const DEV_USER = { name: 'Guest User', email: 'guest@example.com' }

const STATUS_VARIANT = {
  draft: 'default',
  ready: 'gold',
  published: 'success',
  archived: 'error',
}

const STATS = [
  { key: 'all', label: 'Total Invitations', icon: FileText },
  { key: 'drafts', label: 'Drafts', icon: PencilSimple },
  { key: 'recent', label: 'Recent', icon: Clock },
  { key: 'published', label: 'Published', icon: Globe },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['invitations'],
    queryFn: invitationService.getAll,
  })
  const invitations = data?.data || []
  const statValues = {
    all: invitations.length,
    drafts: invitations.filter((i) => i.status === 'draft').length,
    recent: invitations.slice(0, 6).length,
    published: invitations.filter((i) => i.status === 'published').length,
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text">
            My Invitations
          </h1>
          <p className="mt-1 text-sm text-muted">
            Welcome back, {DEV_USER.name}
          </p>
        </div>
        <Button onClick={() => navigate('/create-invitation')}>
          <Plus size={16} />
          Create Invitation
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-bg-alt">
              <Icon size={18} weight="duotone" className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-text">
              {isLoading ? '-' : statValues[key]}
            </p>
            <p className="text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Invitation list */}
      <h2 className="mb-4 text-sm font-semibold text-text">
        All Invitations
      </h2>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={error?.message} onRetry={refetch} />}

      {!isLoading && !isError && invitations.length === 0 && (
        <EmptyState
          icon={FileText}
          title="No invitations yet"
          description="Create your first beautiful digital invitation."
          action={
            <Button onClick={() => navigate('/create-invitation')}>
              Create Invitation
            </Button>
          }
        />
      )}

      {!isLoading && !isError && invitations.length > 0 && (
        <div className="space-y-3">
          {invitations.map((inv) => (
            <div
              key={inv._id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/20"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-text">{inv.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {new Date(inv.updatedAt || inv.createdAt).toLocaleDateString(
                    'en-IN',
                    { dateStyle: 'medium' }
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={STATUS_VARIANT[inv.status] || 'default'}>
                  {inv.status}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/create-invitation')}
                >
                  Edit
                  <ArrowRight size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
