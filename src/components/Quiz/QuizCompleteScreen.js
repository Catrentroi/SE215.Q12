import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './QuizCompleteScreen.css';

export default function QuizCompleteScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeLesson, restoreStreak } = useApp();
  
  const isFromStreakRestore = location.state?.fromStreakRestore;
  const groupId = location.state?.groupId;

  const handleContinue = () => {
    if (isFromStreakRestore) {
      restoreStreak(); // Restore streak and earn bonus coins
      navigate('/group-streak', { 
        state: { 
          streakRestored: true,
          groupId: groupId 
        } 
      });
    } else {
      completeLesson(); // Marks lesson as complete and earns coins
      navigate('/home');
    }
  };

  return (
    <div className="quiz-complete-container">
      <div className="quiz-complete-circle-left"></div>
      <div className="quiz-complete-circle-right"></div>

      <div className="quiz-complete-content">
        <h1>
          {isFromStreakRestore 
            ? 'Tuyệt vời! Bạn đã hoàn thành mini-lesson!' 
            : 'Giỏi quá! Chúng ta đã hoàn thành chi tiết của ngày hôm nay rồi!'}
        </h1>
        
        <div className="quiz-complete-pet">
          <div className="pet-dog">{isFromStreakRestore ? '🔥' : '🐕'}</div>
        </div>

        <button className="quiz-complete-button" onClick={handleContinue}>
          {isFromStreakRestore ? 'Quay lại Group Streak' : 'Trang chủ'}
        </button>
        
        <p className="reward-message">
          {isFromStreakRestore 
            ? '🔥 +20 coins! Streak đã được khôi phục!' 
            : '🎉 +10 coins! Hoàn thành bài học!'}
        </p>
      </div>

      <div className="quiz-complete-house-icon">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 15L8 40H15V64H35V48H45V64H65V40H72L40 15Z" fill="#E57373"/>
          <rect x="23" y="48" width="12" height="16" fill="#8D6E63"/>
          <rect x="48" y="44" width="10" height="10" fill="#64B5F6"/>
          <rect x="18" y="56" width="6" height="8" fill="#66BB6A"/>
        </svg>
      </div>
    </div>
  );
}
