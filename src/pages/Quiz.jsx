// Pages/Quiz.jsx
import QuestionCards from "../components/QuestionCards.jsx";
import { useState } from "react";
import { questions } from "../data/questions.js";
import PersonaCalculator from "../utils/PersonaCalculator.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/Quiz.css";

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
                state: { persona: result },
            });
        } else {
            setAnswers(newAnswers);
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="quiz-container">
            <div className="quiz-card">
                <div className="quiz-header">
                    <div className="progress-info">
                        <span className="question-counter">
                            Question {currentIndex + 1} of {questions.length}
                        </span>
                    </div>
                        <span className="progress-percentage">{Math.round(progress)}%</span>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                <QuestionCards
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                />
            </div>
        </div>
    );
};

export default Quiz;