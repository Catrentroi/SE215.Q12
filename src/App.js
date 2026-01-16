import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './App.css';

// Import components
import WelcomeScreen from './components/Welcome/WelcomeScreen';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import EggHatching from './components/Onboarding/EggHatching';
import PlacementTest from './components/Onboarding/PlacementTest';
import TestComplete from './components/Onboarding/TestComplete';
import HomePage from './components/Challenge/HomePage';
import QuizScreen from './components/Quiz/QuizScreen';
import QuizCompleteScreen from './components/Quiz/QuizCompleteScreen';
import FeedScreen from './components/Feed/FeedScreen';
import ProfileScreen from './components/Profile/ProfileScreen';
import PetCompanionScreen from './components/PetCompanion/PetCompanionScreen';
import GroupStreakScreen from './components/GroupStreak/GroupStreakScreen';
import ChallengeScreen from './components/Challenge/ChallengeScreen';
import DailyTaskScreen from './components/Challenge/DailyTaskScreen';
import VocabularyScreen from './components/Vocabulary/VocabularyScreen';

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={
                hasStarted ? 
                  <Navigate to="/onboarding" /> : 
                  <WelcomeScreen onStart={() => setHasStarted(true)} />
              } 
            />
            <Route path="/onboarding" element={<OnboardingFlow />} />
            <Route path="/egg-hatching" element={<EggHatching />} />
            <Route path="/placement-test" element={<PlacementTest />} />
            <Route path="/test-complete" element={<TestComplete />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/quiz" element={<QuizScreen />} />
            <Route path="/quiz-complete" element={<QuizCompleteScreen />} />
            <Route path="/feed" element={<FeedScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/pet-companion" element={<PetCompanionScreen />} />
            <Route path="/group-streak" element={<GroupStreakScreen />} />
            <Route path="/challenges" element={<ChallengeScreen />} />
            <Route path="/daily-tasks" element={<DailyTaskScreen />} />
            <Route path="/vocabulary" element={<VocabularyScreen />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
