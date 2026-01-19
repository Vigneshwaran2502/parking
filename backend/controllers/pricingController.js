import { pricing } from '../models/pricingModel.js';

export const getPricing = (req, res) => {
  res.json(pricing);
};

export const calculatePricing = (req, res) => {
  const { duration } = req.body;
  const price = duration * pricing.ratePerHour;
  res.json({ price });
};
