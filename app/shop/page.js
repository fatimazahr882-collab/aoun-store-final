// File: app/shop/page.js

// This path goes up 2 levels to the root, which is correct for the 'lib' folder.
import { supabase } from '../../lib/supabaseClient';

// This path goes up 1 level to the 'app' directory, then into 'components'.
// This is the corrected path for your folder structure.
import ProductControls from '../components/ProductControls';
import ProductGrid from '../components/ProductGrid';

export const metadata = {
  title: 'All Products - Aoun Store',
  description: 'Browse all our latest collections of premium eastern unstitched clothing for women.',
};

export default async function AllProductsPage({ searchParams }) {
  const searchQuery = searchParams.search || '';
  const filterCategory = searchParams.category || '';

  // Start building the query to fetch products
  let query = supabase.from('product').select('*');

  // Add search functionality if a search term exists
  if (searchQuery) {
    query = query.textSearch('name', searchQuery, { type: 'websearch' });
  }

  // Add filter functionality if a category is selected
  if (filterCategory) {
    query = query.eq('category', filterCategory);
  }

  // Execute the query
  const { data: products, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error.message);
  }
  
  // This should ideally be fetched from your database
  const categories = ['Lawn', 'Cotton', 'Silk', 'Chiffon'];

  return (
    <div className="container" style={{paddingTop: '40px', paddingBottom: '40px'}}>
      <h2 className="section-title visible">All Products</h2>
      
      {/* Search and Filter Controls */}
      <ProductControls categories={categories} />

      {/* 
        We pass the fetched products to our ProductGrid component,
        which handles the layout and "fade-in" animation correctly.
      */}
      <ProductGrid products={products} />
    </div>
  );
}