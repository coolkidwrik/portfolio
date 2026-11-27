import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import pages
///////////////////////////////////////////////////////
import ExperiencesPage from './pages/ExperiencesPage';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ScrollToTop from './utils/scrollToTop';
import { MotionConfig } from 'framer-motion';
///////////////////////////////////////////////////////

function App() {
  
  return (
    // reducedMotion="user": if the visitor has "reduce motion" turned on, Framer Motion
    // skips movement (the page slide) and keeps only the fade.
    <MotionConfig reducedMotion="user">
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Experiences" element={<ExperiencesPage />} />
        <Route path="/Projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
    </MotionConfig>
  );
}

export default App;