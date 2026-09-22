import { connectDb } from '../config/db.js'

async function seed() {
  await connectDb()
  console.log('Database connected for seed check.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
