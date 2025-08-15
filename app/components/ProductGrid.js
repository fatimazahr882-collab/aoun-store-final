'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

// A simple, safe function to create URL-friendly slugs
function slugify(text) {
  if (!text) return '';
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

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
        return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
    }, []);

    // We can be confident 'product' is valid here because of the filter below
    const frontImage = product.image_urls?.[0] || '';
    const backImage = product.image_urls?.[1] || frontImage;
    const slug = slugify(product.name);

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
            {/* 
              ===================================================================
              THE DEEP FIX: We filter the 'products' array BEFORE we map it.
              This ensures we only ever try to render valid products with a name and ID.
              This prevents the <Link> component from ever receiving bad data.
              ===================================================================
            */}
            {products && products
              .filter(product => product && product.id && product.name)
              .map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
    );
}