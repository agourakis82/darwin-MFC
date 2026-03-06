'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowLeft, MessageSquare, PlusCircle } from 'lucide-react';
import { CategoryCard } from '@/app/components/Community';
import { FORUM_CATEGORIES } from '@/lib/types/community';
import { listForumCategories, listForumPosts } from '@/lib/supabase/services/forum';
import { useAuth } from '@/lib/hooks/useAuth';

function legacyColorToAccent(color: string | null | undefined) {
  const c = String(color ?? '').toLowerCase();
  if (c.includes('green')) return 'safe';
  if (c.includes('amber') || c.includes('yellow') || c.includes('orange')) return 'warning';
  if (c.includes('purple')) return 'secondary';
  if (c.includes('red')) return 'critical';
  if (c.includes('blue') || c.includes('cyan') || c.includes('teal')) return 'info';
  return 'info';
}

export default function CommunityForumsPage() {
  const t = useTranslations('community');
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get('category') || '';

  if (categoryId) {
    return <ForumCategoryView categoryId={categoryId} onBack={() => router.push('/community/forums')} />;
  }

  return <ForumCategoriesView title={t('forums') ?? 'Forums'} />;
}

function ForumCategoriesView({ title }: { title: string }) {
  const tAny = useTranslations();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<typeof FORUM_CATEGORIES>(FORUM_CATEGORIES);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await listForumCategories();
      if (!mounted) return;

      if (res.data.length > 0) {
        setCategories(
          res.data.map((c) => ({
            id: c.id,
            nameKey: c.name_key,
            descriptionKey: c.description_key,
            icon: c.icon,
            accent: ((c as any).accent ?? legacyColorToAccent(c.color)) as import('@/lib/types/community').ForumCategoryAccent,
            postCount: 0,
            isRestricted: c.is_restricted ?? false,
            order: c.order ?? 0,
          })) as import('@/lib/types/community').ForumCategory[]
        );
      }

      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const sorted = useMemo(
    () => [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [categories]
  );

  return (
    <div className="min-h-screen bg-phosphate">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tAny('common.back') ?? 'Back'}
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adenine-teal/10 dark:bg-cytosine-cyan/10 text-adenine-teal dark:text-cytosine-cyan text-sm font-semibold mb-3">
            <MessageSquare className="w-4 h-4" />
            {title}
          </div>
          <h1 className="text-3xl font-bold text-helix-navy dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-carbon-600 dark:text-carbon-400">
            {tAny('community.forums_desc') ?? 'Categorias e discussões da comunidade.'}
          </p>
        </div>

        {loading ? (
          <div className="card-darwin p-6 text-carbon-600 dark:text-carbon-400">
            {tAny('common.loading') ?? 'Loading...'}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {sorted.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ForumCategoryView({ categoryId, onBack }: { categoryId: string; onBack: () => void }) {
  const tAny = useTranslations();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await listForumPosts({ categoryId, limit: 50 });
      if (!mounted) return;
      setPosts(res.data ?? []);
      setError(res.error);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-phosphate">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tAny('common.back') ?? 'Back'}
        </button>

        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-helix-navy dark:text-white">
              {tAny(`community.categories.${categoryId}` as any) ?? categoryId}
            </h1>
            <p className="mt-2 text-carbon-600 dark:text-carbon-400">
              {tAny(`community.categories.${categoryId}_desc` as any) ?? 'Discussões recentes.'}
            </p>
          </div>

          <Link
            href={isAuthenticated ? `/community/posts/new?category=${encodeURIComponent(categoryId)}` : '/auth/login'}
            className="btn-darwin-primary px-5 py-3 justify-center"
          >
            <PlusCircle className="w-5 h-5" />
            {tAny('community.new_post') ?? 'Novo post'}
          </Link>
        </div>

        {loading ? (
          <div className="card-darwin p-6 text-carbon-600 dark:text-carbon-400">
            {tAny('common.loading') ?? 'Loading...'}
          </div>
        ) : error ? (
          <div className="card-darwin p-6 text-critical-red-700 dark:text-critical-red-300">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="card-darwin p-8 text-center text-carbon-600 dark:text-carbon-400">
            {tAny('community.no_discussions') ?? 'Sem discussões ainda.'}
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/community/posts?id=${encodeURIComponent(p.id)}`}
                className="card-darwin p-5 apple-transition block hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-carbon-900 dark:text-carbon-100 line-clamp-2">
                      {p.title}
                    </div>
                    <div className="mt-2 text-xs text-carbon-600 dark:text-carbon-400 flex flex-wrap gap-2">
                      <span>{new Date(p.created_at).toLocaleDateString()}</span>
                      <span className="hairline w-px h-4" />
                      <span>{(p.reply_count ?? 0).toString()} {tAny('community.replies') ?? 'replies'}</span>
                      <span className="hairline w-px h-4" />
                      <span>{(p.view_count ?? 0).toString()} {tAny('community.views') ?? 'views'}</span>
                    </div>
                  </div>
                  {(p.is_pinned || p.is_locked) && (
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300">
                      {p.is_pinned ? (tAny('community.pinned') ?? 'Pinned') : null}
                      {p.is_locked ? (p.is_pinned ? ' · ' : '') + (tAny('community.locked') ?? 'Locked') : null}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
