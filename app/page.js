// app/page.js

import { supabase } from '@/lib/supabaseClient';
import HeroSection from './components/HeroSection';
import CollectionsSection from './components/CollectionsSection';
import FeaturesSection from './components/FeaturesSection';
import dynamic from 'next/dynamic'; // 1. IMPORT DYNAMIC

// 2. DYNAMICALLY IMPORT THE PRODUCT GRID
const ProductGrid = dynamic(() => import('./components/ProductGrid'));

export default async function HomePage() {
    const { data: collections } = await supabase.from('collections').select('*').order('name');
    const { data: products } = await supabase.from('product').select('*').order('created_at', { ascending: false });
    
    return (
        <>
            <HeroSection />
            <div className="neon-divider"></div>
            {collections && <CollectionsSection collections={collections} />}
            <div className="section-neon-divider"></div>

            <FeaturesSection />

            <div className="section-neon-divider"></div>
            <div className="container">
                <h2 className="section-title visible">Our Products</h2>
                {/* 3. The ProductGrid will now load only when it's needed */}
                <ProductGrid products={products} />
            </div>
        </>
    );
}