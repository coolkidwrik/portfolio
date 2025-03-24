import { Link } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import Footer from "../utils/footer";

const ExperiencesPage = () => {
  return (
    <PageTransition>
      <div className="Projects page-content">
          <h1 className="title">Projects</h1>
          <p>Under Construction</p>
          <Link to="/">Go Back to Home</Link>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ExperiencesPage;