import './App.css'
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Quiz from "./Pages/Quiz.jsx";
import Navbar from "./components/NavBar.jsx";
import Results from "./Pages/Results.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";

const App = () => {
    return (
        <BrowserRouter>
        <Navbar name={"ACADEME"}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Quiz" element={<Quiz />} />
                <Route path="/Results" element={<Results />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;