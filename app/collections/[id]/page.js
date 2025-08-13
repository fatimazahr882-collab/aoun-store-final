// File: app/collections/[id]/page.js

// This path goes up 3 levels to the root, which is correct for the 'lib' folder.
import { supabase } from '../../../lib/supabaseClient';

// This path goes up 2 levels to the 'app' directory, then into 'components'.
// This is the corrected path for your folder structure.
import ProductGrid from '../../components/ProductGrid';

/**
 * This is a server-side function to fetch the data for a single collection
 * and all of the products that belong to it.
 * @param {string} id - The ID of the collection to fetch.
 */
async function getCollectionData(id) {
    try {
        // This query fetches the collection and its related products.
        // It requires a foreign key relationship in Supabase.
        const { data, error } = await supabase
            .from('collections')
            .select(`
                name,
                products:product ( * )
            `)
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error("Database Error fetching collection:", error.message);
        return null;
    }
}

/**
 * This is the Next.js Page component.
 * `params.id` contains the ID from the URL.
 */
export default async function CollectionPage({ params }) {
    // Fetch the specific collection's data.
    const collectionData = await getCollectionData(params.id);

    // If no data is found, show a "Not Found" message.
    if (!collectionData) {
        return (
            <div className="container" style={{padding: '60px 20px', textAlign: 'center'}}>
                <h2 className="section-title visible">Collection Not Found</h2>
                <p>We couldn't find the collection you were looking for.</p>
            </div>
        );
    }

    // If data is found, render the page.
    return (
        <div className="container" style={{paddingTop: '40px', paddingBottom: '40px'}}>
            <h2 className="section-title visible">{collectionData.name}</h2>
            
            {/* We pass the fetched products to our ProductGrid component,
                which handles the layout and "fade-in" animation correctly. */}
            <ProductGrid products={collectionData.products} />
        </div>
    );
}