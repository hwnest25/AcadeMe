// controllers/tipController.js
// CRUD operations for saved study tips

import {
  createTip,
  getTipsByUser,
  getTipById,
  updateTip,
  deleteTip,
  toggleBookmark,
} from '../models/tipModel.js';

export const saveTip = async (req, res) => {
  const { persona_key, subject, education_level, title, content } = req.body;

  if (!persona_key || !subject || !education_level || !title || !content) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const tip = await createTip({
      user_id: req.user.id,
      persona_key,
      subject,
      education_level,
      title,
      content,
    });
    res.status(201).json({ tip });
  } catch (err) {
    console.error('Save tip error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const listTips = async (req, res) => {
  const { subject, education_level, persona_key, is_bookmarked, sort } = req.query;
  try {
    const tips = await getTipsByUser(req.user.id, {
      subject,
      education_level,
      persona_key,
      is_bookmarked,
      sort,
    });
    res.json({ tips });
  } catch (err) {
    console.error('List tips error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const getTip = async (req, res) => {
  try {
    const tip = await getTipById(req.params.id, req.user.id);
    if (!tip) return res.status(404).json({ message: 'Tip not found.' });
    res.json({ tip });
  } catch (err) {
    console.error('Get tip error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const editTip = async (req, res) => {
  const { title, content } = req.body;
  try {
    const tip = await updateTip(req.params.id, req.user.id, { title, content });
    if (!tip) return res.status(404).json({ message: 'Tip not found.' });
    res.json({ tip });
  } catch (err) {
    console.error('Edit tip error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const removeTip = async (req, res) => {
  try {
    const deleted = await deleteTip(req.params.id, req.user.id);
    if (!deleted) return res.status(404).json({ message: 'Tip not found.' });
    res.json({ message: 'Tip deleted successfully.' });
  } catch (err) {
    console.error('Delete tip error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const bookmarkTip = async (req, res) => {
  try {
    const tip = await toggleBookmark(req.params.id, req.user.id);
    if (!tip) return res.status(404).json({ message: 'Tip not found.' });
    res.json({ id: tip.id, is_bookmarked: tip.is_bookmarked });
  } catch (err) {
    console.error('Bookmark tip error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};
