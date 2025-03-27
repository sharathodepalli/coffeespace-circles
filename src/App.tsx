import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CircleDashboard } from './components/CircleDashboard';
import { ProgressTracker } from './components/ProgressTracker';
import { AudioHuddle } from './components/AudioHuddle';
import { CircleRecap } from './components/CircleRecap';
import { ExploreCircles } from './components/ExploreCircles';
import { CircleChat } from './components/CircleChat';

function App() {
  return (
    <Router basename="/coffeespace-circles">
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/explore" replace />} />
          <Route path="/explore" element={<ExploreCircles />} />
          <Route path="/circle/:id" element={<CircleChat />} />
          <Route path="/dashboard" element={<CircleDashboard />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/huddle" element={<AudioHuddle />} />
          <Route path="/recap" element={<CircleRecap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;