const LOCAL_STORAGE_KEY = 'invitecard_wishes'

function getLocalWishes(invitationSlug) {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${invitationSlug}`)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function saveLocalWish(invitationSlug, wishData) {
  try {
    const existing = getLocalWishes(invitationSlug)
    const updated = [wishData, ...existing]
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_${invitationSlug}`, JSON.stringify(updated))
  } catch (e) {
    // Ignore storage quota errors
  }
}

export const wishesService = {
  submitWish: async (invitationSlug, data) => {
    const wishItem = {
      id: `wish_${Date.now()}`,
      invitationSlug,
      name: data.name,
      message: data.message,
      createdAt: new Date().toISOString(),
    }
    saveLocalWish(invitationSlug, wishItem)
    return { success: true, data: wishItem }
  },

  getWishes: async (invitationSlug) => {
    return { data: getLocalWishes(invitationSlug) }
  },
}
