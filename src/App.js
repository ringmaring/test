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

  const average = answers.length > 0 ? (answers.reduce((a, b) => a + b, 0) / answers.length).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-200 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-blue-100">
        {!completed ? (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6">디지털 적응력 테스트</h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-6">Q{currentQuestion + 1}. {questions[currentQuestion]}</p>
            <div className="grid grid-cols-5 gap-4 mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleAnswer(num)}
                  className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all"
                >
                  {num}점
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">({currentQuestion + 1}/{questions.length})</p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-2">🎉 설문 완료!</h2>
            <p className="text-gray-700 text-lg">응답 점수: <span className="font-medium text-blue-600">{answers.join(', ')}</span></p>
            <p className="text-base text-gray-600 mt-2">평균 점수: <span className="font-bold text-pink-600">{average}점</span></p>
            <p className="text-sm text-gray-400 mt-4">이 결과는 키오스크 적응력을 파악하는 데 사용됩니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
