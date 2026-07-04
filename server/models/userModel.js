// models/userModel.js
// Author: Hope
// All database queries related to users

import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const createUser = async ({ username, email, password, bio = '', avatar_seed = 'default' }) => {
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash, bio, avatar_seed)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, username, email, bio, avatar_seed, created_at`,
    [username, email, password_hash, bio, avatar_seed]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
};

export const findUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, username, email, bio, avatar_seed, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const updateUser = async (id, { username, bio, avatar_seed }) => {
  const result = await pool.query(
    `UPDATE users
     SET username = COALESCE($1, username),
         bio = COALESCE($2, bio),
         avatar_seed = COALESCE($3, avatar_seed),
         updated_at = NOW()
     WHERE id = $4
     RETURNING id, username, email, bio, avatar_seed, created_at, updated_at`,
    [username, bio, avatar_seed, id]
  );
  return result.rows[0] || null;
};
