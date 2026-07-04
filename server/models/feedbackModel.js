// models/feedbackModel.js
// Author: Hope
// Database queries for tip feedback (thumbs up / thumbs down)

import pool from '../config/db.js';

export const upsertFeedback = async ({ tip_id, user_id, feedback_value }) => {
  const result = await pool.query(
    `INSERT INTO tip_feedback (tip_id, user_id, feedback_value)
     VALUES ($1, $2, $3)
     ON CONFLICT (tip_id, user_id)
     DO UPDATE SET feedback_value = EXCLUDED.feedback_value, created_at = NOW()
     RETURNING *`,
    [tip_id, user_id, feedback_value]
  );
  return result.rows[0];
};

export const deleteFeedback = async ({ tip_id, user_id }) => {
  const result = await pool.query(
    'DELETE FROM tip_feedback WHERE tip_id = $1 AND user_id = $2 RETURNING id',
    [tip_id, user_id]
  );
  return result.rows[0] || null;
};
