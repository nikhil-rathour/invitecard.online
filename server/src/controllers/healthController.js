import { sendSuccess } from '../utils/apiResponse.js'

export function health(_req, res) {
  return sendSuccess(res, { message: 'API is running' })
}
