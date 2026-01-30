// @ts-nocheck
// TODO: Generate proper Supabase types with `supabase gen types`
/**
 * SUPABASE CLIENT CONFIGURATION
 * ==============================
 *
 * Supabase client for Darwin-MFC
 * Supports both browser and server-side rendering
 *
 * NOTE: Client is optional and will be null during static builds
 * when environment variables are not configured.
 */

import { createClient, SupabaseClient as SupabaseClientType } from '@supabase/supabase-js';
import type { Database } from './types';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured (build-safe)
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

/**
 * Supabase client for client-side operations
 * Uses anon key for Row Level Security
 *
 * NOTE: Will be null if environment variables are not configured.
 * Always check `isSupabaseConfigured` before using.
 */
export const supabase: SupabaseClientType<Database> | null = isSupabaseConfigured
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
 *
 * @returns Supabase client or null if not configured
 */
export function createServerSupabaseClient(): SupabaseClientType<Database> | null {
  if (!isSupabaseConfigured) return null;

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
export type SupabaseClient = SupabaseClientType<Database>;
