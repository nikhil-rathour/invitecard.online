import { ApiError } from '../utils/ApiError.js'

export function validate(schema, source = 'body') {
  return (req, _res, next) => {
    const payload = source === 'query' ? (req.sanitizedQuery || req.query) : req[source]
    const result = schema.safeParse(payload)
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }))
      return next(new ApiError(400, details[0]?.message || 'Invalid request', details))
    }
    if (source === 'query') {
      req.validatedQuery = result.data
    } else {
      req[source] = result.data
    }
    next()
  }
}
