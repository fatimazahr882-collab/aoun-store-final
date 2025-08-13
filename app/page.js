import { supabase } from '../lib/supabaseClient';
import HeroSection from './components/HeroSection';
import CollectionsSection from './components/CollectionsSection';
import ProductGrid from './components/ProductGrid';

export default async function HomePage() {
    const { data: collections } = await supabase.from('collections').select('*').order('name');
    const { data: products } = await supabase.from('product').select('*').order('created_at', { ascending: false });
    
    return (
        <>
            <HeroSection />
            <div className="neon-divider"></div>
            {collections && <CollectionsSection collections={collections} />}
            <div className="section-neon-divider"></div>

            {/* =================================================================== */}
            {/* START: THIS IS THE MISSING SECTION THAT IS NOW ADDED BACK        */}
            {/* =================================================================== */}
            <div className="features-section">
                <div className="features-container">
                    <div className="feature-item">
                        <div className="neon-border">
                            <div className="neon-border-content"><i className="fas fa-truck feature-icon"></i></div>
                        </div>
                        <h4>Fast Shipping</h4>
                        <p>Ship the product in 4-6 days</p>
                    </div>
                    <div className="feature-item">
                        <div className="neon-border">
                            <div className="neon-border-content"><i className="fas fa-shield feature-icon"></i></div>
                        </div>
                        <h4>Return Warranty</h4>
                        <p>7-day return warranty</p>
                    </div>
                    <div className="feature-item">
                        <div className="neon-border">
                            <div className="neon-border-content"><i className="fas fa-headset feature-icon"></i></div>
                        </div>
                        <h4>Customer Support</h4>
                        <p>24/7 customer support</p>
                    </div>
                </div>
            </div>
            {/* =================================================================== */}
            {/* END: MISSING SECTION                                              */}
            {/* =================================================================== */}

            <div className="section-neon-divider"></div>
            <div className="container">
                <h2 className="section-title visible">Our Products</h2>
                <ProductGrid products={products} />
            </div>
        </>
    );
}