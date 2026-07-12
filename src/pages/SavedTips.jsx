// pages/SavedTips.jsx

import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { listTips, toggleBookmark, submitFeedback, removeFeedback } from '../services/tipService.js';
import { PERSONA_AVATARS } from '../components/AvatarPicker.jsx';
import '../styles/tips.css';

const SavedTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subject: '',
    education_level: '',
    persona_key: '',
    is_bookmarked: '',
    sort: 'newest',
  });

  const fetchTips = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '')
      );
      const res = await listTips(params);
      setTips(res.data.tips);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchTips(); }, [fetchTips]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookmark = async (id) => {
    try {
      const res = await toggleBookmark(id);
      setTips((prev) =>
        prev.map((t) => t.id === id ? { ...t, is_bookmarked: res.data.is_bookmarked } : t)
      );
    } catch (err) { console.error(err); }
  };

  const handleFeedback = async (id, currentValue, newValue) => {
    try {
      if (currentValue === newValue) {
        await removeFeedback(id);
        setTips((prev) =>
          prev.map((t) => t.id === id ? { ...t, feedback_value: null } : t)
        );
      } else {
        await submitFeedback(id, newValue);
        setTips((prev) =>
          prev.map((t) => t.id === id ? { ...t, feedback_value: newValue } : t)
        );
      }
    } catch (err) { console.error(err); }
  };

  return (
    <main className="tips-container">
      <div className="tips-header">
        <h1>My Saved Tips</h1>
        <Link to="/generate" className="btn-primary">+ Generate New Tips</Link>
      </div>

      {/* Filter bar */}
      <div className="filter-bar" role="search" aria-label="Filter study tips">
        <input
          name="subject"
          type="search"
          placeholder="Search by subject…"
          value={filters.subject}
          onChange={handleFilterChange}
          aria-label="Search by subject"
        />
        <select
          name="education_level"
          value={filters.education_level}
          onChange={handleFilterChange}
          aria-label="Filter by education level"
        >
          <option value="">All levels</option>
          <option value="university">University</option>
          <option value="high_school">High School</option>
        </select>
        <select
          name="persona_key"
          value={filters.persona_key}
          onChange={handleFilterChange}
          aria-label="Filter by persona"
        >
          <option value="">All personas</option>
          <option value="persistent_perfectionist">Persistent Perfectionist</option>
          <option value="lastminute_legend">Last-Minute Legend</option>
          <option value="strategic_sprinter">Strategic Sprinter</option>
          <option value="ai_addict">AI Addict</option>
          <option value="effortless_einstein">Effortless Einstein</option>
          <option value="consistent_climber">Consistent Climber</option>
        </select>
        <select
          name="is_bookmarked"
          value={filters.is_bookmarked}
          onChange={handleFilterChange}
          aria-label="Filter bookmarks"
        >
          <option value="">All tips</option>
          <option value="true">Bookmarked only</option>
        </select>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          aria-label="Sort order"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {loading ? (
        <p aria-live="polite">Loading tips…</p>
      ) : tips.length === 0 ? (
        <div className="empty-state">
          <p>No tips found. Try adjusting your filters or generate some new tips.</p>
          <Link to="/generate" className="btn-primary" style={{ marginTop: '1rem' }}>
            Generate Tips
          </Link>
        </div>
      ) : (
        <ul className="tips-grid" role="list" aria-label="Saved study tips">
          {tips.map((tip) => (
            <li key={tip.id} className="tip-card">
              <div className="tip-card-header">
                <Link to={`/tips/${tip.id}`} className="tip-card-title">
                  {tip.title}
                </Link>
                <button
                  className={`bookmark-btn${tip.is_bookmarked ? ' bookmarked' : ''}`}
                  onClick={() => handleBookmark(tip.id)}
                  aria-label={tip.is_bookmarked ? 'Remove bookmark' : 'Bookmark this tip'}
                  aria-pressed={tip.is_bookmarked}
                >
                  {tip.is_bookmarked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                  )}
                </button>
              </div>

              <div className="tip-meta">
                <span className="tag tag-persona">
                  {(() => {
                    const av = PERSONA_AVATARS.find((a) => a.key === tip.persona_key);
                    return av?.image ? (
                      <img src={av.image} alt="" aria-hidden="true" style={{ width: 16, height: 16, borderRadius: 3, objectFit: 'cover', marginRight: 4, verticalAlign: 'middle' }} />
                    ) : null;
                  })()}
                  {tip.persona_name}
                </span>
                <span className="tag tag-subject">{tip.subject}</span>
                <span className="tag tag-level">
                  {tip.education_level === 'university' ? 'University' : 'High School'}
                </span>
              </div>

              <div className="tip-card-footer">
                <div className="feedback-btns" role="group" aria-label="Rate this tip">
                  <button
                    className={`feedback-btn${tip.feedback_value === 'up' ? ' active-up' : ''}`}
                    onClick={() => handleFeedback(tip.id, tip.feedback_value, 'up')}
                    aria-label="This tip resonates with me"
                    aria-pressed={tip.feedback_value === 'up'}
                    title="Resonates"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                  </button>
                  <button
                    className={`feedback-btn${tip.feedback_value === 'down' ? ' active-down' : ''}`}
                    onClick={() => handleFeedback(tip.id, tip.feedback_value, 'down')}
                    aria-label="This tip does not resonate with me"
                    aria-pressed={tip.feedback_value === 'down'}
                    title="Doesn't resonate"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>
                  </button>
                </div>
                <span className="tip-date">
                  {new Date(tip.created_at).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SavedTips;
