import api from '../lib/api'

export const templateService = {
  getAll: (params) => api.get('/templates', { params }).then((r) => r.data),
  getBySlug: (slug) => api.get(`/templates/${slug}`).then((r) => r.data),
  getCategories: () => api.get('/categories').then((r) => r.data),
}
