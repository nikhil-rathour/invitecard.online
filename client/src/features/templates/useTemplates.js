import { useQuery } from '@tanstack/react-query'
import { templateService } from '../../services/templateService'

export function useTemplates(params) {
  return useQuery({
    queryKey: ['templates', params],
    queryFn: () => templateService.getAll(params),
  })
}

export function useTemplate(slug) {
  return useQuery({
    queryKey: ['template', slug],
    queryFn: () => templateService.getBySlug(slug),
    enabled: !!slug,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: templateService.getCategories,
  })
}
