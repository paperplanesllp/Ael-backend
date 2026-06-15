import Booking from '../models/Booking.js';

export async function getBookings(req, res, next) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
}

export async function createBooking(req, res, next) {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({
      message: 'Booking request received',
      booking
    });
  } catch (error) {
    next(error);
  }
}
