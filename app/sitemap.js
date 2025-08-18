// File: app/sitemap.js

import { supabase } from '@/lib/supabaseClient';

// This is the official URL of your website.
const URL = 'https://www.aounstore.shop';

export default async function sitemap() {
  // --- Static Pages ---
  // Add the URLs for your main, non-dynamic pages here.
  const staticRoutes = [
    '/',
    '/privacy-policy',
    '/return-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // --- Dynamic Product Pages ---
  // Fetch all products from Supabase to add them to the sitemap.
  const { data: products } = await supabase
    .from('product')
    .select('id, slug, updated_at'); // We need id and slug for the URL

  const productEntries = products.map(({ id, slug, updated_at }) => ({
    // This matches your URL structure: /products/42-embroidered-lawn-suit
    url: `${URL}/products/${id}-${slug}`,
    lastModified: new Date(updated_at).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // --- Dynamic Collection Pages ---
  // Fetch all collections from Supabase.
  const { data: collections } = await supabase
    .from('collections')
    .select('id, updated_at');

  const collectionEntries = collections.map(({ id, updated_at }) => ({
    url: `${URL}/collections/${id}`,
    lastModified: new Date(updated_at).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Combine all the URLs into a single array
  return [
    ...staticRoutes,
    ...productEntries,
    ...collectionEntries,
  ];
}