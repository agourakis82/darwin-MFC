'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { addForumReply, getForumPostById, incrementPostView, listForumReplies, votePost } from '@/lib/supabase/services/forum';
import { useAuth } from '@/lib/hooks/useAuth';
import { ReportButton } from '@/app/components/Community/ReportButton';

export default function CommunityPostsPage() {
  const tAny = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id') || '';

  if (!postId) {
    return (
      <div className="min-h-screen bg-phosphate">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <Link
            href="/community/forums"
            className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {tAny('common.back') ?? 'Back'}
          </Link>

          <div className="card-darwin p-8 text-center">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 text-carbon-400" />
            <div className="text-lg font-semibold text-carbon-900 dark:text-carbon-100">
              {tAny('community.select_post') ?? 'Selecione um post'}
            </div>
            <div className="mt-2 text-carbon-600 dark:text-carbon-400">
              {tAny('community.select_post_desc') ?? 'Abra um post a partir do fórum.'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PostDetailView postId={postId} onBack={() => router.back()} />;
}

function PostDetailView({ postId, onBack }: { postId: string; onBack: () => void }) {
  const tAny = useTranslations();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [replyDraft, setReplyDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const viewedRef = useRef<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);

    const [p, r] = await Promise.all([
      getForumPostById(postId),
      listForumReplies(postId),
    ]);

    if (p.error) setError(p.error);
    setPost(p.data);
    setReplies(r.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (!postId) return;
    if (viewedRef.current === postId) return;
    viewedRef.current = postId;
    incrementPostView(postId).catch(() => undefined);
  }, [postId]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-phosphate flex items-center justify-center">
        <div className="text-carbon-600 dark:text-carbon-400">{tAny('common.loading') ?? 'Loading...'}</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-phosphate">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {tAny('common.back') ?? 'Back'}
          </button>

          <div className="card-darwin p-8">
            <div className="text-xl font-bold text-helix-navy dark:text-white">
              {tAny('community.post_not_found') ?? 'Post not found'}
            </div>
            <div className="mt-2 text-carbon-600 dark:text-carbon-400">
              {error ?? tAny('community.post_not_found_desc') ?? 'This post may have been removed.'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-phosphate">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tAny('common.back') ?? 'Back'}
        </button>

        <div className="card-darwin p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs font-semibold text-carbon-600 dark:text-carbon-400">
                {post.category_id}
              </div>
              <h1 className="mt-1 text-2xl font-bold text-helix-navy dark:text-white">
                {post.title}
              </h1>
              <div className="mt-3 text-xs text-carbon-600 dark:text-carbon-400 flex flex-wrap gap-2">
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span className="hairline w-px h-4" />
                <span>{(post.reply_count ?? 0).toString()} {tAny('community.replies') ?? 'replies'}</span>
                <span className="hairline w-px h-4" />
                <span>{(post.view_count ?? 0).toString()} {tAny('community.views') ?? 'views'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ReportButton entityType="forum_post" entityId={post.id} size="sm" />
              <button
                type="button"
                onClick={async () => {
                  const res = await votePost(post.id, 1);
                  if (res.error) {
                    setError(res.error);
                    return;
                  }
                  await refresh();
                }}
                disabled={!isAuthenticated}
                className={`btn-darwin-secondary px-4 py-2 ${!isAuthenticated ? 'opacity-60 cursor-not-allowed' : ''}`}
                title={!isAuthenticated ? (tAny('community.auth_required_short') ?? 'Login para votar') : undefined}
              >
                {tAny('community.upvote') ?? 'Upvote'} ({post.upvotes ?? 0})
              </button>
            </div>
          </div>

          <div className="mt-6 prose prose-sm max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-lg font-semibold text-helix-navy dark:text-white mb-3">
            {tAny('community.replies') ?? 'Replies'} ({replies.length})
          </div>

          {replies.length === 0 ? (
            <div className="card-darwin p-6 text-carbon-600 dark:text-carbon-400">
              {tAny('community.no_replies') ?? 'Sem respostas ainda.'}
            </div>
          ) : (
            <div className="space-y-3">
              {replies.map((r) => (
                <div key={r.id} className="card-darwin p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs text-carbon-600 dark:text-carbon-400">
                      {new Date(r.created_at).toLocaleString()}
                    </div>
                    <ReportButton entityType="forum_reply" entityId={r.id} size="sm" className="shrink-0" />
                  </div>
                  <div className="mt-2 whitespace-pre-wrap text-carbon-900 dark:text-carbon-100">
                    {r.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 card-darwin p-6">
          <div className="text-sm font-semibold text-helix-navy dark:text-white mb-3">
            {tAny('community.reply.submit') ?? 'Reply'}
          </div>

          {!isAuthenticated ? (
            <div className="text-sm text-carbon-600 dark:text-carbon-400">
              {tAny('community.auth_required_short') ?? 'Login para responder.'}{' '}
              <Link href="/auth/login" className="underline hover:text-adenine-teal dark:hover:text-cytosine-cyan">
                {tAny('auth.login') ?? 'Sign in'}
              </Link>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!replyDraft.trim()) return;
                setSubmitting(true);
                setError(null);
                const res = await addForumReply({ postId, content: replyDraft.trim() });
                if (res.error) {
                  setError(res.error);
                  setSubmitting(false);
                  return;
                }
                setReplyDraft('');
                await refresh();
                setSubmitting(false);
              }}
              className="space-y-3"
            >
              <textarea
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                className="w-full rounded-xl border border-carbon-200/70 dark:border-carbon-700/70 bg-white/70 dark:bg-carbon-900/30 px-4 py-3 text-sm text-carbon-900 dark:text-carbon-100 placeholder:text-carbon-500 outline-none focus:ring-2 focus:ring-adenine-teal/40 dark:focus:ring-cytosine-cyan/40 apple-transition"
                placeholder={tAny('community.reply.placeholder') ?? 'Write your reply...'}
                rows={5}
              />
              {error && (
                <div className="text-sm text-critical-red-700 dark:text-critical-red-300">{error}</div>
              )}
              <button type="submit" disabled={submitting} className="btn-darwin-primary px-5 py-3">
                {submitting ? (tAny('community.reply.submitting') ?? 'Posting...') : (tAny('community.reply.submit') ?? 'Reply')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
