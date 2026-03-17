import { useState, useEffect } from 'react';
import { fetchQuestions, submitExamData } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';

const ExamPage = ({ onFinish }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const data = await fetchQuestions();
                setQuestions(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch questions. Have you seeded the database and is the backend running?');
                setLoading(false);
            }
        };
        loadQuestions();
    }, []);

    const handleSelectOption = (questionId, option) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const submitExam = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const resultData = await submitExamData(answers, questions.length);
            onFinish(resultData);
        } catch (err) {
            setError('Failed to submit exam. Please try again.');
            setIsSubmitting(false);
        }
    };

    const handleTimeUp = () => {
        submitExam();
    };

    if (loading) return <div className="loading">Loading exam questions...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (questions.length === 0) return <div>No questions available.</div>;

    const currentQuestion = questions[currentIndex];

    return (
        <div className="exam-page">
            <div className="exam-header">
                <h2>NET Preparation Exam</h2>
                <Timer durationMinutes={30} onTimeUp={handleTimeUp} />
            </div>

            <QuestionCard 
                question={currentQuestion} 
                currentNumber={currentIndex + 1} 
                totalQuestions={questions.length} 
                selectedOption={answers[currentQuestion._id]} 
                onSelectOption={handleSelectOption} 
            />

            <div className="question-controls">
                <button 
                    className="btn-secondary" 
                    onClick={handlePrev} 
                    disabled={currentIndex === 0}
                >
                    Previous
                </button>
                
                {currentIndex < questions.length - 1 ? (
                    <button className="btn-primary" onClick={handleNext}>Next</button>
                ) : (
                    <button className="btn-success" onClick={submitExam} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Exam'}
                    </button>
                )}
            </div>
            
            {currentIndex < questions.length - 1 && (
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <button className="btn-success" onClick={submitExam} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Exam Early'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExamPage;
