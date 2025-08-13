import { supabase } from './lib/supabaseClient';

const URL = 'https://www.aounstore.shop'; // IMPORTANT: Change to your real domain

export default async function sitemap() {
  const { data: products } = await supabase.from('product').select('id, name, created_at');

  const productUrls = products.map((product) => {
    const slug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return {
      url: `${URL}/products/${product.id}-${slug}`,
      lastModified: new Date(product.created_at).toISOString(),
    };
  });

  return [
    { url: URL, lastModified: new Date().toISOString() },
    { url: `${URL}/shop`, lastModified: new Date().toISOString() },
    ...productUrls,
  ];
}