'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function CollectionsSection({ collections }) {
    const scrollContainerRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // This useEffect hook handles all client-side logic safely.
    useEffect(() => {
        const slider = scrollContainerRef.current;
        if (!slider || !collections) return;

        // --- START: Logic that is now safely inside useEffect ---
        // We clear the container to prevent duplication on re-renders.
        slider.innerHTML = ''; 
        collections.forEach(collection => {
            const link = document.createElement('a');
            link.className = 'collection-item';
            link.href = `/collections/${collection.id}`;
            link.innerHTML = `
                <div class="neon-border">
                    <div class="neon-border-content">
                        <img src="${collection.image_url || ''}" alt="${collection.name}" />
                    </div>
                </div>
                <h4>${collection.name}</h4>
            `;
            slider.appendChild(link);
        });

        // This client-side check is now safe.
        const isMobile = window.innerWidth <= 768;
        const itemsToExceed = isMobile ? 3 : 6;
        
        // This DOM manipulation is also now safe.
        if (collections.length > itemsToExceed) {
            const originalHTML = slider.innerHTML;
            slider.innerHTML += originalHTML; 
            slider.classList.add('animated');
        } else {
            slider.classList.remove('animated');
        }
        // --- END: Logic safely inside useEffect ---

        // The drag-and-drop event listeners
        const handleMouseDown = (e) => {
            setIsDown(true);
            slider.parentElement.classList.add('active-drag');
            setStartX(e.pageX - slider.parentElement.offsetLeft);
            setScrollLeft(slider.parentElement.scrollLeft);
        };
        const handleMouseLeave = () => {
            setIsDown(false);
            slider.parentElement.classList.remove('active-drag');
        };
        const handleMouseUp = () => {
            setIsDown(false);
            slider.parentElement.classList.remove('active-drag');
        };
        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.parentElement.offsetLeft;
            const walk = (x - startX) * 2;
            slider.parentElement.scrollLeft = scrollLeft - walk;
        };

        const wrapper = slider.parentElement;
        wrapper.addEventListener('mousedown', handleMouseDown);
        wrapper.addEventListener('mouseleave', handleMouseLeave);
        wrapper.addEventListener('mouseup', handleMouseUp);
        wrapper.addEventListener('mousemove', handleMouseMove);

        return () => {
            wrapper.removeEventListener('mousedown', handleMouseDown);
            wrapper.removeEventListener('mouseleave', handleMouseLeave);
            wrapper.removeEventListener('mouseup', handleMouseUp);
            wrapper.removeEventListener('mousemove', handleMouseMove);
        };
    }, [collections, isDown, startX, scrollLeft]); // Rerun when these change

    // The initial render is now very simple and the same on server and client.
    return (
        <div className="collections-section">
            <div className="container">
                <h2 className="section-title visible">Our Collections</h2>
            </div>
            <div className="collections-container-wrapper draggable">
                {/* The ref points here. useEffect will populate it on the client. */}
                <div className="collections-container" ref={scrollContainerRef}></div>
            </div>
        </div>
    );
}