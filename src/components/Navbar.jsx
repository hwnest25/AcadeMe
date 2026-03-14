// components/NavBar.jsx
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ name }) => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🎓</span>
                    <span className="logo-text">{name}</span>
                </Link>
                <ul className="navbar-menu">
                    <li>
                        <Link
                            to="/"
                            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/About"
                            className={`nav-link ${location.pathname === "/About" ? "active" : ""}`}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Contact"
                            className={`nav-link ${location.pathname === "/Contact" ? "active" : ""}`}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;