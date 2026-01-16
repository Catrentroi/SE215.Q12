import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PlacementTest.css';

const testQuestions = [
  {
    id: 1,
    question: 'What is your name?',
    options: [
      { id: 'A', text: 'My name is Tom.' },
      { id: 'B', text: 'I am 25 years old.' },
      { id: 'C', text: 'I like music.' },
      { id: 'D', text: 'Her name is Mary.' }
    ],
    correct: 'A'
  },
  {
    id: 2,
    question: 'How ___ you?',
    options: [
      { id: 'A', text: 'is' },
      { id: 'B', text: 'am' },
      { id: 'C', text: 'are' },
      { id: 'D', text: 'be' }
    ],
    correct: 'C'
  },
  {
    id: 3,
    question: 'She ___ to school every day.',
    options: [
      { id: 'A', text: 'go' },
      { id: 'B', text: 'goes' },
      { id: 'C', text: 'going' },
      { id: 'D', text: 'gone' }
    ],
    correct: 'B'
  },
  {
    id: 4,
    question: 'There are two ___ on the table.',
    options: [
      { id: 'A', text: 'book' },
      { id: 'B', text: 'books' },
      { id: 'C', text: 'a book' },
      { id: 'D', text: 'the book' }
    ],
    correct: 'B'
  },
  {
    id: 5,
    question: 'I ___ English now.',
    options: [
      { id: 'A', text: 'learn' },
      { id: 'B', text: 'learned' },
      { id: 'C', text: 'am learning' },
      { id: 'D', text: 'learning' }
    ],
    correct: 'C'
  },
  {
    id: 6,
    question: 'He ___ to the park yesterday.',
    options: [
      { id: 'A', text: 'go' },
      { id: 'B', text: 'goes' },
      { id: 'C', text: 'went' },
      { id: 'D', text: 'going' }
    ],
    correct: 'C'
  },
  {
    id: 7,
    question: 'Can you ___ me?',
    options: [
      { id: 'A', text: 'help' },
      { id: 'B', text: 'helps' },
      { id: 'C', text: 'helping' },
      { id: 'D', text: 'helped' }
    ],
    correct: 'A'
  },
  {
    id: 8,
    question: 'This is ___ car.',
    options: [
      { id: 'A', text: 'I' },
      { id: 'B', text: 'me' },
      { id: 'C', text: 'my' },
      { id: 'D', text: 'mine' }
    ],
    correct: 'C'
  },
  {
    id: 9,
    question: 'She is ___ than her sister.',
    options: [
      { id: 'A', text: 'tall' },
      { id: 'B', text: 'taller' },
      { id: 'C', text: 'tallest' },
      { id: 'D', text: 'more tall' }
    ],
    correct: 'B'
  },
  {
    id: 10,
    question: 'I have ___ finished my homework.',
    options: [
      { id: 'A', text: 'yet' },
      { id: 'B', text: 'already' },
      { id: 'C', text: 'still' },
      { id: 'D', text: 'never' }
    ],
    correct: 'B'
  }
];

export default function PlacementTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const pet = location.state?.pet || { icon: '🦥', text: 'Lười nhưng dễ thương' };
  const currentQ = testQuestions[currentQuestion];

  const handleSelectAnswer = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQ.correct;
    const newScore = isCorrect ? score + 1 : score;
    const newAnswers = [...answers, { question: currentQ.id, selected: selectedAnswer, correct: isCorrect }];

    setScore(newScore);
    setAnswers(newAnswers);

    if (currentQuestion === testQuestions.length - 1) {
      // Test completed
      navigate('/test-complete', { 
        state: { 
          pet, 
          score: newScore, 
          total: testQuestions.length,
          answers: newAnswers
        } 
      });
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

  return (
    <div className="placement-test-container">
      <div className="test-circle-left"></div>
      <div className="test-circle-right"></div>

      <button className="test-close-button" onClick={() => navigate('/home')}>
        ✕
      </button>

      <div className="test-header">
        <div className="test-pet-icon">{pet.icon}</div>
        <div className="test-progress-container">
          <div className="test-progress-bar">
            <div className="test-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="test-progress-text">
            {currentQuestion + 1}/{testQuestions.length}
          </div>
        </div>
      </div>

      <div className="test-card">
        <div className="test-question-header">
          <div className="test-question-number">{currentQ.id}</div>
          <h2 className="test-question-text">{currentQ.question}</h2>
        </div>

        <div className="test-options">
          {currentQ.options.map((option) => (
            <button
              key={option.id}
              className={`test-option ${selectedAnswer === option.id ? 'selected' : ''}`}
              onClick={() => handleSelectAnswer(option.id)}
            >
              <div className="test-option-letter">{option.id}</div>
              <div className="test-option-text">{option.text}</div>
            </button>
          ))}
        </div>

        <button 
          className="test-next-button"
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestion === testQuestions.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
        </button>
      </div>

      <div className="test-pet-helper">
        <div className="helper-pet">{pet.icon}</div>
        <div className="helper-message">
          Bạn đang làm rất tốt! Cố gắng tiếp nhé!
        </div>
      </div>

      <div className="test-house-icon">
        <svg viewBox="0 0 80 80" fill="none">
          <path d="M40 15L8 40H15V64H35V48H45V64H65V40H72L40 15Z" fill="#E57373"/>
        </svg>
      </div>
    </div>
  );
}
