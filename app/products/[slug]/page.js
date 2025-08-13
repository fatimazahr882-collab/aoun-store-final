import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

// Helper function to safely get the product ID from the slug parameter.
// Example: "123-elegant-lawn-suit" becomes "123".
function getIdFromSlug(slug = '') {
    return slug.split('-')[0];
}

/**
 * Generates dynamic SEO metadata for this product page.
 * Next.js runs this on the server before rendering the page.
 */
export async function generateMetadata({ params }) {
    const productId = getIdFromSlug(params.slug);
    
    // Fetch only the data needed for SEO to keep this fast.
    const { data: product } = await supabase
        .from('product')
        .select('name, description')
        .eq('id', productId)
        .single();

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.name,
        description: product.description,
    };
}

/**
 * This is your main Product Detail Page component.
 */
export default async function ProductDetailPage({ params }) {
    const productId = getIdFromSlug(params.slug);

    // Fetch the full product data, including its related collection for the breadcrumb link.
    const { data: product } = await supabase
        .from('product')
        .select(`
            *,
            collection:collections ( name, id )
        `)
        .eq('id', productId)
        .single();

    // If no product is found for the ID, show a user-friendly message.
    if (!product) {
        return (
            <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <h2 className="section-title visible">Product Not Found</h2>
                <p>Sorry, we couldn't find the product you're looking for.</p>
            </div>
        );
    }
  
    // Define the structured data object for Google Rich Results.
    const structuredData = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: product.image_urls || [],
        description: product.description,
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: 'Aoun Store',
        },
        offers: {
            '@type': 'Offer',
            url: `https://www.aounstore.com/products/${params.slug}`, // IMPORTANT: Change to your domain
            priceCurrency: 'PKR',
            price: product.price,
            availability: product.stock_quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
    };

    return (
        <>
            {/* This script tag is invisible to users but crucial for SEO. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
      
            <div className="container" style={{ padding: '40px 20px' }}>
                
                {/* START: Breadcrumb for Internal Linking & User Navigation */}
                {product.collection && (
                    <div className="breadcrumb" style={{ marginBottom: '20px', color: '#888', fontSize: '0.9rem' }}>
                        <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link> / 
                        <Link href={`/collections/${product.collection.id}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}> {product.collection.name}</Link> / 
                        <span style={{ color: 'var(--dark)' }}> {product.name}</span>
                    </div>
                )}
                {/* END: Breadcrumb */}

                {/* This is where you would place your full product display UI. */}
                {/* For example, your <ProductImageGallery /> and <ProductInteractions /> components would go here. */}
                <h1 className="product-detail-title">{product.name}</h1>
                <p>{product.description}</p>
                <div className="product-detail-price">PKR {product.price.toFixed(2)}</div>
                {/* etc. */}

            </div>
        </>
    );
}