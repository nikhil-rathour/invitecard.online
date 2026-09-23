import { connectDb } from '../src/config/db.js'
import { createApp } from '../src/app.js'

const app = createApp()

export default async function handler(req, res) {
  await connectDb()
  return app(req, res)
}
