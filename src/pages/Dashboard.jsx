// pages/Dashboard.jsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboard } from '../services/userService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { getAvatarSrc, getAvatarEmoji, PERSONA_AVATARS } from '../components/AvatarPicker.jsx';
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
              style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', border: '2px solid #a78bca' }}
            />
          ) : (
            <span style={{ fontSize: '2.5rem' }} aria-hidden="true">{avatarEmoji}</span>
          )}
          <div>
            <h1>Hey, {user?.username}</h1>
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
                {(() => {
                  const avatarData = PERSONA_AVATARS.find(
                    (a) => a.key === data.latestQuizResult.persona_key
                  );
                  return avatarData?.image ? (
                    <img
                      src={avatarData.image}
                      alt={data.latestQuizResult.persona_name}
                      style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} aria-label={data.latestQuizResult.persona_name} />
                  );
                })()}
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
