// import { useNavigate } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import Footer from "../utils/footer";
import Header from "../utils/header";
import ContentSection from "../utils/contentSection";
// import OrbButton from "../utils/OrbButton";

const ExperiencesPage = () => {
  // const navigate = useNavigate();
  const aplicataDescription = `
    under construction
  `;

  const FYFDescription = `
    under construction
  `;

  const OFSTigersDescription = `
    under construction
  `;

  const QuantumPhysicsDescription = `
    under construction
  `;

  return (
    <PageTransition>
      <div className="Experiences page-content">
        <Header />
        <div className="absolute top-[20%] left-[8%] text-white flex flex-col items-center">
          <h1 className="title">Experiences</h1>
        </div>
        {/* content */}
        <div className="flex flex-col items-start pt-[15%] pl-[10%] pr-[5%] text-white">
          <ContentSection
            heading="Aplicata Technologies"
            subtitle="Software Engineer"
            description={aplicataDescription}
            date="2023"
          />
          <ContentSection
            heading="First Year Focus "
            subtitle="Mentor, Event Planner"
            description={FYFDescription}
            date="2023"
          />
          <ContentSection
            heading="OFS Tigers competitive Swim Team "
            subtitle="Team Captain"
            description={OFSTigersDescription}
            date="2023"
          />
          <ContentSection
            heading="Quantum Physics Discussion Club Leader"
            subtitle="Club Leader, Event Planner"
            description={QuantumPhysicsDescription}
            date="2023"
          />
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ExperiencesPage;