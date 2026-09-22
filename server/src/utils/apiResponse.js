export function sendSuccess(res, { status = 200, message = 'OK', data, meta } = {}) {
  const payload = { success: true, message }
  if (data !== undefined) payload.data = data
  if (meta !== undefined) payload.meta = meta
  return res.status(status).json(payload)
}
