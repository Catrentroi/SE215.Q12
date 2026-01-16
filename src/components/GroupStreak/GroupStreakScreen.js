import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './GroupStreakScreen.css';

export default function GroupStreakScreen() {
  const navigate = useNavigate();
  const { learning } = useApp();
  const [selectedGroup, setSelectedGroup] = useState(1);
  
  const groups = [
    { id: 1, name: '800+ TOEIC', icon: '🔥', members: '🔥', deadline: 'Alo 11/10/2025' },
    { id: 2, name: 'IELTS 8.0', icon: '🥈', members: '🥈', deadline: 'Đã chia sẻ một... 12/8/2025' },
    { id: 3, name: 'Anh em cày khẻ 🔥', icon: '🔥', members: '🔥', deadline: 'Đã chia sẻ một... 25/6/2025' }
  ];

  const lessons = [
    { id: 1, title: 'Advice and suggestions: Lời khuyên và lời đề nghị', example: 'I reckon you should stop now.' },
    { id: 2, title: 'Tại ngại bạn nên dừng lại.', example: 'Why don\'t you stop now?' },
    { id: 3, title: 'Tại sao bạn không dừng lại nào?', example: 'How about stopping now?' },
    { id: 4, title: 'Dừng lại thì nào?', example: 'If I were you, I\'d stop now.' },
    { id: 5, title: 'Nếu tôi là bạn tôi sẽ dừng lại.', example: 'I suggest you stop now.' }
  ];

  return (
    <div className="group-streak-container">
      <div className="group-header">
        <div className="group-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          <span>🦥</span> Chillingo
        </div>
        <div className="group-nav">
          <button onClick={() => navigate('/feed')}>📹 Feed</button>
          <button onClick={() => navigate('/quiz')}>📚 Mini Lessons</button>
          <button onClick={() => navigate('/pet-companion')}>❤️ Pet Companion</button>
          <button className="active">👥 Group Streak</button>
          <button onClick={() => navigate('/challenges')}>🏆 Challenges</button>
        </div>
        <div className="group-actions">
          <input type="text" placeholder="Search..." />
          <button className="streak-badge">🔥 Streak<br/>{learning.streak} days</button>
          <button onClick={() => navigate('/profile')}>🔔</button>
          <button onClick={() => navigate('/profile')}>👤</button>
        </div>
      </div>

      <div className="group-content">
        <div className="group-sidebar">
          <div className="group-request-card">
            <span className="request-icon">👥</span>
            <div className="request-content">
              <strong>Yêu cầu tin nhắn</strong>
              <p>Bạn nhận được 5 yêu cầu</p>
            </div>
          </div>

          <div className="group-list">
            {groups.map(group => (
              <div 
                key={group.id} 
                className={`group-item ${selectedGroup === group.id ? 'active' : ''}`}
                onClick={() => setSelectedGroup(group.id)}
              >
                <span className="group-icon">{group.icon}</span>
                <div className="group-info">
                  <div className="group-name">{group.name}</div>
                  <div className="group-deadline">{group.deadline}</div>
                </div>
                {group.id === 3 && <span className="group-badge">🔔</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="group-main">
          <div className="group-chat-header">
            <span className="chat-avatar">🔥</span>
            <div>
              <div className="chat-group-name">800+ TOEIC 🔥</div>
              <div className="chat-slogan">Cùng Chillingo tiến bộ mỗi ngày nào!</div>
            </div>
          </div>

          <div className="group-lesson-card">
            <div className="lesson-highlight">
              <span className="lesson-icon">💡</span>
              <div className="lesson-info">
                <strong>1. Advice and suggestions:</strong><br />
                Lời khuyên và lời đề nghị
              </div>
            </div>

            <div className="lesson-content">
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="lesson-item">
                  <p>{lesson.title}</p>
                  {lesson.example && <p className="lesson-example">{lesson.example}</p>}
                </div>
              ))}
            </div>

            <div className="lesson-actions">
              <button className="lesson-action-btn">Alo</button>
              <button className="lesson-action-btn">Dậy học bài nè</button>
            </div>

            <div className="lesson-stats">
              <p>Bạn đã giữ chuỗi 7 ngày học tập cùng nhau 🔥</p>
              <button className="streak-restore-btn">Khôi phục chuỗi ngay 🔥</button>
              <p>Bạn đã giữ chuỗi 4 ngày học tập cùng nhau 🔥</p>
            </div>
          </div>
        </div>

        <div className="group-details">
          <button className="group-detail-btn">Học bài</button>
          <button className="group-detail-btn">Đã đến giờ học bài</button>
          <button className="group-detail-btn">Giữ chuỗi kìa</button>
          <button className="group-detail-btn">Giữ chuỗi</button>

          <p className="group-detail-text">Bạn đã mất chuỗi 3 ngày học tập cùng nhau 🔥</p>
          <p className="group-detail-text">Hãy khôi phục chuỗi ngay bây giờ. Bạn có 1 lượt khôi phục chuỗi trong tháng này</p>
          <button className="restore-btn">Khôi phục chuỗi ngay 🔥</button>
          <p className="group-detail-text">Bạn đã giữ chuỗi 4 ngày học tập cùng nhau 🔥</p>
        </div>
      </div>
    </div>
  );
}
