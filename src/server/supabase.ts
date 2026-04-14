import { createClient } from '@supabase/supabase-js'


//checks if the url / key is valid 
if (!process.env.SUPABASE_URL)
    throw new Error("String was not passed(url)\n");
if (!process.env.SUPABASE_ANON_KEY)
    throw new Error("String was not passed(key)\n");       

export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

// Admin client — bypasses RLS, used for server-only operations
// (profile creation during signup, session management, etc.)
// Requires SUPABASE_SERVICE_ROLE_KEY env var from Supabase dashboard > Settings > API
if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
    throw new Error("String was not passed(service_role_key)\n");

export const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)