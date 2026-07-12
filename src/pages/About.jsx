import { personas } from "../data/persona_details";
import PersonaPreviewCard from "../components/PersonaPreviewCard";
import StepsSection from "../components/StepsSection";
import { Link } from "react-router-dom";
import "../styles/about.css";
import academeLogo from "../assets/icons/academe-logo.svg";

const About = () => {

  const personaList = Object.values(personas);

  return (
    <main className="about-container">

      <article className="about-card">

        <header className="about-header">
          <div className="about-icon">
            <img src={academeLogo} alt="" aria-hidden="true" />
          </div>

          <h1 className="about-title">What is AcadeMe?</h1>

          <p className="about-tagline">
            Discover and optimize your studying style
          </p>
        </header>


        <section className="about-section">

          <p className="about-text">
            The AcadeMe Study Persona Quiz is an interactive assessment designed
            to help students understand their unique learning patterns.
          </p>

          <p className="about-text">
            By answering 10 carefully crafted questions you'll discover which
            of six distinct personas best matches your learning style.
          </p>

        </section>


        <section className="about-section">

          <h2 className="section-heading">
            How It Works
          </h2>

          <StepsSection />

        </section>


        <section className="about-section">

          <h2 className="section-heading">
            Meet the Six Personas
          </h2>

          <div className="personas-grid">

            {personaList.map((persona) => (
              <PersonaPreviewCard
                key={persona.name}
                persona={persona}
              />
            ))}

          </div>

        </section>


        <footer className="about-footer">

          <p>
            Ready to discover your study persona?
          </p>

          <Link
            to="/quiz"
            className="cta-button"
            aria-label="Start the AcadeMe study persona quiz"
          >
            Take the Quiz
          </Link>

        </footer>

      </article>

    </main>
  );
};

export default About;