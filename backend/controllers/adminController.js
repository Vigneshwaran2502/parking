import { slots } from '../models/slotModel.js';
import { bookings } from '../models/bookingModel.js';

export const dashboard = (req, res) => {
  res.json({ totalSlots: slots.length, totalBookings: bookings.length });
};

export const manageSlots = (req, res) => {
  // Placeholder for admin slot management
  res.json({ message: 'Admin slot management' });
};

export const manageBookings = (req, res) => {
  // Placeholder for admin booking management
  res.json({ message: 'Admin booking management' });
};
