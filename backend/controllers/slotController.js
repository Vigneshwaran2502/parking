import { slots } from '../models/slotModel.js';

export const getSlots = (req, res) => {
  res.json(slots);
};

export const addSlot = (req, res) => {
  const slot = req.body;
  slots.push(slot);
  res.status(201).json(slot);
};

export const updateSlot = (req, res) => {
  const { id } = req.params;
  const index = slots.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ message: 'Slot not found' });
  slots[index] = { ...slots[index], ...req.body };
  res.json(slots[index]);
};

export const deleteSlot = (req, res) => {
  const { id } = req.params;
  const index = slots.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ message: 'Slot not found' });
  slots.splice(index, 1);
  res.json({ message: 'Slot deleted' });
};
