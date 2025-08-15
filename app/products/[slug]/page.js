import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import ProductImageGallery from '../../components/ProductImageGallery';
import ProductInteractions from '../../components/ProductInteractions';
import ProductGrid from '../../components/ProductGrid';

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
                    <ProductImageGallery images={product.image_urls} productName={product.name} />
                    <ProductInteractions product={product} />
                </div>

                {/* This is the Related Products section. It is now correctly included. */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="related-products-section" style={{ marginTop: '80px' }}>
                        <h2 className="section-title visible">Related Products</h2>
                        <ProductGrid products={relatedProducts} />
                    </div>
                )}
            </div>
        </>
    );
}