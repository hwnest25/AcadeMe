import './App.css'
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Navbar from "./components/NavBar.jsx";
import Results from "./pages/Results.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

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