// routes/quizRoutes.js
// Author: Hope

import { Router } from 'express';
import { submitQuizResult, getLatestResult, listPersonas } from '../controllers/quizController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/results', requireAuth, submitQuizResult);
router.get('/latest', requireAuth, getLatestResult);
router.get('/personas', listPersonas);

export default router;
