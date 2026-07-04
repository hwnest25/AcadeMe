// controllers/authController.js
// Author: Mourad
// Handles register, login, logout, and session check

import passport from '../config/passport.js';
import { createUser, findUserByEmail } from '../models/userModel.js';

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

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: 'Login after register failed.' });
      return res.status(201).json({ user });
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || 'Login failed.' });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ user: sanitizeUser(user) });
    });
  })(req, res, next);
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully.' });
    });
  });
};

export const getMe = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }
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
