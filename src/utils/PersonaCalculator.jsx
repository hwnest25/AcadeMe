// src/utils/PersonaCalculator.js

const PersonaCalculator = (answers) => {

    const scores = {
        persistent_perfectionist: 0,
        lastminute_legend: 0,
        strategic_sprinter: 0,
        ai_addict: 0,
        effortless_einstein: 0,
        consistent_climber: 0,

    };

    answers.forEach((persona) => {
        scores[persona]++;
    });

    return Object.keys(scores).reduce((highest, current) => {
  return scores[current] > scores[highest] ? current : highest;
});

};

export default PersonaCalculator;