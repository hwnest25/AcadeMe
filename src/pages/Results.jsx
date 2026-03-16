// Pages/Results.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { personas } from "../data/persona_details.js";
import "../styles/results.css";

const Results = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const personaKey = state?.persona;
    const FinalPersona = personaKey ? personas[personaKey] : null;

    if (!FinalPersona) {
        return (
            <main className="results-container">
                <section className="results-card">
                    <p role="alert">
                        Something went wrong. Please retake the quiz.
                    </p>

                    <button
                        onClick={() => navigate("/quiz")}
                        className="action-button primary"
                        aria-label="Retake the study persona quiz"
                    >
                        Retake Quiz
                    </button>
                </section>
            </main>
        );
    }

    return (
        <main className="results-container">

            <article
                className="results-card"
                aria-live="polite"
                aria-atomic="true"
            >

                <header className="results-header">

                    <div className="confetti" aria-hidden="true">
                        🎉
                    </div>

                    <div className="persona-emoji">
                        <span aria-hidden="true">
                            {FinalPersona.emoji}
                        </span>
                    </div>

                    <h1 className="results-title">
                        Your Study Persona
                    </h1>

                    <h2 className="persona-name">
                        {FinalPersona.name}
                    </h2>

                    <p className="persona-description">
                        {FinalPersona.description}
                    </p>

                </header>


                {/* STRENGTHS */}
                <section className="persona-section">

                    <h3 className="section-title">
                        <span className="section-icon" aria-hidden="true">
                            💪
                        </span>
                        Your Strengths
                    </h3>

                    <ul className="persona-list strengths-list">
                        {FinalPersona.strengths.map((strength, i) => (
                            <li key={i}>
                                <span
                                    className="list-bullet"
                                    aria-hidden="true"
                                >
                                    ✓
                                </span>
                                {strength}
                            </li>
                        ))}
                    </ul>

                </section>


                {/* CHALLENGES */}
                <section className="persona-section">

                    <h3 className="section-title">
                        <span className="section-icon" aria-hidden="true">
                            ⚠️
                        </span>
                        Challenges to Watch
                    </h3>

                    <ul className="persona-list challenges-list">
                        {FinalPersona.challenges.map((challenge, i) => (
                            <li key={i}>
                                <span
                                    className="list-bullet"
                                    aria-hidden="true"
                                >
                                    !
                                </span>
                                {challenge}
                            </li>
                        ))}
                    </ul>

                </section>


                {/* TIPS */}
                <section className="persona-section">

                    <h3 className="section-title">
                        <span className="section-icon" aria-hidden="true">
                            💡
                        </span>
                        Tips for Success
                    </h3>

                    <ul className="persona-list tips-list">
                        {FinalPersona.tips.map((tip, i) => (
                            <li key={i}>
                                <span
                                    className="list-bullet"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                                {tip}
                            </li>
                        ))}
                    </ul>

                </section>


                <footer className="results-actions">

                    <button
                        className="action-button primary"
                        onClick={() => navigate("/quiz")}
                        aria-label="Retake the study persona quiz"
                    >
                        <span aria-hidden="true">🔄</span>
                        Retake Quiz
                    </button>

                    <button
                        className="action-button secondary"
                        onClick={() => navigate("/")}
                        aria-label="Return to the AcadeMe homepage"
                    >
                        <span aria-hidden="true">🏠</span>
                        Back to Home
                    </button>

                </footer>

            </article>

        </main>
    );
};

export default Results;