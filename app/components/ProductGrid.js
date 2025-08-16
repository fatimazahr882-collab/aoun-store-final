'use client';

import Link from 'next/link';

// We no longer need useEffect or useRef here.

function slugify(text) {
  if (!text) return '';
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

function ProductCard({ product, index }) {
    const frontImage = product.image_urls?.[0] || '';
    const backImage = product.image_urls?.[1] || frontImage;
    const slug = slugify(product.name);

    // THE FIX: The 'visible' class is now always applied, and we use a CSS animation.
    // We add a 'transition-delay' style for the staggered effect.
    return (
        <Link href={`/products/${product.id}-${slug}`} className="product-card neon-border visible" style={{ animationDelay: `${index * 100}ms` }}>
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
            {products && products
              .filter(product => product && product.id && product.name)
              .map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
    );
}