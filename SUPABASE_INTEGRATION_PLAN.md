# Supabase Integration Plan - Darwin Education

> **Goal:** Add backend capabilities to Darwin-MFC while maintaining offline-first static site architecture

---

## 📋 Overview

### **Why Supabase?**

1. **PostgreSQL Database** - Relational data with JSONB support
2. **Built-in Authentication** - Email, OAuth (Google, GitHub), magic links
3. **Row Level Security (RLS)** - Database-level authorization
4. **Real-time Subscriptions** - Live updates for social features
5. **Storage** - File uploads (videos, images, user content)
6. **Edge Functions** - Serverless API endpoints
7. **Free Tier** - 500MB database, 1GB storage, 2GB bandwidth
8. **Open Source** - Self-hostable if needed

### **Integration Strategy**

**Hybrid Architecture:**
- ✅ **Static content** remains on GitHub Pages (fast, SEO-friendly)
- ✅ **User data** stored in Supabase (cross-device sync)
- ✅ **Offline-first** with localStorage fallback
- ✅ **Progressive enhancement** - works without auth

---

## 🚀 Phase 1: Setup & Authentication (Week 1-2)

### **Step 1: Create Supabase Project**

```bash
# 1. Sign up at https://supabase.com
# 2. Create new project: darwin-mfc-education
# 3. Note credentials:
#    - Project URL: https://xxx.supabase.co
#    - Anon Key: eyJxxx...
#    - Service Role Key: eyJxxx... (keep secret!)
```

### **Step 2: Install Dependencies**

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### **Step 3: Environment Variables**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...  # Server-side only
```

### **Step 4: Create Supabase Client**

```typescript
// lib/api/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Type-safe database client
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at'>;
        Update: Partial<Profile>;
      };
      // ... other tables
    };
  };
};
```

### **Step 5: Authentication Hook**

```typescript
// lib/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/api/supabase/client';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    signUp: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    signInWithGoogle: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      return data;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
## 🔄 Phase 3: Progress Sync (Week 3-4)

### **Step 1: Learning Progress Migration**

```sql
-- supabase/migrations/002_learning_progress.sql

CREATE TABLE public.learning_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  path_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  time_spent INTEGER DEFAULT 0, -- seconds
  last_accessed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, path_id, module_id)
);

ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON public.learning_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.learning_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.learning_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE TRIGGER set_learning_progress_updated_at
  BEFORE UPDATE ON public.learning_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Flashcard progress
CREATE TABLE public.flashcard_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  flashcard_id TEXT NOT NULL,
  ease_factor DECIMAL DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review_at TIMESTAMPTZ,
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, flashcard_id)
);

ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own flashcard progress"
  ON public.flashcard_progress FOR ALL
  USING (auth.uid() = user_id);

CREATE TRIGGER set_flashcard_progress_updated_at
  BEFORE UPDATE ON public.flashcard_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Quiz attempts
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  time_taken INTEGER, -- seconds
  answers JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz attempts"
  ON public.quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts"
  ON public.quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### **Step 2: Sync Service**

```typescript
// lib/api/supabase/sync.ts
import { supabase } from './client';
import { useLearningStore } from '@/lib/store/learningStore';
import { useStudyStore } from '@/lib/store/studyStore';

export async function syncLocalProgressToCloud(userId: string) {
  // Get local progress from Zustand stores
  const learningProgress = useLearningStore.getState().progress;
  const flashcardProgress = useStudyStore.getState().flashcards;

  // Sync learning progress
  for (const [key, progress] of Object.entries(learningProgress)) {
    const [pathId, moduleId] = key.split(':');

    await supabase.from('learning_progress').upsert({
      user_id: userId,
      path_id: pathId,
      module_id: moduleId,
      status: progress.status,
      progress_percent: progress.progressPercent,
      time_spent: progress.timeSpent,
      last_accessed_at: progress.lastAccessedAt,
      completed_at: progress.completedAt,
    });
  }

  // Sync flashcard progress
  for (const [flashcardId, progress] of Object.entries(flashcardProgress)) {
    await supabase.from('flashcard_progress').upsert({
      user_id: userId,
      flashcard_id: flashcardId,
      ease_factor: progress.easeFactor,
      interval: progress.interval,
      repetitions: progress.repetitions,
      next_review_at: progress.nextReviewAt,
      last_reviewed_at: progress.lastReviewedAt,
    });
  }
}

