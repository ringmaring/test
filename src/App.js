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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0f4ff, #dbeafe)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Helvetica, sans-serif',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
        padding: '2.5rem',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        {!completed ? (
          <>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1d4ed8',
              marginBottom: '1.5rem'
            }}>
              디지털 적응력 테스트
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#374151',
              marginBottom: '1.5rem'
            }}>
              <strong>Q{currentQuestion + 1}.</strong> {questions[currentQuestion]}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleAnswer(num)}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.75rem 1.2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  {num}점
                </button>
              ))}
            </div>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              ({currentQuestion + 1}/{questions.length} 문항)
            </p>
          </>
        ) : (
          <>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#10b981',
              marginBottom: '1rem'
            }}>
              🎉 설문 완료!
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#374151' }}>
              응답 점수: <strong style={{ color: '#2563eb' }}>{answers.join(', ')}</strong>
            </p>
            <p style={{ marginTop: '1rem', fontSize: '1rem', color: '#4b5563' }}>
              평균 점수: <strong style={{ color: '#d97706' }}>{average}점</strong>
            </p>
            <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#9ca3af' }}>
              이 결과는 키오스크 적응력을 파악하는 데 사용됩니다.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
