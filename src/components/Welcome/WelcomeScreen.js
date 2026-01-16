import React from 'react';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-container">
      <div className="welcome-circle-left"></div>
      <div className="welcome-circle-right"></div>
      
      <div className="welcome-content">
        <h1 className="welcome-heading">Chào mừng đến với Chillingo!</h1>
        
        <div className="welcome-description">
          <p>Để có thể giúp bạn học tiếng Anh tốt hơn kể cả khi bạn lười.</p>
          <p>Chúng tôi có một vài câu hỏi cho bạn trước khi chúng ta bắt đầu.</p>
          <p>Chúng tôi sẽ dựa vào đó mà thiết lập lộ trình học cho bạn!</p>
        </div>

        <button className="welcome-start-button" onClick={onStart}>
          Bắt đầu
        </button>
      </div>

      <div className="welcome-house-icon">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20L10 50H20V80H45V60H55V80H80V50H90L50 20Z" fill="#E57373"/>
          <path d="M50 10L45 15V20L50 15L55 20V15L50 10Z" fill="#D32F2F"/>
          <rect x="30" y="60" width="15" height="20" fill="#8D6E63"/>
          <rect x="60" y="55" width="12" height="12" fill="#64B5F6"/>
          <rect x="22" y="70" width="8" height="10" fill="#66BB6A"/>
        </svg>
      </div>
    </div>
  );
}
