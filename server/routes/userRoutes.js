// routes/userRoutes.js

import { Router } from 'express';
import { getProfile, editProfile, getDashboard } from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.put('/me', requireAuth, editProfile);
router.get('/me/dashboard', requireAuth, getDashboard);

export default router;
