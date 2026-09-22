import { env } from './config/env.js'
import { connectDb } from './config/db.js'
import { createApp } from './app.js'
import { seedTemplates } from './scripts/seed.js'

const app = createApp()

async function start() {
  await connectDb()
  const seeded = await seedTemplates()
  console.log(`Templates available: ${seeded}`)
  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`)
  })
}

start().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
