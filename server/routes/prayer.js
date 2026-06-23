import { Router } from 'express';
import PrayerRequest from '../models/PrayerRequest.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, request, isAnonymous } = req.body;
    if (!request) {
      return res.status(400).json({ message: 'Prayer request text is required' });
    }
    const prayer = await PrayerRequest.create({
      name: isAnonymous ? 'Anonymous' : (name || 'Anonymous'),
      email: isAnonymous ? '' : (email || ''),
      request,
      isAnonymous: !!isAnonymous,
    });
    res.status(201).json({ message: 'Your prayer request has been received. Our team is praying for you.', id: prayer._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', authMiddleware, async (_req, res) => {
  try {
    const prayers = await PrayerRequest.find().sort({ createdAt: -1 });
    res.json(prayers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const prayer = await PrayerRequest.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!prayer) return res.status(404).json({ message: 'Prayer request not found' });
    res.json(prayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await PrayerRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
