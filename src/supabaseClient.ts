import { createClient } from '@supabase/supabase-js';

// You will find these in your Supabase Dashboard under Project Settings -> API
const supabaseUrl = 'https://egufneisgzgolbhyeyac.supabase.co';
const supabaseKey = 'sb_publishable_EHZCSfrizqpCY9guxCETVQ_fsfBNJcu';

export const supabase = createClient(supabaseUrl, supabaseKey);