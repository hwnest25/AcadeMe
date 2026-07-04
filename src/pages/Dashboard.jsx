// pages/Dashboard.jsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboard } from '../services/userService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { getAvatarSrc, getAvatarEmoji } from '../components/AvatarPicker.jsx';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const avatarSrc = getAvatarSrc(user?.avatar_seed);
  const avatarEmoji = getAvatarEmoji(user?.avatar_seed);

  return (
    <main className="dashboard-container">
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={`${user?.username}'s avatar`}
              style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', border: '2px solid #aa3bff' }}
            />
          ) : (
            <span style={{ fontSize: '2.5rem' }} aria-hidden="true">{avatarEmoji}</span>
          )}
          <div>
            <h1>Hey, {user?.username} 👋</h1>
            <p>Here's your study dashboard.</p>
          </div>
        </div>
      </header>

      {loading ? (
        <p aria-live="polite">Loading your dashboard…</p>
      ) : (
        <div className="dashboard-grid">
          {/* Persona result */}
          <section className="dashboard-card" aria-labelledby="persona-heading">
            <h2 id="persona-heading">Your Study Persona</h2>
            {data?.latestQuizResult ? (
              <div className="persona-result-banner">
                <span className="emoji" aria-hidden="true">
                  {data.latestQuizResult.emoji}
                </span>
                <div>
                  <h3>{data.latestQuizResult.persona_name}</h3>
                  <p>
                    Diagnosed{' '}
                    {new Date(data.latestQuizResult.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't taken the quiz yet.</p>
                <Link to="/quiz" className="btn-primary" style={{ marginTop: '0.75rem' }}>
                  Take the Quiz
                </Link>
              </div>
            )}
          </section>

          {/* Recent tips */}
          <section className="dashboard-card" aria-labelledby="tips-heading">
            <h2 id="tips-heading">Recent Study Tips</h2>
            {data?.recentTips?.length ? (
              <ul className="tip-list" role="list">
                {data.recentTips.map((tip) => (
                  <li key={tip.id}>
                    <Link to={`/tips/${tip.id}`} className="tip-list-item">
                      <span>{tip.title}</span>
                      <span className="tip-subject">{tip.subject}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">No saved tips yet.</div>
            )}
          </section>

          {/* Actions */}
          <div className="dashboard-actions">
            <Link to="/generate" className="btn-primary">Generate Study Tips</Link>
            <Link to="/tips" className="btn-secondary">View All Tips</Link>
            <Link to="/quiz" className="btn-secondary">Retake Quiz</Link>
            <Link to="/profile" className="btn-secondary">Edit Profile</Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
