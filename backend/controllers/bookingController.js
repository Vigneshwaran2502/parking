import { bookings } from '../models/bookingModel.js';
import { slots } from '../models/slotModel.js';
import { v4 as uuidv4 } from 'uuid';

export const getBookings = (req, res) => {
  res.json(bookings);
};

import { users } from '../models/userModel.js';

export const createBooking = (req, res) => {
  const { slotId, user, startTime, endTime } = req.body;

  const slotIndex = slots.findIndex(s => s.id === slotId);
  if (slotIndex === -1) return res.status(404).json({ message: 'Slot not found' });

  // Calculate duration in hours
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationHours = (end - start) / (1000 * 60 * 60);

  // Pricing logic (using 60 as standard rate per App.tsx, though pricingModel said 10. Let's align with App.tsx for consistency)
  const standardRate = 60;
  const totalCost = durationHours * standardRate; // Simplified for now, or use req.body.totalCost if frontend sends discount logic

  // Calculate Rewards
  let creditsEarned = 0;
  const slot = slots[slotIndex];
  if (slot.type === 'EV') creditsEarned += 50;
  if (slot.type === 'CARPOOL') creditsEarned += 80;
  if (durationHours < 2) creditsEarned += 20;

  // CO2 Saved (simplified logic)
  const co2Saved = 12.4 / 24; // approx per booking based on initial stats? Or use random/calculated.
  // App.tsx adds bookingData.co2Saved. Let's assume passed or calculate specific.
  // Let's use a fixed 0.5kg for now or what is passed.
  const calculatedCo2 = 0.5 * durationHours;

  const booking = { id: uuidv4(), slotId, user, startTime, endTime, totalCost, creditsEarned, co2Saved: calculatedCo2 };
  bookings.push(booking);

  // Update Slot Status
  slots[slotIndex].status = 'OCCUPIED'; // or RESERVED

  // Update User Stats
  const userObj = users.find(u => u.username === (user || 'demo')); // default to demo
  if (userObj) {
    userObj.stats.totalBookings += 1;
    userObj.stats.totalCO2Saved += calculatedCo2;
    userObj.stats.carbonCredits += creditsEarned;
    userObj.stats.totalSpent += totalCost;

    // Canopy logic
    const growthBoost = Math.round((creditsEarned / 100) * 15);
    userObj.stats.canopyLevel += growthBoost;
    if (userObj.stats.canopyLevel >= 100) {
      userObj.stats.treesPlanted += 1;
      userObj.stats.canopyLevel = userObj.stats.canopyLevel % 100;
    }
  }

  res.status(201).json(booking);
};

export const cancelBooking = (req, res) => {
  const { id } = req.params;
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'Booking not found' });
  bookings.splice(index, 1);
  res.json({ message: 'Booking cancelled' });
};
