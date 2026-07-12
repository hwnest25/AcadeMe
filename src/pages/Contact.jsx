// Pages/Contact.jsx
import Form from "../components/Form.jsx";
import "../styles/contact.css";
import contactHeaderImg from "../assets/icons/contact-header.svg";
import iconWebsite from "../assets/icons/icon-website.svg";

const Contact = () => (
    <div className="contact-container">
        <div className="contact-card">
            <div className="contact-header">
                <div className="contact-icon">
                    <img src={contactHeaderImg} alt="" aria-hidden="true" />
                </div>
                <h1 className="contact-title">Get in Touch</h1>
                <p className="contact-subtitle">
                    Questions? Feedback? Suggestions?
                </p>
                <p className="contact-subtitle">We'd love to hear from you!</p>
            </div>
            <Form />
            <div className="contact-info">
                <div className="info-item">
                    <img src={iconWebsite} alt="" aria-hidden="true" className="info-icon" />
                    <div className="info-content">
                        <h4>Website</h4>
                        <a href="https://academe-quiz.vercel.app/">academe-quiz.vercel.app</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Contact;