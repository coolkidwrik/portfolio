import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import pages
///////////////////////////////////////////////////////
import ExperiencesPage from './pages/ExperiencesPage';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ScrollToTop from './utils/scrollToTop';
///////////////////////////////////////////////////////

function App() {
  
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Experiences" element={<ExperiencesPage />} />
        <Route path="/Projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;