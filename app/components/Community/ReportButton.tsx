'use client';

/**
 * REPORT BUTTON (MVP)
 * ===================
 *
 * Allows anon/auth users to report content for moderation.
 * Uses Supabase RLS: anon inserts are allowed; auth inserts can include reporter_user_id.
 */

import React, { useMemo, useState } from 'react';
import { AlertTriangle, Flag } from 'lucide-react';
import { Button } from '@/lib/design-system/primitives/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/lib/design-system/primitives/dialog';
import { createReport, type ReportEntityType } from '@/lib/supabase/services/reports';
import { cn } from '@/lib/utils';

type ReasonKey =
  | 'spam'
  | 'harassment'
  | 'pii_violation'
  | 'misinformation'
  | 'off_topic'
  | 'other';

const REASONS: Array<{ key: ReasonKey; label: string; desc: string }> = [
  { key: 'pii_violation', label: 'Violação de privacidade (PII)', desc: 'Contém dados identificáveis do paciente.' },
  { key: 'misinformation', label: 'Desinformação', desc: 'Conteúdo potencialmente perigoso ou incorreto.' },
  { key: 'harassment', label: 'Assédio', desc: 'Ataque pessoal ou comportamento abusivo.' },
  { key: 'spam', label: 'Spam', desc: 'Promoção, repetição ou conteúdo irrelevante.' },
  { key: 'off_topic', label: 'Fora do tema', desc: 'Não relacionado ao tópico ou categoria.' },
  { key: 'other', label: 'Outro', desc: 'Outro motivo.' },
];

export function ReportButton(props: {
  entityType: ReportEntityType;
  entityId: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReasonKey>('pii_violation');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reasonMeta = useMemo(() => REASONS.find((r) => r.key === reason) ?? REASONS[0], [reason]);

  const trigger = (
    <Button
      type="button"
      variant="outline"
      size={props.size === 'sm' ? 'sm' : 'md'}
      onClick={() => setOpen(true)}
      className={cn(props.className)}
      iconBefore={<Flag className="w-4 h-4" />}
    >
      Reportar
    </Button>
  );

  return (
    <>
      {trigger}

      <Dialog open={open} onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setError(null);
          setSubmitting(false);
          setSuccess(false);
        }
      }}>
        <DialogContent variant="glass" size="xl" className="p-0 overflow-hidden" data-testid="report-dialog">
          <div className="px-5 py-4 border-b border-carbon-200/70 dark:border-carbon-800/70">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-critical-red-600" />
                Reportar conteúdo
              </DialogTitle>
              <DialogDescription>
                Ajude a manter a comunidade segura e útil.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-5 space-y-4">
            {success ? (
              <div className="rounded-2xl border border-guanine-green/30 bg-guanine-green/10 p-4">
                <div className="text-sm font-semibold text-carbon-900 dark:text-carbon-100">
                  Obrigado. Seu report foi enviado.
                </div>
                <div className="mt-1 text-sm text-carbon-700 dark:text-carbon-300">
                  Nossa equipe revisará o conteúdo.
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-carbon-900 dark:text-carbon-100 mb-2">
                    Motivo
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value as ReasonKey)}
                    className="w-full rounded-xl border border-carbon-200/70 dark:border-carbon-700/70 bg-white/70 dark:bg-carbon-900/30 px-4 py-3 text-sm text-carbon-900 dark:text-carbon-100 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500 apple-transition"
                  >
                    {REASONS.map((r) => (
                      <option key={r.key} value={r.key}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 text-xs text-carbon-600 dark:text-carbon-400">
                    {reasonMeta.desc}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-carbon-900 dark:text-carbon-100 mb-2">
                    Detalhes (opcional)
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full rounded-xl border border-carbon-200/70 dark:border-carbon-700/70 bg-white/70 dark:bg-carbon-900/30 px-4 py-3 text-sm text-carbon-900 dark:text-carbon-100 placeholder:text-carbon-500 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500 apple-transition"
                    placeholder="Explique rapidamente o problema. Evite incluir dados identificáveis do paciente."
                    rows={4}
                  />
                </div>

                {error ? (
                  <div className="rounded-2xl border border-critical-red-200 dark:border-critical-red-800 bg-critical-red-50/70 dark:bg-critical-red-900/10 p-4 text-sm text-critical-red-700 dark:text-critical-red-300">
                    {error}
                  </div>
                ) : null}

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    variant="critical"
                    loading={submitting}
                    onClick={async () => {
                      setSubmitting(true);
                      setError(null);
                      const res = await createReport({
                        entityType: props.entityType,
                        entityId: props.entityId,
                        reason,
                        details: details.trim() || undefined,
                      });
                      if (res.error) {
                        setError(res.error);
                        setSubmitting(false);
                        return;
                      }
                      setSuccess(true);
                      setSubmitting(false);
                    }}
                  >
                    Enviar report
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReportButton;

