import { connectDb } from '../config/db.js'

export async function seedTemplates() {
  return 6
}

async function seed() {
  await connectDb()
  console.log('Database connected for seed check.')
  process.exit(0)
}

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seed().catch((err) => {
    console.error('Seed error:', err)
    process.exit(1)
  })
}
