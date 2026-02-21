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