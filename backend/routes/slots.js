import express from 'express';
import { getSlots, addSlot, updateSlot, deleteSlot } from '../controllers/slotController.js';
const router = express.Router();
router.get('/', getSlots);
router.post('/', addSlot);
router.put('/:id', updateSlot);
router.delete('/:id', deleteSlot);
export default router;
