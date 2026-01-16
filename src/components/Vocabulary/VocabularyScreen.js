import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './VocabularyScreen.css';

export default function VocabularyScreen() {
  const navigate = useNavigate();
  const { learning, learnWord } = useApp();
  const [showWordDetail, setShowWordDetail] = useState(false);
  const [selectedWord, setSelectedWord] = useState('about');

  const words = [
    'about', 'above', 'across', 'action', 'activity', 'actor', 'actress', 'add',
    'address', 'adult', 'advice', 'afraid', 'after', 'afternoon', 'again', 'age',
    'ago', 'agree', 'air', 'airport', 'all', 'also', 'always', 'amazing',
    'and', 'angry', 'animal', 'another', 'answer', 'any', 'anyone', 'anything',
    'apartment', 'apple', 'april', 'area', 'arm', 'around', 'arrive', 'art',
    'article', 'artist', 'as', 'ask', 'at', 'august', 'aunt', 'autumn',
    'away', 'baby', 'back', 'bad', 'bag', 'ball', 'banana', 'band',
    'bank', 'bath', 'bathroom', 'be', 'beach', 'beautiful', 'because', 'become',
    'bed', 'bedroom', 'beer', 'before', 'begin', 'beginning', 'behind', 'believe',
    'below', 'best', 'better', 'between', 'bicycle', 'big', 'bike', 'bill',
    'bird', 'birthday', 'black', 'blog', 'blonde', 'blue', 'boat', 'body',
    'book', 'boot', 'bored', 'boring', 'born', 'both', 'bottle', 'box',
    'boy', 'boyfriend', 'bread', 'break'
  ];

  const slothImages = ['🦥', '🦥', '🦥', '🦥', '🦥'];

  return (
    <div className="vocabulary-container">
      <div className="vocab-header">
        <div className="vocab-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          <span>🦥</span> Chillingo
        </div>
        <div className="vocab-nav">
          <button onClick={() => navigate('/feed')}>📹 Feed</button>
          <button onClick={() => navigate('/quiz')}>📚 Mini Lessons</button>
          <button onClick={() => navigate('/pet-companion')}>❤️ Pet Companion</button>
          <button onClick={() => navigate('/group-streak')}>👥 Group Streak</button>
          <button onClick={() => navigate('/challenges')} className="active">🏆 Challenges</button>
        </div>
        <div className="vocab-actions">
          <button className="view-all-btn">👁️ View All Words</button>
          <input type="text" placeholder="🔍 What do you want to learn today?" />
          <button className="streak-badge">🔥 Streak<br/>{learning.streak} days</button>
          <button onClick={() => navigate('/profile')}>🔔</button>
          <button onClick={() => navigate('/profile')}>👤</button>
        </div>
      </div>

      <div className="vocab-content">
        <div className="vocab-sloths">
          {slothImages.map((sloth, index) => (
            <div key={index} className="vocab-sloth">
              {sloth}
            </div>
          ))}
        </div>

        <div className="vocab-grid">
          {words.map((word, index) => (
            <div 
              key={index} 
              className="vocab-word-card"
              onClick={() => {
                setSelectedWord(word);
                setShowWordDetail(true);
                learnWord(word);
              }}
            >
              {word}
            </div>
          ))}
        </div>

        <div className="vocab-pagination">
          <span>Showing 1 to 100 of 895 results</span>
          <div className="pagination-buttons">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button key={num} className={num === 1 ? 'active' : ''}>{num}</button>
            ))}
            <button>›</button>
          </div>
        </div>

        <button className="vocab-scroll-top">↑</button>
      </div>

      {showWordDetail && (
        <div className="vocab-modal-overlay" onClick={() => setShowWordDetail(false)}>
          <div className="vocab-word-detail" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowWordDetail(false)}>✕</button>
            <h2>{selectedWord} <button className="translate-btn">🌐 Translate</button></h2>
            <div className="word-phonetic">/əˈbaʊt/</div>
            <div className="word-audio">
              <button>▶</button>
              <button>■</button>
              <button>🔊</button>
              <button>⋯</button>
            </div>
            <div className="review-time">
              <span>📝 Choose a suitable review time!</span>
              <div className="review-options">
                <button className="review-option">⏰ 5 minutes</button>
                <button className="review-option">📅 1 day</button>
                <button className="review-option active">📆 3 days</button>
                <button className="review-option">✓ I remember</button>
              </div>
            </div>
            <div className="word-discuss">
              <button>💬 Discuss this word</button>
            </div>
            <div className="word-tabs">
              <button className="word-tab active">adjective</button>
              <button className="word-tab">adverb</button>
              <button className="word-tab">preposition</button>
            </div>
            <div className="word-meanings">
              <h4>Moving around; astir.</h4>
              <p className="example">📘 After my bout with Guillan-Barre Syndrome, it took me 6 months to be up and about again.</p>
              <h4>In existence; being in evidence; apparent.</h4>
              <p className="example">📘 This idea has been about for a while but has only recently become fashionable.</p>
              <h4>Near; in the vicinity or neighbourhood.</h4>
              <p className="example">📘 I had my keys just a minute ago, so they must be about somewhere.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
