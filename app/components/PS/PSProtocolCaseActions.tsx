'use client';

interface PSProtocolCaseActionsProps {
  hasActiveCase: boolean;
  canGoBack: boolean;
  showHandoff: boolean;
  showDebrief: boolean;
  onBack: () => void;
  onToggleHandoff: () => void;
  onToggleDebrief: () => void;
}

export default function PSProtocolCaseActions({
  hasActiveCase,
  canGoBack,
  showHandoff,
  showDebrief,
  onBack,
  onToggleHandoff,
  onToggleDebrief,
}: PSProtocolCaseActionsProps) {
  if (!hasActiveCase) return null;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={onToggleHandoff}
          className="px-4 py-3 rounded-3xl text-sm font-semibold text-cyan-100 active:scale-95 transition-all"
          style={{ background: 'rgba(34,211,238,0.10)', border: '1px solid rgba(34,211,238,0.22)' }}
        >
          {showHandoff ? 'Ocultar handoff' : 'Abrir handoff'}
        </button>
        <button
          type="button"
          onClick={onToggleDebrief}
          className="px-4 py-3 rounded-3xl text-sm font-semibold text-green-100 active:scale-95 transition-all"
          style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.22)' }}
        >
          {showDebrief ? 'Ocultar debrief' : 'Abrir debrief'}
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden">
        <div
          className="grid grid-cols-3 gap-2 rounded-[26px] p-2"
          style={{ background: 'rgba(8,8,16,0.92)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(18px)' }}
        >
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className="px-3 py-3 rounded-2xl text-xs font-semibold text-slate-200 disabled:text-slate-600"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={onToggleHandoff}
            className="px-3 py-3 rounded-2xl text-xs font-semibold text-cyan-100"
            style={{ background: 'rgba(34,211,238,0.10)', border: '1px solid rgba(34,211,238,0.18)' }}
          >
            Handoff
          </button>
          <button
            type="button"
            onClick={onToggleDebrief}
            className="px-3 py-3 rounded-2xl text-xs font-semibold text-green-100"
            style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.18)' }}
          >
            Debrief
          </button>
        </div>
      </div>
    </>
  );
}
