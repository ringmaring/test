import React, { useState } from 'react';
import { surveyQuestions } from './questions';

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [followUpChoice, setFollowUpChoice] = useState(null);

  const question = surveyQuestions[step];

  const handleAnswer = (value) => {
    setAnswers([...answers, { id: question.id, value }]);

    if (question.followUp && value === question.followUp.trigger) {
      setShowFollowUp(true);
    } else {
      goNext();
    }
  };

  const handleFollowUp = (choice) => {
    setFollowUpChoice(choice);
    goNext();
  };

  const goNext = () => {
    setShowFollowUp(false);
    setStep((prev) => prev + 1);
  };

  const isFinished = step >= surveyQuestions.length;

  return (
    <div className="app-container">
      <div className="card">
        {!isFinished ? (
          <>
            {showFollowUp ? (
              <>
                <p className="question">{question.followUp.text}</p>
                <div className="button-group">
                  {question.followUp.choices.map((text) => (
                    <button key={text} onClick={() => handleFollowUp(text)} className="score-button">
                      {text}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {question.image && <img src={question.image} alt="" style={{ maxWidth: '100%', borderRadius: '12px', marginBottom: '1rem' }} />}
                <p className="question">{question.text}</p>
                <div className="button-group">
                  {question.choices.map((choice) => (
                    <button
                      key={choice.text}
                      onClick={() => handleAnswer(choice.value)}
                      className="score-button"
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              </>
            )}
            <p className="progress">({step + 1}/{surveyQuestions.length})</p>
          </>
        ) : (
          <>
            <h2 className="complete-title">🎉 설문 완료!</h2>
            <p className="result">응답 요약:</p>
            <ul className="result">
              {answers.map((a, i) => (
                <li key={i}>질문 {a.id}: {a.value}</li>
              ))}
              {followUpChoice && <li>후속 질문: {followUpChoice}</li>}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
