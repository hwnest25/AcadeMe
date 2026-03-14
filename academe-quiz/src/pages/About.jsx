// Pages/About.jsx
import { personas } from "../data/personas.js";

const About = () => {
    const personaList = Object.values(personas);

    return (
        <div className="about-container">
            <div className="about-card">
                <div className="about-header">
                    <div className="about-icon">📚</div>
                    <h1 className="about-title">About ACADEME Quiz</h1>
                    <p className="about-tagline">Discover Your Learning Style</p>
                </div>

                <div className="about-section">
                    <h2 className="section-heading">What is This Quiz?</h2>
                    <p className="about-text">
                        The ACADEME Study Persona Quiz is an interactive assessment designed
                        to help students understand their unique learning patterns and study habits.
                        By answering 10 carefully crafted questions about your study approach,
                        you'll discover which of five distinct personas best matches your learning style.
                    </p>
                    <p className="about-text">
                        This quiz was created to provide students with personalized insights,
                        actionable tips, and a better understanding of their strengths and
                        challenges. Whether you're a perfectionist planner or a last-minute legend,
                        you'll gain valuable knowledge about how to optimize your study habits.
                    </p>
                </div>

                <div className="about-section">
                    <h2 className="section-heading">Meet the Five Personas</h2>
                    <div className="personas-grid">
                        {personaList.map((persona, index) => (
                            <div key={index} className="persona-card">
                                <div className="persona-card-emoji">{persona.emoji}</div>
                                <h3 className="persona-card-name">{persona.name}</h3>
                                <p className="persona-card-description">
                                    {persona.description.substring(0, 120)}...
                                </p>
                                <div className="persona-highlights">
                                    <div className="highlight">
                                        <span className="highlight-label">Key Strength:</span>
                                        <span className="highlight-text">{persona.strengths[0]}</span>
                                    </div>
                                    <div className="highlight">
                                        <span className="highlight-label">Main Challenge:</span>
                                        <span className="highlight-text">{persona.challenges[0]}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="about-section">
                    <h2 className="section-heading">How It Works</h2>
                    <div className="steps-container">
                        <div className="step-item">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h4>Answer Questions</h4>
                                <p>Respond honestly to 10 questions about your study habits</p>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h4>Get Your Persona</h4>
                                <p>Discover which learning style matches you best</p>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h4>Improve Your Study</h4>
                                <p>Apply personalized tips to enhance your learning</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-footer">
                    <p>Ready to discover your study persona?</p>
                    <a href="/Quiz" className="cta-button">Take the Quiz</a>
                </div>
            </div>
        </div>
    );
};

export default About;