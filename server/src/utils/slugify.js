export function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export function uniqueSlug(value) {
  const base = slugify(value) || 'invitation'
  const suffix = Math.random().toString(36).slice(2, 8)
  return `${base}-${suffix}`
}
