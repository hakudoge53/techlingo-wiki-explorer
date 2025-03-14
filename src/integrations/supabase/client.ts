
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dqkemwzltxfsvuykzmfm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxa2Vtd3psdHhmc3Z1eWt6bWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNzA0MTcsImV4cCI6MjA1Njg0NjQxN30.ViDFtFHuuSs-uA8bmoSICvsnZ1iuFVo8X72kC9m5Nng";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'techlingo_auth_token',
    flowType: 'pkce'
  }
});
