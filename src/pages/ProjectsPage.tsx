// import { Link } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import Header from "../utils/header";
import Footer from "../utils/footer";
import ContentSection from "../utils/contentSection";

const ProjectsPage = () => {

    // Experience Descriptions
  /////////////////////////////////////////////////////////////////////////////////////
  const Description = `
    under construction
  `;

  return (
    <PageTransition>
      <div className="Projects page-content">
        <Header />
        <div className="absolute top-[20%] left-[8%] text-white flex flex-col items-center">
          <h1 className="title">Projects</h1>
        </div>
        <div className="flex flex-col items-start pt-[15%] pl-[10%] pr-[5%] text-white">
          <ContentSection
            heading="SHELL"
            subtitle="ZSH"
            description={Description}
            date="2023"
          />
          <ContentSection
            heading="Shaders"
            subtitle="GLSL, JavaScript"
            description={Description}
            date="2023"
          />
          <ContentSection
            heading="Solar System"
            subtitle="JavaScript"
            description={Description}
            date="2023"
          />
          <ContentSection
            heading="Snake Game"
            subtitle="Rust"
            description={Description}
            date="2023"
          />
          <ContentSection
            heading="SNASA"
            subtitle="PHP, JavaScript, SQL"
            description={Description}
            date="2023"
          />
          <ContentSection
            heading="Complex Number Calculator"
            subtitle="Python"
            description={Description}
            date="2023"
          />
          <ContentSection
            heading="Swim Team Organizer"
            subtitle="Java"
            description={Description}
            date="2021"
          />
          <ContentSection
            heading="Coronary Heart Disease Prediction Model"
            subtitle="R"
            description={Description}
            date="2021"
          />
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ProjectsPage;