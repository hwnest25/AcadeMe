// components/QuestionCards.jsx

const QuestionCards = ({ question, onAnswer }) => {
    return (
        <div className="question-card">
            <h2 className="question-text">{question.question}</h2>
            <div className="options-container">
                {question.options.map((option, i) => (
                    <button
                        key={i}
                        className="option-button"
                        onClick={() => onAnswer(option.persona)}
                    >
                        <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                        <span className="option-text">{option.text}</span>
                        <span className="option-arrow">→</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCards;