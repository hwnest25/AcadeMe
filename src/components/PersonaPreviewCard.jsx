const PersonaPreviewCard = ({ persona }) => {
  return (
    <div className="persona-card">
      <div className="persona-card-emoji">{persona.emoji}</div>

      <h3 className="persona-card-name">
        {persona.name}
      </h3>

      <p className="persona-card-description">
        {persona.description.substring(0,120)}...
      </p>

      <div className="persona-highlights">
        <div className="highlight">
          <span className="highlight-label">Key Strength:</span>
          <span className="highlight-text">
            {persona.strengths[0]}
          </span>
        </div>

        <div className="highlight">
          <span className="highlight-label">Main Challenge:</span>
          <span className="highlight-text">
            {persona.challenges[0]}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PersonaPreviewCard