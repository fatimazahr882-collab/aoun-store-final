"use client"; // This also needs to be an interactive component

import { useState } from 'react';

// We receive the product's images as a "prop"
export default function ProductImageGallery({ images, productName }) {
    
    // We use state to track the currently displayed main image
    const [mainImage, setMainImage] = useState(images?.[0] || '');
    const [isZoomed, setIsZoomed] = useState(false);

    // This function runs when a user clicks a thumbnail
    const handleThumbnailClick = (newImageUrl) => {
        setMainImage(newImageUrl);
    };

    // These functions handle opening and closing the zoom view
    const openZoom = () => setIsZoomed(true);
    const closeZoom = () => setIsZoomed(false);

    return (
        <>
            <div className="product-images">
                <div className="main-image-container" onClick={openZoom}>
                    <img src={mainImage} alt={productName} className="main-image" />
                </div>
                <div className="thumbnail-images">
                    {images?.map((url, index) => (
                        <img 
                            key={index} 
                            src={url} 
                            alt={`Thumbnail of ${productName}`} 
                            className={`thumbnail-image ${mainImage === url ? 'active' : ''}`}
                            onClick={() => handleThumbnailClick(url)}
                        />
                    ))}
                </div>
            </div>

            {/* This is the zoom overlay, which is hidden by default */}
            {isZoomed && (
                <div className="image-zoom-overlay active">
                    <span className="close-zoom" onClick={closeZoom}>×</span>
                    <img src={mainImage} alt={`Zoomed view of ${productName}`} />
                </div>
            )}
        </>
    );
}