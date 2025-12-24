# Supabase Infrastructure - Darwin-MFC

This directory contains the Supabase database schema, migrations, and configuration for the Darwin Medical Foundation Cluster (Darwin-MFC) platform.

## Overview

Darwin-MFC uses Supabase for:
- **User Authentication**: Email/password and OAuth (Google, GitHub)
- **User Data Sync**: Progress, favorites, notes across devices
- **Gamification**: XP, levels, badges, achievements
- **Community Features**: Shared clinical cases, comments, discussions
- **Analytics**: User sessions, activity tracking

## Architecture

### Offline-First Design
- Local-first with Zustand state management
- Background sync to Supabase when online
- Conflict resolution with timestamp-based merging
- Graceful degradation when offline

### Row Level Security (RLS)
All tables use Postgres Row Level Security policies to ensure:
- Users can only access their own data
- Public content (badges, published cases) is viewable by authenticated users
- Admin/moderator roles for content verification

## Database Schema

### Core Tables

#### Authentication & Profiles
- `users` - Extended user profiles (specialty, country, institution)
- `user_preferences` - Theme, language, content mode settings

#### Progress & Learning
- `user_progress` - Generic progress tracking for any entity (disease, medication, protocol, case)
- `learning_progress` - Detailed learning path progress with quiz scores
- `quiz_attempts` - Individual quiz attempt history

#### User Content
- `favorites` - Bookmarked content with notes and tags
- `notes` - User notes attached to any entity type

#### Gamification
- `user_xp` - XP totals, levels, streaks
- `xp_transactions` - XP award history for transparency
- `badges` - Badge definitions (seeded data)
- `user_badges` - Badges earned by users
- `user_achievements` - Progressive achievements tracking

#### Community
- `shared_cases` - User-generated clinical cases
- `case_comments` - Discussions on shared cases

#### Analytics
- `user_sessions` - Session tracking for analytics
- `activity_log` - Detailed activity audit trail

## Setup Instructions

### 1. Create Supabase Project

```bash
# Visit https://supabase.com and create a new project
# Note your project URL and anon key
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Schema Migration

```bash
# Option 1: Using Supabase CLI
supabase db push

# Option 2: Using SQL Editor in Supabase Dashboard
# Copy contents of schema.sql and run in SQL Editor
```

### 4. Seed Initial Data

```bash
# Run seed.sql in Supabase SQL Editor
# This creates initial badges and reference data
```

### 5. Configure Authentication

In Supabase Dashboard → Authentication → Providers:

1. **Email** - Enable email/password authentication
2. **Google OAuth** (optional) - Add OAuth credentials
3. **GitHub OAuth** (optional) - Add OAuth credentials

**Email Templates:**
- Customize confirmation, reset password, and magic link emails
- Use templates in `infrastructure/supabase/email-templates/`

### 6. Set up Storage (Optional)

For user avatars and attachments:

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Set up storage policies
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## Usage Examples

### Client-Side Authentication

```typescript
import { signUp, signIn, signOut } from '@/lib/supabase/auth';

// Sign up
const { user, error } = await signUp({
  email: 'user@example.com',
  password: 'securepassword',
  name: 'Dr. João Silva',
  specialty: 'Medicina de Família',
  country: 'BR',
});

// Sign in
const { user, error } = await signIn({
  email: 'user@example.com',
  password: 'securepassword',
});

// Sign out
await signOut();
```

### Tracking Progress

```typescript
import { supabase } from '@/lib/supabase/client';

// Update progress on a disease study
await supabase.from('user_progress').upsert({
  user_id: userId,
  entity_type: 'disease',
  entity_id: 'diabetes-tipo-2',
  progress: 75,
  time_spent_seconds: 1200,
});
```

### Award XP

```typescript
import { supabase } from '@/lib/supabase/client';

// Award XP using stored function
await supabase.rpc('award_xp', {
  p_user_id: userId,
  p_amount: 100,
  p_reason: 'Completed diabetes module',
  p_entity_type: 'module',
  p_entity_id: 'diabetes-101',
});
```

### Sync Manager

```typescript
import { getSyncManager } from '@/lib/sync/syncManager';

// Initialize sync manager
const syncManager = getSyncManager({
  autoSync: true,
  syncInterval: 30000, // 30 seconds
});

// Manual sync
const result = await syncManager.syncAll();
console.log(`Synced ${result.synced} items with ${result.conflicts} conflicts`);
```

## Database Functions

### `calculate_level(xp INTEGER) → INTEGER`
Calculate user level from total XP using formula: `level = floor(sqrt(xp / 100)) + 1`

### `award_xp(p_user_id, p_amount, p_reason, ...)`
Award XP to user, update level, and log transaction

### `update_user_streak(p_user_id)`
Update daily streak based on last activity date

## Indexes

All tables have appropriate indexes for common query patterns:
- User lookups: `idx_*_user`
- Entity lookups: `idx_*_entity`
- Composite queries: `idx_*_user_entity`
- Timestamp queries: `idx_*_created`

## Security Considerations

1. **Never expose service role key** - Only use anon key in client
2. **RLS policies** - All user data protected by RLS
3. **Input validation** - Use Zod schemas before database operations
4. **Rate limiting** - Consider implementing rate limits on auth endpoints
5. **SQL injection** - Use parameterized queries (Supabase handles this)

## Monitoring & Maintenance

### View Database Size
```sql
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Monitor Active Connections
```sql
SELECT count(*) FROM pg_stat_activity;
```

### View Slow Queries
Check Supabase Dashboard → Database → Query Performance

## Backup & Recovery

Supabase provides:
- **Automatic backups**: Daily backups on Pro plan
- **Point-in-time recovery**: Available on Pro plan
- **Manual backups**: Export via pg_dump

```bash
# Manual backup
pg_dump -h db.your-project.supabase.co -U postgres -d postgres > backup.sql

# Restore
psql -h db.your-project.supabase.co -U postgres -d postgres < backup.sql
```

## Migration Strategy

When updating schema:

1. Create new migration file: `migrations/YYYYMMDD_description.sql`
2. Test in development project
3. Apply to production during low-traffic period
4. Monitor for errors in Supabase logs

## Troubleshooting

### Common Issues

**Issue**: RLS policies blocking access
- **Solution**: Check policy conditions match user authentication state

**Issue**: Sync conflicts
- **Solution**: Check timestamp comparison logic in syncManager.ts

**Issue**: Auth redirect loops
- **Solution**: Verify `emailRedirectTo` URLs match allowed URLs in Supabase Dashboard

**Issue**: Slow queries
- **Solution**: Add indexes for frequently queried columns

## Development vs Production

### Development
- Use separate Supabase project
- Enable verbose logging
- Test RLS policies thoroughly
- Seed with test data

### Production
- Enable connection pooling
- Monitor query performance
- Set up database alerts
- Regular backups
- Review RLS policies

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Functions](https://supabase.com/docs/guides/database/functions)

## Support

For issues or questions:
- GitHub Issues: https://github.com/anthropics/darwin-mfc/issues
- Supabase Discord: https://discord.supabase.com
