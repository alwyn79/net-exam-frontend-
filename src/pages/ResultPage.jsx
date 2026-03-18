const ResultPage = ({ result, onReturnHome }) => {
    if (!result) return <div>No Result Available</div>;

    return (
        <div className="result-page">
            <h2>Exam Completed!</h2>

            <div className="score-box">
                <h3>Your Score: {result.score} / {result.totalQuestions}</h3>
                <p>({result.percentage}%)</p>
            </div>

            <div className="result-details">
                <div className="detail-item">
                    <span>Total Questions</span>
                    <strong>{result.totalQuestions}</strong>
                </div>
                <div className="detail-item">
                    <span>Attempted</span>
                    <strong>{result.attempted}</strong>
                </div>
                <div className="detail-item">
                    <span>Correct</span>
                    <strong style={{ color: '#2ecc71' }}>{result.correct}</strong>
                </div>
                <div className="detail-item">
                    <span>Wrong</span>
                    <strong style={{ color: '#e74c3c' }}>{result.wrong}</strong>
                </div>
            </div>

            <div style={{ marginTop: '40px' }}>
                <button className="btn-primary" onClick={onReturnHome}>Back to Home</button>
            </div>
        </div>
    );
};

export default ResultPage;