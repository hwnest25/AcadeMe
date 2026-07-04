// pages/Profile.jsx

import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { updateProfile } from '../services/userService.js';
import AvatarPicker, { getAvatarSrc, getAvatarEmoji } from '../components/AvatarPicker.jsx';
import '../styles/auth.css';
import '../styles/profile.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    avatar_seed: user?.avatar_seed || 'persistent_perfectionist',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const avatarSrc = getAvatarSrc(user?.avatar_seed);
  const avatarEmoji = getAvatarEmoji(user?.avatar_seed);

  const handleChange = (e) => {
    setError('');
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim()) { setError('Username cannot be empty.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await updateProfile(form);
      setUser(res.data.user);
      setSuccess('Profile updated successfully.');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="profile-container">
      <h1 style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
        My Profile
      </h1>

      {success && (
        <div
          className="auth-error"
          style={{ background: '#f0fdf4', borderColor: '#86efac', color: '#166534' }}
          role="status"
          aria-live="polite"
        >
          {success}
        </div>
      )}

      <div className="profile-card">
        {!editing ? (
          <>
            <div className="profile-avatar-section">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={`${user?.username}'s avatar`}
                  className="profile-avatar"
                />
              ) : (
                <span style={{ fontSize: '4rem' }} aria-hidden="true">{avatarEmoji}</span>
              )}
              <div>
                <p className="profile-username">{user?.username}</p>
                <p className="profile-email">{user?.email}</p>
              </div>
            </div>

            {user?.bio ? (
              <p className="profile-bio">{user.bio}</p>
            ) : (
              <p className="profile-bio" style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                No bio added yet.
              </p>
            )}

            <p className="profile-meta">
              Member since {new Date(user?.created_at).toLocaleDateString()}
            </p>

            <button
              className="btn-primary"
              onClick={() => setEditing(true)}
              style={{ alignSelf: 'flex-start' }}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form className="profile-edit-form" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="auth-error" role="alert" aria-live="assertive">{error}</div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your study style…"
              />
            </div>

            <AvatarPicker
              selected={form.avatar_seed}
              onChange={(key) => setForm((prev) => ({ ...prev, avatar_seed: key }))}
            />

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="auth-btn" disabled={loading} aria-busy={loading}>
                {loading ? 'Saving…' : 'Save Changes'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => { setEditing(false); setError(''); }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default Profile;
