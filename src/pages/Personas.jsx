import { useState } from "react";
import { personas } from "../data/persona_details";

const Personas = () => {
  const personaList = Object.values(personas);
  const [index, setIndex] = useState(0);

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
    <div className="personas-container">
      <div className="personas-card">

        <h2 className="persona-name">{persona.name}</h2>

        <div className="persona-emoji">{persona.emoji}</div>


        {/* DESCRIPTION CARD */}
        <div className="persona-subcard">
          <p className="persona-description">
            {persona.description}
          </p>
        </div>


        {/* TABLE CARD */}
        <div className="persona-subcard">

          <table className="persona-table">

            <thead>
              <tr>
                <th>Strengths</th>
                <th>Challenges</th>
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

        </div>


        {/* TIPS CARD */}
        <div className="persona-subcard persona-tips-card">

          <h3>Tips</h3>

          <ul className="persona-tips">
            {persona.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>

        </div>


        {/* DOTS */}
        <div className="persona-progress">
          {personaList.map((_, i) => (
            <span
              key={i}
              className={`progress-dot ${i === index ? "active" : ""}`}
            />
          ))}
        </div>


        {/* NAVIGATION */}
        <div className="persona-controls">
          <button onClick={prevPersona}>⬅ Previous</button>
          <button onClick={nextPersona}>Next ➡</button>
        </div>

      </div>
    </div>
  );
};

export default Personas;