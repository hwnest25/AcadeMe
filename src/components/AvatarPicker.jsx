// components/AvatarPicker.jsx

import persistentPerfectionistImg from '../assets/persona_illustrations/persistent_perfectionist.png';
import lastMinuteLegendImg from '../assets/persona_illustrations/last_minute_legend.png';
import strategicSprinterImg from '../assets/persona_illustrations/strategic_sprinter.png';
import aiAddictImg from '../assets/persona_illustrations/ai_addict.png';
import effortlessEinsteinImg from '../assets/persona_illustrations/effortless_einstein.png';
import consistentClimberImg from '../assets/persona_illustrations/consistent_climber.png';

export const PERSONA_AVATARS = [
  { key: 'persistent_perfectionist', label: 'The Persistent Perfectionist', emoji: '🧐', image: persistentPerfectionistImg },
  { key: 'lastminute_legend',         label: 'The Last-Minute Legend',       emoji: '🫠', image: lastMinuteLegendImg },
  { key: 'strategic_sprinter',        label: 'The Strategic Sprinter',       emoji: '⏱️', image: strategicSprinterImg },
  { key: 'ai_addict',                 label: 'The AI Addict',                emoji: '🤖', image: aiAddictImg },
  { key: 'effortless_einstein',       label: 'The Effortless Einstein',      emoji: '😏', image: effortlessEinsteinImg },
  { key: 'consistent_climber',        label: 'The Consistent Climber',       emoji: '🧱', image: consistentClimberImg },
];

export const getAvatarSrc = (key) =>
  PERSONA_AVATARS.find((a) => a.key === key)?.image ?? null;

export const getAvatarEmoji = (key) =>
  PERSONA_AVATARS.find((a) => a.key === key)?.emoji ?? '🎓';

const AvatarPicker = ({ selected, onChange }) => {
  return (
    <div className="avatar-picker">
      <label id="avatar-picker-label">Choose your persona avatar</label>
      <div className="avatar-grid" role="radiogroup" aria-labelledby="avatar-picker-label">
        {PERSONA_AVATARS.map(({ key, label, emoji, image }) => (
          <button
            key={key}
            type="button"
            className={`avatar-option${selected === key ? ' selected' : ''}`}
            onClick={() => onChange(key)}
            aria-label={label}
            aria-pressed={selected === key}
            title={label}
          >
            {image ? (
              <img src={image} alt={label} loading="lazy" />
            ) : (
              <span className="avatar-emoji-fallback" aria-hidden="true">{emoji}</span>
            )}
          </button>
        ))}
      </div>
      {selected && (
        <p className="avatar-selected-label" aria-live="polite">
          Selected: {PERSONA_AVATARS.find((a) => a.key === selected)?.label}
        </p>
      )}
    </div>
  );
};

export default AvatarPicker;

