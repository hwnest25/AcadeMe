import { useState } from "react";
import { personas } from "../data/persona_details";
import "../styles/personas.css";

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
);

const NavControls = ({ onPrev, onNext, index, total, onDot }) => (
  <div className="persona-controls">
    <button className="persona-nav-btn" onClick={onPrev} aria-label="Show previous study persona">
      <ArrowLeft />
    </button>

    <div className="persona-progress" role="list" aria-label="Persona navigation">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={`progress-dot${i === index ? " active" : ""}`}
          onClick={() => onDot(i)}
          aria-label={`Go to persona ${i + 1}`}
          aria-current={i === index ? "true" : undefined}
          role="listitem"
        />
      ))}
    </div>

    <button className="persona-nav-btn" onClick={onNext} aria-label="Show next study persona">
      <ArrowRight />
    </button>
  </div>
);

const Personas = () => {
  const personaList = Object.values(personas);
  const [index, setIndex] = useState(0);

  const nextPersona = () => setIndex((prev) => (prev + 1) % personaList.length);
  const prevPersona = () => setIndex((prev) => (prev === 0 ? personaList.length - 1 : prev - 1));
  const goTo = (i) => setIndex(i);

  const persona = personaList[index];

  const maxRows = Math.max(persona.strengths.length, persona.challenges.length);
  const rows = Array.from({ length: maxRows }).map((_, i) => ({
    strength: persona.strengths[i] || "",
    challenge: persona.challenges[i] || ""
  }));

  return (
    <main className="personas-container">
      <article className="personas-card" aria-live="polite" aria-atomic="true">

        <NavControls onPrev={prevPersona} onNext={nextPersona} index={index} total={personaList.length} onDot={goTo} />

        <header className="persona-hero">
          <div className="persona-hero-image">
            {persona.image ? (
              <img src={persona.image} alt={persona.name} className="persona-illustration" />
            ) : (
              <div className="persona-illustration-placeholder" aria-label={persona.name} />
            )}
          </div>
          <div className="persona-hero-text">
            <h1 className="persona-name">{persona.name}</h1>
            <p className="persona-description">{persona.description}</p>
          </div>
        </header>

        <section className="persona-subcard">
          <table className="persona-table">
            <caption className="sr-only">Strengths and challenges for the {persona.name} study persona</caption>
            <thead>
              <tr>
                <th scope="col">Strengths</th>
                <th scope="col">Challenges</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="strength-cell">{row.strength}</td>
                  <td className="challenge-cell">{row.challenge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="persona-subcard persona-tips-card">
          <h2>Tips</h2>
          <ul className="persona-tips">
            {persona.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>

        <NavControls onPrev={prevPersona} onNext={nextPersona} index={index} total={personaList.length} onDot={goTo} />

      </article>
    </main>
  );
};

export default Personas;
