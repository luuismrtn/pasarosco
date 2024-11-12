import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Credits from './pages/Credits';
import Results from './pages/Results';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>  {/* Aquí envolvemos todo con Router */}
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </Router>
);
