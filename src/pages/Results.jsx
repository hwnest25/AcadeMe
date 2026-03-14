// Pages/Results.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { personas } from "../data/personas.js";

const Results = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const FinalPersona = personas[state?.persona || 'perfectionist'];

    return (
        <div className="results-container">
            <div className="results-card">
                <div className="results-header">
                    <div className="confetti">🎉</div>
                    <div className="persona-emoji">{FinalPersona.emoji}</div>
                    <h1 className="results-title">Your Study Persona</h1>
                    <h2 className="persona-name">{FinalPersona.name}</h2>
                    <p className="persona-description">{FinalPersona.description}</p>
                </div>

                <div className="persona-section">
                    <h3 className="section-title">
                        <span className="section-icon">💪</span>
                        Your Strengths
                    </h3>
                    <ul className="persona-list strengths-list">
                        {FinalPersona.strengths.map((strength, i) => (
                            <li key={i}>
                                <span className="list-bullet">✓</span>
                                {strength}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="persona-section">
                    <h3 className="section-title">
                        <span className="section-icon">⚠️</span>
                        Challenges to Watch
                    </h3>
                    <ul className="persona-list challenges-list">
                        {FinalPersona.challenges.map((challenge, i) => (
                            <li key={i}>
                                <span className="list-bullet">!</span>
                                {challenge}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="persona-section">
                    <h3 className="section-title">
                        <span className="section-icon">💡</span>
                        Tips for Success
                    </h3>
                    <ul className="persona-list tips-list">
                        {FinalPersona.tips.map((tip, i) => (
                            <li key={i}>
                                <span className="list-bullet">→</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="results-actions">
                    <button className="action-button primary" onClick={() => navigate("/Quiz")}>
                        <span>🔄</span> Retake Quiz
                    </button>
                    <button className="action-button secondary" onClick={() => navigate("/")}>
                        <span>🏠</span> Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;