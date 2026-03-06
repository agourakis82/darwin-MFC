'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { createForumPost } from '@/lib/supabase/services/forum';
import { useAuth } from '@/lib/hooks/useAuth';

export default function NewForumPostPage() {
  const tAny = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category') || 'clinical';
  const { isAuthenticated, loading } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-phosphate flex items-center justify-center">
        <div className="text-carbon-600 dark:text-carbon-400">{tAny('common.loading') ?? 'Loading...'}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-phosphate">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="card-darwin p-8">
            <h1 className="text-2xl font-bold mb-2 text-helix-navy dark:text-white">
              {tAny('community.auth_required_title') ?? 'Login required'}
            </h1>
            <p className="text-carbon-600 dark:text-carbon-400 mb-6">
              {tAny('community.auth_required_desc') ?? 'Sign in to create a post.'}
            </p>
            <Link href="/auth/login" className="btn-darwin-primary">
              {tAny('auth.login') ?? 'Sign in'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-phosphate">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Link
          href={`/community/forums?category=${encodeURIComponent(categoryId)}`}
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tAny('common.back') ?? 'Back'}
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adenine-teal/10 dark:bg-cytosine-cyan/10 text-adenine-teal dark:text-cytosine-cyan text-sm font-semibold mb-3">
            <MessageSquare className="w-4 h-4" />
            {tAny('community.new_post') ?? 'Novo post'}
          </div>
          <h1 className="text-3xl font-bold text-helix-navy dark:text-white">
            {tAny('community.new_post') ?? 'Novo post'}
          </h1>
          <p className="mt-2 text-carbon-600 dark:text-carbon-400">
            {tAny('community.new_post_desc') ?? 'Escreva uma pergunta ou discussão para a comunidade.'}
          </p>
        </div>

        <div className="card-darwin p-6 lg:p-8">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              if (!title.trim() || !content.trim()) return;
              setSubmitting(true);
              const res = await createForumPost({
                categoryId,
                title: title.trim(),
                content: content.trim(),
                tags: [],
              });
              if (res.error || !res.data) {
                setError(res.error ?? 'Failed to create post');
                setSubmitting(false);
                return;
              }
              router.push(`/community/posts?id=${encodeURIComponent(res.data.id)}`);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-carbon-900 dark:text-carbon-100 mb-1">
                {tAny('community.post_fields.title_label') ?? 'Title'}
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-carbon-200/70 dark:border-carbon-700/70 bg-white/70 dark:bg-carbon-900/30 px-4 py-3 text-sm text-carbon-900 dark:text-carbon-100 placeholder:text-carbon-500 outline-none focus:ring-2 focus:ring-adenine-teal/40 dark:focus:ring-cytosine-cyan/40 apple-transition"
                placeholder={tAny('community.post_fields.title_placeholder') ?? 'e.g. Management of ...'}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-carbon-900 dark:text-carbon-100 mb-1">
                {tAny('community.post_fields.content_label') ?? 'Content'}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-xl border border-carbon-200/70 dark:border-carbon-700/70 bg-white/70 dark:bg-carbon-900/30 px-4 py-3 text-sm text-carbon-900 dark:text-carbon-100 placeholder:text-carbon-500 outline-none focus:ring-2 focus:ring-adenine-teal/40 dark:focus:ring-cytosine-cyan/40 apple-transition"
                placeholder={tAny('community.post_fields.content_placeholder') ?? 'Describe the context, your question, and what you have tried.'}
                rows={10}
              />
            </div>

            {error && (
              <div className="text-sm text-critical-red-700 dark:text-critical-red-300">{error}</div>
            )}

            <div className="flex items-center gap-3">
              <button type="submit" disabled={submitting} className="btn-darwin-primary px-5 py-3">
                {submitting ? (tAny('common.saving') ?? 'Saving...') : (tAny('common.publish') ?? 'Publish')}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/community/forums?category=${encodeURIComponent(categoryId)}`)}
                className="btn-darwin-secondary px-5 py-3"
              >
                {tAny('common.cancel') ?? 'Cancelar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
