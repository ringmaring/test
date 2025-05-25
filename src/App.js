import React, { useState } from 'react';
import './App.css';

const questions = [
  "키오스크 화면의 글씨를 읽는 것이 쉬웠나요?",
  "화면의 버튼을 눌러 원하는 기능을 찾는 데 어려움이 있었나요?",
  "결제까지 완료하는 데 혼자 할 수 있었나요?",
  "주변 도움 없이 처음부터 끝까지 할 수 있었나요?",
  "화면 안내가 충분히 이해되었나요?"
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (score) => {
    const next = currentQuestion + 1;
    const updatedAnswers = [...answers, score];
    setAnswers(updatedAnswers);
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setCompleted(true);
    }
  };

  const average = answers.length > 0
    ? (answers.reduce((a, b) => a + b, 0) / answers.length).toFixed(1)
    : 0;

  return (
    <div className="app-container">
      <div className="card">
        {!completed ? (
          <>
            <h1 className="title">디지털 적응력 테스트</h1>
            <p className="question">
              <span className="question-number">Q{currentQuestion + 1}.</span> {questions[currentQuestion]}
            </p>
            <div className="button-group">
              {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} onClick={() => handleAnswer(num)} className="score-button">
                  {num}점
                </button>
              ))}
            </div>
            <p className="progress">({currentQuestion + 1}/{questions.length} 문항)</p>
          </>
        ) : (
          <>
            <h2 className="complete-title">🎉 설문 완료!</h2>
            <p className="result">응답 점수: <span className="highlight">{answers.join(', ')}</span></p>
            <p className="result">평균 점수: <span className="highlight average">{average}점</span></p>
            <p className="note">이 결과는 키오스크 적응력을 파악하는 데 사용됩니다.</p>
          </>
        )}
      </div>
    </div>
  );
}
