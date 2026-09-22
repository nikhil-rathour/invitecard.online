import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    invitationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitation', required: true, index: true },
    title: { type: String, required: true, trim: true },
    date: { type: Date },
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
    venueName: { type: String, default: '' },
    address: { type: String, default: '' },
    mapsUrl: { type: String, default: '' },
    description: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

eventSchema.index({ invitationId: 1, sortOrder: 1 })

export const Event = mongoose.model('Event', eventSchema)
