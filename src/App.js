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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center px-4 py-10 font-sans text-center">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8 transition-all">
        {!completed ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Q{currentQuestion + 1}. {questions[currentQuestion]}
            </h2>
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleAnswer(num)}
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
                >
                  {num}점
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">총 {questions.length}문항 중 {currentQuestion + 1}번째 질문</p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 설문이 완료되었습니다!</h2>
            <p className="text-lg text-gray-700">응답한 점수: <span className="font-semibold">{answers.join(', ')}</span></p>
            <p className="mt-2 text-base text-gray-600">평균 점수: <span className="font-bold text-blue-600">{average}점</span></p>
            <p className="mt-4 text-sm text-gray-400">이 결과는 사용자의 키오스크 적응력을 파악하는 데 활용됩니다.</p>
          </>
        )}
      </div>
    </div>
  );
}
