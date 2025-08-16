'use client';

import Link from 'next/link';
import Image from 'next/image'; // Assuming you are using next/image now
import { useEffect, useRef } from 'react';

function slugify(text) { /* ... */ }

function ProductCard({ product, index }) { // We receive 'index' here
    const cardRef = useRef(null);
    useEffect(() => { /* ... */ }, []);

    const frontImage = product.image_urls?.[0] || '/placeholder.png';
    const backImage = product.image_urls?.[1] || frontImage;
    const slug = slugify(product.name);

    return (
        <Link href={`/products/${product.id}-${slug}`} ref={cardRef} className="product-card neon-border" style={{ transitionDelay: `${index * 100}ms` }}>
            <div className="neon-border-content">
                <div className="product-image-container">
                    {product.price < product.original_price && <div className="sale-tag">SALE</div>}
                    <Image 
                      src={frontImage} 
                      alt={product.name} 
                      fill 
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 23vw"
                      style={{ objectFit: 'cover' }} 
                      className="product-image front-image"
                      // --- THIS IS THE FIX ---
                      // Load the first 4 images immediately, lazy load the rest.
                      priority={index < 4} 
                    />
                    <Image 
                      src={backImage} 
                      alt={product.name} 
                      fill 
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 23vw"
                      style={{ objectFit: 'cover' }} 
                      className="product-image back-image"
                      priority={index < 4}
                    />
                </div>
                <div className="product-info">{/* ... */}</div>
            </div>
        </Link>
    );
}

export default function ProductGrid({ products }) {
    return (
        <div className="products-container">
            {products && products
              .filter(p => p && p.id && p.name)
              .map((product, index) => ( // Pass the index to the ProductCard
                <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
    );
}