import mongoose from 'mongoose';

const sermonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    speaker: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    audioUrl: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Sermon', sermonSchema);