export async function syncCloudProgressToLocal(userId: string) {
  // Fetch learning progress
  const { data: learningData } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', userId);

  if (learningData) {
    const progress: Record<string, any> = {};
    learningData.forEach((item) => {
      const key = `${item.path_id}:${item.module_id}`;
      progress[key] = {
        status: item.status,
        progressPercent: item.progress_percent,
        timeSpent: item.time_spent,
        lastAccessedAt: item.last_accessed_at,
        completedAt: item.completed_at,
      };
    });
    useLearningStore.setState({ progress });
  }

  // Fetch flashcard progress
  const { data: flashcardData } = await supabase
    .from('flashcard_progress')
    .select('*')
    .eq('user_id', userId);

  if (flashcardData) {
    const flashcards: Record<string, any> = {};
    flashcardData.forEach((item) => {
      flashcards[item.flashcard_id] = {
        easeFactor: item.ease_factor,
        interval: item.interval,
        repetitions: item.repetitions,
        nextReviewAt: item.next_review_at,
        lastReviewedAt: item.last_reviewed_at,
      };
    });
    useStudyStore.setState({ flashcards });
  }
}

// Real-time sync
export function subscribeToProgressUpdates(userId: string) {
  const channel = supabase
    .channel('progress_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'learning_progress',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        // Update local store when cloud changes
        syncCloudProgressToLocal(userId);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
```

### **Step 3: Enhanced Learning Store**

```typescript
// lib/store/learningStore.ts (enhanced)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/api/supabase/client';

interface LearningState {
  progress: Record<string, LearningProgress>;
  certificates: Certificate[];

  // Actions
  updateProgress: (pathId: string, moduleId: string, progress: Partial<LearningProgress>) => Promise<void>;
  syncToCloud: () => Promise<void>;
  syncFromCloud: () => Promise<void>;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      progress: {},
      certificates: [],

      updateProgress: async (pathId, moduleId, progressUpdate) => {
        const key = `${pathId}:${moduleId}`;
        const currentProgress = get().progress[key] || {};
        const newProgress = { ...currentProgress, ...progressUpdate };

        // Update local state
        set((state) => ({
          progress: {
            ...state.progress,
            [key]: newProgress,
          },
        }));

        // Sync to cloud if authenticated
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('learning_progress').upsert({
            user_id: user.id,
            path_id: pathId,
            module_id: moduleId,
            ...newProgress,
          });
        }
      },

      syncToCloud: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const progress = get().progress;
        const upserts = Object.entries(progress).map(([key, prog]) => {
          const [pathId, moduleId] = key.split(':');
          return {
            user_id: user.id,
            path_id: pathId,
            module_id: moduleId,
            ...prog,
          };
        });

        await supabase.from('learning_progress').upsert(upserts);
      },

      syncFromCloud: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('learning_progress')
          .select('*')
          .eq('user_id', user.id);

        if (data) {
          const progress: Record<string, any> = {};
          data.forEach((item) => {
            const key = `${item.path_id}:${item.module_id}`;
            progress[key] = {
              status: item.status,
              progressPercent: item.progress_percent,
              timeSpent: item.time_spent,
              lastAccessedAt: item.last_accessed_at,
              completedAt: item.completed_at,
            };
          });
          set({ progress });
        }
      },
    }),
    {
      name: 'darwin-learning-storage',
    }
  )
);
```

---

## 🎓 Phase 4: Certificates & Achievements (Week 4-5)

### **Step 1: Certificates Table**

```sql
-- supabase/migrations/003_certificates.sql

CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  path_id TEXT NOT NULL,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  blockchain_hash TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certificates"
  ON public.certificates FOR SELECT
  USING (auth.uid() = user_id);

-- Public verification (anyone can verify a certificate by number)
CREATE POLICY "Anyone can verify certificates"
  ON public.certificates FOR SELECT
  USING (true);

-- Function to generate certificate number
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS TEXT AS $$
DECLARE
  cert_number TEXT;
BEGIN
  cert_number := 'DARWIN-' ||
                 TO_CHAR(NOW(), 'YYYY') || '-' ||
                 LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  RETURN cert_number;
END;
$$ LANGUAGE plpgsql;

-- Achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  achievement_id TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB,
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON public.achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON public.achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### **Step 2: Certificate Generator**

```typescript
// lib/education/certificates/generator.ts
import { supabase } from '@/lib/api/supabase/client';
import { jsPDF } from 'jspdf';

export async function generateCertificate(userId: string, pathId: string) {
  // Check if path is completed
  const { data: progress } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('path_id', pathId)
    .eq('status', 'completed');

  if (!progress || progress.length === 0) {
    throw new Error('Learning path not completed');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  // Generate certificate number
  const { data: certData } = await supabase.rpc('generate_certificate_number');
  const certificateNumber = certData;

  // Create certificate record
  const { data: certificate, error } = await supabase
    .from('certificates')
    .insert({
      user_id: userId,
      path_id: pathId,
      certificate_number: certificateNumber,
      metadata: {
        modules_completed: progress.length,
        total_time_spent: progress.reduce((sum, p) => sum + p.time_spent, 0),
      },
    })
    .select()
    .single();

  if (error) throw error;

  // Generate PDF
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Add certificate design
  pdf.setFontSize(40);
  pdf.text('Certificate of Completion', 148, 50, { align: 'center' });

  pdf.setFontSize(20);
  pdf.text(`This certifies that`, 148, 80, { align: 'center' });

  pdf.setFontSize(30);
  pdf.text(profile?.full_name || 'Student', 148, 100, { align: 'center' });

  pdf.setFontSize(16);
  pdf.text(`has successfully completed`, 148, 120, { align: 'center' });

  pdf.setFontSize(24);
  pdf.text(pathId, 148, 140, { align: 'center' });

  pdf.setFontSize(12);
  pdf.text(`Certificate Number: ${certificateNumber}`, 148, 170, { align: 'center' });
  pdf.text(`Issued: ${new Date().toLocaleDateString()}`, 148, 180, { align: 'center' });

  return {
    certificate,
    pdf: pdf.output('blob'),
  };
}
```

---

## 💬 Phase 5: Social Features (Week 5-6)

### **Step 1: Discussions & Q&A**

```sql
-- supabase/migrations/004_social.sql

CREATE TABLE public.discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path_id TEXT NOT NULL,
  module_id TEXT,
  author_id UUID REFERENCES public.profiles NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view discussions"
  ON public.discussions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create discussions"
  ON public.discussions FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own discussions"
  ON public.discussions FOR UPDATE
  USING (auth.uid() = author_id);

CREATE TRIGGER set_discussions_updated_at
  BEFORE UPDATE ON public.discussions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Discussion replies
CREATE TABLE public.discussion_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID REFERENCES public.discussions ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view replies"
  ON public.discussion_replies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create replies"
  ON public.discussion_replies FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own replies"
  ON public.discussion_replies FOR UPDATE
  USING (auth.uid() = author_id);

-- Upvotes tracking
CREATE TABLE public.discussion_upvotes (
  discussion_id UUID REFERENCES public.discussions ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (discussion_id, user_id)
);

ALTER TABLE public.discussion_upvotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own upvotes"
  ON public.discussion_upvotes FOR ALL
  USING (auth.uid() = user_id);

-- Function to update upvote count
CREATE OR REPLACE FUNCTION update_discussion_upvotes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.discussions
    SET upvotes = upvotes + 1
    WHERE id = NEW.discussion_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.discussions
    SET upvotes = upvotes - 1
    WHERE id = OLD.discussion_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER discussion_upvote_trigger
  AFTER INSERT OR DELETE ON public.discussion_upvotes
  FOR EACH ROW EXECUTE FUNCTION update_discussion_upvotes();
```

