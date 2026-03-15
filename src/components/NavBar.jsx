// components/NavBar.jsx
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ name }) => {
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
                            to="/about"
                            className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/personas"
                            className={`nav-link ${location.pathname === "/personas" ? "active" : ""}`}
                        >
                            Explore the Personas
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;