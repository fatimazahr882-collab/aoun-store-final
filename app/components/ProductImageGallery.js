// products/components/ProductImageGallery.js

"use client";

import { useState } from 'react';
import Image from 'next/image'; // 1. IMPORT THE NEXT.JS IMAGE COMPONENT

// 2. ACCEPT THE 'priority' PROP TO IDENTIFY THE LCP ELEMENT
export default function ProductImageGallery({ images, productName, priority = false }) {
    
    const [mainImage, setMainImage] = useState(images?.[0] || '');
    const [isZoomed, setIsZoomed] = useState(false);

    const handleThumbnailClick = (newImageUrl) => {
        setMainImage(newImageUrl);
    };

    const openZoom = () => setIsZoomed(true);
    const closeZoom = () => setIsZoomed(false);

    return (
        <>
            <div className="product-images">
                <div className="main-image-container" onClick={openZoom}>
                    {/* 3. REPLACE <img> WITH <Image /> FOR THE MAIN IMAGE */}
                    <Image 
                        src={mainImage} 
                        alt={productName} 
                        className="main-image"
                        // IMPORTANT: Provide the actual width and height of your source images
                        width={800}
                        height={800}
                        sizes="(max-width: 768px) 100vw, 40vw"
                        // 4. APPLY THE PRIORITY PROP HERE. THIS IS THE KEY LCP FIX.
                        priority={priority}
                    />
                </div>
                <div className="thumbnail-images">
                    {images?.map((url, index) => (
                        // 5. REPLACE <img> FOR THUMBNAILS. THESE WILL LAZY-LOAD AUTOMATICALLY.
                        <Image 
                            key={index} 
                            src={url} 
                            alt={`Thumbnail of ${productName}`} 
                            className={`thumbnail-image ${mainImage === url ? 'active' : ''}`}
                            onClick={() => handleThumbnailClick(url)}
                            // Use smaller dimensions for thumbnails
                            width={100}
                            height={100}
                        />
                    ))}
                </div>
            </div>

            {isZoomed && (
                <div className="image-zoom-overlay active">
                    <span className="close-zoom" onClick={closeZoom}>×</span>
                    {/* 6. REPLACE THE ZOOMED IMAGE AS WELL */}
                    <Image 
                        src={mainImage} 
                        alt={`Zoomed view of ${productName}`}
                        width={1200}
                        height={1200}
                        sizes="100vw"
                    />
                </div>
            )}
        </>
    );
}