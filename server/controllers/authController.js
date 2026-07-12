// Auth request handling (Register, login, logout, session check)

import jwt from 'jsonwebtoken';
import passport from '../config/passport.js';
import { createUser, findUserByEmail } from '../models/userModel.js';

const signToken = (user) =>
  jwt.sign(
    { id: user.id, username: user.username, email: user.email, bio: user.bio, avatar_seed: user.avatar_seed, created_at: user.created_at },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

export const register = async (req, res) => {
  const { username, email, password, bio, avatar_seed } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  try {
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = await createUser({ username, email, password, bio, avatar_seed });
    const token = signToken(user);
    return res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || 'Login failed.' });

    const token = signToken(user);
    return res.json({ token, user: sanitizeUser(user) });
  })(req, res, next);
};

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully.' });
};

export const getMe = (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};

const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  bio: user.bio,
  avatar_seed: user.avatar_seed,
  created_at: user.created_at,
});
