// src/utils/PersonaCalculator.js

const PersonaCalculator = (answers) => {

    const scores = {
        perfectionist: 0,
        lastminute: 0,
        sprinter: 0,
        aiaddict: 0,
        einstein: 0,
    };

    answers.forEach((persona) => {
        scores[persona]++;
    });

    return Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

};

export default PersonaCalculator;