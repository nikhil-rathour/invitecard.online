const DANGEROUS_KEY = /^\$|\./

export function sanitizeValue(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue)
  }
  if (value && typeof value === 'object') {
    const clean = {}
    for (const [key, nested] of Object.entries(value)) {
      if (DANGEROUS_KEY.test(key)) continue
      clean[key] = sanitizeValue(nested)
    }
    return clean
  }
  return value
}

export function sanitizeRequest(req, _res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body)
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeValue(req.params)
  }
  if (req.query && typeof req.query === 'object') {
    req.sanitizedQuery = sanitizeValue(req.query)
  } else {
    req.sanitizedQuery = {}
  }
  next()
}