---

## 📊 Phase 6: Analytics & Monitoring (Week 6-7)

### **Step 1: Analytics Events**

```sql
-- supabase/migrations/005_analytics.sql

CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles,
  event TEXT NOT NULL,
  properties JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_events_event ON public.analytics_events(event);
CREATE INDEX idx_analytics_events_timestamp ON public.analytics_events(timestamp);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own events"
  ON public.analytics_events FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all events"
  ON public.analytics_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### **Step 2: Analytics Dashboard**

```typescript
// lib/api/supabase/analytics.ts
import { supabase } from './client';

export async function trackEvent(event: string, properties?: Record<string, any>) {
  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from('analytics_events').insert({
    user_id: user?.id,
    event,
    properties,
    timestamp: new Date().toISOString(),
  });
}

export async function getUserAnalytics(userId: string, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('user_id', userId)
    .gte('timestamp', startDate.toISOString())
    .order('timestamp', { ascending: false });

  return data;
}

export async function getPopularContent(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data } = await supabase
    .from('analytics_events')
    .select('properties')
    .in('event', ['module_started', 'module_completed'])
    .gte('timestamp', startDate.toISOString());

  // Aggregate by content
  const contentCounts: Record<string, number> = {};
  data?.forEach((event) => {
    const pathId = event.properties?.path_id;
    if (pathId) {
      contentCounts[pathId] = (contentCounts[pathId] || 0) + 1;
    }
  });

  return Object.entries(contentCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
}
```

---

## 🚀 Deployment Checklist

### **Pre-Deployment**

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] RLS policies tested
- [ ] Authentication flows tested
- [ ] Sync logic tested (local ↔ cloud)
- [ ] Offline fallback tested

### **Deployment**

- [ ] Add Supabase secrets to GitHub Actions
- [ ] Update build workflow
- [ ] Deploy to staging environment
- [ ] Run integration tests
- [ ] Deploy to production
- [ ] Monitor error logs

### **Post-Deployment**

- [ ] Verify authentication works
- [ ] Test progress sync across devices
- [ ] Check real-time subscriptions
- [ ] Monitor database performance
- [ ] Set up backup schedule
- [ ] Configure alerts

---

## 💰 Cost Estimation

### **Supabase Free Tier**
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 2GB bandwidth/month
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

**Estimated Usage (First 6 Months):**
- Database: ~200MB (user data, progress, discussions)
- Storage: ~500MB (avatars, certificates)
- Bandwidth: ~1GB/month
- MAU: ~1,000 users

**Verdict:** Free tier sufficient for first 6-12 months

### **Paid Tier ($25/month)**
- 8GB database
- 100GB file storage
- 250GB bandwidth
- Unlimited MAU
- Daily backups
- Point-in-time recovery

**When to upgrade:** > 5,000 MAU or > 500MB database

---

**Last Updated:** January 2025
**Next Review:** February 2025

```typescript
// app/components/Auth/SignInModal.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

export function SignInModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In to Darwin MFC</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSignIn} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            {/* Google icon SVG */}
          </svg>
          Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 🗄️ Phase 2: Database Setup (Week 2-3)

### **Step 1: Run Migrations**

Create `supabase/migrations/001_initial_schema.sql`:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'educator', 'admin')),
  institution TEXT,
  specialty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

### **Step 2: Apply Migrations**

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref xxx

# Apply migrations
supabase db push
```

---


