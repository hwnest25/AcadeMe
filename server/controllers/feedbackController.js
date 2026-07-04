// controllers/feedbackController.js
// Author: Hope
// Handles thumbs up / thumbs down feedback on tips

import { upsertFeedback, deleteFeedback } from '../models/feedbackModel.js';

export const submitFeedback = async (req, res) => {
  const { feedback_value } = req.body;
  const tip_id = parseInt(req.params.id, 10);

  if (!['up', 'down'].includes(feedback_value)) {
    return res.status(400).json({ message: 'feedback_value must be "up" or "down".' });
  }

  try {
    const feedback = await upsertFeedback({
      tip_id,
      user_id: req.user.id,
      feedback_value,
    });
    res.json({ feedback });
  } catch (err) {
    console.error('Feedback error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const removeFeedback = async (req, res) => {
  const tip_id = parseInt(req.params.id, 10);
  try {
    await deleteFeedback({ tip_id, user_id: req.user.id });
    res.json({ message: 'Feedback removed.' });
  } catch (err) {
    console.error('Remove feedback error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};
