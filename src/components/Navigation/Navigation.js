import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ activeTab = '' }) {
  const navigate = useNavigate();

  return (
    <div className="navigation-header">
      <div className="nav-logo" onClick={() => navigate('/feed')}>
        <span>🦥</span> Chillingo
        <div className="nav-subtitle">English for Lazy Learners</div>
      </div>
      <div className="nav-menu">
        <button 
          className={activeTab === 'feed' ? 'active' : ''}
          onClick={() => navigate('/feed')}
        >
          📹 Feed
        </button>
        <button 
          className={activeTab === 'quiz' ? 'active' : ''}
          onClick={() => navigate('/quiz')}
        >
          📚 Mini Lessons
        </button>
        <button>💬 Chatbot</button>
        <button 
          className={activeTab === 'pet' ? 'active' : ''}
          onClick={() => navigate('/pet-companion')}
        >
          ❤️ Pet Companion
        </button>
        <button 
          className={activeTab === 'group' ? 'active' : ''}
          onClick={() => navigate('/group-streak')}
        >
          👥 Group Streak
        </button>
        <button 
          className={activeTab === 'challenges' ? 'active' : ''}
          onClick={() => navigate('/challenges')}
        >
          🏆 Challenges
        </button>
      </div>
      <div className="nav-actions">
        <input type="text" placeholder="Search..." className="nav-search" />
        <button className="nav-streak-btn">
          🔥 Streak<br/>7 days
        </button>
        <button className="nav-notif-btn">🔔</button>
        <button 
          className="nav-profile-btn"
          onClick={() => navigate('/profile')}
        >
          👤
        </button>
      </div>
    </div>
  );
}
