'use client';

import { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
    const [checkoutItem, setCheckoutItem] = useState(null);

    // This function will be called by the "Buy Now" button
    const initiateCheckout = (item) => {
        // We save the single item to be purchased in state.
        setCheckoutItem(item);
    };

    const value = {
        checkoutItem,
        initiateCheckout,
    };

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
};