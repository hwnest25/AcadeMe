# ACADEME 🎓

> Discover your study persona and unlock your learning potential.

ACADEME is an interactive web application that helps students understand their learning habits through a short diagnostic quiz. Based on your answers, you are assigned one of five unique study personas — each with personalized strengths, challenges, and actionable tips to help you study smarter.

---

##  Study Personas

| Persona | Description |
|---|---|
|  Persistent Perfectionist | Organized, thorough, and always prepared |
|  Last-Minute Legend | Deadline-driven and thrives under pressure |
|  Strategic Sprinter | Efficient, goal-oriented, and focused |
|  AI Addict | Tech-forward and leverages digital tools |
|  Effortless Einstein | Intuitive, fast learner with natural understanding |

---

## Features

- 10-question diagnostic quiz
- Automatic persona calculation based on answers
- Personalized results with strengths, challenges, and study tips
- Progress tracking throughout the quiz
- Clean and responsive user interface
- Smooth navigation between pages

---

## Technologies Used

| Technology | Purpose |
|---|---|
| [React.js](https://react.dev/) | Frontend UI library |
| [Vite](https://vitejs.dev/) | Build tool and development server |
| [React Router DOM](https://reactrouter.com/) | Client-side routing and navigation |
| JavaScript (ES6+) | Core programming language |
| HTML5 & CSS3 | Structure and styling |

---

## Project Structure

```
src/
 ├── pages/
 │    ├── Home.jsx          # Welcome page
 │    ├── Quiz.jsx          # Quiz logic and question display
 │    └── Results.jsx       # Persona result and recommendations
 ├── components/
 │    ├── Navbar.jsx        # Navigation bar
 │    ├── QuestionCards.jsx # Displays each question and options
 │    └── PersonaCard.jsx   # Displays the result persona
 ├── data/
 │    ├── questions.js      # All quiz questions and answer mappings
 │    └── personas.js       # Persona descriptions, strengths and tips
 ├── utils/
 │    └── PersonaCalculator.js  # Scoring logic and persona calculation
 └── App.jsx                # Routes and app structure
```

---

## Getting Started

### Prerequisites
- Node.js installed on your machine
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MouradOur/ACADEMEQuizApp.git

# Navigate into the project folder
cd ACADEMEQuizApp

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open your browser at `http://localhost:5173`

---

## How It Works

1. User lands on the **Home** page and clicks Start
2. User answers **10 questions** about their study habits
3. Each answer is mapped to one of the 5 personas
4. `PersonaCalculator` counts the scores and finds the persona with the most points
5. User is redirected to the **Results** page with their persona
6. Results page displays their persona name, description, strengths, challenges, and tips

---

## Author

Made by [MouradOur](https://github.com/MouradOur) , [hwnest25](https://github.com/hwnest25/)

---

## License

This project is open source and available under the [MIT License](LICENSE).
