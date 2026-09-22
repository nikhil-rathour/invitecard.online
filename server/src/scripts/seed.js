import { connectDb } from '../config/db.js'
import { Template } from '../models/Template.js'

const FEATURES = [
  'Multiple events in one invitation',
  'Venue details with Google Maps',
  'Host and family names',
  'Personal story and message',
  'Mobile-first guest view',
]

function demo(overrides = {}) {
  return {
    names: { primary: 'Aarav & Kavya', secondary: 'With the blessings of our families' },
    basicInfo: {
      title: 'Aarav & Kavya',
      shortMessage: 'Together with our families, we invite you to celebrate our wedding.',
    },
    events: [
      {
        title: 'Wedding Ceremony',
        date: '2026-02-14',
        startTime: '10:00',
        venueName: 'The Marigold Courtyard',
        address: 'Juhu, Mumbai',
      },
      {
        title: 'Reception',
        date: '2026-02-14',
        startTime: '19:00',
        venueName: 'Sea Breeze Banquet',
        address: 'Bandra, Mumbai',
      },
    ],
    hosts: { brideFamily: 'Sharma Family', groomFamily: 'Mehta Family' },
    story: { message: 'We cannot wait to celebrate this joyous occasion with you.' },
    ...overrides,
  }
}

const templates = [
  {
    name: 'Royal Marigold Wedding',
    slug: 'royal-marigold-wedding',
    category: 'wedding',
    description: 'A warm, festive wedding invitation with marigold gold and deep maroon tones, made for grand Indian ceremonies.',
    supportedLanguages: ['English', 'Hindi', 'Gujarati'],
    previewImages: [],
    demoUrl: '/templates/royal-marigold-wedding',
    price: { base: 1499, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'royal-marigold', layout: 'classic', primaryColor: '#8B1E3F', goldColor: '#C89B3C', background: '#FFF9F2' },
    demoData: demo(),
  },
  {
    name: 'Lotus Mandap',
    slug: 'lotus-mandap',
    category: 'wedding',
    description: 'Soft cream and lotus-inspired styling for a serene mandap ceremony and intimate family gatherings.',
    supportedLanguages: ['English', 'Hindi'],
    previewImages: [],
    demoUrl: '/templates/lotus-mandap',
    price: { base: 1299, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'lotus-mandap', layout: 'floral', primaryColor: '#6B2148', goldColor: '#D4A017', background: '#FFF7F0' },
    demoData: demo({ names: { primary: 'Ishaan & Meera' } }),
  },
  {
    name: 'Garden Engagement',
    slug: 'garden-engagement',
    category: 'engagement',
    description: 'Fresh greens and gold for an outdoor sagai, with space for ring ceremony and dinner details.',
    supportedLanguages: ['English', 'Gujarati'],
    previewImages: [],
    demoUrl: '/templates/garden-engagement',
    price: { base: 999, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'garden-engagement', layout: 'modern', primaryColor: '#2F5D50', goldColor: '#C89B3C', background: '#F7F4EC' },
    demoData: demo({
      names: { primary: 'Riya & Kabir' },
      events: [{ title: 'Engagement Ceremony', date: '2026-01-18', startTime: '18:30', venueName: 'The Rose Lawn', address: 'Ahmedabad' }],
    }),
  },
  {
    name: 'Blush Godh Bharai',
    slug: 'blush-godh-bharai',
    category: 'baby-shower',
    description: 'A gentle, celebratory layout for Godh Bharai and baby showers, with room for blessings and family hosts.',
    supportedLanguages: ['English', 'Hindi', 'Gujarati'],
    previewImages: [],
    demoUrl: '/templates/blush-godh-bharai',
    price: { base: 799, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'blush-godh', layout: 'floral', primaryColor: '#9C3D54', goldColor: '#E0B25A', background: '#FFF5F7' },
    demoData: demo({
      names: { primary: 'Ananya & Family' },
      events: [{ title: 'Godh Bharai', date: '2026-03-08', startTime: '11:00', venueName: 'Home Courtyard', address: 'Surat' }],
    }),
  },
  {
    name: 'Little Star Birthday',
    slug: 'little-star-birthday',
    category: 'birthday',
    description: 'Playful yet elegant birthday invitation for children and adults, with party time, venue and maps.',
    supportedLanguages: ['English', 'Hindi'],
    previewImages: [],
    demoUrl: '/templates/little-star-birthday',
    price: { base: 499, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'little-star', layout: 'modern', primaryColor: '#B23A48', goldColor: '#E8B923', background: '#FFF8EE' },
    demoData: demo({
      names: { primary: 'Aarohi turns 5' },
      events: [{ title: 'Birthday Party', date: '2026-04-12', startTime: '16:00', venueName: 'Sunshine Studio', address: 'Pune' }],
    }),
  },
  {
    name: 'Sacred Diya Pooja',
    slug: 'sacred-diya-pooja',
    category: 'pooja',
    description: 'Calm, traditional styling for Griha Pooja, Satyanarayan Katha and other home ceremonies.',
    supportedLanguages: ['English', 'Hindi', 'Gujarati'],
    previewImages: [],
    demoUrl: '/templates/sacred-diya-pooja',
    price: { base: 699, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'sacred-diya', layout: 'classic', primaryColor: '#7A2E12', goldColor: '#C89B3C', background: '#FFF6E8' },
    demoData: demo({
      names: { primary: 'Joshi Family Pooja' },
      events: [{ title: 'Satyanarayan Katha', date: '2026-02-02', startTime: '09:00', venueName: 'Residence', address: 'Vadodara' }],
    }),
  },
  {
    name: 'New Nest Housewarming',
    slug: 'new-nest-housewarming',
    category: 'housewarming',
    description: 'A welcoming Griha Pravesh invitation with space for muhurat, address and family hosts.',
    supportedLanguages: ['English', 'Gujarati'],
    previewImages: [],
    demoUrl: '/templates/new-nest-housewarming',
    price: { base: 699, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'new-nest', layout: 'modern', primaryColor: '#5E142B', goldColor: '#C89B3C', background: '#FFF9F2' },
    demoData: demo({
      names: { primary: 'Welcome to our new home' },
      events: [{ title: 'Griha Pravesh', date: '2026-05-03', startTime: '10:30', venueName: 'New Residence', address: 'Bengaluru' }],
    }),
  },
  {
    name: 'Golden Years Anniversary',
    slug: 'golden-years-anniversary',
    category: 'anniversary',
    description: 'Elegant gold-and-ivory anniversary invitation for milestone celebrations with dinner and blessings.',
    supportedLanguages: ['English', 'Hindi'],
    previewImages: [],
    demoUrl: '/templates/golden-years-anniversary',
    price: { base: 899, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'golden-years', layout: 'classic', primaryColor: '#4A2C2A', goldColor: '#C89B3C', background: '#FFF8F0' },
    demoData: demo({
      names: { primary: '25 years of togetherness' },
      events: [{ title: 'Anniversary Dinner', date: '2026-06-21', startTime: '19:30', venueName: 'The Ivory Hall', address: 'Delhi' }],
    }),
  },
  {
    name: 'Saffron Celebration',
    slug: 'saffron-celebration',
    category: 'other',
    description: 'A versatile festive template for naming ceremonies, mundan, upanayan and other family occasions.',
    supportedLanguages: ['English', 'Hindi', 'Gujarati'],
    previewImages: [],
    demoUrl: '/templates/saffron-celebration',
    price: { base: 799, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'saffron', layout: 'floral', primaryColor: '#A14A18', goldColor: '#D4A017', background: '#FFF7EC' },
    demoData: demo({
      names: { primary: 'Naming Ceremony' },
      events: [{ title: 'Namkaran', date: '2026-03-22', startTime: '11:00', venueName: 'Community Hall', address: 'Jaipur' }],
    }),
  },
  {
    name: 'Moonlight Mehendi Evening',
    slug: 'moonlight-mehendi-evening',
    category: 'wedding',
    description: 'Evening mehendi styling with deep wine and gold, designed for multi-event wedding weeks.',
    supportedLanguages: ['English', 'Hindi'],
    previewImages: [],
    demoUrl: '/templates/moonlight-mehendi-evening',
    price: { base: 1199, currency: 'INR' },
    features: FEATURES,
    themeConfig: { id: 'moonlight-mehendi', layout: 'classic', primaryColor: '#5E142B', goldColor: '#C89B3C', background: '#1A1014' },
    demoData: demo({
      names: { primary: 'Aarav & Kavya' },
      events: [
        { title: 'Mehendi', date: '2026-02-12', startTime: '16:00', venueName: 'Terrace Garden', address: 'Mumbai' },
        { title: 'Sangeet', date: '2026-02-13', startTime: '19:00', venueName: 'The Grand Lawn', address: 'Mumbai' },
      ],
    }),
  },
]

export async function seedTemplates({ replace = false } = {}) {
  const existing = await Template.countDocuments()
  if (existing && !replace) return existing
  if (replace) await Template.deleteMany({})
  await Template.insertMany(templates)
  return templates.length
}

const isCli = process.argv[1]?.replaceAll('\\', '/').endsWith('/src/scripts/seed.js')
if (isCli) {
  connectDb()
    .then(() => seedTemplates({ replace: true }))
    .then((count) => {
      console.log(`Seeded ${count} templates`)
      process.exit(0)
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
