import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <main className="home-container">

            <article className="home-card">

                <header>

                    <div className="home-emoji">
                        <span aria-hidden="true">🔍</span>
                    </div>

                    <h1 className="home-title">
                        Discover your Study Persona
                    </h1>

                    <p className="home-subtitle">
                        Take the quiz to identify your learner profile and get tips to boost your academic success!
                    </p>

                </header>


                {/* FEATURE LIST */}
                <section>

                    <ul className="home-features">

                        <li className="feature-item">
                            <span
                                className="feature-icon"
                                aria-hidden="true"
                            >
                                📊
                            </span>
                            <span className="feature-text">
                                10 Questions
                            </span>
                        </li>

                        <li className="feature-item">
                            <span
                                className="feature-icon"
                                aria-hidden="true"
                            >
                                🧠
                            </span>
                            <span className="feature-text">
                                6 Personas
                            </span>
                        </li>

                        <li className="feature-item">
                            <span
                                className="feature-icon"
                                aria-hidden="true"
                            >
                                💡
                            </span>
                            <span className="feature-text">
                                Expert Tips
                            </span>
                        </li>

                    </ul>

                </section>


                {/* START QUIZ BUTTON */}
                <section className="home-actions">

                    <button
                        className="start-button"
                        onClick={() => navigate("/quiz")}
                        aria-label="Start the AcadeMe study persona quiz"
                    >
                        Take the Quiz
                        <span
                            className="button-arrow"
                            aria-hidden="true"
                        >
                            →
                        </span>
                    </button>

                </section>


                <footer>

                    <p className="home-note">
                        Duration: ~2 minutes
                    </p>

                </footer>

            </article>

        </main>
    );
};

export default Home;