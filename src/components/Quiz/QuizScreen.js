import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QuizScreen.css';

export default function QuizScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHelper, setShowHelper] = useState(false);
  
  const isFromStreakRestore = location.state?.fromStreakRestore;
  const groupId = location.state?.groupId;

  const question = {
    number: 1,
    total: 10,
    text: 'Which sentence is grammatically correct?',
    options: [
      { id: 'A', text: "She don't like coffee in the morning." },
      { id: 'B', text: "She doesn't likes coffee in the morning." },
      { id: 'C', text: "She doesn't like coffee in the morning." },
      { id: 'D', text: "She not like coffee in the morning." }
    ]
  };

  const handleAnswerClick = (optionId) => {
    setSelectedAnswer(optionId);
    if (optionId === 'C') {
      setTimeout(() => {
        setShowHelper(true);
      }, 500);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === 'C') {
      if (isFromStreakRestore) {
        navigate('/quiz-complete', { 
          state: { 
            fromStreakRestore: true,
            groupId: groupId 
          } 
        });
      } else {
        navigate('/quiz-complete');
      }
    }
  };

  const handleClose = () => {
    if (isFromStreakRestore) {
      navigate('/group-streak');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-circle-left"></div>
      <div className="quiz-circle-right"></div>

      <button className="quiz-close-button" onClick={handleClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="quiz-header">
        <div className="quiz-pet-icon">🦥</div>
        <div className="quiz-progress-container">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: '10%' }}></div>
          </div>
          <div className="quiz-progress-text">{question.number}/{question.total}</div>
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-question-header">
          <div className="quiz-question-number">{question.number}</div>
          <h2 className="quiz-question-text">{question.text}</h2>
        </div>

        <div className="quiz-options">
          {question.options.map((option) => (
            <button
              key={option.id}
              className={`quiz-option ${selectedAnswer === option.id ? 'selected' : ''}`}
              onClick={() => handleAnswerClick(option.id)}
            >
              <div className="quiz-option-letter">{option.id}</div>
              <div className="quiz-option-text">{option.text}</div>
            </button>
          ))}
        </div>

        <button 
          className="quiz-next-button"
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          Tiếp tục
        </button>
      </div>

      {showHelper && (
        <div className="quiz-helper">
          <div className="quiz-helper-pet">🦥</div>
          <div className="quiz-helper-bubble">
            Ôn rồi đó~ Chill Chill hoàn thành nhiệm vụ hỗ trợ!
            Giờ mình về nhà dưỡng năng lượng, để lát còn giúp bạn tiếp.
            Bạn cứ học tiếp nha, mình luôn ở đây đồng hành cùng bạn 🦥✨
          </div>
        </div>
      )}

      <div className="quiz-house-icon">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 15L8 40H15V64H35V48H45V64H65V40H72L40 15Z" fill="#E57373"/>
          <rect x="23" y="48" width="12" height="16" fill="#8D6E63"/>
          <rect x="48" y="44" width="10" height="10" fill="#64B5F6"/>
        </svg>
      </div>
    </div>
  );
}
