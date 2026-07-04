// Pages/Quiz.jsx
import QuestionCards from "../components/QuestionCards.jsx";
import { useState } from "react";
import { questions } from "../data/questions.js";
import PersonaCalculator from "../utils/PersonaCalculator.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/quiz.css";

const Quiz = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleAnswer = (persona) => {
        const newAnswers = [...answers, persona];

        if (currentIndex + 1 === questions.length) {
            const result = PersonaCalculator(newAnswers);
            navigate("/results", {
                state: { persona: result, answers: newAnswers },
            });
        } else {
            setAnswers(newAnswers);
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <main className="quiz-container">

            <section className="quiz-card">

                <header className="quiz-header">

                    {/* Accessible question counter */}
                    <div className="progress-info">
                        <span
                            className="question-counter"
                            aria-live="polite"
                        >
                            Question {currentIndex + 1} of {questions.length}
                        </span>
                    </div>

                    {/* Visible progress percentage */}
                    <span
                        className="progress-percentage"
                        aria-hidden="true"
                    >
                        {Math.round(progress)}%
                    </span>

                    {/* Accessible progress bar */}
                    <div
                        className="progress-bar-container"
                        role="progressbar"
                        aria-label="Quiz progress"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow={Math.round(progress)}
                    >
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                </header>

                {/* Live region for question updates */}
                <section
                    className="question-section"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <QuestionCards
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                    />
                </section>

            </section>

        </main>
    );
};

export default Quiz;