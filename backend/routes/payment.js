import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv'; // Assuming dotenv is available or I might need to load it. 
// Standard env vars usually loaded in index but good to be safe.

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_Rv8cTIJoSHbhQM', // Fallback for prototype speed if env fails
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'O1Lm58aNKCamcB2xbLgUe0WX'
});

router.post('/orders', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const options = {
            amount: amount * 100, // Amount in smallest currency unit (paise)
            currency: currency || 'INR',
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ error: 'Some error occured' });
        }

        res.json(order);
    } catch (error) {
        console.error('Razorpay Error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
