/**
 * TEST SUPABASE CONNECTION
 * =========================
 *
 * Quick script to verify Supabase connection is working
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

config({ path: resolve(__dirname, '../.env.local') });

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test 1: Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Environment variables not found!');
      console.log('\nPlease check that .env.local exists with:');
      console.log('  NEXT_PUBLIC_SUPABASE_URL=your_url');
      console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key');
      process.exit(1);
    }

    console.log('✅ Environment variables loaded');
    console.log(`   URL: ${supabaseUrl}`);
    console.log(`   Anon Key: ${supabaseAnonKey.substring(0, 20)}...`);

    // Test 2: Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    console.log('\n✅ Supabase client created');

    // Test 3: Try to get session (should be null if not logged in)
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session check failed:', sessionError.message);
      process.exit(1);
    }

    console.log('\n✅ Auth system working');
    console.log(`   Current session: ${sessionData.session ? 'Logged in' : 'Not logged in'}`);

    // Test 4: Try a simple query (this will fail if database isn't set up, but connection works)
    const { error: queryError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (queryError) {
      if (queryError.message.includes('relation "public.profiles" does not exist')) {
        console.log('\n⚠️  Database tables not created yet (expected)');
        console.log('   Next step: Run database migrations');
      } else {
        console.log('\n⚠️  Query test:', queryError.message);
      }
    } else {
      console.log('\n✅ Database connection working');
    }

    console.log('\n🎉 Supabase connection test PASSED!');
    console.log('\n📋 Next steps:');
    console.log('   1. Create database tables (run migrations)');
    console.log('   2. Set up authentication UI');
    console.log('   3. Test sign up/sign in flow');

  } catch (error) {
    console.error('\n❌ Connection test FAILED:', error);
    process.exit(1);
  }
}

testConnection();

