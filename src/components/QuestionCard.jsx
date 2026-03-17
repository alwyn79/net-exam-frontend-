const QuestionCard = ({ question, currentNumber, totalQuestions, selectedOption, onSelectOption }) => {
    if (!question) return null;

    return (
        <div className="question-card">
            <span className="topic-badge">{question.topic}</span>
            <div className="question-text">
                <strong>Q{currentNumber} of {totalQuestions}:</strong> {question.question}
            </div>
            <div className="options-list">
                {question.options.map((option, index) => (
                    <div 
                        key={index} 
                        className={`option-item ${selectedOption === option ? 'selected' : ''}`}
                        onClick={() => onSelectOption(question._id, option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
