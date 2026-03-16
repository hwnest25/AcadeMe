import { useState, useEffect } from "react";
import { personas } from "../data/persona_details";
import "../styles/personas.css";

const Personas = () => {
  const personaList = Object.values(personas);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [index]);

  const nextPersona = () => {
    setIndex((prev) => (prev + 1) % personaList.length);
  };

  const prevPersona = () => {
    setIndex((prev) =>
      prev === 0 ? personaList.length - 1 : prev - 1
    );
  };

  const persona = personaList[index];

  const maxRows = Math.max(
    persona.strengths.length,
    persona.challenges.length
  );

  const rows = Array.from({ length: maxRows }).map((_, i) => ({
    strength: persona.strengths[i] || "",
    challenge: persona.challenges[i] || ""
  }));

  return (
    <main className="personas-container">

      <article
        className="personas-card"
        aria-live="polite"
        aria-atomic="true"
      >

        <header>

          <h1 className="persona-name">
            {persona.name}
          </h1>

          <div className="persona-emoji">
            <span aria-hidden="true">{persona.emoji}</span>
          </div>

        </header>


        {/* DESCRIPTION */}
        <section className="persona-subcard">

          <p className="persona-description">
            {persona.description}
          </p>

        </section>


        {/* STRENGTHS + CHALLENGES TABLE */}
        <section className="persona-subcard">

          <table className="persona-table">

            <caption className="sr-only">
              Strengths and challenges for the {persona.name} study persona
            </caption>

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


        {/* TIPS */}
        <section className="persona-subcard persona-tips-card">

          <h2>Tips</h2>

          <ul className="persona-tips">
            {persona.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>

        </section>


        {/* PERSONA PROGRESS INDICATOR */}
        <nav
          className="persona-progress"
          aria-label="Persona navigation"
        >

          {personaList.map((_, i) => (
            <span
              key={i}
              className={`progress-dot ${i === index ? "active" : ""}`}
              aria-label={`Persona ${i + 1} of ${personaList.length}`}
              role="status"
            />
          ))}

        </nav>


        {/* NAVIGATION BUTTONS */}
        <nav
          className="persona-controls"
          aria-label="Persona navigation controls"
        >

          <button
            onClick={prevPersona}
            aria-label="Show previous study persona"
          >
            ⬅ Previous
          </button>

          <button
            onClick={nextPersona}
            aria-label="Show next study persona"
          >
            Next ➡
          </button>

        </nav>

      </article>

    </main>
  );
};

export default Personas;