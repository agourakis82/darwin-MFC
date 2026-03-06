'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  ArrowLeft,
  ClipboardList,
  FileText,
  MessageSquare,
  PlusCircle,
  ShieldCheck,
  ThumbsUp,
  User,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import { addCaseComment, getCaseById, incrementCaseView, listCaseComments, listPublishedCases, voteCase } from '@/lib/supabase/services/community';
import { useAuth } from '@/lib/hooks/useAuth';
import { ReportButton } from '@/app/components/Community/ReportButton';

type ClinicalCaseDataLike = {
  ageRange?: string;
  sex?: string;
  occupation?: string;
  type?: string;
  difficulty?: string;
  presentation?: string;
  history?: string;
  physicalExam?: string;
  labResults?: string;
  imaging?: string;
  diagnosisCodes?: string[];
  [key: string]: unknown;
};

const CASE_TYPE_LABELS: Record<string, string> = {
  diagnostic_challenge: 'Desafio Diagnóstico',
  treatment_decision: 'Decisão Terapêutica',
  management_dilemma: 'Dilema de Manejo',
  ethical_question: 'Questão Ética',
  educational: 'Educacional',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  straightforward: 'Simples',
  moderate: 'Moderado',
  complex: 'Complexo',
};

function renderTextBlock(title: string, icon: React.ReactNode, content?: string) {
  const value = typeof content === 'string' ? content.trim() : '';
  if (!value) return null;

  return (
    <section className="mt-4">
      <div className="flex items-center gap-2 text-carbon-700 dark:text-carbon-300 mb-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="text-sm text-carbon-800 dark:text-carbon-100 leading-relaxed whitespace-pre-wrap bg-white dark:bg-carbon-900/60 border border-carbon-200/70 dark:border-carbon-800/70 rounded-xl p-3">
        {value}
      </div>
    </section>
  );
}

