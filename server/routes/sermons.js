import { Router } from 'express';
import Sermon from '../models/Sermon.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const sermons = await Sermon.find().sort({ date: -1 });
    res.json(sermons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const sermon = await Sermon.findById(req.params.id);
    if (!sermon) return res.status(404).json({ message: 'Sermon not found' });
    res.json(sermon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const sermon = await Sermon.create(req.body);
    res.status(201).json(sermon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sermon) return res.status(404).json({ message: 'Sermon not found' });
    res.json(sermon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndDelete(req.params.id);
    if (!sermon) return res.status(404).json({ message: 'Sermon not found' });
    res.json({ message: 'Sermon deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
