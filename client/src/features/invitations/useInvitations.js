import { useMutation, useQueryClient } from '@tanstack/react-query'
import { invitationService } from '../../services/invitationService'

export function useCreateInvitation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: invitationService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['invitations'] }),
  })
}

export function useUpdateInvitation(id) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => invitationService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invitations'] })
      qc.invalidateQueries({ queryKey: ['invitation', id] })
    },
  })
}
