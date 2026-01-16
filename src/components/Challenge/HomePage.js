import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { learning, pet, dailyTasks } = useApp();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'pet', text: `Xin chào! Mình là ${pet.name} 🦥` },
    { from: 'pet', text: 'Hôm nay bạn muốn học gì nào?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Calculate notifications
  const getNotifications = () => {
    const notifications = [];
    
    // Check pet hunger
    if (pet.stats.hunger < 30) {
      notifications.push({
        type: 'warning',
        icon: '🍽️',
        message: `${pet.name} đang đói! Hãy cho bé ăn nhé!`
      });
    }
    
    // Check if no lessons completed today
    const hasCompletedToday = dailyTasks.some(task => 
      task.title.includes('bài học') && task.completed
    );
    if (!hasCompletedToday) {
      notifications.push({
        type: 'info',
        icon: '📚',
        message: 'Bạn chưa học bài nào hôm nay. Bắt đầu học thôi!'
      });
    }
    
    // Check streak
    if (learning.streak > 0 && learning.streak % 7 === 6) {
      notifications.push({
        type: 'warning',
        icon: '🔥',
        message: `Cẩn thận! Streak ${learning.streak} ngày có thể mất nếu bạn không học hôm nay!`
      });
    }
    
    return notifications;
  };

  const notifications = getNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { from: 'user', text: inputMessage }]);
    
    // Simulate pet response
    setTimeout(() => {
      const responses = [
        'Tuyệt vời! Hãy cùng học nhé! 🎉',
        'Mình sẽ giúp bạn! 🦥',
        'Câu hỏi hay đấy! Để mình suy nghĩ... 🤔',
        'Bạn đang làm rất tốt! Tiếp tục nào! 💪',
        'Mình luôn ở đây để hỗ trợ bạn! ❤️'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { from: 'pet', text: randomResponse }]);
    }, 1000);
    
    setInputMessage('');
  };

  return (
    <div className="home-page-container">
      <div className="home-header">
        <div className="home-logo">
          <span>{pet.icon}</span>
          <div>
            <div className="home-logo-text">Chillingo</div>
            <div className="home-logo-subtitle">English for Lazy Learners</div>
          </div>
        </div>
        
        <div className="home-nav">
          <button onClick={() => navigate('/feed')}>📹 Feed</button>
          <button onClick={() => navigate('/quiz')}>📚 Mini Lessons</button>
          <button onClick={() => navigate('/pet-companion')}>❤️ Pet Companion</button>
          <button onClick={() => navigate('/group-streak')}>👥 Group Streak</button>
          <button onClick={() => navigate('/challenges')}>🏆 Challenges</button>
        </div>

        <div className="home-actions">
          <button className="streak-badge">🔥 Streak<br/>{learning.streak} days</button>
          <div className="notification-container">
            <button 
              className={`notification-btn ${notifications.length > 0 ? 'has-notifications' : ''}`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
            </button>
            {showNotifications && notifications.length > 0 && (
              <div className="notification-dropdown">
                {notifications.map((notif, index) => (
                  <div key={index} className={`notification-item ${notif.type}`}>
                    <span className="notif-icon">{notif.icon}</span>
                    <span className="notif-message">{notif.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => navigate('/profile')}>👤</button>
        </div>
      </div>

      <div className="home-content">
        <div className="home-banner">
          <div className="banner-text">
            <h1>Chủ đề<br/>ĐỘNG VẬT</h1>
          </div>
          <div className="banner-sloth">🦥</div>
        </div>

        <div className="home-path">
          <div className="path-description">
            <h2>Hôm nay dành 1-2p để học về<br/><strong>ĐỘNG VẬT</strong> với mình nhé</h2>
          </div>

          <div className="learning-path">
            <div className="path-checkpoints">
              <div className="checkpoint done">✓</div>
              <div className="checkpoint done">✓</div>
              <div className="checkpoint done">✓</div>
              <div className="checkpoint current">{pet.icon}</div>
              <div className="checkpoint treasure">🏆</div>
            </div>
            <div className="path-line"></div>
          </div>

          <button className="start-btn" onClick={() => navigate('/quiz')}>
            Bắt đầu
          </button>
        </div>
      </div>

      <button className="home-chatbot-btn" onClick={() => setShowChatbot(!showChatbot)}>
        <svg viewBox="0 0 100 100" fill="none">
          <path d="M50 20L10 50H20V80H45V60H55V80H80V50H90L50 20Z" fill="#667eea"/>
          <rect x="30" y="60" width="15" height="20" fill="#8D6E63"/>
          <rect x="60" y="55" width="12" height="12" fill="#FFF"/>
          <circle cx="37" cy="45" r="3" fill="#FFF"/>
          <circle cx="63" cy="45" r="3" fill="#FFF"/>
          <path d="M40 52 Q50 58 60 52" stroke="#FFF" strokeWidth="2" fill="none"/>
        </svg>
      </button>

      {showChatbot && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-pet-icon">{pet.icon}</span>
              <div>
                <div className="chatbot-pet-name">{pet.name}</div>
                <div className="chatbot-pet-status">Đang hoạt động</div>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setShowChatbot(false)}>✕</button>
          </div>
          
          <div className="chatbot-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.from}`}>
                {msg.from === 'pet' && <span className="message-avatar">{pet.icon}</span>}
                <div className="message-bubble">
                  {msg.text}
                </div>
                {msg.from === 'user' && <span className="message-avatar">👤</span>}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input 
              type="text" 
              placeholder={`Chat với ${pet.name}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>

          <div className="chatbot-suggestions">
            <button onClick={() => setInputMessage('Hôm nay học gì?')}>Hôm nay học gì?</button>
            <button onClick={() => setInputMessage('Giải thích từ này')}>Giải thích từ này</button>
            <button onClick={() => setInputMessage('Cho mình bài tập')}>Cho mình bài tập</button>
          </div>
        </div>
      )}
    </div>
  );
}
