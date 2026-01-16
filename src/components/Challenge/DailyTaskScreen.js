import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './DailyTaskScreen.css';

export default function DailyTaskScreen() {
  const navigate = useNavigate();
  const { learning, dailyTasks, completeTask } = useApp();

  const handleStartTask = (task) => {
    if (task.completed) return;
    
    // Navigate based on task type
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
    <div className="daily-task-container">
      <div className="daily-task-header">
        <span className="task-logo" onClick={() => navigate('/home')}>🦥</span>
        <h1 onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Chillingo</h1>
        <p>English for Lazy Learners</p>
      </div>

      <div className="daily-task-content">
        <div className="task-banner">
          <h2>Thử thách hàng ngày của bạn</h2>
          <p>Hoàn thành thật nhiều thử thách để nhận được số phần thưởng hấp dẫn nhé!</p>

          <div className="task-stats">
            <div className="stat-item">
              <span className="stat-icon">🪙</span>
              <div className="stat-info">
                <div className="stat-label">Tài sản của bạn</div>
                <div className="stat-value">{learning.coins} chiếc lá</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🔥</span>
              <div className="stat-info">
                <div className="stat-label">Chuỗi học liên tục hiện tại</div>
                <div className="stat-value">{learning.streak} ngày 🔥</div>
              </div>
            </div>
          </div>
        </div>

        <div className="task-list">
          {dailyTasks.map((task) => (
            <div key={task.id} className={`task-card ${task.completed ? 'completed' : 'active'}`}>
              <div className="task-icon">📚</div>
              <div className="task-details">
                <h3>{task.title}</h3>
                <p>{task.subtitle}</p>
                {task.total > 1 && (
                  <div className="task-progress">
                    <span>Tiến độ: {task.progress}/{task.total}</span>
                    {task.completed ? (
                      <span className="progress-complete">100%</span>
                    ) : (
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(task.progress / task.total) * 100}%` }}></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="task-reward">
                <span className="reward-icon">🪙</span>
                <span className="reward-value">+{task.reward}</span>
              </div>
              <button 
                className="task-btn"
                onClick={() => handleStartTask(task)}
                disabled={task.completed}
              >
                {task.completed ? 'Đã hoàn thành ✓' : 'Bắt đầu'}
              </button>
            </div>
          ))}
        </div>

        <div className="task-footer">
          <span className="footer-sloth">🦥</span>
          <div className="footer-message">
            <strong>Tiếp tục phát huy nhé!</strong>
            <p>Mỗi thử thách bạn hoàn thành đều giúp bạn tiến gần hơn tới việc làm chủ tiếng Anh.</p>
            <p>Chill Chill rất tự hào về bạn!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
