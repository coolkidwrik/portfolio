// import { useNavigate } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import Footer from "../utils/footer";
import Header from "../utils/header";
import ContentSection from "../utils/contentSection";
// import OrbButton from "../utils/OrbButton";

const ExperiencesPage = () => {
  // const navigate = useNavigate();

  // Experience Descriptions
  /////////////////////////////////////////////////////////////////////////////////////
  const aplicataDescription = `
    Led the end-to-end development of cross-platform mobile and embedded software solutions at Applicata, contributing to both native and web platforms with a strong emphasis on performance, security, and user experience.
  `;

  const aplicataDescriptionList = [
    "Spearheaded the development of high-performance, cross-platform mobile applications utilizing React Native, seamlessly integrating native modules in Swift, Objective-C, and Java to enhance functionality and user experience.",
    "Architected and implemented native UWB (Ultra-Wideband) libraries in Swift and Java, enabling advanced connectivity features within the existing React Native framework for cutting-edge application performance.",
    "Engineered embedded-C firmware to establish robust UWB communication protocols, facilitating secure and reliable Bluetooth and UWB connections between smartphones and embedded systems.",
    "Enhanced application security by integrating biometric authentication on iOS and Android platforms, implementing AES-128-CBC encryption for secure packet transmission within the mobile app and embedded systems using CommonCrypto and embedded SDK libraries.",
    "Successfully migrated critical system logic to new embedded hardware, ensuring backward compatibility while improving system stability and performance for seamless operations.",
    "Developed and maintained advanced features for Applicata's portal using React and Next.js, collaborating closely with middleware teams to deliver scalable and efficient solutions.",
    "Designed and implemented interactive data visualizations and analytics dashboards with ApexCharts, empowering stakeholders with actionable insights and enhancing system monitoring capabilities.",
  ]

  const FYFDescription = `
    Supported the academic and social transition of over 50 first-year students through peer mentorship, collaborative events, and skill-building workshops. Worked alongside three fellow mentors and a program coordinator to organize and facilitate initiatives focused on community building, academic success, and student well-being.
  `;

  const OFSTigersDescription = `
    Led a competitive swim team of 100+ athletes in collaboration with the vice-captain and coaching staff. Took an active role in organizing and running training sessions, mentoring younger swimmers, and supporting overall team operations through instruction, motivation, and leadership.
  `;

  const QuantumPhysicsDescription = `
    Co-led a student-run club focused on theoretical quantum physics, engaging over 20 students in weekly discussions, debates, and presentations. Planned and delivered sessions exploring advanced topics, encouraging curiosity-driven learning and critical thinking in a collaborative environment.
  `;
  /////////////////////////////////////////////////////////////////////////////////////


  return (
    <PageTransition>
      <div className="Experiences page-content overflow-x-hidden pb-20 sm:pb-25 lg:pb-25">
        <Header />
        <div className="absolute top-[20%] left-[8%] text-white flex flex-col items-center">
          <h1 className="title">Experiences</h1>
        </div>
        {/* content */}
        <div className="flex flex-col items-start pt-[35%] sm:pt-[15%] lg:pt-[15%] px-4 sm:px-[10%] w-full text-white">
          <ContentSection
            heading="Aplicata Technologies"
            subtitle="Software Engineer"
            description={aplicataDescription}
            list={aplicataDescriptionList}
            date="2024 - Present"
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
            date="2020-2021"
          />
          <ContentSection
            heading="Quantum Physics Discussion Club Leader"
            subtitle="Club Leader, Event Planner"
            description={QuantumPhysicsDescription}
            date="2019-2021"
          />
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ExperiencesPage;