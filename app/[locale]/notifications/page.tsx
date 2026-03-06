'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Bell, CheckCheck } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from '@/lib/supabase/services/notifications';

type NotificationVM = {
  id: string;
  createdAt: string;
  readAt: string | null;
  title: string;
  subtitle: string;
  href: string | null;
};

function buildVM(n: any): NotificationVM {
  const type = String(n.type ?? '');
  const payload = (n.payload ?? {}) as any;
  const createdAt = String(n.created_at ?? '');
  const readAt = (n.read_at ?? null) as string | null;

  if (type === 'case_comment') {
    const caseId = String(payload.case_id ?? '');
    return {
      id: n.id,
      createdAt,
      readAt,
      title: 'Novo comentário no seu caso clínico',
      subtitle: 'Abra para ver a discussão.',
      href: caseId ? `/community/cases?id=${encodeURIComponent(caseId)}` : null,
    };
  }
  if (type === 'comment_reply') {
    const caseId = String(payload.case_id ?? '');
    return {
      id: n.id,
      createdAt,
      readAt,
      title: 'Nova resposta ao seu comentário',
      subtitle: 'Abra para continuar a discussão.',
      href: caseId ? `/community/cases?id=${encodeURIComponent(caseId)}` : null,
    };
  }
  if (type === 'forum_reply') {
    const postId = String(payload.post_id ?? '');
    return {
      id: n.id,
      createdAt,
      readAt,
      title: 'Nova resposta no seu post',
      subtitle: 'Abra para ver a resposta.',
      href: postId ? `/community/posts?id=${encodeURIComponent(postId)}` : null,
    };
  }
  if (type === 'forum_reply_reply') {
    const postId = String(payload.post_id ?? '');
    return {
      id: n.id,
      createdAt,
      readAt,
      title: 'Nova resposta ao seu comentário no fórum',
      subtitle: 'Abra para ver a resposta encadeada.',
      href: postId ? `/community/posts?id=${encodeURIComponent(postId)}` : null,
    };
  }

  return {
    id: n.id,
    createdAt,
    readAt,
    title: type ? `Notificação: ${type}` : 'Notificação',
    subtitle: 'Abra para ver detalhes.',
    href: null,
  };
}

export default function NotificationsPage() {
  const tAny = useTranslations();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [markingAll, setMarkingAll] = useState(false);

  async function refresh() {
    setLoading(true);
    setError(null);
    const res = await listNotifications({ limit: 50 });
    setRows(res.data ?? []);
    setError(res.error);
    setLoading(false);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const items = useMemo(() => rows.map(buildVM), [rows]);
  const unreadCount = useMemo(() => items.filter((i) => !i.readAt).length, [items]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-phosphate">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {tAny('common.back') ?? 'Back'}
          </Link>

          <div className="card-darwin p-8 text-center">
            <Bell className="w-10 h-10 mx-auto mb-3 text-carbon-400" />
            <div className="text-lg font-semibold text-carbon-900 dark:text-carbon-100">
              {tAny('community.auth_required_title') ?? 'Login required'}
            </div>
            <div className="mt-2 text-carbon-600 dark:text-carbon-400">
              {tAny('community.auth_required_desc') ?? 'Faça login para ver suas notificações.'}
            </div>
            <Link href="/auth/login" className="btn-darwin-primary mt-5 inline-flex px-5 py-3 justify-center">
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
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tAny('common.back') ?? 'Back'}
        </Link>

        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adenine-teal/10 dark:bg-cytosine-cyan/10 text-adenine-teal dark:text-cytosine-cyan text-sm font-semibold mb-3">
              <Bell className="w-4 h-4" />
              Notificações
            </div>
            <h1 className="text-3xl font-bold text-helix-navy dark:text-white">
              Notificações
            </h1>
            <p className="mt-2 text-carbon-600 dark:text-carbon-400">
              {unreadCount > 0 ? `${unreadCount} não lidas` : 'Tudo em dia.'}
            </p>
          </div>

          <button
            type="button"
            disabled={markingAll || unreadCount === 0}
            onClick={async () => {
              setMarkingAll(true);
              setError(null);
              // Optimistic UI
              setRows((prev) => prev.map((r) => ({ ...r, read_at: r.read_at ?? new Date().toISOString() })));
              const res = await markAllNotificationsRead();
              if (res.error) {
                setError(res.error);
                await refresh();
              }
              setMarkingAll(false);
            }}
            className={`btn-darwin-secondary px-5 py-3 justify-center ${unreadCount === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <CheckCheck className="w-5 h-5" />
            Marcar tudo como lido
          </button>
        </div>

        {loading ? (
          <div className="card-darwin p-6 text-carbon-600 dark:text-carbon-400">
            {tAny('common.loading') ?? 'Loading...'}
          </div>
        ) : error ? (
          <div className="card-darwin p-6 text-critical-red-700 dark:text-critical-red-300">
            {error}
          </div>
        ) : items.length === 0 ? (
          <div className="card-darwin p-8 text-center text-carbon-600 dark:text-carbon-400">
            Nenhuma notificação ainda.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((n) => {
              const isUnread = !n.readAt;
              const Wrapper = n.href ? Link : ('div' as any);
              const wrapperProps = n.href ? ({ href: n.href } as any) : {};

              return (
                <Wrapper
                  key={n.id}
                  {...wrapperProps}
                  onClick={async () => {
                    if (!isUnread) return;
                    // Optimistic UI
                    setRows((prev) => prev.map((r) => (r.id === n.id ? { ...r, read_at: new Date().toISOString() } : r)));
                    await markNotificationRead(n.id);
                  }}
                  className="card-darwin p-5 apple-transition block hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 w-2.5 h-2.5 rounded-full ${isUnread ? 'bg-brand-primary-600' : 'bg-carbon-300 dark:bg-carbon-700'}`}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-carbon-900 dark:text-carbon-100">
                        {n.title}
                      </div>
                      <div className="mt-1 text-sm text-carbon-600 dark:text-carbon-400">
                        {n.subtitle}
                      </div>
                      <div className="mt-2 text-xs text-carbon-500 dark:text-carbon-400">
                        {new Date(n.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
