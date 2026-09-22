const LOCAL_STORAGE_KEY = 'invitecard_rsvps'

function getLocalRsvps(invitationSlug) {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${invitationSlug}`)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function saveLocalRsvp(invitationSlug, rsvpData) {
  try {
    const existing = getLocalRsvps(invitationSlug)
    const updated = [rsvpData, ...existing]
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_${invitationSlug}`, JSON.stringify(updated))
  } catch (e) {
    // Ignore storage quota errors
  }
}

export const rsvpService = {
  submitRsvp: async (invitationSlug, data) => {
    const rsvpItem = {
      id: `rsvp_${Date.now()}`,
      invitationSlug,
      ...data,
      createdAt: new Date().toISOString(),
    }
    saveLocalRsvp(invitationSlug, rsvpItem)
    return { success: true, data: rsvpItem }
  },
  
  getBySlug: async (invitationSlug) => {
    return { data: getLocalRsvps(invitationSlug) }
  },
}
