// components/NavBar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getAvatarSrc, getAvatarEmoji } from "./AvatarPicker.jsx";

const NavBar = ({ name }) => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path ? "active" : "";

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const avatarSrc = getAvatarSrc(user?.avatar_seed);
    const avatarEmoji = getAvatarEmoji(user?.avatar_seed);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🎓</span>
                    <span className="logo-text">{name}</span>
                </Link>
                <ul className="navbar-menu">
                    <li>
                        <Link to="/" className={`nav-link ${isActive("/")}`}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className={`nav-link ${isActive("/about")}`}>About</Link>
                    </li>
                    <li>
                        <Link to="/personas" className={`nav-link ${isActive("/personas")}`}>
                            Explore the Personas
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className={`nav-link ${isActive("/contact")}`}>Contact</Link>
                    </li>

                    {user ? (
                        <>
                            <li>
                                <Link to="/dashboard" className={`nav-link ${isActive("/dashboard")}`}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className={`nav-link ${isActive("/profile")}`}
                                    aria-label={`${user.username}'s profile`}
                                    style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                                >
                                    {avatarSrc ? (
                                        <img
                                            src={avatarSrc}
                                            alt=""
                                            aria-hidden="true"
                                            style={{ width: 26, height: 26, borderRadius: 6, objectFit: "cover" }}
                                        />
                                    ) : (
                                        <span aria-hidden="true">{avatarEmoji}</span>
                                    )}
                                    {user.username}
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="nav-link"
                                    onClick={handleLogout}
                                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                >
                                    Log Out
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className={`nav-link ${isActive("/login")}`}>Log In</Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="nav-link"
                                    style={{
                                        background: "#aa3bff",
                                        color: "#fff",
                                        padding: "0.4rem 1rem",
                                        borderRadius: "8px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;

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