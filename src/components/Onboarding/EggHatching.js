import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EggHatching.css';

export default function EggHatching() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState('egg'); // egg -> cracking -> hatched
  const [shakes, setShakes] = useState(0);

  const pet = location.state?.pet || { icon: '🦥', text: 'Lười nhưng dễ thương' };

  useEffect(() => {
    // Stage 1: Shake animation (3 times)
    const shakeInterval = setInterval(() => {
      setShakes(prev => {
        if (prev >= 3) {
          clearInterval(shakeInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    // Stage 2: Start cracking after 2.5s
    const crackTimer = setTimeout(() => {
      setStage('cracking');
    }, 2500);

    // Stage 3: Hatched after 4s
    const hatchTimer = setTimeout(() => {
      setStage('hatched');
    }, 4000);

    // Stage 4: Go to placement test after 6s
    const nextTimer = setTimeout(() => {
      navigate('/placement-test', { state: { pet, answers: location.state?.answers } });
    }, 6000);

    return () => {
      clearInterval(shakeInterval);
      clearTimeout(crackTimer);
      clearTimeout(hatchTimer);
      clearTimeout(nextTimer);
    };
  }, [navigate, pet, location.state]);

  return (
    <div className="egg-hatching-container">
      <div className="egg-circle-left"></div>
      <div className="egg-circle-right"></div>

      <div className="egg-content">
        {stage === 'egg' && (
          <>
            <h1 className="egg-title">Trứng đang nở...</h1>
            <div className={`egg ${shakes > 0 ? 'shake' : ''}`}>
              🥚
            </div>
            <p className="egg-subtitle">Pet của bạn sắp ra đời!</p>
          </>
        )}

        {stage === 'cracking' && (
          <>
            <h1 className="egg-title">Trứng đang nứt ra...</h1>
            <div className="egg cracking">
              🥚
              <div className="crack-overlay">
                <div className="crack crack-1"></div>
                <div className="crack crack-2"></div>
                <div className="crack crack-3"></div>
              </div>
            </div>
            <p className="egg-subtitle">Chờ một chút nữa thôi!</p>
          </>
        )}

        {stage === 'hatched' && (
          <>
            <h1 className="egg-title celebrate">Chúc mừng! 🎉</h1>
            <div className="pet-reveal">
              <div className="pet-icon">{pet.icon}</div>
              <div className="sparkles">✨</div>
              <div className="confetti">
                <span>🎊</span>
                <span>🎉</span>
                <span>✨</span>
                <span>🎊</span>
                <span>🎉</span>
              </div>
            </div>
            <h2 className="pet-name">{pet.text}</h2>
            <p className="egg-subtitle">Bạn đã có một người bạn mới!</p>
          </>
        )}
      </div>

      <div className="egg-house-icon">
        <svg viewBox="0 0 100 100" fill="none">
          <path d="M50 20L10 50H20V80H45V60H55V80H80V50H90L50 20Z" fill="#E57373"/>
        </svg>
      </div>
    </div>
  );
}
