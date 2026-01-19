import express from 'express';
import { getUserStats, updateUserStats } from '../controllers/userController.js';
const router = express.Router();

router.get('/stats', getUserStats);
router.patch('/stats', updateUserStats);

export default router;
