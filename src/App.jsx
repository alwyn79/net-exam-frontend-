import { useState } from 'react';
import ExamPage from './pages/ExamPage';
import ResultPage from './pages/ResultPage';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [result, setResult] = useState(null);

  const startExam = () => {
    setPage('exam');
  };

  const handleFinish = (resultData) => {
    setResult(resultData);
    setPage('result');
  };

  const returnHome = () => {
    setPage('home');
    setResult(null);
  };

  return (
    <div className="app-container">
      {page === 'home' && (
        <div className="home-page">
          <h1>NET Preparation MCQ Exam</h1>
          <p>Welcome to Phase-1 MCQ Prep!</p>
          <p>This mock exam has randomly selected questions from a database of Software Engineering, SDLC, SDLC Models, and Software Process topics.</p>
          <div className="home-stats">
            <ul>
              <li><strong>Duration:</strong> 30 Minutes</li>
              <li><strong>Questions:</strong> 20 Questions</li>
              <li><strong>Type:</strong> Multiple Choice</li>
            </ul>
          </div>
          <button onClick={startExam} className="btn-primary start-btn">Start Exam Now</button>
        </div>
      )}
      
      {page === 'exam' && <ExamPage onFinish={handleFinish} />}
      
      {page === 'result' && <ResultPage result={result} onReturnHome={returnHome} />}
    </div>
  );
}

export default App;
