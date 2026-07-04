// models/quizModel.js
// Database queries for quiz results

import pool from '../config/db.js';

export const saveQuizResult = async ({ user_id, persona_key, answers_json }) => {
  const personaResult = await pool.query(
    'SELECT id FROM personas WHERE key = $1',
    [persona_key]
  );
  const persona = personaResult.rows[0];
  if (!persona) throw new Error(`Unknown persona key: ${persona_key}`);

  const result = await pool.query(
    `INSERT INTO quiz_results (user_id, persona_id, answers_json)
     VALUES ($1, $2, $3)
     RETURNING id, created_at`,
    [user_id, persona.id, JSON.stringify(answers_json)]
  );
  return result.rows[0];
};

export const getLatestQuizResult = async (user_id) => {
  const result = await pool.query(
    `SELECT qr.id, qr.created_at, qr.answers_json,
            p.key AS persona_key, p.name AS persona_name, p.emoji
     FROM quiz_results qr
     JOIN personas p ON p.id = qr.persona_id
     WHERE qr.user_id = $1
     ORDER BY qr.created_at DESC
     LIMIT 1`,
    [user_id]
  );
  return result.rows[0] || null;
};

export const getAllPersonas = async () => {
  const result = await pool.query(
    'SELECT id, key, name, emoji, description, strengths, challenges, general_tips FROM personas ORDER BY id'
  );
  return result.rows;
};
