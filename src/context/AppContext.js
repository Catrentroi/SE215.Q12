import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState({
    name: 'Trần Minh Tùng',
    username: '@alexrivers',
    email: 'alex.rivers@email.com',
    language: 'Tiếng Việt',
    avatar: '👤',
    bio: 'Learning English casually 🎓'
  });

  // Pet state
  const [pet, setPet] = useState({
    icon: '🦥',
    name: 'Chill Chill',
    type: 'Lười nhưng dễ thương',
    mood: 'Happy 😊',
    stats: {
      hunger: 65,
      energy: 80,
      happiness: 75
    }
  });

  // Learning state
  const [learning, setLearning] = useState({
    coins: 120,
    streak: 7,
    level: 'Pre-Intermediate',
    completedLessons: 47,
    conversationsWithPet: 28,
    achievements: 15,
    totalStudyDays: 12,
    onboardingCompleted: false,
    placementTestScore: null
  });

  // Daily tasks
  const [dailyTasks, setDailyTasks] = useState([
    { 
      id: 1, 
      title: 'Hoàn thành 1 bài học', 
      subtitle: 'Hoàn thành bài kỳ bài học tiếng Anh nào để nhập là',
      reward: 15,
      completed: false,
      progress: 0,
      total: 1
    },
    { 
      id: 2, 
      title: 'Luyện tập 10 từ', 
      subtitle: 'Ôn tập từ vựng',
      reward: 10,
      completed: false,
      progress: 6,
      total: 10
    },
    { 
      id: 3, 
      title: 'Trò chuyện trong 5 phút', 
      subtitle: 'Luyện tập hội thoại cùng chatbot AI',
      reward: 20,
      completed: true,
      progress: 5,
      total: 5
    },
    { 
      id: 4, 
      title: 'Đăng nhập hàng ngày', 
      subtitle: 'Truy cập Chillingo hôm nay',
      reward: 5,
      completed: true,
      progress: 1,
      total: 1
    },
    { 
      id: 5, 
      title: 'Học 5 cụm từ mới', 
      subtitle: 'Thêm cụm từ mới vào từ vựng của bạn',
      reward: 12,
      completed: false,
      progress: 0,
      total: 5
    }
  ]);

  // Vocabulary learned
  const [learnedWords, setLearnedWords] = useState([]);

  // Functions to update state
  const updatePetStats = (stat, value) => {
    setPet(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: Math.min(100, Math.max(0, value))
      }
    }));
  };

  const feedPet = (food) => {
    const hungerIncrease = food.hungerValue || 10;
    updatePetStats('hunger', pet.stats.hunger + hungerIncrease);
    updatePetStats('happiness', pet.stats.happiness + 5);
    buyItem(food.price);
  };

  const playWithPet = (toy) => {
    updatePetStats('happiness', pet.stats.happiness + 15);
    updatePetStats('energy', pet.stats.energy - 10);
    buyItem(toy.price);
  };

  const buyItem = (price) => {
    if (learning.coins >= price) {
      setLearning(prev => ({
        ...prev,
        coins: prev.coins - price
      }));
      return true;
    }
    return false;
  };

  const earnCoins = (amount) => {
    setLearning(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
  };

  const completeTask = (taskId) => {
    setDailyTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        earnCoins(task.reward);
        return { ...task, completed: true, progress: task.total };
      }
      return task;
    }));
  };

  const updateTaskProgress = (taskId, progress) => {
    setDailyTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newProgress = Math.min(progress, task.total);
        const completed = newProgress >= task.total;
        if (completed && !task.completed) {
          earnCoins(task.reward);
        }
        return { ...task, progress: newProgress, completed };
      }
      return task;
    }));
  };

  const completeOnboarding = (selectedPet, answers, testScore) => {
    setPet(prev => ({
      ...prev,
      ...selectedPet
    }));
    setLearning(prev => ({
      ...prev,
      onboardingCompleted: true,
      placementTestScore: testScore
    }));
  };

  const increaseStreak = () => {
    setLearning(prev => ({
      ...prev,
      streak: prev.streak + 1
    }));
  };

  const restoreStreak = () => {
    setLearning(prev => ({
      ...prev,
      streak: prev.streak + 1
    }));
    earnCoins(20); // Bonus coins for restoring streak
  };

  const completeLesson = () => {
    setLearning(prev => ({
      ...prev,
      completedLessons: prev.completedLessons + 1
    }));
    updateTaskProgress(1, 1); // Complete "Hoàn thành 1 bài học" task
    earnCoins(10); // Bonus coins for completing lesson
  };

  const learnWord = (word) => {
    if (!learnedWords.includes(word)) {
      setLearnedWords(prev => [...prev, word]);
      updateTaskProgress(2, learnedWords.length + 1); // Update vocabulary task
    }
  };

  const value = {
    // State
    user,
    pet,
    learning,
    dailyTasks,
    learnedWords,
    
    // Actions
    setUser,
    setPet,
    updatePetStats,
    feedPet,
    playWithPet,
    buyItem,
    earnCoins,
    completeTask,
    updateTaskProgress,
    completeOnboarding,
    increaseStreak,
    restoreStreak,
    completeLesson,
    learnWord
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
