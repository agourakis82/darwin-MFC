# Supabase Setup Guide - Darwin-MFC

## Quick Start

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

### 2. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and set project name: `darwin-mfc`
4. Set a strong database password
5. Choose region (closest to your users)
6. Wait for project to be provisioned (~2 minutes)

### 3. Get API Credentials

1. In Supabase Dashboard, go to Settings → API
2. Copy:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon/Public Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Configure Environment

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run Database Migration

**Option A: Using Supabase Dashboard**

1. Go to SQL Editor in dashboard
2. Copy entire contents of `infrastructure/supabase/schema.sql`
3. Paste and click "Run"
4. Repeat for `infrastructure/supabase/seed.sql`

**Option B: Using Supabase CLI** (Recommended for production)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-id

# Run migrations
supabase db push

# Or apply specific migration
psql -h db.your-project.supabase.co -U postgres -d postgres < infrastructure/supabase/schema.sql
```

### 6. Verify Setup

Run this test in your browser console or a test file:

```typescript
import { supabase } from '@/lib/supabase';

// Test connection
const { data, error } = await supabase.from('badges').select('count');
console.log('Connection test:', { data, error });
```

Should return count of seeded badges (30).

## Authentication Setup

### Enable Email Authentication

1. Go to Authentication → Settings → Auth Providers
2. Enable "Email"
3. Configure email templates:
   - Confirmation template
   - Reset password template
   - Magic link template

### Enable OAuth (Optional)

**Google:**

1. Create OAuth app in Google Cloud Console
2. Add redirect URL: `https://your-project.supabase.co/auth/v1/callback`
3. In Supabase: Authentication → Providers → Google
4. Add Client ID and Client Secret
5. Enable provider

**GitHub:**

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth app
3. Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
4. In Supabase: Authentication → Providers → GitHub
5. Add Client ID and Client Secret
6. Enable provider

### Configure Email Templates

Replace default templates with branded ones:

```html
<!-- Confirmation Email -->
<h2>Welcome to Darwin-MFC!</h2>
<p>Confirm your email to get started with evidence-based medical education.</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
```

## Row Level Security

All tables have RLS enabled. Key policies:

### Users can only access their own data
```sql
-- Example: user_progress table
CREATE POLICY "Users manage own progress"
ON public.user_progress
FOR ALL USING (auth.uid() = user_id);
```

### Public data viewable by authenticated users
```sql
-- Example: badges table
CREATE POLICY "Badges viewable by all"
ON public.badges
FOR SELECT USING (auth.role() = 'authenticated');
```

### Test RLS Policies

```sql
-- Set user context
SELECT auth.uid(); -- Should return user ID

-- Try accessing data
SELECT * FROM user_progress; -- Should only show your data
SELECT * FROM badges; -- Should show all badges
```

## Data Sync

The sync manager automatically synchronizes local state with Supabase:

```typescript
import { getSyncManager } from '@/lib/sync/syncManager';

// Initialize with auto-sync every 30 seconds
const syncManager = getSyncManager({
  autoSync: true,
  syncInterval: 30000,
});

// Manual sync
const result = await syncManager.syncAll();
console.log(`Synced ${result.synced} items`);
```

## Common Operations

### Track User Progress

```typescript
import { updateProgress } from '@/lib/supabase';

await updateProgress(userId, {
  entityType: 'disease',
  entityId: 'diabetes-tipo-2',
  progress: 75,
  timeSpentSeconds: 900,
});
```

### Award XP

```typescript
import { awardXP } from '@/lib/supabase';

await awardXP(
  userId,
  100,
  'Completed diabetes module',
  'module',
  'diabetes-101'
);
```

### Manage Favorites

```typescript
import { addFavorite, removeFavorite } from '@/lib/supabase';

// Add to favorites
await addFavorite(userId, 'medication', 'metformina', 'Important for T2DM');

// Remove from favorites
await removeFavorite(userId, 'medication', 'metformina');
```

## Troubleshooting

### Connection Issues

**Error: "Invalid API key"**
- Check `.env.local` has correct ANON_KEY
- Ensure no extra whitespace in key
- Restart dev server after env changes

**Error: "Failed to fetch"**
- Check Supabase project is active
- Verify project URL is correct
- Check network connectivity

### RLS Policy Issues

**Error: "new row violates row-level security policy"**
- User not authenticated
- RLS policy conditions not met
- Check `auth.uid()` returns correct user ID

**Debug RLS:**
```sql
-- Check current user
SELECT auth.uid(), auth.role();

-- Check policy conditions
SELECT * FROM user_progress WHERE user_id = auth.uid();
```

### Performance Issues

**Slow queries:**
1. Check indexes exist for queried columns
2. Use `EXPLAIN ANALYZE` in SQL editor
3. Consider adding composite indexes

```sql
-- Add index
CREATE INDEX idx_custom ON table_name (column1, column2);
```

## Migration Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database schema applied
- [ ] Seed data loaded
- [ ] Email authentication enabled
- [ ] OAuth providers configured (optional)
- [ ] RLS policies tested
- [ ] Connection test passed
- [ ] First user signup successful
- [ ] Data sync working

## Next Steps

1. Integrate auth UI components
2. Add sync status indicators
3. Implement offline mode
4. Set up analytics tracking
5. Configure email templates
6. Add monitoring and alerts

## Resources

- [Schema Documentation](./schema.sql)
- [Helper Functions](../../lib/supabase/helpers.ts)
- [Sync Manager](../../lib/sync/syncManager.ts)
- [Supabase Docs](https://supabase.com/docs)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
