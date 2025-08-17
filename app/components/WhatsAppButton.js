// app/components/WhatsAppButton.js

"use client";
import { FaWhatsapp } from 'react-icons/fa'; // Assuming you use react-icons

export default function WhatsAppButton() {
    const phoneNumber = "+923348846378"; // Replace with your WhatsApp number e.g., 15551234567
    const message = "Hello, I have a question about your products.";

    return (
        <a 
            href={`https://wa.me/${923348846378}?text=${encodeURIComponent(message)}`}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
        >
            {/* If you don't use react-icons, you can place an SVG or <img> here */}
            <FaWhatsapp /> 
        </a>
    );
}