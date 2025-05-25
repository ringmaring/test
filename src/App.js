import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { text: "키오스크 화면의 메뉴 구성을 이해하기 쉬웠다.", reverse: false },
  { text: "원하는 상품(메뉴)을 선택하는 데 어려움이 없었다.", reverse: false },
  { text: "결제 과정이 복잡하거나 혼란스럽게 느껴졌다.", reverse: true },
  { text: "실수했을 때 처음으로 돌아가거나 수정을 쉽게 할 수 있었다.", reverse: false },
  { text: "키오스크 사용 중 도움 요청 없이 스스로 해결할 수 있었다.", reverse: false },
  { text: "키오스크 이용이 스트레스를 유발했다.", reverse: true },
  { text: "처음 사용하는 브랜드의 키오스크도 익숙하게 느껴졌다.", reverse: false },
  { text: "나는 키오스크 사용에 자신감이 있다.", reverse: false }
];

export default function KioskAdaptabilitySurvey() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleScoreClick = (score) => {
    const newResponses = [...responses, score];
    setResponses(newResponses);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setSubmitted(true);
      setTimeout(() => setShowResult(true), 1000);
    }
  };

  const getAdjustedScore = (value, reverse) => (reverse ? 6 - value : value);

  const total = responses.reduce(
    (sum, val, idx) => sum + getAdjustedScore(val, questions[idx].reverse),
    0
  );
  const average = total / questions.length;

  const getResultMessage = () => {
    if (average >= 4) return "키오스크 사용에 매우 잘 적응하고 있습니다.";
    if (average >= 3) return "키오스크 사용에 보통 수준으로 적응하고 있습니다.";
    if (average >= 2) return "키오스크 사용에 다소 어려움이 있습니다.";
    return "키오스크 사용에 큰 어려움을 겪고 있습니다.";
  };

  const resetSurvey = () => {
    setCurrentIndex(0);
    setResponses([]);
    setSubmitted(false);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-3xl p-8">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          키오스크 적응력 자가진단
        </h1>

        {!submitted ? (
          <div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
              <div
                className="bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg font-semibold text-center mb-4">
                  {currentIndex + 1}. {questions[currentIndex].text}
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleScoreClick(score)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-5 py-2 rounded-xl shadow-md transition"
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : !showResult ? (
          <div className="text-center py-10 animate-pulse text-blue-600 font-semibold text-lg">
            결과 분석 중...
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="bg-gray-50 p-6 rounded-2xl shadow-inner">
              <p className="text-xl font-bold text-blue-800 mb-2">결과 요약</p>
              <p className="text-gray-700 font-medium">총점: {total} / {questions.length * 5}</p>
              <p className="mt-2 text-gray-700">평균 점수: {average.toFixed(2)}</p>
              <p className="mt-4 text-blue-700 font-semibold text-lg">{getResultMessage()}</p>
              <button
                onClick={resetSurvey}
                className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-xl transition shadow-md"
              >
                다시 시작하기
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
