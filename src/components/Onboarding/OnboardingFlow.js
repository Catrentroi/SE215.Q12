import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingFlow.css';

const questions = [
  {
    id: 1,
    question: 'Bạn học Tiếng Anh để làm gì?',
    options: [
      { id: 'A', text: 'Học để nói chuyện hàng ngày.' },
      { id: 'B', text: 'Học để đi làm, đi học.' },
      { id: 'C', text: 'Học để đi du lịch.' },
      { id: 'D', text: 'Học để trau dồi kiến thức' }
    ]
  },
  {
    id: 2,
    question: 'Bạn tự thấy mình như thế nào?',
    options: [
      { id: 'A', text: 'Như tờ giấy trắng.' },
      { id: 'B', text: 'Biết cơ bản một số từ.' },
      { id: 'C', text: 'Vừa đủ để giao tiếp căn bản.' },
      { id: 'D', text: 'Có thể giao tiếp ở một số lĩnh vực nhất định.' }
    ]
  },
  {
    id: 3,
    question: 'Bạn muốn dành bao nhiêu thời gian học mỗi ngày',
    options: [
      { id: 'A', text: '3p mỗi ngày' },
      { id: 'B', text: '5p mỗi ngày' },
      { id: 'C', text: '15p mỗi ngày' },
      { id: 'D', text: '>30p mỗi ngày' }
    ]
  },
  {
    id: 4,
    question: 'Có một người bạn nhỏ muốn đồng hành cùng bạn trong chuyến đi này..',
    options: [
      { id: 'A', text: 'Nhiệt tình', icon: '🐶' },
      { id: 'B', text: 'Lười nhưng dễ thương', icon: '🦥' },
      { id: 'C', text: 'Bình tĩnh, sáng suốt', icon: '🐧' },
      { id: 'D', text: 'Thông minh, lạnh lợi', icon: '🦊' }
    ]
  }
];

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});

  const handleSelectAnswer = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    // Save answer
    const newAnswers = {
      ...answers,
      [currentQuestion]: selectedAnswer
    };
    setAnswers(newAnswers);

    // If last question (pet selection), go to egg hatching
    if (currentQuestion === questions.length - 1) {
      const selectedPet = questions[3].options.find(opt => opt.id === selectedAnswer);
      navigate('/egg-hatching', { state: { pet: selectedPet, answers: newAnswers } });
    } else {
      // Go to next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handleSkip = () => {
    navigate('/home');
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="onboarding-container">
      <div className="onboarding-circle-left"></div>
      <div className="onboarding-circle-right"></div>

      <div className="onboarding-content">
        <div className="onboarding-header">
          <div className="question-number">{currentQ.id}</div>
          <h2 className="question-text">{currentQ.question}</h2>
        </div>

        <div className="onboarding-options">
          {currentQ.options.map((option) => (
            <button
              key={option.id}
              className={`onboarding-option ${selectedAnswer === option.id ? 'selected' : ''}`}
              onClick={() => handleSelectAnswer(option.id)}
            >
              <div className="option-letter">{option.id}</div>
              <div className="option-content">
                {option.icon && <span className="option-icon">{option.icon}</span>}
                <span className="option-text">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="onboarding-footer">
          <button className="skip-button" onClick={handleSkip}>
            Nhấn vào đây để bỏ qua
          </button>
          <button 
            className="continue-button"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            Tiếp tục
          </button>
        </div>
      </div>

      <div className="onboarding-house-icon">
        <svg viewBox="0 0 100 100" fill="none">
          <path d="M50 20L10 50H20V80H45V60H55V80H80V50H90L50 20Z" fill="#E57373"/>
          <rect x="30" y="60" width="15" height="20" fill="#8D6E63"/>
          <rect x="60" y="55" width="12" height="12" fill="#64B5F6"/>
        </svg>
      </div>
    </div>
  );
}
