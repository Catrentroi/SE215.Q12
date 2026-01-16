import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './TestComplete.css';

export default function TestComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeOnboarding } = useApp();
  
  const { pet, score, total, answers } = location.state || { 
    pet: { icon: '🦥', text: 'Lười nhưng dễ thương' }, 
    score: 9, 
    total: 10,
    answers: []
  };

  const percentage = (score / total) * 100;
  
  let level = 'Beginner';
  let message = 'Đây là khởi đầu tuyệt vời! Cùng Chill Chill học thêm nhé!';
  
  if (percentage >= 80) {
    level = 'Advanced';
    message = 'Xuất sắc! Bạn có nền tảng rất tốt!';
  } else if (percentage >= 60) {
    level = 'Intermediate';
    message = 'Tốt lắm! Bạn có kiến thức khá vững!';
  } else if (percentage >= 40) {
    level = 'Pre-Intermediate';
    message = 'Khá tốt! Bạn đang trên đường phát triển!';
  }

  return (
    <div className="test-complete-container">
      <div className="complete-circle-left"></div>
      <div className="complete-circle-right"></div>

      <div className="complete-content">
        <div className="complete-celebration">
          <h1 className="complete-title">🎉 Chúc mừng! 🎉</h1>
          <p className="complete-subtitle">Bạn đã hoàn thành bài kiểm tra đầu vào!</p>
        </div>

        <div className="complete-card">
          <div className="complete-pet">
            <div className="pet-badge">{pet.icon}</div>
            <p className="pet-text">{pet.text}</p>
          </div>

          <div className="complete-score">
            <div className="score-circle">
              <svg viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="12"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#5275ed"
                  strokeWidth="12"
                  strokeDasharray={`${percentage * 5.65} 565`}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  className="score-progress"
                />
              </svg>
              <div className="score-text">
                <div className="score-number">{score}/{total}</div>
                <div className="score-percent">{percentage.toFixed(0)}%</div>
              </div>
            </div>
          </div>

          <div className="complete-level">
            <div className="level-badge">{level}</div>
            <p className="level-message">{message}</p>
          </div>

          <div className="complete-stats">
            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <div className="stat-label">Câu đúng</div>
              <div className="stat-value">{score}</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">❌</div>
              <div className="stat-label">Câu sai</div>
              <div className="stat-value">{total - score}</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <div className="stat-label">Độ chính xác</div>
              <div className="stat-value">{percentage.toFixed(0)}%</div>
            </div>
          </div>
        </div>

        <div className="complete-actions">
          <button 
            className="complete-button primary" 
            onClick={() => {
              completeOnboarding(pet, answers, { score, total });
              navigate('/home');
            }}
          >
            Bắt đầu học ngay! 🚀
          </button>
        </div>

        <div className="complete-footer">
          <p className="footer-text">
            {pet.icon} <strong>{pet.text}</strong> đã sẵn sàng đồng hành cùng bạn!
          </p>
          <p className="footer-subtext">
            Hãy cùng nhau chinh phục tiếng Anh một cách thư giãn nhé! 🌟
          </p>
        </div>
      </div>

      <div className="complete-house-icon">
        <svg viewBox="0 0 100 100" fill="none">
          <path d="M50 20L10 50H20V80H45V60H55V80H80V50H90L50 20Z" fill="#E57373"/>
        </svg>
      </div>
    </div>
  );
}
