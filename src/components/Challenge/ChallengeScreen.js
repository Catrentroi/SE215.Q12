import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './ChallengeScreen.css';

export default function ChallengeScreen() {
  const navigate = useNavigate();
  const { learning, dailyTasks, completeTask } = useApp();

  const handleStartChallenge = (task) => {
    if (task.completed) return;
    
    if (task.title.includes('bài học')) {
      navigate('/quiz');
    } else if (task.title.includes('từ')) {
      navigate('/vocabulary');
    } else if (task.title.includes('Trò chuyện')) {
      navigate('/feed');
    } else {
      completeTask(task.id);
    }
  };

  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <div className="challenge-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          <span>🦥</span> Chillingo
        </div>
        <div className="challenge-nav">
          <button onClick={() => navigate('/feed')}>📹 Feed</button>
          <button onClick={() => navigate('/quiz')}>📚 Mini Lessons</button>
          <button onClick={() => navigate('/pet-companion')}>❤️ Pet Companion</button>
          <button onClick={() => navigate('/group-streak')}>👥 Group Streak</button>
          <button className="active">🏆 Challenges</button>
        </div>
        <div className="challenge-actions">
          <input type="text" placeholder="Search..." />
          <button className="streak-badge">🔥 Streak<br/>{learning.streak} days</button>
          <button onClick={() => navigate('/profile')}>🔔</button>
          <button onClick={() => navigate('/profile')}>👤</button>
        </div>
      </div>

      <div className="challenge-content">
        <div className="challenge-banner">
          <h1>Thử thách hàng ngày của bạn</h1>
          <p>Hoàn thành thật nhiều thử thách để nhận được số phần thưởng hấp dẫn nhé!</p>
          <div className="challenge-coin-display">
            <span className="coin-icon">🪙</span>
            <span className="coin-label">Tài sản của bạn</span>
            <span className="coin-amount">{learning.coins} chiếc lá</span>
          </div>
          <div className="challenge-streak-display">
            <span className="streak-icon">🔥</span>
            <span className="streak-label">Chuỗi học liên tục hiện tại</span>
            <span className="streak-count">{learning.streak} ngày 🔥</span>
          </div>
        </div>

        <div className="challenge-alert">
          <span className="alert-icon">✅</span>
          <div className="alert-content">
            <strong>Hoàn thành tất cả thử thách để nhận thưởng!</strong>
            <p>Hoàn thành mọi thử thách trong ngày để nhận thêm <strong>+10 là thưởng 🔥</strong></p>
          </div>
        </div>

        <div className="challenge-list">
          {dailyTasks.map((task) => (
            <div key={task.id} className={`challenge-card ${task.completed ? 'completed' : ''}`}>
              <span className="challenge-number">📚</span>
              <div className="challenge-info">
                <h3>{task.title}</h3>
                {task.total > 1 && (
                  <div className="challenge-progress">
                    <span>Tiến độ: {task.progress}/{task.total}</span>
                    {task.completed ? (
                      <span className="progress-completed">100%</span>
                    ) : (
                      <span className="progress-bar">
                        <span className="progress-fill" style={{ width: `${(task.progress / task.total) * 100}%` }}></span>
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="challenge-reward">
                <span className="reward-coin">🪙</span>
                <span className="reward-amount">+{task.reward}</span>
              </div>
              <button 
                className="challenge-btn"
                onClick={() => handleStartChallenge(task)}
                disabled={task.completed}
              >
                {task.completed ? 'Đã hoàn thành ✓' : 'Bắt đầu'}
              </button>
            </div>
          ))}
        </div>

        <div className="challenge-footer">
          <span className="footer-icon">🦥</span>
          <div className="footer-content">
            <strong>Tiếp tục phát huy nhé!</strong>
            <p>Mỗi thử thách bạn hoàn thành đều giúp bạn tiến gần hơn tới việc làm chủ tiếng Anh.</p>
            <p>Chill Chill rất tự hào về bạn!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
