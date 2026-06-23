import { Router } from 'express';
import TeamMember from '../models/TeamMember.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: 'Team member not found' });
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Team member not found' });
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
