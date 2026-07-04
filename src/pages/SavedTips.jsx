// pages/SavedTips.jsx
// Author: Fabian

import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { listTips, toggleBookmark, submitFeedback, removeFeedback } from '../services/tipService.js';
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
                  className="bookmark-btn"
                  onClick={() => handleBookmark(tip.id)}
                  aria-label={tip.is_bookmarked ? 'Remove bookmark' : 'Bookmark this tip'}
                  aria-pressed={tip.is_bookmarked}
                >
                  {tip.is_bookmarked ? '🔖' : '🏷️'}
                </button>
              </div>

              <div className="tip-meta">
                <span className="tag tag-persona">
                  {tip.emoji} {tip.persona_name}
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
                  >
                    👍
                  </button>
                  <button
                    className={`feedback-btn${tip.feedback_value === 'down' ? ' active-down' : ''}`}
                    onClick={() => handleFeedback(tip.id, tip.feedback_value, 'down')}
                    aria-label="This tip does not resonate with me"
                    aria-pressed={tip.feedback_value === 'down'}
                  >
                    👎
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
