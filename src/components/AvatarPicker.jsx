// components/AvatarPicker.jsx
// Author: Fabian
// Persona-based avatar selector — users pick an avatar that matches one of the
// 6 study personas. Images live in src/assets/persona_illustrations/.
// For personas without an image yet, an emoji fallback card is shown.
// To add a missing image: drop the file into persona_illustrations/ and update
// the `image` field below from null to the import.

import persistentPerfectionistImg from '../assets/persona_illustrations/persistent_perfectionist.png';
import lastMinuteLegendImg from '../assets/persona_illustrations/last_minute_legend.png';
import strategicSprinterImg from '../assets/persona_illustrations/strategic_sprinter.png';
import aiAddictImg from '../assets/persona_illustrations/ai_addict.png';
// Swap null → import once illustrations are ready:
// import effortlessEinsteinImg from '../assets/persona_illustrations/effortless_einstein.png';
// import consistentClimberImg from '../assets/persona_illustrations/consistent_climber.png';

export const PERSONA_AVATARS = [
  {
    key: 'persistent_perfectionist',
    label: 'The Persistent Perfectionist',
    emoji: '🧐',
    image: persistentPerfectionistImg,
  },
  {
    key: 'lastminute_legend',
    label: 'The Last-Minute Legend',
    emoji: '🫠',
    image: lastMinuteLegendImg,
  },
  {
    key: 'strategic_sprinter',
    label: 'The Strategic Sprinter',
    emoji: '⏱️',
    image: strategicSprinterImg,
  },
  {
    key: 'ai_addict',
    label: 'The AI Addict',
    emoji: '🤖',
    image: aiAddictImg,
  },
  {
    key: 'effortless_einstein',
    label: 'The Effortless Einstein',
    emoji: '😏',
    image: null, // swap in illustration when ready
  },
  {
    key: 'consistent_climber',
    label: 'The Consistent Climber',
    emoji: '🧱',
    image: null, // swap in illustration when ready
  },
];

/** Returns the image src or null for a given avatar key */
export const getAvatarSrc = (key) =>
  PERSONA_AVATARS.find((a) => a.key === key)?.image ?? null;

/** Returns the emoji fallback for a given avatar key */
export const getAvatarEmoji = (key) =>
  PERSONA_AVATARS.find((a) => a.key === key)?.emoji ?? '🎓';

const AvatarPicker = ({ selected, onChange }) => {
  return (
    <div className="avatar-picker">
      <label id="avatar-picker-label">Choose your study persona avatar</label>
      <div
        className="avatar-grid"
        role="radiogroup"
        aria-labelledby="avatar-picker-label"
      >
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
              <span className="avatar-emoji-fallback" aria-hidden="true">
                {emoji}
              </span>
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
