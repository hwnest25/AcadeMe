import { personas } from "../data/persona_details"
import PersonaPreviewCard from "../components/PersonaPreviewCard"
import StepsSection from "../components/StepsSection"
import { Link } from "react-router-dom"
import "../styles/About.css"

const About = () => {

  const personaList = Object.values(personas)

  return (
    <div className="about-container">

      <div className="about-card">

        <div className="about-header">
          <div className="about-icon">📚</div>
          <h1 className="about-title">What is AcadeMe?</h1>
          <p className="about-tagline">
            Discover and optimize your studying style
          </p>
        </div>


        <div className="about-section">

          <p className="about-text">
            The AcadeMe Study Persona Quiz is an interactive assessment designed
            to help students understand their unique learning patterns.
          </p>

          <p className="about-text">
            By answering 10 carefully crafted questions you'll discover which
            of six distinct personas best matches your learning style.
          </p>
        </div>

        <div className="about-section">

          <h2 className="section-heading">
            How It Works
          </h2>

          <StepsSection/>

        </div>

        <div className="about-section">

          <h2 className="section-heading">
            Meet the Six Personas
          </h2>

          <div className="personas-grid">

            {personaList.map((persona,index) => (
              <PersonaPreviewCard
                key={index}
                persona={persona}
              />
            ))}

          </div>

        </div>




        <div className="about-footer">

          <p>
            Ready to discover your study persona?
          </p>

          <Link to="/quiz" className="cta-button">
            Take the Quiz
          </Link>

        </div>

      </div>

    </div>
  )
}

export default About