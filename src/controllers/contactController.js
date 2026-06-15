import ContactMessage from '../models/ContactMessage.js';

export async function createContactMessage(req, res, next) {
  try {
    const contactMessage = await ContactMessage.create(req.body);
    res.status(201).json({
      message: 'Contact message received',
      contactMessage
    });
  } catch (error) {
    next(error);
  }
}
