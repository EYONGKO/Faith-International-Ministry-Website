import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
