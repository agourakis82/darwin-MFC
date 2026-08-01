'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  Database,
  FileDiff,
  FileSearch,
  Filter,
  FlaskConical,
  Hash,
  Info,
  ListFilter,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  Pill,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  UserRoundCheck,
  UsersRound,
  X,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import reviewSeedData from '@/public/medication-safety/medication-review-seed.json';
import type {
  MedicationDoseRuleCandidateV2,
  MedicationEvidenceSubmissionV1,
  MedicationReviewDecisionV1,
  MedicationReviewRole,
  MedicationReviewSeedV1,
  MedicationReviewTaskV1,
} from '@/lib/medication-safety/review-types';
import {
  claimMedicationReviewTask,
  getMedicationReviewSession,
  loadMedicationEvidence,
  loadMedicationReviewTasks,
  submitClinicalReviewerApplication,
  submitMedicationEvidence,
  submitMedicationReviewDecision,
  type ClinicalReviewerProfile,
} from '@/lib/supabase/services/medication-review';

const seed = reviewSeedData as unknown as MedicationReviewSeedV1;

type StudioTab = 'queue' | 'dose' | 'application';
type MobileStage = 'queue' | 'evidence' | 'decision';

const CORE_COPY: Record<string, {
  title: string;
  subtitle: string;
  queue: string;
  evidence: string;
  decision: string;
  apply: string;
  doses: string;
}> = {
  pt: { title: 'Darwin Rx Review Studio', subtitle: 'Evidência rastreável, revisão independente e consenso sem ativação clínica.', queue: 'Fila', evidence: 'Evidência', decision: 'Decisão', apply: 'Candidatura', doses: 'Regras de dose' },
  en: { title: 'Darwin Rx Review Studio', subtitle: 'Traceable evidence, independent review, and consensus without clinical activation.', queue: 'Queue', evidence: 'Evidence', decision: 'Decision', apply: 'Application', doses: 'Dose rules' },
  es: { title: 'Darwin Rx Review Studio', subtitle: 'Evidencia trazable, revisión independiente y consenso sin activación clínica.', queue: 'Cola', evidence: 'Evidencia', decision: 'Decisión', apply: 'Candidatura', doses: 'Reglas de dosis' },
  fr: { title: 'Darwin Rx Review Studio', subtitle: 'Preuves traçables, révision indépendante et consensus sans activation clinique.', queue: 'File', evidence: 'Preuve', decision: 'Décision', apply: 'Candidature', doses: 'Règles de dose' },
  ru: { title: 'Darwin Rx Review Studio', subtitle: 'Проверяемые источники, независимая оценка и консенсус без клинической активации.', queue: 'Очередь', evidence: 'Данные', decision: 'Решение', apply: 'Заявка', doses: 'Дозирование' },
  ar: { title: 'Darwin Rx Review Studio', subtitle: 'أدلة قابلة للتتبع ومراجعة مستقلة دون تفعيل سريري.', queue: 'قائمة', evidence: 'الأدلة', decision: 'القرار', apply: 'الطلب', doses: 'قواعد الجرعات' },
  zh: { title: 'Darwin Rx Review Studio', subtitle: '可追溯证据、独立审查与不触发临床启用的共识。', queue: '队列', evidence: '证据', decision: '决定', apply: '申请', doses: '剂量规则' },
  el: { title: 'Darwin Rx Review Studio', subtitle: 'Ιχνηλάσιμα στοιχεία, ανεξάρτητη κρίση και συναίνεση χωρίς κλινική ενεργοποίηση.', queue: 'Ουρά', evidence: 'Στοιχεία', decision: 'Απόφαση', apply: 'Αίτηση', doses: 'Κανόνες δόσης' },
  hi: { title: 'Darwin Rx Review Studio', subtitle: 'ट्रेस योग्य साक्ष्य, स्वतंत्र समीक्षा और बिना क्लिनिकल सक्रियण के सहमति।', queue: 'कतार', evidence: 'साक्ष्य', decision: 'निर्णय', apply: 'आवेदन', doses: 'खुराक नियम' },
};

const RISK_LABEL = { critical: 'Crítico', high: 'Alto', routine: 'Rotina' } as const;
const ROLE_LABEL: Record<MedicationReviewRole, string> = {
  contributor: 'Contribuidor',
  physician_reviewer: 'Revisor médico',
  pharmacist_reviewer: 'Revisor farmacêutico',
  terminology_steward: 'Terminologista',
  clinical_admin: 'Administrador clínico',
};

