import { users } from '../models/userModel.js';

export const getUserStats = (req, res) => {
    const user = users[0];
    if (!user) {
        return res.json({
            totalCO2Saved: 12.4,
            totalBookings: 24,
            carbonCredits: 1450,
            totalSpent: 4500,
            totalSavedOnGreen: 820,
            canopyLevel: 62,
            treesPlanted: 4
        });
    }
    res.json(user.stats);
};

export const updateUserStats = (req, res) => {
    const user = users[0];
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.stats = { ...user.stats, ...req.body };
    res.json(user.stats);
};
