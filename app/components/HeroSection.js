'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slideshowImages = [
    { url: 'https://i.postimg.cc/CBFHG8mb/banner-6d0fc710-f666-4d08-b75b-8982ec3e4a70.jpg', title: 'Amira Ready-to-Wear', desc: 'Effortless style for every occasion.' },
    { url: 'https://i.postimg.cc/kVWfFq9P/eastern-sale-banner-2000x.jpg', title: 'New Season, New Style', desc: 'Up to 50% Off on our latest collection.' },
    { url: 'https://i.postimg.cc/yJRrQ0m5/eastern-lawn-banner-2000x.jpg', title: 'Lawn Collection \'25', desc: 'Experience the blend of tradition and trend.' }
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-section">
            <div className="slideshow">
                {slideshowImages.map((slide, index) => (
                    <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                        <img 
                            src={slide.url} 
                            alt={slide.title} 
                            className="slide-image"
                        />
                        <div className="slide-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.desc}</p>
                            <Link href="/shop" className="btn">Shop Now</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}