function StatusBadge({ task }: { task: MedicationReviewTaskV1 }) {
  const riskClass = task.risk === 'critical'
    ? 'border-red-400/35 bg-red-400/10 text-red-200'
    : task.risk === 'high'
      ? 'border-amber-400/35 bg-amber-400/10 text-amber-200'
      : 'border-sky-400/30 bg-sky-400/10 text-sky-200';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-semibold uppercase ${riskClass}`}>
      {task.risk === 'critical' ? <ShieldAlert className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
      {RISK_LABEL[task.risk]}
    </span>
  );
}

function TaskList({
  tasks,
  selectedId,
  onSelect,
}: {
  tasks: MedicationReviewTaskV1[];
  selectedId: string | null;
  onSelect: (task: MedicationReviewTaskV1) => void;
}) {
  return (
    <div className="min-h-0 overflow-y-auto" data-testid="review-task-list">
      {tasks.length === 0 ? (
        <div className="px-4 py-12 text-center text-sm text-zinc-500">Nenhuma tarefa neste filtro.</div>
      ) : tasks.map(task => (
        <button
          type="button"
          key={task.id}
          onClick={() => onSelect(task)}
          className={`w-full border-b border-white/[0.07] px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 ${selectedId === task.id ? 'bg-cyan-400/[0.09]' : 'hover:bg-white/[0.035]'}`}
          aria-pressed={selectedId === task.id}
        >
          <div className="flex items-start justify-between gap-3">
            <StatusBadge task={task} />
            <span className="font-mono text-[9px] text-zinc-600">{task.status}</span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm font-semibold text-zinc-100">{task.title}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">{task.summary}</p>
          <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-zinc-600">
            <span>{task.category === 'interaction' ? 'Interação' : task.category === 'identity' ? 'Identidade' : 'Dose'}</span>
            <span className="inline-flex items-center gap-1"><UsersRound className="h-3 w-3" />{task.requiredReviewerRoles.length}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

function EvidenceColumn({
  task,
  evidence,
  online,
  authenticated,
  onSubmitted,
}: {
  task: MedicationReviewTaskV1;
  evidence: MedicationEvidenceSubmissionV1[];
  online: boolean;
  authenticated: boolean;
  onSubmitted: () => void;
}) {
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceTitle, setSourceTitle] = useState('');
  const [authority, setAuthority] = useState('');
  const [pageLocator, setPageLocator] = useState('');
  const [claim, setClaim] = useState('');
  const [proposedPatch, setProposedPatch] = useState('{}');
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setNotice(null);
    let parsedPatch: Record<string, unknown>;
    try {
      parsedPatch = JSON.parse(proposedPatch) as Record<string, unknown>;
    } catch {
      setNotice('A proposta precisa ser um objeto JSON válido.');
      return;
    }
    if (!online) {
      setNotice('Rascunho local validado. Configure o Supabase para enviar a evidência.');
      return;
    }
    setPending(true);
    const result = await submitMedicationEvidence({
      taskId: task.id,
      sourceUrl,
      sourceTitle,
      authority,
      pageLocator,
      claim,
      proposedPatch: parsedPatch,
    });
    setPending(false);
    if (result.error) setNotice(result.error);
    else {
      setNotice('Evidência enviada com identidade e horário registrados.');
      setClaim('');
      onSubmitted();
    }
  };

  return (
    <div className="min-h-0 overflow-y-auto px-4 py-4 xl:px-5" data-testid="review-evidence-panel">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge task={task} />
        <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-zinc-400">{task.sourceStatus}</span>
        {task.metadata.severityConflict ? (
          <span className="inline-flex items-center gap-1 rounded-md border border-red-400/35 bg-red-400/10 px-2 py-1 text-[10px] font-semibold text-red-200">
            <AlertTriangle className="h-3 w-3" /> conflito de gravidade
          </span>
        ) : null}
      </div>
      <h2 className="mt-4 text-xl font-semibold text-white">{task.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{task.summary}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="border border-white/10 bg-black/10 p-3">
          <p className="text-[10px] font-semibold uppercase text-zinc-500">Alvo</p>
          <p className="mt-1 break-all font-mono text-[11px] text-zinc-300">{task.targetId}</p>
        </div>
        <div className="border border-white/10 bg-black/10 p-3">
          <p className="text-[10px] font-semibold uppercase text-zinc-500">Digest</p>
          <p className="mt-1 truncate font-mono text-[11px] text-cyan-300" title={task.targetDigest}>{task.targetDigest}</p>
        </div>
      </div>

      <section className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100"><FileDiff className="h-4 w-4 text-amber-300" />Valores legados</h3>
          <span className="text-[10px] text-zinc-600">não promovidos</span>
        </div>
        <div className="mt-3 space-y-2">
          {task.legacyValues.length === 0 ? (
            <div className="border border-dashed border-white/10 p-4 text-xs text-zinc-500">Nenhum valor estruturado. A fonte deverá sustentar toda a proposta.</div>
          ) : task.legacyValues.map((value, index) => (
            <div key={`${value.label}-${index}`} className="border border-white/10 bg-[#091319] p-3">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-semibold text-amber-200">{value.label}</span>
                {value.source ? <span className="max-w-[55%] text-right text-[10px] text-zinc-600">{value.source}</span> : null}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{value.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100"><BookOpenCheck className="h-4 w-4 text-cyan-300" />Evidências submetidas</h3>
        <div className="mt-3 space-y-2">
          {evidence.length === 0 ? (
            <p className="border border-dashed border-white/10 p-4 text-xs text-zinc-500">Ainda não há evidência vinculada a este alvo.</p>
          ) : evidence.map(item => (
            <article key={item.id} className="border border-cyan-400/15 bg-cyan-400/[0.035] p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-cyan-100">{item.sourceTitle}</p>
                  <p className="mt-1 text-[10px] text-zinc-500">{item.authority} · {item.pageLocator}</p>
                </div>
                <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-300" />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300">{item.claim}</p>
              <a className="mt-2 inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-cyan-200" href={item.sourceUrl} target="_blank" rel="noreferrer">Abrir fonte <ArrowRight className="h-3 w-3" /></a>
            </article>
          ))}
        </div>
      </section>

      <form onSubmit={submit} className="mt-6 border-t border-white/10 pt-5">
        <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100"><FileSearch className="h-4 w-4 text-emerald-300" />Nova evidência</h3>
        {!authenticated ? (
          <p className="mt-3 border border-amber-400/20 bg-amber-400/[0.05] p-3 text-xs text-amber-100">Entre como profissional para enviar uma contribuição.</p>
        ) : null}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-zinc-400">URL oficial
            <input required type="url" value={sourceUrl} onChange={event => setSourceUrl(event.target.value)} placeholder="https://..." className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
          </label>
          <label className="text-xs text-zinc-400">Título da fonte
            <input required value={sourceTitle} onChange={event => setSourceTitle(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
          </label>
          <label className="text-xs text-zinc-400">Autoridade
            <input required value={authority} onChange={event => setAuthority(event.target.value)} placeholder="Anvisa, Ministério da Saúde..." className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
          </label>
          <label className="text-xs text-zinc-400">Página ou seção
            <input required value={pageLocator} onChange={event => setPageLocator(event.target.value)} placeholder="p. 42, seção 3.1" className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
          </label>
        </div>
        <label className="mt-3 block text-xs text-zinc-400">Afirmação sustentada
          <textarea required minLength={20} value={claim} onChange={event => setClaim(event.target.value)} rows={3} className="mt-1 w-full resize-y border border-white/15 bg-[#071015] p-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
        </label>
        <label className="mt-3 block text-xs text-zinc-400">Patch proposto (JSON)
          <textarea required value={proposedPatch} onChange={event => setProposedPatch(event.target.value)} rows={4} spellCheck={false} className="mt-1 w-full resize-y border border-white/15 bg-[#03080b] p-3 font-mono text-xs text-emerald-200 outline-none focus:border-cyan-400" />
        </label>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] text-zinc-600">Texto ou extração automática nunca aprova a proposta.</p>
          <button disabled={pending || !authenticated} className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-300 px-4 text-xs font-semibold text-[#041014] disabled:cursor-not-allowed disabled:opacity-40">
            {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}Enviar evidência
          </button>
        </div>
        {notice ? <p className="mt-3 text-xs text-amber-200" role="status">{notice}</p> : null}
      </form>
    </div>
  );
}

function DecisionColumn({
  task,
  profile,
  online,
}: {
  task: MedicationReviewTaskV1;
  profile: ClinicalReviewerProfile | null;
  online: boolean;
}) {
  const eligibleRoles = (profile?.status === 'verified' ? profile.roles : [])
    .filter(role => task.requiredReviewerRoles.includes(role));
  const [role, setRole] = useState<MedicationReviewRole | ''>(eligibleRoles[0] ?? '');
  const [claimed, setClaimed] = useState(false);
  const [decision, setDecision] = useState<MedicationReviewDecisionV1['decision']>('approve');
  const [patch, setPatch] = useState('{}');
  const [rationale, setRationale] = useState('');
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setRole(eligibleRoles[0] ?? '');
    setClaimed(false);
    setNotice(null);
  }, [task.id, profile?.status]);

  const claim = async () => {
    if (!role) return;
    setPending(true);
    const error = await claimMedicationReviewTask(task.id, role);
    setPending(false);
    if (error) setNotice(error);
    else {
      setClaimed(true);
      setNotice('Tarefa atribuída. A decisão do outro revisor permanece oculta.');
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!role) return;
    let parsedPatch: Record<string, unknown>;
    try {
      parsedPatch = JSON.parse(patch) as Record<string, unknown>;
    } catch {
      setNotice('O patch precisa ser JSON válido.');
      return;
    }
    setPending(true);
    const error = await submitMedicationReviewDecision({
      taskId: task.id,
      reviewerRole: role,
      taskDigest: task.targetDigest,
      decision,
      proposedPatch: parsedPatch,
      rationale,
    });
    setPending(false);
    if (error) setNotice(error);
    else {
      setNotice('Decisão registrada de forma imutável.');
      setClaimed(false);
    }
  };

  return (
    <div className="min-h-0 overflow-y-auto px-4 py-4" data-testid="review-decision-panel">
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100"><ClipboardCheck className="h-4 w-4 text-cyan-300" />Decisão independente</div>
      <div className="mt-4 border border-white/10 bg-black/10 p-3">
        <p className="text-[10px] font-semibold uppercase text-zinc-500">Papéis exigidos</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {task.requiredReviewerRoles.map(requiredRole => (
            <span key={requiredRole} className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-zinc-300">{ROLE_LABEL[requiredRole]}</span>
          ))}
        </div>
      </div>

      {!online ? (
        <div className="mt-4 border border-amber-400/20 bg-amber-400/[0.05] p-3 text-xs leading-relaxed text-amber-100">
          Modo de auditoria local. Decisões exigem Supabase, RLS e identidade autenticada.
        </div>
      ) : profile?.status !== 'verified' ? (
        <div className="mt-4 border border-white/10 p-3 text-xs leading-relaxed text-zinc-400">
          Uma credencial clínica verificada é necessária. Contribuições de evidência continuam abertas.
        </div>
      ) : eligibleRoles.length === 0 ? (
        <div className="mt-4 border border-white/10 p-3 text-xs leading-relaxed text-zinc-400">Seu perfil não possui um dos papéis exigidos para este alvo.</div>
      ) : (
        <>
          <label className="mt-4 block text-xs text-zinc-400">Atuar como
            <select value={role} onChange={event => setRole(event.target.value as MedicationReviewRole)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400">
              {eligibleRoles.map(item => <option key={item} value={item}>{ROLE_LABEL[item]}</option>)}
            </select>
          </label>
          <button type="button" disabled={pending || claimed} onClick={claim} className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/[0.08] text-xs font-semibold text-cyan-200 disabled:opacity-50">
            <UserRoundCheck className="h-4 w-4" />{claimed ? 'Tarefa atribuída' : 'Assumir revisão'}
          </button>
        </>
      )}

      <form onSubmit={submit} className="mt-5 border-t border-white/10 pt-5">
        <fieldset disabled={!claimed || pending} className="disabled:opacity-45">
          <legend className="text-xs font-semibold text-zinc-300">Parecer</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(['approve', 'request_changes', 'reject'] as const).map(value => (
              <button key={value} type="button" onClick={() => setDecision(value)} className={`min-h-10 rounded-md border px-2 text-[10px] font-semibold ${decision === value ? 'border-cyan-300 bg-cyan-300 text-[#041014]' : 'border-white/10 text-zinc-400'}`}>
                {value === 'approve' ? 'Aprovar' : value === 'request_changes' ? 'Ajustar' : 'Rejeitar'}
              </button>
            ))}
          </div>
          <label className="mt-3 block text-xs text-zinc-400">Patch final
            <textarea value={patch} onChange={event => setPatch(event.target.value)} rows={5} spellCheck={false} className="mt-1 w-full resize-y border border-white/15 bg-[#03080b] p-3 font-mono text-xs text-emerald-200 outline-none focus:border-cyan-400" />
          </label>
          <label className="mt-3 block text-xs text-zinc-400">Fundamentação
            <textarea required minLength={20} value={rationale} onChange={event => setRationale(event.target.value)} rows={5} className="mt-1 w-full resize-y border border-white/15 bg-[#071015] p-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
          </label>
          <button className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-emerald-300 text-xs font-semibold text-[#041014]"><LockKeyhole className="h-4 w-4" />Registrar decisão</button>
        </fieldset>
        <p className="mt-3 text-[10px] leading-relaxed text-zinc-600">Após o envio, a decisão não pode ser editada ou excluída. Consenso clínico continua sem autorização de produção.</p>
        {notice ? <p className="mt-3 text-xs text-amber-200" role="status">{notice}</p> : null}
      </form>
    </div>
  );
}

function ApplicationPanel({ online, authenticated }: { online: boolean; authenticated: boolean }) {
  const roleOptions: MedicationReviewRole[] = ['contributor', 'physician_reviewer', 'pharmacist_reviewer', 'terminology_steward'];
  const [roles, setRoles] = useState<MedicationReviewRole[]>(['contributor']);
  const [councilType, setCouncilType] = useState('');
  const [councilNumber, setCouncilNumber] = useState('');
  const [councilRegion, setCouncilRegion] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [statement, setStatement] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const toggleRole = (role: MedicationReviewRole) => setRoles(current => (
    current.includes(role) ? current.filter(item => item !== role) : [...current, role]
  ));
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!online) {
      setNotice('Formulário validado localmente. Configure o Supabase para registrar a candidatura.');
      return;
    }
    setPending(true);
    const result = await submitClinicalReviewerApplication({ requestedRoles: roles, councilType, councilNumber, councilRegion, evidenceUrl, statement });
    setPending(false);
    setNotice(result.error ?? `Candidatura registrada: ${result.id}`);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-7 lg:grid-cols-[0.85fr_1.15fr] lg:px-6">
      <section>
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><CircleUserRound className="h-4 w-4" />Candidatura aberta</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Contribuir é aberto. Decidir exige credencial.</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">Fontes e propostas podem vir de qualquer profissional autenticado. A validação manual separa contribuição, revisão e administração clínica.</p>
        <div className="mt-6 space-y-3">
          {[
            ['1', 'Envie identidade profissional e papéis solicitados.'],
            ['2', 'A administração verifica os dados sem usar public.users.role.'],
            ['3', 'Revisores atuam de modo independente e com decisão imutável.'],
          ].map(([number, text]) => (
            <div key={number} className="flex gap-3 border-t border-white/10 py-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-cyan-300 text-xs font-bold text-[#041014]">{number}</span>
              <p className="text-sm text-zinc-300">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <form onSubmit={submit} className="border border-white/10 bg-[#081218] p-5">
        {!authenticated ? (
          <div className="mb-5 flex items-center justify-between gap-4 border border-amber-400/20 bg-amber-400/[0.05] p-3 text-xs text-amber-100">
            <span>Autenticação necessária para registrar a candidatura.</span>
            <Link href="/auth/login" className="inline-flex items-center gap-1 font-semibold text-amber-200"><LogIn className="h-4 w-4" />Entrar</Link>
          </div>
        ) : null}
        <fieldset>
          <legend className="text-xs font-semibold uppercase text-zinc-400">Papéis solicitados</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {roleOptions.map(role => (
              <label key={role} className="flex min-h-11 items-center gap-3 border border-white/10 px-3 text-xs text-zinc-300">
                <input type="checkbox" checked={roles.includes(role)} onChange={() => toggleRole(role)} className="h-4 w-4 accent-cyan-300" />
                {ROLE_LABEL[role]}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="text-xs text-zinc-400">Conselho
            <input value={councilType} onChange={event => setCouncilType(event.target.value)} placeholder="CRM, CRF..." className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
          </label>
          <label className="text-xs text-zinc-400">Número
            <input value={councilNumber} onChange={event => setCouncilNumber(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
          </label>
          <label className="text-xs text-zinc-400">UF / região
            <input value={councilRegion} onChange={event => setCouncilRegion(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
          </label>
        </div>
        <label className="mt-3 block text-xs text-zinc-400">Página pública de verificação
          <input type="url" value={evidenceUrl} onChange={event => setEvidenceUrl(event.target.value)} placeholder="https://..." className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
        </label>
        <label className="mt-3 block text-xs text-zinc-400">Declaração de experiência e conflito de interesses
          <textarea required minLength={20} value={statement} onChange={event => setStatement(event.target.value)} rows={5} className="mt-1 w-full resize-y border border-white/15 bg-[#071015] p-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" />
        </label>
        <button disabled={!authenticated || roles.length === 0 || pending} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-cyan-300 text-sm font-semibold text-[#041014] disabled:opacity-40">
          {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}Enviar candidatura
        </button>
        {notice ? <p className="mt-3 text-xs text-amber-200" role="status">{notice}</p> : null}
      </form>
    </div>
  );
}

function DosePanel({
  candidates,
  tasks,
  online,
  authenticated,
  profile,
}: {
  candidates: MedicationDoseRuleCandidateV2[];
  tasks: MedicationReviewTaskV1[];
  online: boolean;
  authenticated: boolean;
  profile: ClinicalReviewerProfile | null;
}) {
  const [selectedId, setSelectedId] = useState(candidates[0]?.id ?? '');
  const selected = candidates.find(candidate => candidate.id === selectedId) ?? candidates[0];
  const task = tasks.find(item => item.targetId === selected?.id);
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceTitle, setSourceTitle] = useState('');
  const [authority, setAuthority] = useState('');
  const [pageLocator, setPageLocator] = useState('');
  const [route, setRoute] = useState('');
  const [presentationId, setPresentationId] = useState('');
  const [minimumAgeDays, setMinimumAgeDays] = useState('');
  const [maximumAgeDaysExclusive, setMaximumAgeDaysExclusive] = useState('');
  const [weightRequired, setWeightRequired] = useState(true);
  const [doseBasis, setDoseBasis] = useState('microgram_per_kg_per_dose');
  const [amountMicrogram, setAmountMicrogram] = useState('');
  const [dosesPerDay, setDosesPerDay] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [maximumMicrogramPerDose, setMaximumMicrogramPerDose] = useState('');
  const [renalAdjustment, setRenalAdjustment] = useState('');
  const [hepaticAdjustment, setHepaticAdjustment] = useState('');
  const [contraindications, setContraindications] = useState('');
  const [rationale, setRationale] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (!selected || !task) return null;
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const structuredRule = {
      route,
      presentationId,
      minimumAgeDays: Number(minimumAgeDays),
      maximumAgeDaysExclusive: Number(maximumAgeDaysExclusive),
      weightRequired,
      doseBasis,
      amountMicrogram: Number(amountMicrogram),
      dosesPerDay: Number(dosesPerDay),
      durationDays: Number(durationDays),
      maximumMicrogramPerDose: maximumMicrogramPerDose ? Number(maximumMicrogramPerDose) : null,
      renalAdjustment: renalAdjustment || null,
      hepaticAdjustment: hepaticAdjustment || null,
      contraindications: contraindications.split('\n').map(value => value.trim()).filter(Boolean),
    };
    if (Object.values(structuredRule).some(value => typeof value === 'number' && !Number.isFinite(value))) {
      setNotice('Preencha todos os campos numéricos obrigatórios.');
      return;
    }
    if (!online) {
      setNotice('Candidato validado localmente. Nenhuma dose foi calculada ou ativada.');
      return;
    }
    setPending(true);
    const result = await submitMedicationEvidence({
      taskId: task.id,
      sourceUrl,
      sourceTitle,
      authority,
      pageLocator,
      claim: rationale,
      proposedPatch: { structuredRule, productionAuthorized: false },
    });
    setPending(false);
    setNotice(result.error ?? 'Candidato enviado para dupla revisão médico-farmacêutica.');
  };

  return (
    <div className="grid min-h-[680px] border-t border-white/10 xl:grid-cols-[250px_minmax(340px,1fr)_270px]">
      <aside className="border-b border-white/10 bg-black/10 xl:border-b-0 xl:border-r">
        <div className="border-b border-white/10 px-4 py-3">
          <p className="text-xs font-semibold text-zinc-200">Onda 1 · Respiratório pediátrico APS</p>
          <p className="mt-1 text-[10px] text-zinc-600">5 candidatos sem matemática pré-preenchida</p>
        </div>
        {candidates.map(candidate => (
          <button key={candidate.id} type="button" onClick={() => setSelectedId(candidate.id)} className={`w-full border-b border-white/[0.07] px-4 py-3 text-left ${selectedId === candidate.id ? 'bg-cyan-400/[0.08]' : 'hover:bg-white/[0.035]'}`}>
            <span className="text-[10px] font-semibold uppercase text-amber-300">evidência necessária</span>
            <p className="mt-1 text-sm font-semibold text-zinc-100">{candidate.indicationLabel}</p>
            <p className="mt-1 text-[10px] text-zinc-600">{candidate.medicationConceptId ?? 'conceito não resolvido'}</p>
          </button>
        ))}
      </aside>
      <form onSubmit={submit} className="min-w-0 px-4 py-5 lg:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase text-cyan-300">Candidato estruturado v2</span>
            <h2 className="mt-2 text-xl font-semibold text-white">{selected.indicationLabel}</h2>
            <p className="mt-1 text-sm text-zinc-500">{selected.populationLabel}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-md border border-red-400/25 bg-red-400/[0.06] px-3 py-2 text-xs font-semibold text-red-200"><LockKeyhole className="h-4 w-4" />productionAuthorized=false</span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="text-xs text-zinc-400">Via<input required value={route} onChange={event => setRoute(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Apresentação canônica<input required value={presentationId} onChange={event => setPresentationId(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Base da dose<select value={doseBasis} onChange={event => setDoseBasis(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400"><option value="microgram_per_kg_per_dose">µg/kg/dose</option><option value="microgram_per_kg_per_day">µg/kg/dia</option><option value="fixed">dose fixa em µg</option></select></label>
          <label className="text-xs text-zinc-400">Idade mínima (dias)<input required inputMode="numeric" value={minimumAgeDays} onChange={event => setMinimumAgeDays(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Idade máxima exclusiva (dias)<input required inputMode="numeric" value={maximumAgeDaysExclusive} onChange={event => setMaximumAgeDaysExclusive(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="flex items-end gap-3 border border-white/10 px-3 py-2 text-xs text-zinc-300"><input type="checkbox" checked={weightRequired} onChange={event => setWeightRequired(event.target.checked)} className="h-4 w-4 accent-cyan-300" />Peso obrigatório</label>
          <label className="text-xs text-zinc-400">Quantidade em microgramas<input required inputMode="numeric" value={amountMicrogram} onChange={event => setAmountMicrogram(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Doses por dia<input required inputMode="numeric" value={dosesPerDay} onChange={event => setDosesPerDay(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Duração (dias)<input required inputMode="numeric" value={durationDays} onChange={event => setDurationDays(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Máximo por dose (µg)<input inputMode="numeric" value={maximumMicrogramPerDose} onChange={event => setMaximumMicrogramPerDose(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Ajuste renal<input value={renalAdjustment} onChange={event => setRenalAdjustment(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Ajuste hepático<input value={hepaticAdjustment} onChange={event => setHepaticAdjustment(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
        </div>
        <label className="mt-3 block text-xs text-zinc-400">Contraindicações estruturadas, uma por linha<textarea value={contraindications} onChange={event => setContraindications(event.target.value)} rows={3} className="mt-1 w-full border border-white/15 bg-[#071015] p-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-zinc-400">URL da fonte<input required type="url" value={sourceUrl} onChange={event => setSourceUrl(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Título da fonte<input required value={sourceTitle} onChange={event => setSourceTitle(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Autoridade<input required value={authority} onChange={event => setAuthority(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
          <label className="text-xs text-zinc-400">Página ou seção<input required value={pageLocator} onChange={event => setPageLocator(event.target.value)} className="mt-1 h-10 w-full border border-white/15 bg-[#071015] px-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
        </div>
        <label className="mt-3 block text-xs text-zinc-400">Racional e população de origem<textarea required minLength={20} value={rationale} onChange={event => setRationale(event.target.value)} rows={4} className="mt-1 w-full border border-white/15 bg-[#071015] p-3 text-sm text-zinc-100 outline-none focus:border-cyan-400" /></label>
        <button disabled={!authenticated || pending} className="mt-4 inline-flex h-11 items-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-[#041014] disabled:opacity-40">{pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <FlaskConical className="h-4 w-4" />}Enviar candidato</button>
        {notice ? <p className="mt-3 text-xs text-amber-200" role="status">{notice}</p> : null}
      </form>
      <aside className="border-t border-white/10 bg-black/10 p-4 xl:border-l xl:border-t-0">
        <DecisionColumn task={task} profile={profile} online={online} />
      </aside>
    </div>
  );
}

export default function ReviewStudioClient() {
  const locale = useLocale();
  const copy = CORE_COPY[locale] ?? CORE_COPY.pt;
  const [tab, setTab] = useState<StudioTab>('queue');
  const [mobileStage, setMobileStage] = useState<MobileStage>('queue');
  const [tasks, setTasks] = useState<MedicationReviewTaskV1[]>(seed.tasks);
  const [doseTasks, setDoseTasks] = useState<MedicationReviewTaskV1[]>(seed.doseReviewTasks);
  const [selectedId, setSelectedId] = useState(seed.tasks[0]?.id ?? '');
  const [evidence, setEvidence] = useState<MedicationEvidenceSubmissionV1[]>([]);
  const [profile, setProfile] = useState<ClinicalReviewerProfile | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [online, setOnline] = useState(false);
  const [dataSource, setDataSource] = useState<'bundle' | 'supabase'>('bundle');
  const [syncError, setSyncError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | 'identity' | 'interaction'>('all');
  const [risk, setRisk] = useState<'all' | MedicationReviewTaskV1['risk']>('all');
  const [sourceStatus, setSourceStatus] = useState<'all' | MedicationReviewTaskV1['sourceStatus']>('all');

  const selectedTask = tasks.find(task => task.id === selectedId) ?? tasks[0];
  const filteredTasks = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    return tasks.filter(task => (
      (category === 'all' || task.category === category)
      && (risk === 'all' || task.risk === risk)
      && (sourceStatus === 'all' || task.sourceStatus === sourceStatus)
      && (!normalized || `${task.title} ${task.summary} ${task.targetId}`.toLocaleLowerCase(locale).includes(normalized))
    ));
  }, [tasks, category, risk, sourceStatus, query, locale]);

  const sync = async () => {
    const [session, remote] = await Promise.all([getMedicationReviewSession(), loadMedicationReviewTasks()]);
    setOnline(session.configured);
    setAuthenticated(Boolean(session.user));
    setProfile(session.profile);
    setSyncError(remote.error);
    if (remote.tasks.length > 0) {
      const remotePrimary = remote.tasks.filter(task => task.targetType !== 'dose-rule');
      const remoteDose = remote.tasks.filter(task => task.targetType === 'dose-rule');
      if (remotePrimary.length > 0) setTasks(remotePrimary);
      if (remoteDose.length > 0) setDoseTasks(remoteDose);
      setDataSource(remote.source);
    }
  };

  useEffect(() => { void sync(); }, []);
  useEffect(() => {
    if (!selectedTask || !online) {
      setEvidence([]);
      return;
    }
    void loadMedicationEvidence(selectedTask.id).then(result => setEvidence(result.evidence));
  }, [selectedTask?.id, online]);

  const selectTask = (task: MedicationReviewTaskV1) => {
    setSelectedId(task.id);
    setMobileStage('evidence');
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#071015] text-zinc-100" style={{ fontFamily: 'var(--font-ui)' }}>
      <header className="border-b border-white/10 bg-[#081318] px-4 py-5 lg:px-6">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-md border border-cyan-400/25 bg-cyan-400/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase text-cyan-200"><ShieldCheck className="h-3.5 w-3.5" />Governança clínica</span>
              <span title="productionAuthorized=false" className="inline-flex items-center gap-2 rounded-md border border-red-400/25 bg-red-400/[0.05] px-2.5 py-1 text-[10px] font-semibold text-red-200"><LockKeyhole className="h-3.5 w-3.5" />REFUSE · sem ativação clínica</span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{copy.title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">{copy.subtitle}</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/10 border border-white/10 bg-black/10">
            <div className="px-4 py-3"><p className="text-[10px] uppercase text-zinc-600">Alvos</p><p className="mt-1 text-xl font-semibold text-white">177</p></div>
            <div className="px-4 py-3"><p className="text-[10px] uppercase text-zinc-600">Críticos</p><p className="mt-1 text-xl font-semibold text-red-200">7</p></div>
            <div className="px-4 py-3"><p className="text-[10px] uppercase text-zinc-600">Próxima fila</p><p className="mt-1 text-xl font-semibold text-amber-200">295</p></div>
          </div>
        </div>
      </header>

      <div className="border-b border-white/10 bg-[#071015] px-4 lg:px-6">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-3">
          <nav className="flex min-w-0 overflow-x-auto" aria-label="Review Studio">
            {([
              ['queue', copy.queue, ListFilter],
              ['dose', copy.doses, Pill],
              ['application', copy.apply, CircleUserRound],
            ] as const).map(([value, label, Icon]) => (
              <button key={value} type="button" onClick={() => setTab(value)} className={`relative flex h-12 shrink-0 items-center gap-2 px-4 text-xs font-semibold ${tab === value ? 'text-cyan-200' : 'text-zinc-500 hover:text-zinc-200'}`}>
                <Icon className="h-4 w-4" />{label}
                {tab === value ? <span className="absolute inset-x-3 bottom-0 h-0.5 bg-cyan-300" /> : null}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2 py-2 text-[10px]">
            <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 ${dataSource === 'supabase' ? 'border-emerald-400/25 text-emerald-300' : 'border-white/10 text-zinc-500'}`}><Database className="h-3 w-3" />{dataSource === 'supabase' ? 'Supabase sincronizado' : 'bundle local'}</span>
            <span className="hidden font-mono text-zinc-700 sm:inline" title={seed.identityBundleSha256}>{seed.identityBundleSha256.slice(0, 12)}</span>
          </div>
        </div>
      </div>

      {syncError ? <div className="border-b border-amber-400/15 bg-amber-400/[0.04] px-6 py-2 text-xs text-amber-200">Fila remota indisponível; usando recibo local verificável. {syncError}</div> : null}

      {tab === 'application' ? <ApplicationPanel online={online} authenticated={authenticated} /> : null}
      {tab === 'dose' ? <DosePanel candidates={seed.doseRuleCandidates} tasks={doseTasks} online={online} authenticated={authenticated} profile={profile} /> : null}
      {tab === 'queue' && selectedTask ? (
        <>
          <div className="border-b border-white/10 px-3 py-2 xl:hidden">
            <div className="grid grid-cols-3 gap-1 rounded-md border border-white/10 bg-black/10 p-1">
              {([
                ['queue', copy.queue, ListFilter],
                ['evidence', copy.evidence, FileSearch],
                ['decision', copy.decision, ClipboardCheck],
              ] as const).map(([value, label, Icon]) => (
                <button key={value} type="button" onClick={() => setMobileStage(value)} className={`flex min-h-10 items-center justify-center gap-1 rounded px-2 text-[10px] font-semibold ${mobileStage === value ? 'bg-cyan-300 text-[#041014]' : 'text-zinc-400'}`}><Icon className="h-3.5 w-3.5" />{label}</button>
              ))}
            </div>
          </div>
          <div className="mx-auto grid min-h-[720px] max-w-[1680px] xl:h-[calc(100vh-250px)] xl:grid-cols-[250px_minmax(340px,1fr)_270px]">
            <aside className={`${mobileStage === 'queue' ? 'block' : 'hidden'} min-h-0 border-r border-white/10 bg-black/10 xl:block`}>
              <div className="border-b border-white/10 p-3">
                <div className="flex h-10 items-center border border-white/15 bg-[#071015] focus-within:border-cyan-400/50">
                  <Search className="ml-3 h-4 w-4 text-zinc-600" />
                  <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar alvo" className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs text-zinc-100 outline-none" />
                  {query ? <button type="button" onClick={() => setQuery('')} className="mr-2 text-zinc-600"><X className="h-4 w-4" /></button> : null}
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <select aria-label="Categoria" value={category} onChange={event => setCategory(event.target.value as typeof category)} className="h-9 min-w-0 border border-white/10 bg-[#071015] px-2 text-[10px] text-zinc-300"><option value="all">Todos</option><option value="identity">ATC</option><option value="interaction">Interações</option></select>
                  <select aria-label="Risco" value={risk} onChange={event => setRisk(event.target.value as typeof risk)} className="h-9 min-w-0 border border-white/10 bg-[#071015] px-2 text-[10px] text-zinc-300"><option value="all">Risco</option><option value="critical">Crítico</option><option value="high">Alto</option><option value="routine">Rotina</option></select>
                  <select aria-label="Fonte" value={sourceStatus} onChange={event => setSourceStatus(event.target.value as typeof sourceStatus)} className="h-9 min-w-0 border border-white/10 bg-[#071015] px-2 text-[10px] text-zinc-300"><option value="all">Fonte</option><option value="located">Localizada</option><option value="source-unverifiable">Não verificável</option><option value="evidence-required">Necessária</option></select>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-600"><span className="inline-flex items-center gap-1"><Filter className="h-3 w-3" />{filteredTasks.length} tarefas</span><span>7 conflitos vinculados</span></div>
              </div>
              <TaskList tasks={filteredTasks} selectedId={selectedTask.id} onSelect={selectTask} />
            </aside>
            <section className={`${mobileStage === 'evidence' ? 'block' : 'hidden'} min-h-0 border-r border-white/10 xl:block`}>
              <EvidenceColumn task={selectedTask} evidence={evidence} online={online} authenticated={authenticated} onSubmitted={() => void loadMedicationEvidence(selectedTask.id).then(result => setEvidence(result.evidence))} />
            </section>
            <aside className={`${mobileStage === 'decision' ? 'block' : 'hidden'} min-h-0 bg-black/10 xl:block`}>
              <DecisionColumn task={selectedTask} profile={profile} online={online} />
            </aside>
          </div>
        </>
      ) : null}

      <footer className="border-t border-white/10 px-4 py-3 text-[10px] text-zinc-600 lg:px-6">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2"><Hash className="h-3 w-3" />Recibo do Studio vinculado ao bundle canônico</span>
          <span>0 interações promovidas · 0 regras de produção · assinatura ausente</span>
        </div>
      </footer>
    </div>
  );
}
