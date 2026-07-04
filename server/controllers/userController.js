// controllers/userController.js
// Handles user profile retrieval and editing

import { findUserById, updateUser } from '../models/userModel.js';
import pool from '../config/db.js';

export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const editProfile = async (req, res) => {
  const { username, bio, avatar_seed } = req.body;
  try {
    const updated = await updateUser(req.user.id, { username, bio, avatar_seed });
    if (!updated) return res.status(404).json({ message: 'User not found.' });
    res.json({ user: updated });
  } catch (err) {
    console.error('Edit profile error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Latest quiz result
    const quizResult = await pool.query(
      `SELECT qr.id, qr.created_at, p.name AS persona_name, p.emoji, p.key AS persona_key
       FROM quiz_results qr
       JOIN personas p ON p.id = qr.persona_id
       WHERE qr.user_id = $1
       ORDER BY qr.created_at DESC
       LIMIT 1`,
      [userId]
    );

    // Recent saved tips (last 5)
    const recentTips = await pool.query(
      `SELECT id, title, subject, education_level, is_bookmarked, created_at
       FROM generated_tips
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 5`,
      [userId]
    );

    res.json({
      latestQuizResult: quizResult.rows[0] || null,
      recentTips: recentTips.rows,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};
