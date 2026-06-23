import { Router } from 'express';
import Contact from '../models/Contact.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Thank you for reaching out. We will get back to you soon.', contact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', authMiddleware, async (_req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!contact) return res.status(404).json({ message: 'Message not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