function renderCaseData(caseData: ClinicalCaseDataLike | null | undefined) {
  if (!caseData || Object.keys(caseData).length === 0) {
    return (
      <p className="text-sm text-carbon-600 dark:text-carbon-400">
        Sem dados estruturados disponíveis. Use os comentários para complementar discussão.
      </p>
    );
  }

  const fallbackEntries = Object.entries(caseData)
    .filter(([, value]) => value !== undefined && value !== null && value !== '' && value !== '');

  const knownKeys = new Set([
    'ageRange',
    'sex',
    'occupation',
    'type',
    'difficulty',
    'presentation',
    'history',
    'physicalExam',
    'labResults',
    'imaging',
    'diagnosisCodes',
  ]);

  const diagnosisCodes = Array.isArray(caseData.diagnosisCodes) ? caseData.diagnosisCodes : [];

  const pills: Array<[string, string]> = [];
  if (caseData.ageRange) pills.push(['Faixa etária', caseData.ageRange]);
  if (caseData.sex) pills.push(['Sexo', String(caseData.sex)]);
  if (caseData.type) pills.push(['Tipo', CASE_TYPE_LABELS[String(caseData.type)] ?? String(caseData.type)]);
  if (caseData.difficulty) pills.push(['Dificuldade', DIFFICULTY_LABELS[String(caseData.difficulty)] ?? String(caseData.difficulty)]);

  const unknownRows = fallbackEntries
    .filter(([k]) => !knownKeys.has(k))
    .map(([k, v]) => [k, typeof v === 'string' ? v : JSON.stringify(v)] as [string, string]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 text-xs">
        {pills.map(([label, value]) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-full border border-carbon-200/70 dark:border-carbon-800/70 px-3 py-1 bg-carbon-50 dark:bg-carbon-900"
          >
            <span className="text-carbon-500 dark:text-carbon-400">{label}:</span>
            <span className="font-semibold text-carbon-900 dark:text-carbon-100">{value}</span>
          </span>
        ))}
      </div>

      {caseData.occupation ? (
        renderTextBlock(
          'Ocupação',
          <Briefcase className="w-4 h-4" />,
          caseData.occupation
        )
      ) : null}
      {renderTextBlock('Apresentação', <User className="w-4 h-4" />, caseData.presentation)}
      {renderTextBlock('História clínica', <MessageSquare className="w-4 h-4" />, caseData.history)}
      {renderTextBlock('Exame físico', <ClipboardList className="w-4 h-4" />, caseData.physicalExam)}
      {renderTextBlock('Exames laboratoriais', <FileText className="w-4 h-4" />, caseData.labResults)}
      {renderTextBlock('Imagem', <ChevronRight className="w-4 h-4" />, caseData.imaging)}

      {diagnosisCodes.length > 0 ? (
        <section className="mt-4">
          <h3 className="font-semibold text-carbon-700 dark:text-carbon-300 mb-2">Códigos diagnósticos</h3>
          <div className="flex flex-wrap gap-2">
            {diagnosisCodes.map((code) => (
              <span
                key={code}
                className="px-2.5 py-1 text-xs rounded-full border border-brand-primary-200/80 dark:border-brand-primary-800/70 bg-brand-primary-50/80 dark:bg-brand-primary-900/25 text-brand-primary-700 dark:text-brand-primary-300"
              >
                {code}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {unknownRows.length > 0 ? (
        <section className="mt-4 border-t border-carbon-200 dark:border-carbon-800 pt-4">
          <h3 className="font-semibold text-carbon-700 dark:text-carbon-300 mb-2">Dados adicionais</h3>
          <dl className="text-sm text-carbon-700 dark:text-carbon-300 space-y-1">
            {unknownRows.map(([k, v]) => (
              <div key={k} className="flex items-start gap-2">
                <dt className="w-52 shrink-0 font-medium text-carbon-500 dark:text-carbon-400">{k}</dt>
                <dd className="text-carbon-900 dark:text-carbon-100">{String(v)}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </div>
  );
}

export default function CommunityCasesPage() {
  const t = useTranslations('community.cases');
  const tCommon = useTranslations('common');
  const searchParams = useSearchParams();
  const router = useRouter();

  const caseId = searchParams.get('id') || '';

  if (caseId) {
    return <CaseDetailView caseId={caseId} onBack={() => router.push('/community/cases')} />;
  }

  return <CasesListView tCommon={tCommon} />;
}

function CasesListView({ tCommon }: { tCommon: ReturnType<typeof useTranslations> }) {
  const t = useTranslations('community.cases');
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await listPublishedCases({ limit: 20 });
      if (!mounted) return;
      setCases(res.data ?? []);
      setError(res.error);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-phosphate">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tCommon('back')}
        </Link>

        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guanine-green/10 text-guanine-green text-sm font-semibold mb-3">
              <FileText className="w-4 h-4" />
              {t('title')}
            </div>
            <h1 className="text-3xl font-bold text-helix-navy dark:text-white mb-2">
              {t('title')}
            </h1>
            <p className="text-carbon-600 dark:text-carbon-400">
              {t('subtitle')}
            </p>
          </div>

          <Link
            href={isAuthenticated ? '/community/cases/new' : '/auth/login'}
            className="btn-darwin-primary px-5 py-3 justify-center"
          >
            <PlusCircle className="w-5 h-5" />
            {t('submit_case')}
          </Link>
        </div>

        {loading ? (
          <div className="card-darwin p-6 text-carbon-600 dark:text-carbon-400">
            {tCommon('loading')}
          </div>
        ) : error ? (
          <div className="card-darwin p-6 text-critical-red-700 dark:text-critical-red-300">
            {error}
          </div>
        ) : cases.length === 0 ? (
          <div className="card-darwin p-6 text-carbon-600 dark:text-carbon-400">
            {t('none_published')}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/community/cases?id=${encodeURIComponent(c.id)}`}
                className="card-darwin p-6 hover:shadow-xl apple-transition block"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-carbon-900 dark:text-carbon-100 line-clamp-2">
                      {c.title}
                    </div>
                    <div className="mt-2 text-xs text-carbon-600 dark:text-carbon-400 flex flex-wrap gap-2">
                      <span>{c.specialty ?? 'APS'}</span>
                      <span className="hairline w-px h-4" />
                      <span>{new Date(c.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {c.verified && (
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-guanine-green">
                      <ShieldCheck className="w-4 h-4" />
                      {t('status.verified')}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-carbon-600 dark:text-carbon-400">
                  <span className="inline-flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {c.upvotes ?? 0}
                  </span>
                  <span className="hairline w-px h-4" />
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {t('open')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CaseDetailView({ caseId, onBack }: { caseId: string; onBack: () => void }) {
  const t = useTranslations('community.cases');
  const tCommon = useTranslations('common');
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caseRow, setCaseRow] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentDraft, setCommentDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const viewedRef = useRef<string | null>(null);

  const caseData = useMemo(() => caseRow?.case_data ?? null, [caseRow]);

  async function refresh() {
    if (!caseId) return;
    setLoading(true);
    setError(null);

    const [c, cmts] = await Promise.all([
      getCaseById(caseId),
      listCaseComments(caseId),
    ]);

    if (c.error) setError(c.error);
    setCaseRow(c.data);
    setComments(cmts.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (!caseId) return;
    if (viewedRef.current === caseId) return;
    viewedRef.current = caseId;
    incrementCaseView(caseId).catch(() => undefined);
  }, [caseId]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-phosphate flex items-center justify-center">
        <div className="text-carbon-600 dark:text-carbon-400">{tCommon('loading')}</div>
      </div>
    );
  }

  if (error || !caseRow) {
    return (
      <div className="min-h-screen bg-phosphate">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {tCommon('back')}
          </button>
          <div className="card-darwin p-8">
            <h1 className="text-2xl font-bold text-helix-navy dark:text-white mb-2">
              {t('not_found_title')}
            </h1>
            <p className="text-carbon-600 dark:text-carbon-400">
              {error ?? t('not_found_desc')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-phosphate">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tCommon('back')}
        </button>

        <div className="card-darwin p-6 lg:p-8 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-helix-navy dark:text-white mb-2">
                {caseRow.title}
              </h1>
              <div className="flex flex-wrap gap-2 text-sm text-carbon-600 dark:text-carbon-400">
                <span>{caseRow.specialty ?? 'APS'}</span>
                <span className="hairline w-px h-4" />
                <span>{caseRow.verified ? t('status.verified') : t('status.pending_review')}</span>
                {caseRow.verified && (
                  <>
                    <span className="hairline w-px h-4" />
                    <span className="inline-flex items-center gap-1 text-guanine-green">
                      <ShieldCheck className="w-4 h-4" />
                      {t('status.verified')}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ReportButton entityType="shared_case" entityId={caseRow.id} size="sm" />
              <button
                className="btn-darwin-secondary px-4 py-2"
                onClick={async () => {
                  await voteCase(caseRow.id, 1);
                  refresh();
                }}
                aria-label={t('upvote')}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{caseRow.upvotes ?? 0}</span>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold text-helix-navy dark:text-white mb-2">
              {t('case_data')}
            </h2>
            {renderCaseData(caseData)}
          </div>
        </div>

        <div className="card-darwin p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-adenine-teal dark:text-cytosine-cyan" />
            <h2 className="text-xl font-bold text-helix-navy dark:text-white">
              {t('comments') ?? 'Comments'} ({comments.length})
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            {comments.length === 0 ? (
              <div className="text-carbon-600 dark:text-carbon-400">
                {t('no_comments') ?? 'No comments yet.'}
              </div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="bg-carbon-100 dark:bg-carbon-800 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="text-xs text-carbon-500 dark:text-carbon-400">
                      {new Date(c.created_at).toLocaleString()}
                    </div>
                    <ReportButton entityType="case_comment" entityId={c.id} size="sm" className="shrink-0" />
                  </div>
                  <div className="text-sm text-carbon-900 dark:text-carbon-100 whitespace-pre-wrap">
                    {c.content}
                  </div>
                </div>
              ))
            )}
          </div>

          {isAuthenticated ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!commentDraft.trim()) return;
                setSubmitting(true);
                try {
                  const { error: err } = await addCaseComment({
                    caseId: caseRow.id,
                    content: commentDraft.trim(),
                  });
                  if (err) throw new Error(err);
                  setCommentDraft('');
                  await refresh();
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Failed to comment');
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-3"
            >
              <label className="block text-sm font-medium text-carbon-700 dark:text-carbon-300">
                {t('add_comment') ?? 'Add a comment'}
              </label>
              <textarea
                value={commentDraft}
                onChange={(e) => setCommentDraft(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-carbon-200 dark:border-carbon-700 bg-white dark:bg-carbon-900 px-4 py-3 text-sm text-carbon-900 dark:text-carbon-100 focus:outline-none focus:ring-2 focus:ring-adenine-teal/40 dark:focus:ring-cytosine-cyan/40"
                placeholder={t('comment_placeholder') ?? 'Write a respectful, evidence-based comment.'}
              />
              <div className="flex justify-end">
                <button type="submit" className="btn-darwin-primary px-6 py-2.5" disabled={submitting}>
                  {submitting ? (t('submitting') ?? 'Submitting...') : (t('submit_comment') ?? 'Submit')}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-carbon-100 dark:bg-carbon-800 rounded-xl p-4">
              <p className="text-sm text-carbon-700 dark:text-carbon-300">
                {t('sign_in_to_comment') ?? 'Sign in to comment.'}
              </p>
              <div className="mt-3">
                <Link href="/auth/login" className="btn-darwin-secondary px-4 py-2">
                  {t('sign_in') ?? 'Sign in'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
