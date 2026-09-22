import { useParams, useNavigate } from 'react'
import { useQuery } from '@tanstack/react-query'
import { invitationService } from '../../services/invitationService'
import { templateService } from '../../services/templateService'
import InvitationRenderer from '../../components/invitation/InvitationRenderer'
import ErrorState from '../../components/ui/ErrorState'

export default function PublicInvitationPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  // Try fetching as invitation or template demo
  const {
    data: inviteData,
    isLoading: inviteLoading,
    isError: inviteError,
  } = useQuery({
    queryKey: ['public-invitation', slug],
    queryFn: async () => {
      try {
        const res = await invitationService.getById(slug)
        return res.data
      } catch (_err) {
        // Fallback to template search by slug
        const res = await templateService.getBySlug(slug)
        return res.data
      }
    },
    retry: 1,
  })

  if (inviteLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#5E142B] p-4 text-[#FFF9F2]">
        <div className="w-full max-w-md space-y-4 text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-[#C89B3C] border-t-transparent" />
          <p className="font-display text-xl font-bold">Loading Invitation...</p>
        </div>
      </div>
    )
  }

  if (inviteError || !inviteData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <ErrorState
          message="Invitation not found. Please check the URL link."
          onRetry={() => navigate('/templates')}
        />
      </div>
    )
  }

  const normalized = {
    ...inviteData,
    slug,
    theme: inviteData.themeConfig || inviteData.theme || {},
  }

  return <InvitationRenderer data={normalized} standalone={true} />
}
