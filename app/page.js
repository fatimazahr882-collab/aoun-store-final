import { supabase } from '@/lib/supabaseClient';
import HeroSection from './components/HeroSection';
import CollectionsSection from './components/CollectionsSection';
import ProductGrid from './components/ProductGrid';
import FeaturesSection from './components/FeaturesSection'; // 1. Import the new component

export default async function HomePage() {
    const { data: collections } = await supabase.from('collections').select('*').order('name');
    const { data: products } = await supabase.from('product').select('*').order('created_at', { ascending: false });
    
    return (
        <>
            <HeroSection />
            <div className="neon-divider"></div>
            {collections && <CollectionsSection collections={collections} />}
            <div className="section-neon-divider"></div>

            {/* 2. Replace the old HTML with the new, self-contained component */}
            <FeaturesSection />

            <div className="section-neon-divider"></div>
            <div className="container">
                <h2 className="section-title visible">Our Products</h2>
                <ProductGrid products={products} />
            </div>
        </>
    );
}