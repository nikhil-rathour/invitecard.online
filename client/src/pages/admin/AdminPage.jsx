import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { LockKey, UserCheck, SignOut, Plus, Trash, PencilSimple, FileText, CheckCircle } from '@phosphor-icons/react'
import { authService } from '../../services/authService'
import { invitationService } from '../../services/invitationService'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Badge from '../../components/ui/Badge'
import Toast from '../../components/ui/Toast'
import { Skeleton } from '../../components/ui/Skeleton'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [toast, setToast] = useState('')
  const [editingInv, setEditingInv] = useState(null)
  const [showForm, setShowForm] = useState(false)

  // Invitation Form state
  const [title, setTitle] = useState('')
  const [primaryName, setPrimaryName] = useState('')
  const [secondaryName, setSecondaryName] = useState('')
  const [shortMessage, setShortMessage] = useState('')

  useEffect(() => {
    if (token) {
      localStorage.setItem('admin_token', token)
    } else {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }
  }, [token])

  // Query invitations
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-invitations'],
    queryFn: invitationService.getAll,
    enabled: !!token,
  })
  const invitations = data?.data || []

  // Create/Update mutations
  const createMutation = useMutation({
    mutationFn: invitationService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-invitations'] })
      setToast('Invitation created successfully')
      resetForm()
    },
    onError: (err) => setToast(err.message),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => invitationService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-invitations'] })
      setToast('Invitation updated successfully')
      resetForm()
    },
    onError: (err) => setToast(err.message),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => invitationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-invitations'] })
      setToast('Invitation deleted')
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
        setToast('Admin logged in successfully')
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials')
    }
  }

  function handleLogout() {
    setToken('')
    setAdminUser(null)
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setToast('Logged out')
  }

  function resetForm() {
    setTitle('')
    setPrimaryName('')
    setSecondaryName('')
    setShortMessage('')
    setEditingInv(null)
    setShowForm(false)
  }

  function openEdit(inv) {
    setEditingInv(inv)
    setTitle(inv.title || '')
    setPrimaryName(inv.basicInfo?.primaryName || '')
    setSecondaryName(inv.basicInfo?.secondaryName || '')
    setShortMessage(inv.basicInfo?.shortMessage || '')
    setShowForm(true)
  }

  function handleSave(e) {
    e.preventDefault()
    const payload = {
      title,
      basicInfo: { primaryName, secondaryName, shortMessage },
      status: 'draft',
    }

    if (editingInv) {
      updateMutation.mutate({ id: editingInv._id, payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  // Render Login Form if unauthenticated
  if (!token) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LockKey size={28} weight="duotone" />
            </div>
            <h1 className="font-display text-3xl font-bold text-text">Admin Login</h1>
            <p className="mt-1 text-xs text-muted">
              Internal invitation management portal (JWT Authenticated)
            </p>
          </div>

          {loginError && (
            <div className="mb-4 rounded-xl bg-error/10 p-3 text-xs font-semibold text-error">
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
              <UserCheck size={18} />
              Login as Admin
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Toast message={toast} onClose={() => setToast('')} />

      {/* Admin Header */}
      <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl font-bold text-text">
              Admin Portal
            </h1>
            <Badge variant="primary">JWT Authenticated</Badge>
          </div>
          <p className="mt-1 text-xs text-muted">
            Logged in as {adminUser?.email || 'Admin'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => {
              resetForm()
              setShowForm(!showForm)
            }}
          >
            <Plus size={16} />
            Create Invitation
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <SignOut size={16} />
            Logout
          </Button>
        </div>
      </div>

      {/* Admin Invitation Form Modal / Panel */}
      {showForm && (
        <div className="mb-10 rounded-2xl border-2 border-primary/30 bg-surface p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-display text-2xl font-bold text-text">
              {editingInv ? 'Edit Invitation' : 'Create New Invitation'}
            </h3>
            <Button variant="ghost" size="sm" onClick={resetForm}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Invitation Title *"
              placeholder="e.g. Aarav & Kavya's Wedding"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              label="Primary Name(s) *"
              placeholder="e.g. Aarav & Kavya"
              value={primaryName}
              onChange={(e) => setPrimaryName(e.target.value)}
              required
            />
            <Input
              label="Secondary Line (Optional)"
              placeholder="e.g. With the blessings of our families"
              value={secondaryName}
              onChange={(e) => setSecondaryName(e.target.value)}
            />
            <Textarea
              label="Short Message (Optional)"
              placeholder="Together with our families..."
              value={shortMessage}
              onChange={(e) => setShortMessage(e.target.value)}
              rows={3}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                type="submit"
                loading={createMutation.isPending || updateMutation.isPending}
              >
                <CheckCircle size={16} />
                Save Invitation
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Invitations List */}
      <h2 className="mb-4 text-base font-bold text-text">
        All Invitations ({invitations.length})
      </h2>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-xl bg-error/10 p-4 text-xs font-semibold text-error">
          Failed to load invitations: {error?.message}
          <button onClick={refetch} className="ml-3 underline">
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && invitations.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <FileText size={40} className="mx-auto mb-3 text-muted opacity-50" />
          <h3 className="font-display text-xl font-bold text-text">No invitations found</h3>
          <p className="mt-1 text-xs text-muted">
            Click "Create Invitation" above to add your first invitation draft.
          </p>
        </div>
      )}

      {!isLoading && !isError && invitations.length > 0 && (
        <div className="space-y-3">
          {invitations.map((inv) => (
            <div
              key={inv._id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/20"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-text">{inv.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  ID: {inv._id} &middot; Created:{' '}
                  {new Date(inv.createdAt).toLocaleDateString('en-IN', {
                    dateStyle: 'medium',
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={inv.status === 'published' ? 'success' : 'default'}>
                  {inv.status}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEdit(inv)}
                >
                  <PencilSimple size={14} />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-error hover:bg-error/10"
                  onClick={() => {
                    if (window.confirm('Delete this invitation?')) {
                      deleteMutation.mutate(inv._id)
                    }
                  }}
                >
                  <Trash size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
