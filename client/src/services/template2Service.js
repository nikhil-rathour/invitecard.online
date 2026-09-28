import api from '../lib/api'

export const template2Service = {
  getAll: () => api.get('/template2').then((r) => r.data),
  getById: (id) => api.get(`/template2/${id}`).then((r) => r.data),
  getBySlug: (slug) => api.get(`/template2/public/${slug}`).then((r) => r.data),
  create: (data) => api.post('/template2', data).then((r) => r.data),
  update: (id, data) => api.patch(`/template2/${id}`, data).then((r) => r.data),
  delete: (id) => api.delete(`/template2/${id}`).then((r) => r.data),
  addWish: (slugOrId, wishData) =>
    api.post(`/template2/public/${slugOrId}/wishes`, wishData).then((r) => r.data),
}
