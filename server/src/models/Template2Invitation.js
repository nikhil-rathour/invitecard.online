import mongoose from 'mongoose'

const milestoneSchema = new mongoose.Schema(
  {
    year: { type: String, default: '' },
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
  },
  { _id: false }
)

const eventSchema = new mongoose.Schema(
  {
    id: { type: String, default: '' },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: '' },
    date: { type: String, default: '' },
    time: { type: String, default: '' },
    venue: { type: String, default: '' },
    dressCode: { type: String, default: '' },
    icon: {
      type: String,
      enum: ['Sparkles', 'Music', 'Sun', 'Crown', 'Wine'],
      default: 'Sparkles',
    },
    desc: { type: String, default: '' },
  },
  { _id: false }
)

const galleryItemSchema = new mongoose.Schema(
  {
    caption: { type: String, default: '' },
    image: { type: String, default: '' },
    tag: { type: String, default: '' },
    likes: { type: String, default: '1,200' },
  },
  { _id: false }
)

const wishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    relation: { type: String, default: 'Well Wisher', trim: true },
    message: { type: String, required: true, trim: true },
    date: { type: String, default: 'Just now' },
  },
  { timestamps: true }
)

const template2Schema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: {
      type: String,
      enum: ['draft', 'ready', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    language: {
      type: String,
      enum: ['English', 'Hindi', 'Gujarati'],
      default: 'English',
    },

    // Couple Details
    brideName: { type: String, default: 'Ananya' },
    brideFullName: { type: String, default: 'Ananya Sharma' },
    brideParents: { type: String, default: '' },
    brideGrandparents: { type: String, default: '' },
    brideInsta: { type: String, default: '' },

    groomName: { type: String, default: 'Rohan' },
    groomFullName: { type: String, default: 'Rohan Varma' },
    groomParents: { type: String, default: '' },
    groomGrandparents: { type: String, default: '' },
    groomInsta: { type: String, default: '' },

    hashtag: { type: String, default: '#RohanWedsAnanya' },

    // Dates & Venue
    date: { type: String, default: 'December 12, 2026' },
    formattedDate: { type: String, default: 'Saturday, 12th December 2026' },
    venue: { type: String, default: 'The Raj Palace' },
    venueSubtext: { type: String, default: 'Amber Road, Jaipur' },
    city: { type: String, default: 'Jaipur, Rajasthan' },
    mapUrl: { type: String, default: '' },

    // Welcome Message
    welcomeText: {
      type: String,
      default:
        'With the celestial blessings of Lord Ganesha and our elders, we cordially invite you to celebrate the Shahi Vivah of our beloved children.',
    },

    // Story
    story: {
      title: { type: String, default: 'Our Jaipur Fairytale' },
      subtitle: {
        type: String,
        default: 'Two hearts, two souls, bound together under the royal skies of Rajasthan.',
      },
      milestones: { type: [milestoneSchema], default: [] },
    },

    // Events Itinerary
    events: { type: [eventSchema], default: [] },

    // Instagram & Gallery Section
    instagramSection: {
      title: { type: String, default: 'Couple Moments & Instagram Handles' },
      subtitle: {
        type: String,
        default: 'Follow our journey and tag your photos with our official hashtag',
      },
      brideHandle: { type: String, default: 'ananya.sharma_official' },
      groomHandle: { type: String, default: 'rohan_varma_official' },
      hashtag: { type: String, default: '#RohanWedsAnanya' },
      gallery: { type: [galleryItemSchema], default: [] },
    },

    // Initial Wishes
    initialWishes: { type: [wishSchema], default: [] },

    // Host Contact
    hostContact: {
      phone1: { type: String, default: '' },
      phone2: { type: String, default: '' },
      email: { type: String, default: '' },
    },
  },
  { timestamps: true }
)

template2Schema.index({ ownerId: 1, createdAt: -1 })

export const Template2Invitation = mongoose.model(
  'Template2Invitation',
  template2Schema
)
