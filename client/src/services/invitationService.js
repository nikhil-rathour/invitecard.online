import api from '../lib/api'

export const invitationService = {
  create: (data) => api.post('/invitations', data).then((r) => r.data),
  getAll: () => api.get('/invitations').then((r) => r.data),
  getById: (id) => api.get(`/invitations/${id}`).then((r) => r.data),
  update: (id, data) => api.patch(`/invitations/${id}`, data).then((r) => r.data),
  addEvent: (id, data) => api.post(`/invitations/${id}/events`, data).then((r) => r.data),
  updateEvent: (eventId, data) => api.patch(`/events/${eventId}`, data).then((r) => r.data),
  deleteEvent: (eventId) => api.delete(`/events/${eventId}`).then((r) => r.data),
}
