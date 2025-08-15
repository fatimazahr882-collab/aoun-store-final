'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { Suspense } from 'react';

function CheckoutForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Unpack all the product details from the URL.
    const productId = searchParams.get('id');
    const productName = searchParams.get('name');
    const price = parseFloat(searchParams.get('price') || '0');
    const quantity = parseInt(searchParams.get('quantity') || '1');
    const color = searchParams.get('color');

    if (!productId) {
        return <p>Invalid checkout. Please select a product.</p>;
    }
    
    const totalPrice = price * quantity;

    const handleOrderSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = 'Placing Order...';

        const formData = new FormData(form);
        const customerDetails = Object.fromEntries(formData.entries());

        // --- THIS IS THE DEEP FIX ---
        // We create a simple, flat object that matches your database table.
        // This is exactly how your original index.html file worked.
        const orderData = {
            customer_name: customerDetails.name,
            customer_phone: customerDetails.phone,
            customer_email: customerDetails.email,
            customer_city: customerDetails.city,
            customer_address: customerDetails.address,
            product_id: productId,
            product_name: productName, // Sending product_name as a separate field
            quantity: quantity,       // Sending quantity as a separate field
            selected_color: color || 'N/A', // Sending color as a separate field
            total_price: totalPrice,
            status: 'Pending',
        };

        const { error } = await supabase.from('orders').insert([orderData]);

        if (error) {
            alert('There was an error placing your order. Please check the console.');
            console.error('Supabase order error:', error);
            button.disabled = false;
            button.textContent = 'Place Order';
        } else {
            router.push('/thank-you');
        }
    };

    return (
        <div className="form-container" style={{ maxWidth: '600px', margin: 'auto' }}>
            <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '10px', marginBottom: '30px' }}>
                <h4>Order Summary</h4>
                <p><strong>{productName}</strong> (x{quantity})</p>
                {color && <p>Color: {color}</p>}
                <strong>Total to Pay: PKR {totalPrice.toFixed(2)}</strong>
            </div>
            
            <h3>Shipping Information</h3>
            <form onSubmit={handleOrderSubmit}>
                <div className="form-group"><label>Full Name</label><input name="name" type="text" className="form-control" required /></div>
                <div className="form-group"><label>Contact Number</label><input name="phone" type="tel" className="form-control" required /></div>
                <div className="form-group"><label>Email (Optional)</label><input name="email" type="email" className="form-control" /></div>
                <div className="form-group"><label>City</label><input name="city" type="text" className="form-control" required /></div>
                <div className="form-group"><label>Full Address</label><textarea name="address" className="form-control" rows="3" required></textarea></div>
                <div className="form-group payment-method"><h4>Payment Method</h4><p><i className="fas fa-money-bill-wave"></i> Cash on Delivery</p></div>
                <button type="submit" className="btn" style={{ width: '100%' }}>Place Order</button>
            </form>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="spinner" style={{margin: '80px auto'}}></div>}>
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <CheckoutForm />
            </div>
        </Suspense>
    );
}