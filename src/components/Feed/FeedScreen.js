import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './FeedScreen.css';
import teacherPost from '../../assets/teacher-post.jpg';

export default function FeedScreen() {
  const navigate = useNavigate();
  const { learning } = useApp();
  const [showChatbot, setShowChatbot] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const post = {
    author: {
      username: '@TeacherSa',
      avatar: '👩‍🏫',
      isFollowing: true
    },
    content: {
      title: 'Learn 10 common English phrases used in daily conversations! 💫 Perfect for beg...',
      image: teacherPost,
      hashtags: ['#EnglishLearning', '#DailyPhrases', '#LearnEnglish', '#ESL'],
      music: '🎵 Chill Lofi Beats'
    },
    stats: {
      likes: '12.5K',
      comments: 482,
      shares: 234,
      bookmarks: '1.2K'
    }
  };

  const comments = [
    { user: 'becky01_@2', avatar: '👤', text: 'How much do you make from the videos too?' },
    { user: 'anthony@eviz', avatar: '👤', text: '"I love you" right!?' },
    { user: 'Kev', avatar: '👤', text: 'I think it\'s "How are you?"' },
    { user: 'Godoflove', avatar: '👤', text: 'Hello is the only answer for this one :)' },
    { user: 'Mr.DIY', avatar: '👤', text: 'For me it is how we say to each others..' }
  ];

  return (
    <div className="feed-container">
      <div className="feed-header">
        <div className="feed-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          <span className="feed-logo-icon">🦥</span>
          <div>
            <div className="feed-logo-text">Chillingo</div>
            <div className="feed-logo-subtitle">English for Lazy Learners</div>
          </div>
        </div>
        <div className="feed-nav">
          <button className="feed-nav-item active">📹 Feed</button>
          <button className="feed-nav-item" onClick={() => navigate('/quiz')}>📚 Mini Lessons</button>
          <button className="feed-nav-item" onClick={() => navigate('/pet-companion')}>❤️ Pet Companion</button>
          <button className="feed-nav-item" onClick={() => navigate('/group-streak')}>👥 Group Streak</button>
          <button className="feed-nav-item" onClick={() => navigate('/challenges')}>🏆 Challenges</button>
        </div>
        <div className="feed-actions">
          <input type="text" placeholder="Search..." className="feed-search" />
          <button className="feed-streak-btn">
            🔥 Streak<br/>{learning.streak} days
          </button>
          <button className="feed-notif-btn" onClick={() => navigate('/profile')}>🔔 <span className="notif-badge">3</span></button>
          <button className="feed-profile-btn" onClick={() => navigate('/profile')}>👤</button>
        </div>
      </div>

      <div className="feed-content">
        <div className="feed-tabs">
          <button className="feed-tab active">Đang theo dõi</button>
          <button className="feed-tab">Dành cho bạn</button>
        </div>

        <div className="feed-main">
          <div className="feed-post-column">
            <div className="feed-post-card">
              <div className="feed-post-author">
                <div className="feed-author-info">
                  <span className="feed-author-avatar">{post.author.avatar}</span>
                  <div>
                    <div className="feed-author-username">{post.author.username}</div>
                    {post.author.isFollowing && <span className="feed-follow-badge">Follow</span>}
                  </div>
                </div>
              </div>
              <div className="feed-post-image">
                <img src={teacherPost} alt="Post" />
                <div className="feed-post-overlay">
                  <p>{post.content.title}</p>
                  <div className="feed-post-hashtags">
                    {post.content.hashtags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </div>
                  <div className="feed-post-music">{post.content.music}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="feed-interactions">
            <button 
              className={`feed-interact-btn ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(!liked)}
            >
              {liked ? '❤️' : '🤍'}<br/>{liked ? '12.6K' : post.stats.likes}
            </button>
            <button className="feed-interact-btn">
              💬<br/>{post.stats.comments}
            </button>
            <button className="feed-interact-btn" onClick={() => setShowShareModal(true)}>
              🔗<br/>{post.stats.shares}
            </button>
            <button className="feed-interact-btn">
              🔖<br/>{post.stats.bookmarks}
            </button>
            <button className="feed-interact-btn">⋯</button>
          </div>

          <div className="feed-comments-section">
            <h3>Comments ({post.stats.comments})</h3>
            <div className="feed-comments-list">
              {comments.map((comment, i) => (
                <div key={i} className="feed-comment">
                  <span className="feed-comment-avatar">{comment.avatar}</span>
                  <div className="feed-comment-content">
                    <div className="feed-comment-user">{comment.user}</div>
                    <div className="feed-comment-text">{comment.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showChatbot && (
        <div className="feed-chatbot">
          <div className="chatbot-header">
            <span>🦥</span> Chillingo Bot
            <button onClick={() => setShowChatbot(false)}>✕</button>
          </div>
          <div className="chatbot-content">
            <div className="chatbot-message bot">
              Ơ video này chúng là đang học về 10 câu tiếng Anh thông dụng trong hội thoại thường ngày. Bạn muốn mình làm gì?
            </div>
            <div className="chatbot-message user">
              "How are you?" là câu thông dụng nhất theo như video trên
            </div>
            <div className="chatbot-actions">
              <button>Câu nào lớp 1?</button>
              <button>oki now give me a new vocab</button>
            </div>
          </div>
          <input type="text" placeholder="Nhập câu hỏi tại đây nhé..." />
        </div>
      )}

      {showShareModal && (
        <div className="feed-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="feed-share-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowShareModal(false)}>✕</button>
            <h3>Share to:</h3>
            <div className="share-options">
              <div className="share-user">
                <span>👤</span>
                <span>becky01_@2</span>
              </div>
              <div className="share-user">
                <span>👤</span>
                <span>anthony@eviz</span>
              </div>
              <div className="share-user">
                <span>👤</span>
                <span>Kev</span>
              </div>
              <div className="share-user">
                <span>👤</span>
                <span>Godoflove</span>
              </div>
            </div>
            <div className="share-actions">
              <button>🔄 Repost</button>
              <button>📋 Copy</button>
              <button>🔗 Embed</button>
            </div>
          </div>
        </div>
      )}

      <div className="feed-house-icon">
        <svg viewBox="0 0 80 80" fill="none">
          <path d="M40 15L8 40H15V64H35V48H45V64H65V40H72L40 15Z" fill="#E57373"/>
        </svg>
      </div>
    </div>
  );
}
