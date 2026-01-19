import express from 'express';
import cors from 'cors';
import { slots } from './models/slotModel.js';
import { users } from './models/userModel.js';

import authRoutes from './routes/auth.js';
import slotRoutes from './routes/slots.js';
import bookingRoutes from './routes/bookings.js';
import pricingRoutes from './routes/pricing.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/users.js';
import paymentRoutes from './routes/payment.js';

const app = express();
app.use(cors());
app.use(express.json());
// ... (existing code) ...

app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
