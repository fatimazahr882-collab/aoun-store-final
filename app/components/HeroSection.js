// app/components/HeroSection.js

"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image'; // We use the optimized Image component

// Here are the new slides with your provided images
const slides = [
    {
        imageUrl: 'https://i.ibb.co/cSsLHsQw/Spring-Fashion-Brand-Website-Homepage-Banner-1.png',
        title: "Spring '25 Collection",
        subtitle: 'Effortless style for the new season.',
        alt: "Spring Fashion Brand Website Homepage Banner"
    },
    {
        imageUrl: 'https://i.ibb.co/Y4NvsDTH/Elegant-Modern-Luxury-Fashion-Company-Blog-Cover-1.png',
        title: 'Luxury Redefined',
        subtitle: 'Discover our premium, elegant designs.',
        alt: 'Elegant Modern Luxury Fashion Company Blog Cover'
    },
    // I've added the second image again to create a three-slide rotation
    {
        imageUrl: 'https://i.ibb.co/Y4NvsDTH/Elegant-Modern-Luxury-Fashion-Company-Blog-Cover-1.png',
        title: 'Timeless Elegance',
        subtitle: 'Crafted for the modern woman.',
        alt: 'Elegant Modern Luxury Fashion Company Blog Cover'
    }
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearTimeout(timer);
    }, [currentSlide]);

    return (
        <section className="hero-section">
            <div className="slideshow">
                {slides.map((slide, index) => (
                    <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                        {/* THE PERFORMANCE OPTIMIZATION IS HERE: */}
                        <Image
                            src={slide.imageUrl}
                            alt={slide.alt}
                            fill
                            sizes="100vw"
                            // The 'priority' prop is ONLY applied to the very first image.
                            // This preloads the image, fixing your LCP for a high performance score.
                            priority={index === 0}
                            className="slide-image"
                        />
                        <div className="slide-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.subtitle}</p>
                            <button className="btn">Shop Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}