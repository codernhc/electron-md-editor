import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/home';

import 'tdesign-react/es/style/index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
