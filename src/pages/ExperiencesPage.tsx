import { Link } from "react-router-dom";
import PageTransition from "../utils/pageTransition";

const ExperiencesPage = () => {
  return (
    <PageTransition>
      <div className="Experiences content">
        <h1>Experiences</h1>
        <p>Under Construction</p>
        <Link to="/">Go Back to Home</Link>
      </div>
    </PageTransition>
  );
};

export default ExperiencesPage;