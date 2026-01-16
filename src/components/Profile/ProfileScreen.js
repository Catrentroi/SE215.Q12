import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './ProfileScreen.css';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, learning, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
      navigate('/');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          <span>🦥</span> Chillingo
        </div>
        <div className="profile-nav">
          <button onClick={() => navigate('/feed')}>📹 Feed</button>
          <button onClick={() => navigate('/quiz')}>📚 Mini Lessons</button>
          <button onClick={() => navigate('/pet-companion')}>❤️ Pet Companion</button>
          <button onClick={() => navigate('/group-streak')}>👥 Group Streak</button>
          <button onClick={() => navigate('/challenges')}>🏆 Challenges</button>
        </div>
        <div className="profile-actions">
          <input type="text" placeholder="Search..." />
          <button className="streak-badge">🔥 Streak<br/>{learning.streak} days</button>
          <button className="notif-btn">🔔</button>
          <button className="user-avatar">👤</button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-user-header">
            <div className="profile-avatar">{user.avatar}</div>
            <div className="profile-user-info">
              <h2>{user.name}</h2>
              <p className="profile-username">{user.username}</p>
              <p className="profile-bio">{user.bio}</p>
              <div className="profile-streak-badge">
                🔥 {learning.streak} day streak 🔥
              </div>
            </div>
            <button className="profile-edit-btn" onClick={handleEditProfile}>
              ✏️ {isEditing ? 'Lưu' : 'Chỉnh sửa'}
            </button>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-section">
            <h3>Thông tin cá nhân</h3>
            <div className="profile-info-item">
              <span className="info-icon">📧</span>
              <div>
                <div className="info-label">Email</div>
                <div className="info-value">{user.email}</div>
              </div>
            </div>
            <div className="profile-info-item">
              <span className="info-icon">🌐</span>
              <div>
                <div className="info-label">Ngôn ngữ bản xứ</div>
                <div className="info-value">{user.language}</div>
              </div>
            </div>
            <div className="profile-info-item">
              <span className="info-icon">🎯</span>
              <div>
                <div className="info-label">Mục tiêu học tập</div>
                <div className="info-value">Học nhẹ nhàng • 15 phút/ngày</div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>Học tập & Hoạt động</h3>
            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-number">{learning.completedLessons}</div>
                <div className="stat-label">Bài học đã hoàn thành</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-number">{learning.conversationsWithPet}</div>
                <div className="stat-label">Cuộc trò chuyện với Chill Chill</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-number">{learning.achievements}</div>
                <div className="stat-label">Thành tích</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-number">{learning.totalStudyDays} ngày</div>
                <div className="stat-label">Học liên tục</div>
              </div>
            </div>
            <p className="profile-tip">
              Bạn đang làm rất tốt! Hãy giữ nhịp học nhẹ nhàng nhé! 👍
            </p>
          </div>
        </div>

        <div className="profile-settings">
          <h3>Cài đặt & Thao tác</h3>
          <button className="setting-item">
            <span>⚙️</span>
            <span>Cài đặt tài khoản</span>
            <span>→</span>
          </button>
          <button className="setting-item">
            <span>🔔</span>
            <span>Thông báo</span>
            <span>→</span>
          </button>
          <button className="setting-item">
            <span>🔒</span>
            <span>Quyền riêng tư & Bảo mật</span>
            <span>→</span>
          </button>
          <button className="setting-item">
            <span>❓</span>
            <span>Trợ giúp & Hỗ trợ</span>
            <span>→</span>
          </button>
          <button className="setting-item logout" onClick={handleLogout}>
            <span>🚪</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
}
