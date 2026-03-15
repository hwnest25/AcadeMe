// Pages/Home.jsx
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-card">
                <div className="home-emoji">🎯</div>
                <h1 className="home-title">Discover your Study Persona</h1>
                <p className="home-subtitle">
                    Take the quiz to identify your learner profile and get tips to boost your academic success!
                </p>
                <div className="home-features">
                    <div className="feature-item">
                        <span className="feature-icon">📊</span>
                        <span className="feature-text">10 Questions</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">🧠</span>
                        <span className="feature-text">6 Personas</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">💡</span>
                        <span className="feature-text">Expert Tips</span>
                    </div>
                </div>
                <button className="start-button" onClick={() => navigate("/quiz")}>
                    Take the Quiz
                    <span className="button-arrow">→</span>
                </button>
                <p className="home-note">Duration: ~2 minutes</p>
            </div>
        </div>
    );
};

export default Home;