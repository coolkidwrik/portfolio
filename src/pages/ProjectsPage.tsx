// import { Link } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import Header from "../utils/header";
import Footer from "../utils/footer";
import ContentSection from "../utils/contentSection";

const ProjectsPage = () => {

  // Project Descriptions
  /////////////////////////////////////////////////////////////////////////////////////
  const Description = `
    under construction
  `;

  // Shell Description
  const ShellDescription = `
    This repository contains various projects coded using ZSH that can be run and implemented into the UNIX command line. Here are some notable projects:
  `;
  const ShellList = [
    "bfc: A compiler for a popular esoteric programming language.",
    "diary: uses openssl to create and maintain a password encrypted document that can be accessed from anywhere on the machine.",
    "todo_list: A working todo list application with data persistence that runs on the command line. "
  ];
  
  // Shaders Description
  const ShadersDescription = `
    A variety of shaders coded and applied in GLSL, run on the browser using THREE.js.  
  `;
  const ShadersList = [
    "Developed classic shaders from scratch, like Phong/Blinn-Phong, Toon(Ceil) and created shaders of my own design(like diamond and static).",
    "Implemented PBR and IBL for a damaged helmet object.",
  ]

  // Solar System Description
  const SolarSystemDescription = `
    Using the THREE.js framework to create a 3D model of the solar system that is rendered on the browser.
  `;
  const SolarSystemList = [
    "Utilized texture mapping and shadow mapping to create planets and lighting.",
    "Computed Physics for orbital mechanics used to enable orbit around the sun.",
    "Wrote shaders in GLSL to create atmospheric glow.",
  ]

  // Snake Game Description
  const SnakeGameDescription = `
    A snake game coded in Rust using the Piston game engine.
  `;
  
  // SNASA Description
  const SNASADescription = `
    A database of data on stars, planets, star systems, and astronomical entities. Worked in a team of 3 using agile process to complete the project. My contributions included:
  `;
  const SNASADescriptionList = [
    "Designed a Relational Database from ER model, to relational, and then SQL DDL.",
    "Normalized Schemas using BCNF to reduce redundant data storage.",
    "Implemented frontend with HTML and JavaScript, and handled Backend SQL requests with PHP.",
  ]

  // Complex Number Calculator Description
  const ComplexNumberCalculatorDescription = `
    Software to perform mathematical operations on complex numbers (addition, multiplication, logarithms, exponentiation, trig, etc) and used numerical approximations for non-elementary functions (gamma, error, and zeta).
  `;
  const ComplexNumberCalculatorList = [
    "Using OOP concepts to create complex number class through inheritance.",
    "Derived and programed all complex definitions for mathematical functions from scratch.",
    "Utilized Python’s unit testing module to implement automated testing for each function.",
    "Used Python’s Tkinter module to create a calculator graphical user interface.",
  ]

  // Swim Team Organizer Description
  const SwimTeamOrganizerDescription = `
    Software to manage members of the team: add/remove members, manage captains, record swimmer statistics and swim styles. Developed to assist team coaches in management. Drawing inspiration from my old high school swim team.
  `;
  const SwimTeamOrganizerList = [
    "Created both console-based and graphical user interfaces using java swing.",
    "Using JSON objects and arrays to implement a save and load functionality for data persistence.",
    "Used comparison-based algorithms to recommend swim styles for members.",
    "Calculates, and displays team statistics, dynamically rearrange members as statistics are changed.",
    "Used Junit for automated testing of modules for the program.",
  ]

  // Coronary Heart Disease Prediction Model Description
  const CoronaryHeartDiseasePredictionModelDescription = `
    A model that helps classify angiographic disease status in patients. The model was developed to try and predict warning signs of the disease through other characteristics in patients.
  `;
  const CoronaryHeartDiseasePredictionModelList = [
    "Analyzed data for feature selection, identifying best characteristics that correlate to angiographic disease.",
    "Trained model using the k-nearest neighbor classification. Used Cross-validation to tune value for k.",
    "The model was compared to testing data to determine the overall accuracy of the model in making predictions.",
  ]


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
            description={ShellDescription}
            list={ShellList}
            date="2024"
          />
          <ContentSection
            heading="Shaders"
            subtitle="GLSL, JavaScript"
            description={ShadersDescription}
            list={ShadersList}
            date="2024"
          />
          <ContentSection
            heading="Solar System"
            subtitle="JavaScript"
            description={SolarSystemDescription}
            list={SolarSystemList}
            date="2024"
          />
          <ContentSection
            heading="Snake Game"
            subtitle="Rust"
            description={SnakeGameDescription}
            date="2023"
          />
          <ContentSection
            heading="SNASA"
            subtitle="PHP, JavaScript, SQL"
            description={SNASADescription}
            list={SNASADescriptionList}
            date="2023"
          />
          <ContentSection
            heading="Complex Number Calculator"
            subtitle="Python"
            description={ComplexNumberCalculatorDescription}
            list={ComplexNumberCalculatorList}
            date="2023"
          />
          <ContentSection
            heading="Swim Team Organizer"
            subtitle="Java"
            description={SwimTeamOrganizerDescription}
            list={SwimTeamOrganizerList}
            date="2022"
          />
          <ContentSection
            heading="Coronary Heart Disease Prediction Model"
            subtitle="R"
            description={CoronaryHeartDiseasePredictionModelDescription}
            list={CoronaryHeartDiseasePredictionModelList}
            date="2022"
          />
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ProjectsPage;