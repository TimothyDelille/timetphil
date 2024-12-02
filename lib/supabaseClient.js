import { createClient } from '@supabase/supabase-js';

// make sure to disable Row Level Security (RLS), otherwise you will get empty responses!
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );