'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

function ProductCard({ product, index }) {
    const cardRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const frontImage = product.image_urls?.[0] || '';
    const backImage = product.image_urls?.[1] || frontImage;
    const slug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    return (
        <Link href={`/products/${product.id}-${slug}`} ref={cardRef} className="product-card neon-border" style={{ transitionDelay: `${index * 100}ms` }}>
            <div className="neon-border-content">
                <div className="product-image-container">
                    {product.price < product.original_price && <div className="sale-tag">SALE</div>}
                    <img src={frontImage} alt={product.name} className="product-image front-image" loading="lazy" />
                    <img src={backImage} alt={product.name} className="product-image back-image" loading="lazy" />
                </div>
                <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-price">PKR {product.price.toFixed(2)}</div>
                </div>
            </div>
        </Link>
    );
}

export default function ProductGrid({ products }) {
    return (
        <div className="products-container">
            {products?.length > 0 ? (
                products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)
            ) : (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No products found.</p>
            )}
        </div>
    );
}