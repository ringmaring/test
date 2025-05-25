import React, { useState } from 'react';

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

  const handleAnswer = (score) => {
    const next = currentQuestion + 1;
    setAnswers([...answers, score]);
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      alert("모든 질문이 완료되었습니다!\n점수: " + [...answers, score].join(", "));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h2>Q{currentQuestion + 1}. {questions[currentQuestion]}</h2>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => handleAnswer(num)}
            style={{
              padding: '10px 15px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
          >
            {num}점
          </button>
        ))}
      </div>
    </div>
  );
}
