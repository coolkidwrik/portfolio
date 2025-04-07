import { useNavigate } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import Footer from "../utils/footer";
import Header from "../utils/header";
import OrbButton from "../utils/OrbButton";

const ExperiencesPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="Experiences page-content">
        <Header />
        <div className="absolute top-[20%] left-[8%] text-white flex flex-col items-center">
          <h1 className="title">Experiences</h1>
        </div>
        <div>
          <p>Under Construction</p>
          <div className='flex items-center gap-4 p-10'>
            <OrbButton onClick={() => navigate("/")} />
            <p className="content-text pl-4"> Back to Home Page</p>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ExperiencesPage;