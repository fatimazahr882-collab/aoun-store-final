import { supabase } from '@/lib/supabaseClient';
import ProductGrid from '../../components/ProductGrid';
import Link from 'next/link';

// We don't need unslugify anymore
// export async function generateMetadata(...) // We can simplify this too

export default async function CollectionPage({ params }) {
    // --- THIS IS THE FIX ---
    // We get the reliable 'id' directly from the params.
    const collectionId = params.id;

    // We now fetch the collection and its products by matching the 'id' column.
    // This is guaranteed to be unique and correct.
    const { data: collectionData, error } = await supabase
        .from('collections')
        .select(`
            name,
            products:product ( * )
        `)
        .eq('id', collectionId) // Find by ID instead of name
        .single();

    if (error || !collectionData) {
        console.error(`Error fetching collection by ID "${collectionId}":`, error);
        return <h1 className="container" style={{ textAlign: 'center', padding: '40px' }}>Collection not found.</h1>;
    }

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <div className="breadcrumb" style={{ marginBottom: '20px' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>Home</Link> / 
                <span> {collectionData.name}</span>
            </div>
            <h2 className="section-title visible">{collectionData.name}</h2>
            <ProductGrid products={collectionData.products} />
        </div>
    );
}