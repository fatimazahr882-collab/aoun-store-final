"use client"; // This must be a client component because it has a form

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
        };

        const { error } = await supabase.from('messages').insert([formData]);

        setIsSubmitting(false);

        if (error) {
            setMessage("Error: " + error.message);
        } else {
            setMessage("Thank you! Your message has been sent successfully.");
            e.target.reset(); // Clear the form
        }
    };

    return (
        <div className="container">
            <h2 className="section-title visible">Contact Us</h2>
            <div className="form-container">
                <h3>Send Us a Message</h3>
                <form onSubmit={handleContactSubmit}>
                    <div className="form-group">
                        <label htmlFor="contact-name">Name</label>
                        <input type="text" id="contact-name" name="name" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-email">Email</label>
                        <input type="email" id="contact-email" name="email" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-subject">Subject</label>
                        <input type="text" id="contact-subject" name="subject" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-message">Message</label>
                        <textarea id="contact-message" name="message" className="form-control" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
                {message && <p style={{ marginTop: '20px', textAlign: 'center' }}>{message}</p>}
            </div>
        </div>
    );
}