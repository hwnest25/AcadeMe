// Pages/Contact.jsx
import Form from "../components/Form.jsx";

const Contact = () => (
    <div className="contact-container">
        <div className="contact-card">
            <div className="contact-header">
                <div className="contact-icon">📧</div>
                <h1 className="contact-title">Get in Touch</h1>
                <p className="contact-subtitle">
                    Have questions, feedback, or suggestions? We'd love to hear from you!
                </p>
            </div>
            <Form />
            <div className="contact-info">
                <div className="info-item">
                    <span className="info-icon">🌐</span>
                    <div className="info-content">
                        <h4>Website</h4>
                        <p>academe-quiz.com</p>
                    </div>
                </div>
                <div className="info-item">
                    <span className="info-icon">✉️</span>
                    <div className="info-content">
                        <h4>Email</h4>
                        <p>support@academe-quiz.com</p>
                    </div>
                </div>
                <div className="info-item">
                    <span className="info-icon">⏰</span>
                    <div className="info-content">
                        <h4>Response Time</h4>
                        <p>Within 24-48 hours</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Contact;