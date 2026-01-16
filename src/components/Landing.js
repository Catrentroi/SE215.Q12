import React from 'react';
import './Landing.css';
import closeIcon from '../assets/close-icon.png';
import houseIcon from '../assets/house-icon.png';

export default function Landing() {
  const handleStartClick = () => {
    console.log('Bắt đầu clicked');
    // Add your navigation logic here
  };

  return (
    <div className="landing-container">
      {/* Background decorative circles */}
      <div className="circle-decoration circle-left"></div>
      <div className="circle-decoration circle-right"></div>

      {/* Close button */}
      <button className="close-button" onClick={() => console.log('Close clicked')}>
        <img src={closeIcon} alt="Close" />
      </button>

      {/* House icon decoration */}
      <div className="house-icon">
        <img src={houseIcon} alt="House" />
      </div>

      {/* Main content */}
      <div className="content">
        <h1 className="heading">Chào mừng đến với Chillingo!</h1>
        
        <div className="description">
          <p>Để có thể giúp bạn học tiếng Anh tốt hơn kể cả khi bạn lười.</p>
          <p>Chúng tôi có một vài câu hỏi cho bạn trước khi chúng ta bắt đầu.</p>
          <p>Chúng tôi sẽ dựa vào đó mà thiết lập lộ trình học cho bạn</p>
        </div>

        <button className="start-button" onClick={handleStartClick}>
          Bắt đầu
        </button>
      </div>
    </div>
  );
}
