import React, { useState } from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            alert("Thank you! Your message has been sent.");
            setFormData({ name: '', email: '', message: '' });
            setSubmitted(false);
        }, 500);
    };

    return (
        <div className="contact-container font-poppins  ">
            <h1 className="text-4xl font-bold text-blue-700 text-center my-14">Contact Us</h1>
            <div className="contact-content">
                
                {/* Contact Information */}
                <div className="contact-info">
                    <div className="info-box">
                        <FaMapMarkerAlt className="icon text-red-500" />
                        <h3>Address</h3>
                        <p>123 Commerce Ave, Silicon City, CA 94111</p>
                    </div>
                    <div className="info-box">
                        <FaPhone className="icon text-green-500" />
                        <h3>Phone</h3>
                        <p>(123) 456-7890</p>
                    </div>
                    <div className="info-box">
                        <FaEnvelope className="icon text-blue-500" />
                        <h3>Email</h3>
                        <p>support@quickstore.com</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-container">
                    <h2 className="text-3xl font-bold text-blue-700 text-center mb-4">Any Queries</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                        <label className="form-label">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="form-textarea"
                            required
                        ></textarea>
                        <button type="submit" className="submit-button" disabled={submitted}>
                            {submitted ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
