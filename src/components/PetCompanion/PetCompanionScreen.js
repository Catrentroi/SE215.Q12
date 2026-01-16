import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './PetCompanionScreen.css';

export default function PetCompanionScreen() {
  const navigate = useNavigate();
  const { pet, learning, feedPet, playWithPet, updatePetStats } = useApp();
  const [activeTab, setActiveTab] = useState('fun');

  const shopItems = {
    food: [
      { name: 'Apple', price: 10, icon: '🍎' },
      { name: 'Banana', price: 8, icon: '🍌' },
      { name: 'Pizza Slice', price: 25, icon: '🍕' },
      { name: 'Watermelon', price: 15, icon: '🍉' }
    ],
    drinks: [
      { name: 'Water', price: 5, icon: '💧' },
      { name: 'Coffee', price: 12, icon: '☕' },
      { name: 'Juice', price: 10, icon: '🧃' },
      { name: 'Smoothie', price: 18, icon: '🥤' }
    ],
    fun: [
      { name: 'Ball', price: 20, icon: '⚽' },
      { name: 'Music', price: 15, icon: '🎵' },
      { name: 'Book', price: 12, icon: '📚' },
      { name: 'Toy', price: 25, icon: '🎁' }
    ]
  };

  const handleBuyItem = (item, category) => {
    if (learning.coins >= item.price) {
      if (category === 'food') {
        feedPet({ ...item, hungerValue: 15 });
      } else if (category === 'drinks') {
        feedPet({ ...item, hungerValue: 10 });
      } else if (category === 'fun') {
        playWithPet(item);
      }
      alert(`Đã mua ${item.name} thành công! 🎉`);
    } else {
      alert('Không đủ tiền! Hãy hoàn thành thêm nhiệm vụ để kiếm coins 🪙');
    }
  };

  return (
    <div className="pet-companion-container">
      <div className="pet-header">
        <div className="pet-logo" onClick={() => navigate('/home')}>
          <span>🦥</span> Chillingo
        </div>
        <div className="pet-nav">
          <button onClick={() => navigate('/feed')}>📹 Feed</button>
          <button onClick={() => navigate('/quiz')}>📚 Mini Lessons</button>
          <button className="active">❤️ Pet Companion</button>
          <button onClick={() => navigate('/group-streak')}>👥 Group Streak</button>
          <button onClick={() => navigate('/challenges')}>🏆 Challenges</button>
        </div>
        <div className="pet-actions">
          <input type="text" placeholder="Search..." />
          <button className="streak-badge">🔥 Streak<br/>{learning.streak} days</button>
          <button onClick={() => navigate('/profile')}>🔔</button>
          <button onClick={() => navigate('/profile')}>👤</button>
        </div>
      </div>

      <div className="pet-content">
        <h1>Chăm sóc thú cưng của bạn nào</h1>
        <p className="pet-subtitle">Hãy cho thú cưng ăn, uống và chơi cùng thú cưng nhé!</p>

        <div className="pet-coin-display">
          <span className="coin-icon-display">🪙</span>
          <span className="coin-label-display">Tài sản của bạn</span>
          <span className="coin-amount-display">{learning.coins}</span>
          <span className="coin-hint">Hoàn thành bài học và thử thách để nhận được là</span>
        </div>

        <div className="pet-main-grid">
          <div className="pet-display-section">
            <div className="pet-display-card">
              <h3>{pet.name}</h3>
              <div className="pet-mood-badge">{pet.mood}</div>
              <div className="pet-character">
                <div className="pet-sloth">{pet.icon}</div>
              </div>
              <div className="pet-stats-bars">
                <div className="stat-bar">
                  <span className="stat-icon">🍽️</span>
                  <span className="stat-label">Hunger</span>
                  <div className="stat-progress">
                    <div className="stat-fill hunger" style={{ width: `${pet.stats.hunger}%` }}></div>
                  </div>
                  <span className="stat-value">{pet.stats.hunger}%</span>
                </div>
                <div className="stat-bar">
                  <span className="stat-icon">⚡</span>
                  <span className="stat-label">Energy</span>
                  <div className="stat-progress">
                    <div className="stat-fill energy" style={{ width: `${pet.stats.energy}%` }}></div>
                  </div>
                  <span className="stat-value">{pet.stats.energy}%</span>
                </div>
                <div className="stat-bar">
                  <span className="stat-icon">💗</span>
                  <span className="stat-label">Happiness</span>
                  <div className="stat-progress">
                    <div className="stat-fill happiness" style={{ width: `${pet.stats.happiness}%` }}></div>
                  </div>
                  <span className="stat-value">{pet.stats.happiness}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pet-shop-section">
            <div className="pet-shop-card">
              <h3>Pet Shop</h3>
              <div className="pet-shop-tabs">
                <button 
                  className={activeTab === 'food' ? 'active' : ''}
                  onClick={() => setActiveTab('food')}
                >
                  🍎 Food
                </button>
                <button 
                  className={activeTab === 'drinks' ? 'active' : ''}
                  onClick={() => setActiveTab('drinks')}
                >
                  💧 Drinks
                </button>
                <button 
                  className={activeTab === 'fun' ? 'active' : ''}
                  onClick={() => setActiveTab('fun')}
                >
                  🎮 Fun
                </button>
              </div>
              <div className="pet-shop-items">
                {shopItems[activeTab].map((item, index) => (
                  <div key={index} className="shop-item">
                    <div className="shop-item-icon">{item.icon}</div>
                    <div className="shop-item-name">{item.name}</div>
                    <div className="shop-item-price">🪙 {item.price}</div>
                    <button 
                      className="shop-item-btn"
                      onClick={() => handleBuyItem(item, activeTab)}
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pet-tip-box">
          <span className="tip-icon">💬</span>
          <div className="tip-content">
            <strong>Học tiếp nào, nhân thêm lá nhé! ✨</strong>
            <p>Hoàn thành bài học và thử thách để kiếm thêm lá.</p>
            <p>Chill Chill vui hơn, bạn học cũng hứng thú hơn!</p>
          </div>
        </div>
      </div>

      <div className="pet-house-icon">
        <svg viewBox="0 0 80 80" fill="none">
          <path d="M40 15L8 40H15V64H35V48H45V64H65V40H72L40 15Z" fill="#E57373"/>
        </svg>
      </div>
    </div>
  );
}
