import { useState } from "react";

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error while typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                subject: "",
                message: ""
            });
            setErrors({});
        }, 3000);
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="firstName">
                        First Name <span className="required">*</span>
                    </label>

                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className={errors.firstName ? "error" : ""}
                    />

                    {errors.firstName && (
                        <span className="error-message">{errors.firstName}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">
                        Last Name <span className="required">*</span>
                    </label>

                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className={errors.lastName ? "error" : ""}
                    />

                    {errors.lastName && (
                        <span className="error-message">{errors.lastName}</span>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="email">
                    Email <span className="required">*</span>
                </label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={errors.email ? "error" : ""}
                />

                {errors.email && (
                    <span className="error-message">{errors.email}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="subject">
                    Subject <span className="required">*</span>
                </label>

                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Why are you reaching out?"
                    className={errors.subject ? "error" : ""}
                />

                {errors.subject && (
                    <span className="error-message">{errors.subject}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="message">
                    Message <span className="required">*</span>
                </label>

                <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your question or feedback..."
                    className={errors.message ? "error" : ""}
                />

                {errors.message && (
                    <span className="error-message">{errors.message}</span>
                )}
            </div>

            <button
                type="submit"
                disabled={submitted}
                className={`submit-button ${submitted ? "success" : ""}`}
            >
                {submitted ? (
                    <>
                        <span>&#10003;</span> Message Sent!
                    </>
                ) : (
                    <>
                        Send Message
                    </>
                )}
            </button>
        </form>
    );
};

export default Form;