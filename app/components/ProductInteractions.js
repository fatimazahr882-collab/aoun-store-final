'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductInteractions({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const router = useRouter();

    const handleBuyNow = () => {
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            alert('Please select a color before buying.');
            return;
        }
        
        // We create a "URL-safe" package of the product details.
        const params = new URLSearchParams({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            color: selectedColor || '',
        });
        
        // Redirect to checkout with the data package.
        router.push(`/checkout?${params.toString()}`);
    };
    
    return (
        <div className="product-details">
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-detail-price">PKR {product.price.toFixed(2)}</div>
            <div className="description-box neon-border">
                <div className="neon-border-content"><p>{product.description || 'No description available.'}</p></div>
            </div>

            {product.colors && product.colors.length > 0 && (
                <div className="color-selector">
                    <h4>Color:</h4>
                    <div className="color-options">
                        {product.colors.map((color) => (
                            <div
                                key={color}
                                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color.toLowerCase() }}
                                title={color}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <input type="number" id="quantity-input" value={quantity} readOnly />
                <button className="quantity-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <div className="product-actions">
                <a className="neon-border btn-primary shaky-loop" onClick={handleBuyNow}>
                    <div className="neon-border-content"><i className="fas fa-money-bill-wave"></i> Buy Now</div>
                </a>
            </div>
        </div>
    );
}