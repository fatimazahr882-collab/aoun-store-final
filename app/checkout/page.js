"use client"; // This page must be a client component because it has a form

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient'; // Import our supabase connection

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams(); // This hook reads the data from the URL

    // State to hold all the data from the form
    const [customerData, setCustomerData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        address: ''
    });
    
    // State to hold the product data we passed in the URL
    const [productData, setProductData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // This runs when the page first loads
    useEffect(() => {
        // Read the product details from the URL
        const product = {
            id: searchParams.get('id'),
            name: searchParams.get('name'),
            price: searchParams.get('price'),
            quantity: searchParams.get('quantity'),
            color: searchParams.get('color')
        };
        // If there's no product ID, we can't proceed, so go back to the homepage
        if (!product.id) {
            router.push('/');
        } else {
            setProductData(product);
        }
    }, [searchParams, router]);

    // A single function to handle changes in any form field
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prevData => ({ ...prevData, [name]: value }));
    };

    // This function runs when the "Place Order" button is clicked
    const handlePlaceOrder = async (e) => {
        e.preventDefault(); // Prevents the page from reloading
        
        if (!customerData.name || !customerData.phone || !customerData.city || !customerData.address) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        // Prepare the final order object to send to Supabase
        const orderData = {
            product_id: productData.id,
            product_name: productData.name,
            quantity: productData.quantity,
            selected_color: productData.color,
            total_price: productData.price * productData.quantity,
            customer_name: customerData.name,
            customer_phone: customerData.phone,
            customer_email: customerData.email,
            customer_city: customerData.city,
            customer_address: customerData.address,
            status: 'Pending' // Set the initial order status
        };

        // Send the data to the 'orders' table in Supabase
        const { error } = await supabase.from('orders').insert([orderData]);

        setIsSubmitting(false);

        if (error) {
            alert("There was an error placing your order. Please try again. Error: " + error.message);
        } else {
            // If the order is successful, go to the thank you page
            router.push('/thank-you');
        }
    };
    
    // If product data hasn't loaded yet, show a spinner
    if (!productData) {
        return <div className="spinner"></div>;
    }

    return (
        <div className="container">
            <h2 className="section-title visible">Customer Details</h2>
            <div className="form-container">
                <h3>Shipping Information</h3>
                <form onSubmit={handlePlaceOrder}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" className="form-control" required value={customerData.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Contact Number (e.g., 03XX-XXXXXXX)</label>
                        <input type="tel" name="phone" className="form-control" required value={customerData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Email Address (Optional)</label>
                        <input type="email" name="email" className="form-control" value={customerData.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" name="city" className="form-control" required value={customerData.city} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Full Address</label>
                        <textarea name="address" className="form-control" rows="3" required value={customerData.address} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="form-group payment-method">
                        <h4>Payment Method</h4>
                        <p><i className="fas fa-money-bill-wave"></i> Cash on Delivery (COD)</p>
                    </div>
                    
                    {/* The button is disabled while the order is being submitted */}
                    <button type="submit" className="btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
            </div>
        </div>
    );
}