import mongoose from 'mongoose';

const prayerRequestSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Anonymous' },
    email: { type: String, default: '' },
    request: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('PrayerRequest', prayerRequestSchema);
