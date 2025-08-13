import { createClient } from '@supabase/supabase-js'

// These lines read the secret keys from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// This creates the connection and exports it so other pages can use it
export const supabase = createClient(supabaseUrl, supabaseKey)