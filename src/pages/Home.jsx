import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import iconQuiz from "../assets/icons/icon-quiz.svg";
import iconPersonas from "../assets/icons/icon-personas.svg";
import iconTips from "../assets/icons/icon-tips.svg";

const Home = () => {
    const navigate = useNavigate();

    return (
        <main className="home-container">
            <article className="home-card">

                {/* LEFT — text + CTA */}
                <div className="home-content">
                    <h1 className="home-title">Discover your<br />Study Persona</h1>

                    <p className="home-subtitle">
                        Take the quiz to identify your learner profile and get personalised tips to boost your academic success.
                    </p>

                    <div className="home-actions">
                        <button
                            className="start-button"
                            onClick={() => navigate("/quiz")}
                            aria-label="Start the AcadeMe study persona quiz"
                        >
                            Take the Quiz
                            <span className="button-arrow" aria-hidden="true">→</span>
                        </button>
                    </div>

                    <p className="home-note">Duration: ~2 minutes</p>
                </div>

                {/* RIGHT — feature stats */}
                <ul className="home-features" aria-label="Key features">
                    <li className="feature-item">
                        <img src={iconQuiz} alt="" aria-hidden="true" className="feature-icon" />
                        <span className="feature-text">10 Questions</span>
                    </li>
                    <li className="feature-item">
                        <img src={iconPersonas} alt="" aria-hidden="true" className="feature-icon" />
                        <span className="feature-text">6 Personas</span>
                    </li>
                    <li className="feature-item">
                        <img src={iconTips} alt="" aria-hidden="true" className="feature-icon" />
                        <span className="feature-text">Expert Tips</span>
                    </li>
                </ul>

            </article>
        </main>
    );
};

export default Home;
