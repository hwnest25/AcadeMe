// Database queries for generated study tips (main CRUD content)

import pool from '../config/db.js';

export const createTip = async ({ user_id, persona_key, subject, education_level, title, content }) => {
  const personaResult = await pool.query(
    'SELECT id FROM personas WHERE key = $1',
    [persona_key]
  );
  const persona = personaResult.rows[0];
  if (!persona) throw new Error(`Unknown persona key: ${persona_key}`);

  const result = await pool.query(
    `INSERT INTO generated_tips (user_id, persona_id, subject, education_level, title, content)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [user_id, persona.id, subject, education_level, title, content]
  );
  return result.rows[0];
};

export const getTipsByUser = async (user_id, { subject, education_level, persona_key, is_bookmarked, sort } = {}) => {
  let query = `
    SELECT gt.id, gt.subject, gt.education_level, gt.title, gt.content,
           gt.is_bookmarked, gt.created_at, gt.updated_at,
           p.key AS persona_key, p.name AS persona_name, p.emoji,
           tf.feedback_value
    FROM generated_tips gt
    JOIN personas p ON p.id = gt.persona_id
    LEFT JOIN tip_feedback tf ON tf.tip_id = gt.id AND tf.user_id = $1
    WHERE gt.user_id = $1
  `;
  const params = [user_id];
  let idx = 2;

  if (subject) {
    query += ` AND gt.subject ILIKE $${idx}`;
    params.push(`%${subject}%`);
    idx++;
  }
  if (education_level) {
    query += ` AND gt.education_level = $${idx}`;
    params.push(education_level);
    idx++;
  }
  if (persona_key) {
    query += ` AND p.key = $${idx}`;
    params.push(persona_key);
    idx++;
  }
  if (is_bookmarked === 'true') {
    query += ` AND gt.is_bookmarked = TRUE`;
  }

  query += sort === 'oldest'
    ? ' ORDER BY gt.created_at ASC'
    : ' ORDER BY gt.created_at DESC';

  const result = await pool.query(query, params);
  return result.rows;
};

export const getTipById = async (id, user_id) => {
  const result = await pool.query(
    `SELECT gt.id, gt.subject, gt.education_level, gt.title, gt.content,
            gt.is_bookmarked, gt.created_at, gt.updated_at,
            p.key AS persona_key, p.name AS persona_name, p.emoji,
            tf.feedback_value
     FROM generated_tips gt
     JOIN personas p ON p.id = gt.persona_id
     LEFT JOIN tip_feedback tf ON tf.tip_id = gt.id AND tf.user_id = $2
     WHERE gt.id = $1 AND gt.user_id = $2`,
    [id, user_id]
  );
  return result.rows[0] || null;
};

export const updateTip = async (id, user_id, { title, content }) => {
  const result = await pool.query(
    `UPDATE generated_tips
     SET title = COALESCE($1, title),
         content = COALESCE($2, content),
         updated_at = NOW()
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [title, content, id, user_id]
  );
  return result.rows[0] || null;
};

export const deleteTip = async (id, user_id) => {
  const result = await pool.query(
    'DELETE FROM generated_tips WHERE id = $1 AND user_id = $2 RETURNING id',
    [id, user_id]
  );
  return result.rows[0] || null;
};

export const toggleBookmark = async (id, user_id) => {
  const result = await pool.query(
    `UPDATE generated_tips
     SET is_bookmarked = NOT is_bookmarked, updated_at = NOW()
     WHERE id = $1 AND user_id = $2
     RETURNING id, is_bookmarked`,
    [id, user_id]
  );
  return result.rows[0] || null;
};
