'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

export default function CollectionsSection({ collections }) {
    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const slider = scrollContainerRef.current;
        if (!slider) return;

        let isDown = false;
        let startX;
        let scrollLeft;
        let dragThresholdMet = false;

        const handleMouseDown = (e) => {
            isDown = true;
            dragThresholdMet = false;
            slider.classList.add('active-drag');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            slider.classList.remove('active-drag');
        };

        const handleMouseUp = () => {
            isDown = false;
            slider.classList.remove('active-drag');
            // This logic determines if it was a click or a drag
            if (dragThresholdMet) {
                setIsDragging(true);
                setTimeout(() => setIsDragging(false), 50);
            } else {
                setIsDragging(false);
            }
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = x - startX;
            if (Math.abs(walk) > 10) { // Threshold to be considered a drag
                dragThresholdMet = true;
            }
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="collections-section">
            <div className="container">
                <h2 className="section-title visible">Our Collections</h2>
            </div>
            <div className="collections-container-wrapper draggable" ref={scrollContainerRef}>
                <div className="collections-container">
                    {collections && collections
                      .filter(collection => collection && collection.id && collection.name)
                      .map((collection) => (
                        <Link 
                            key={collection.id} 
                            href={`/collections/${collection.id}`} // Links by ID
                            className="collection-item"
                            onClick={(e) => {
                                if (isDragging) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <div className="neon-border">
                                <div className="neon-border-content">
                                    <img src={collection.image_url || ''} alt={collection.name} draggable="false" />
                                </div>
                            </div>
                            <h4>{collection.name}</h4>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}