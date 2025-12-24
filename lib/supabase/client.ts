/**
 * SUPABASE CLIENT CONFIGURATION
 * ==============================
 *
 * Supabase client for Darwin-MFC
 * Supports both browser and server-side rendering
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

/**
 * Supabase client for client-side operations
 * Uses anon key for Row Level Security
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-application-name': 'darwin-mfc',
    },
  },
});

/**
 * Create a Supabase client for server-side operations
 * Should be used in Server Components, API routes, and server actions
 */
export function createServerSupabaseClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

/**
 * Type-safe Supabase client
 */
export type SupabaseClient = typeof supabase;
