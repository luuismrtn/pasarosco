// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>  {/* Aquí envolvemos todo con Router */}
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </Router>
);
