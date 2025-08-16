import { supabase } from '@/lib/supabaseClient';

const URL = 'https://aoun-store-final.vercel.app';

export default async function sitemap() {
  const { data: products, error } = await supabase.from('product').select('id, name, created_at');
  if (error) {
    console.error('Sitemap fetch error:', error);
    return [];
  }
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
  ];
  return [...staticUrls, ...productUrls];
}