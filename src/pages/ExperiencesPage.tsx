import { Link } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import Footer from "../utils/footer";

const ExperiencesPage = () => {
  return (
    <PageTransition>
      <div className="Experiences page-content">
        <div className="absolute top-[20%] left-[8%] text-white flex flex-col items-center">
          <h1 className="title">Experiences</h1>
        </div>
        <div>
          <p>Under Construction</p>
          <Link to="/">Go Back to Home</Link>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ExperiencesPage;