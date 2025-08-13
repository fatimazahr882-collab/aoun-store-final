"use client"; // This must be a client component for interactivity

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the router

export default function ProductInteractions({ product }) {
    
    const router = useRouter(); // Initialize the router
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const changeQuantity = (amount) => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + amount;
            return newQuantity < 1 ? 1 : newQuantity;
        });
    };
    
    // This is the upgraded "Buy Now" function
    const handleBuyNow = () => {
        // First, check if a color needs to be selected
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            alert("Please select a color first!");
            return; // Stop the function if no color is chosen
        }

        // Create the URL for the checkout page with all the product info
        // We pass the data in the URL itself (e.g., ?id=24&quantity=2&color=red)
        const checkoutUrl = `/checkout?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&quantity=${quantity}&color=${encodeURIComponent(selectedColor || 'N/A')}`;

        // Tell the router to navigate to that URL
        router.push(checkoutUrl);
    };

    return (
        <>
            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
                <div className="color-selector">
                    <h4>Color:</h4>
                    <div className="color-options">
                        {product.colors.map(color => (
                            <div
                                key={color}
                                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color.toLowerCase() }}
                                title={color}
                                onClick={() => handleColorSelect(color)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity Selector */}
            <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => changeQuantity(-1)}>-</button>
                <input type="number" id="quantity-input" value={quantity} readOnly />
                <button className="quantity-btn" onClick={() => changeQuantity(1)}>+</button>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
                <a className="neon-border btn-secondary"><div className="neon-border-content"><i className="fas fa-cart-plus"></i> Add to Cart</div></a>
                <a className="neon-border btn-primary shaky-loop" onClick={handleBuyNow}><div className="neon-border-content"><i className="fas fa-money-bill-wave"></i> Buy Now</div></a>
            </div>
        </>
    );
}