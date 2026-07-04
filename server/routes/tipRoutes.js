// routes/tipRoutes.js
// Author: Hope

import { Router } from 'express';
import {
  saveTip,
  listTips,
  getTip,
  editTip,
  removeTip,
  bookmarkTip,
} from '../controllers/tipController.js';
import { submitFeedback, removeFeedback } from '../controllers/feedbackController.js';
import { generateTip } from '../controllers/aiController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// All tip routes require authentication
router.use(requireAuth);

// AI generation
router.post('/generate', generateTip);

// CRUD
router.get('/', listTips);
router.post('/', saveTip);
router.get('/:id', getTip);
router.put('/:id', editTip);
router.delete('/:id', removeTip);

// Bookmark toggle
router.patch('/:id/bookmark', bookmarkTip);

// Feedback
router.post('/:id/feedback', submitFeedback);
router.delete('/:id/feedback', removeFeedback);

export default router;
