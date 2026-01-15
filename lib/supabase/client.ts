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

// Allow builds without Supabase credentials (for static export)
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn(
    'Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for database features.'
  );
}

/**
 * Supabase client for client-side operations
 * Uses anon key for Row Level Security
 * Returns null if Supabase is not configured
 */
export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
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
    })
  : null;

/**
 * Create a Supabase client for server-side operations
 * Should be used in Server Components, API routes, and server actions
 * Returns null if Supabase is not configured
 */
export function createServerSupabaseClient() {
  if (!isSupabaseConfigured) {
    return null;
  }
  return createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
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
