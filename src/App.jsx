import './App.css'
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import NavBar from "./components/NavBar.jsx";
import Results from "./pages/Results.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Personas from "./pages/Personas.jsx";

const App = () => {
    return (
        <BrowserRouter>
        <NavBar name={"AcadeMe"}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/results" element={<Results />} />
                <Route path="/about" element={<About />} />
                <Route path="/personas" element={<Personas />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;