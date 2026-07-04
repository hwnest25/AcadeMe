// controllers/quizController.js
// Author: Hope
// Handles saving quiz results and fetching personas

import { saveQuizResult, getLatestQuizResult, getAllPersonas } from '../models/quizModel.js';

export const submitQuizResult = async (req, res) => {
  const { persona_key, answers_json } = req.body;

  if (!persona_key || !answers_json) {
    return res.status(400).json({ message: 'persona_key and answers_json are required.' });
  }

  try {
    const result = await saveQuizResult({
      user_id: req.user.id,
      persona_key,
      answers_json,
    });
    res.status(201).json({ result });
  } catch (err) {
    console.error('Submit quiz error:', err);
    res.status(500).json({ message: err.message || 'Server error.' });
  }
};

export const getLatestResult = async (req, res) => {
  try {
    const result = await getLatestQuizResult(req.user.id);
    if (!result) return res.status(404).json({ message: 'No quiz results found.' });
    res.json({ result });
  } catch (err) {
    console.error('Get latest quiz error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const listPersonas = async (req, res) => {
  try {
    const personas = await getAllPersonas();
    res.json({ personas });
  } catch (err) {
    console.error('List personas error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};
