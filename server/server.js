import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Sermon from './models/Sermon.js';
import Event from './models/Event.js';
import Announcement from './models/Announcement.js';
import TeamMember from './models/TeamMember.js';
import Contact from './models/Contact.js';
import Admin from './models/Admin.js';

import sermonRoutes from './routes/sermons.js';
import eventRoutes from './routes/events.js';
import announcementRoutes from './routes/announcements.js';
import teamRoutes from './routes/team.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';
import prayerRoutes from './routes/prayer.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Faith International Ministry API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/sermons', sermonRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/prayer', prayerRoutes);

async function seedDatabase() {
  const sermonCount = await Sermon.countDocuments();
  if (sermonCount === 0) {
  await Sermon.insertMany([
    {
      title: 'Church Worship & Program',
      speaker: 'Prophet AKO GABRIEL',
      date: new Date('2026-06-22'),
      description: 'A powerful worship service and church program capturing the spirit of our congregation in praise and fellowship.',
      videoUrl: '/Videos of church programs/church videos.mp4',
      thumbnail: '/images of Church Programs/Faith international Images (3).jpeg',
    },
    {
      title: 'Walking by Faith',
      speaker: 'Prophet AKO GABRIEL',
      date: new Date('2026-06-15'),
      description: 'Discover what it means to trust God in every season of life. Faith is not the absence of doubt — it is choosing to trust God anyway.',
      videoUrl: '/Videos of church programs/man of GOD Sermon.mp4',
      thumbnail: '/images of Church Programs/Faith international Images (7).jpeg',
    },
    {
      title: 'The Power of Prayer',
      speaker: 'Prophet AKO GABRIEL',
      date: new Date('2026-06-08'),
      description: 'Learn how consistent prayer transforms hearts and communities. Prayer is the foundation of everything we do.',
      videoUrl: '',
      thumbnail: '/images of Church Programs/Faith international Images (12).jpeg',
    },
    {
      title: 'Living in God\'s Grace',
      speaker: 'Prophet AKO GABRIEL',
      date: new Date('2026-06-01'),
      description: 'Understanding the depth of God\'s grace and how it changes the way we live, love, and serve others.',
      videoUrl: '',
      thumbnail: '/images of Church Programs/Faith international Images (18).jpeg',
    },
    {
      title: 'The Armor of God',
      speaker: 'Prophet AKO GABRIEL',
      date: new Date('2026-05-25'),
      description: 'A study of Ephesians 6 — putting on the full armor of God to stand firm against the challenges of life.',
      videoUrl: '',
      thumbnail: '/images of Church Programs/Faith international Images (22).jpeg',
    },
    {
      title: 'Hope in Dark Times',
      speaker: 'Prophet AKO GABRIEL',
      date: new Date('2026-05-18'),
      description: 'When life gets difficult, God\'s Word gives us an anchor. This message explores biblical hope that does not disappoint.',
      videoUrl: '',
      thumbnail: '/images of Church Programs/Faith international Images (27).jpeg',
    },
  ]);

  await Event.insertMany([
    {
      title: 'Sunday Worship Service',
      date: new Date('2026-06-29'),
      time: '9:00 AM',
      location: 'Main Sanctuary',
      description: 'Join us for worship, fellowship, and an uplifting message.',
      image: '/images of Church Programs/Faith international Images (27).jpeg',
    },
    {
      title: 'Church Building Project',
      date: new Date('2026-07-05'),
      time: '6:00 PM',
      location: 'Church Grounds',
      description: 'Join us as we advance the construction of our new church building. Your support, prayers, and contributions are helping us build a lasting home for God\'s people.',
      image: '/images of Church Programs/Faith international Images (9).jpeg',
    },
    {
      title: 'Community Outreach Day',
      date: new Date('2026-07-12'),
      time: '9:00 AM',
      location: 'Church Grounds',
      description: 'Join us as we serve our community through food sharing, prayer, and practical support.',
      image: '/images of Church Programs/Faith international Images (15).jpeg',
    },
  ]);

  await Announcement.insertMany([
    {
      title: 'Welcome to Faith International Ministry',
      content: 'We are glad you are here. Join us every Sunday at 10 AM for worship and fellowship.',
      isActive: true,
    },
  ]);

  await TeamMember.insertMany([
    {
      name: 'Prophet AKO GABRIEL',
      role: 'Senior Pastor',
      bio: 'Pastor John has served our congregation for over 10 years with a heart for teaching and community outreach.',
      photo: '/images of Church Programs/Faith international Images (5).jpeg',
      order: 1,
    },
    {
      name: 'Sarah Johnson',
      role: 'Worship Leader',
      bio: 'Sarah leads our worship team and helps create an atmosphere of praise every Sunday.',
      photo: '/images of Church Programs/Faith international Images (11).jpeg',
      order: 2,
    },
    {
      name: 'Michael Brown',
      role: 'Youth Pastor',
      bio: 'Michael mentors young people and organizes weekly youth programs and outreach events.',
      photo: '/images of Church Programs/Faith international Images (20).jpeg',
      order: 3,
    },
  ]);
  }

  const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@faithministry.org' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'changeme123', 10);
    await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@faithministry.org',
      password: hashedPassword,
    });
  }
}

async function startServer() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/faith-international-ministry';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB');

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
