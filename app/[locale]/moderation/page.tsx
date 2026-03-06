'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import { listOpenReports, updateReportStatus } from '@/lib/supabase/services/reports';

export default function ModerationPage() {
  const tAny = useTranslations();
  const { isAuthenticated, loading, profile, user } = useAuth();

  const [casesLoading, setCasesLoading] = useState(true);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unverifiedCases, setUnverifiedCases] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  const role = String((profile as any)?.role ?? '');
  const isModerator = role === 'moderator' || role === 'admin';

  async function refreshCases() {
    if (!isSupabaseConfigured || !supabase) {
      setUnverifiedCases([]);
      setCasesLoading(false);
      return;
    }

    setCasesLoading(true);
    const { data, error: e } = await supabase
      .from('shared_cases')
      .select('*')
      .eq('published', true)
      .eq('verified', false)
      .order('created_at', { ascending: false })
      .limit(50);
    if (e) setError(e.message);
    setUnverifiedCases(data ?? []);
    setCasesLoading(false);
  }

  async function refreshReports() {
    setReportsLoading(true);
    const res = await listOpenReports({ limit: 100 });
    if (res.error) setError(res.error);
    setReports(res.data ?? []);
    setReportsLoading(false);
  }

  useEffect(() => {
    if (!isAuthenticated || !isModerator) return;
    setError(null);
    refreshCases();
    refreshReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isModerator]);

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
        <div className="container mx-auto px-4 py-10 max-w-5xl">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {tAny('common.back') ?? 'Back'}
          </Link>

          <div className="card-darwin p-8 text-center">
            <ShieldCheck className="w-10 h-10 mx-auto mb-3 text-carbon-400" />
            <div className="text-lg font-semibold text-carbon-900 dark:text-carbon-100">
              {tAny('community.auth_required_title') ?? 'Login required'}
            </div>
            <div className="mt-2 text-carbon-600 dark:text-carbon-400">
              {tAny('community.auth_required_desc') ?? 'Faça login para acessar moderação.'}
            </div>
            <Link href="/auth/login" className="btn-darwin-primary mt-5 inline-flex px-5 py-3 justify-center">
              {tAny('auth.login') ?? 'Sign in'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isModerator) {
    return (
      <div className="min-h-screen bg-phosphate">
        <div className="container mx-auto px-4 py-10 max-w-5xl">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {tAny('common.back') ?? 'Back'}
          </Link>

          <div className="card-darwin p-8">
            <div className="text-xl font-bold text-helix-navy dark:text-white">
              Acesso restrito
            </div>
            <div className="mt-2 text-carbon-600 dark:text-carbon-400">
              Esta página é apenas para moderadores/admins.
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-helix-navy/10 dark:bg-carbon-900/40 text-helix-navy dark:text-carbon-100 text-sm font-semibold mb-3">
            <ShieldCheck className="w-4 h-4" />
            Moderação
          </div>
          <h1 className="text-3xl font-bold text-helix-navy dark:text-white">
            Moderação
          </h1>
          <p className="mt-2 text-carbon-600 dark:text-carbon-400">
            Fila de verificação e reports.
          </p>
        </div>

        {error ? (
          <div className="card-darwin p-6 text-critical-red-700 dark:text-critical-red-300 mb-6">
            {error}
          </div>
        ) : null}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Cases queue */}
          <div className="card-darwin p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <div className="text-lg font-semibold text-helix-navy dark:text-white">
                  Casos para verificar
                </div>
                <div className="text-sm text-carbon-600 dark:text-carbon-400">
                  Publicados, ainda não verificados.
                </div>
              </div>
              <button type="button" onClick={refreshCases} className="btn-darwin-secondary px-4 py-2">
                Atualizar
              </button>
            </div>

            {casesLoading ? (
              <div className="text-carbon-600 dark:text-carbon-400">{tAny('common.loading') ?? 'Loading...'}</div>
            ) : unverifiedCases.length === 0 ? (
              <div className="text-carbon-600 dark:text-carbon-400">
                Nenhum caso pendente.
              </div>
            ) : (
              <div className="space-y-3">
                {unverifiedCases.map((c) => (
                  <div key={c.id} className="rounded-2xl border border-carbon-200/70 dark:border-carbon-800/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-carbon-900 dark:text-carbon-100 line-clamp-2">
                          {c.title}
                        </div>
                        <div className="mt-1 text-xs text-carbon-600 dark:text-carbon-400 flex flex-wrap gap-2">
                          <span>{c.specialty ?? 'APS'}</span>
                          <span className="hairline w-px h-4" />
                          <span>{new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/community/cases?id=${encodeURIComponent(c.id)}`} className="btn-darwin-secondary px-4 py-2">
                          Ver
                        </Link>
                        <button
                          type="button"
                          className="btn-darwin-primary px-4 py-2"
                          onClick={async () => {
                            if (!isSupabaseConfigured || !supabase) return;
                            setError(null);
                            const { error: e } = await supabase
                              .from('shared_cases')
                              .update({ verified: true, verified_by: user?.id ?? null })
                              .eq('id', c.id);
                            if (e) {
                              setError(e.message);
                              return;
                            }
                            await refreshCases();
                          }}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Verificar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reports */}
          <div className="card-darwin p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <div className="text-lg font-semibold text-helix-navy dark:text-white">
                  Reports abertos
                </div>
                <div className="text-sm text-carbon-600 dark:text-carbon-400">
                  Conteúdo sinalizado pela comunidade.
                </div>
              </div>
              <button type="button" onClick={refreshReports} className="btn-darwin-secondary px-4 py-2">
                Atualizar
              </button>
            </div>

            {reportsLoading ? (
              <div className="text-carbon-600 dark:text-carbon-400">{tAny('common.loading') ?? 'Loading...'}</div>
            ) : reports.length === 0 ? (
              <div className="text-carbon-600 dark:text-carbon-400">
                Nenhum report pendente.
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-carbon-200/70 dark:border-carbon-800/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-carbon-900 dark:text-carbon-100">
                          <AlertTriangle className="w-4 h-4 inline-block mr-1 text-critical-red-600" />
                          {r.entity_type} · {r.reason}
                        </div>
                        {r.details ? (
                          <div className="mt-2 text-sm text-carbon-700 dark:text-carbon-300 whitespace-pre-wrap">
                            {r.details}
                          </div>
                        ) : null}
                        <div className="mt-2 text-xs text-carbon-600 dark:text-carbon-400">
                          {new Date(r.created_at).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          className="btn-darwin-secondary px-4 py-2"
                          onClick={async () => {
                            setError(null);
                            const res = await updateReportStatus(r.id, 'reviewing');
                            if (res.error) setError(res.error);
                            await refreshReports();
                          }}
                        >
                          Revisar
                        </button>
                        <button
                          type="button"
                          className="btn-darwin-primary px-4 py-2"
                          onClick={async () => {
                            setError(null);
                            const res = await updateReportStatus(r.id, 'resolved');
                            if (res.error) setError(res.error);
                            await refreshReports();
                          }}
                        >
                          Resolver
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
