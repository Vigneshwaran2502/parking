import express from 'express';
import { dashboard, manageSlots, manageBookings } from '../controllers/adminController.js';
const router = express.Router();
router.get('/dashboard', dashboard);
router.post('/slots', manageSlots);
router.post('/bookings', manageBookings);
export default router;
