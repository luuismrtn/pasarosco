import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Credits from './pages/Credits';
import Results from './pages/Results';
import RoscosList from './pages/RoscosList';
import EditRosco from './pages/EditRosco';
import CreateRosco from './pages/CreateRosco';
import Blog from './pages/Blog';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/game/:id" element={<Game />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/results" element={<Results />} />
      <Route path="/roscos" element={<RoscosList />} />
      <Route path="/edit-rosco/:id" element={<EditRosco />} />
      <Route path="/create-rosco/" element={<CreateRosco />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  </Router>
);
