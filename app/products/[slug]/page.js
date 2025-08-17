// app/products/[slug]/page.js

import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import ProductImageGallery from '../../components/ProductImageGallery';
import ProductInteractions from '../../components/ProductInteractions';
import dynamic from 'next/dynamic'; // 1. IMPORT DYNAMIC

// 2. DYNAMICALLY IMPORT THE 'ProductGrid'. ITS CODE WILL ONLY LOAD WHEN NEEDED.
const ProductGrid = dynamic(() => import('../../components/ProductGrid'));

function getIdFromSlug(slug = '') {
    return slug.split('-')[0];
}

export async function generateMetadata({ params }) {
    const productId = getIdFromSlug(params.slug);
    const { data: product } = await supabase.from('product').select('name, description').eq('id', productId).single();
    if (!product) return { title: 'Product Not Found' };
    return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({ params }) {
    const productId = getIdFromSlug(params.slug);
    
    const { data: product } = await supabase.from('product').select(`*, collection:collections ( name, id )`).eq('id', productId).single();

    if (!product) {
        return <h1 className="container" style={{ textAlign: 'center', padding: '40px' }}>Product not found!</h1>;
    }
    
    // Data fetching for related products remains here
    let relatedProducts = [];
    if (product.collection) {
        const { data } = await supabase
            .from('product')
            .select('*')
            .eq('collection_id', product.collection.id)
            .neq('id', product.id)
            .limit(4);
        relatedProducts = data;
    }
    
    const structuredData = { /* ... */ };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                
                {product.collection && (
                    <div className="breadcrumb">
                        <Link href="/">Home</Link> / 
                        <Link href={`/collections/${product.collection.id}`}> {product.collection.name}</Link> / 
                        <span> {product.name}</span>
                    </div>
                )}
                
                <div className="product-detail-container">
                    {/* 3. PASS THE 'priority' PROP TO THE IMAGE GALLERY. THIS IS ESSENTIAL. */}
                    <ProductImageGallery images={product.image_urls} productName={product.name} priority />
                    <ProductInteractions product={product} />
                </div>

                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="related-products-section" style={{ marginTop: '80px' }}>
                        <h2 className="section-title visible">Related Products</h2>
                        {/* 4. The ProductGrid is now loaded dynamically, preventing it from blocking the initial page render. */}
                        <ProductGrid products={relatedProducts} />
                    </div>
                )}
            </div>
        </>
    );
}