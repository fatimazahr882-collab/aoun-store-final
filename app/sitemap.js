// This path is now correct. It goes UP one level from 'app' to the root.
import { supabase } from '../lib/supabaseClient';

const URL = 'https://www.aounstore.shop'; // IMPORTANT: Change to your real domain later

export default async function sitemap() {
  const { data: products } = await supabase.from('product').select('id, name, created_at');

  const productUrls = products.map((product) => {
    const slug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return {
      url: `${URL}/products/${product.id}-${slug}`,
      lastModified: new Date(product.created_at).toISOString(),
    };
  });

  const staticUrls = [
    { url: URL, lastModified: new Date().toISOString() },
    { url: `${URL}/shop`, lastModified: new Date().toISOString() },
    // Add other static pages here
  ];

  return [...staticUrls, ...productUrls];
}