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
      <div className="grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={onToggleHandoff}
          className="ps-app-interactive rounded-[24px] border border-cyan-400/18 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-[0_12px_28px_rgba(0,0,0,0.14)]"
        >
          {showHandoff ? 'Ocultar handoff' : 'Abrir handoff'}
        </button>
        <button
          type="button"
          onClick={onToggleDebrief}
          className="ps-app-interactive rounded-[24px] border border-green-400/18 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-100 shadow-[0_12px_28px_rgba(0,0,0,0.14)]"
        >
          {showDebrief ? 'Ocultar debrief' : 'Abrir debrief'}
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden">
        <div className="grid grid-cols-3 gap-2 rounded-[28px] border border-white/10 bg-[#07111f]/78 p-2 backdrop-blur-3xl shadow-[0_18px_48px_rgba(0,0,0,0.34)]">
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className="rounded-[20px] bg-white/[0.06] px-3 py-3 text-xs font-semibold text-slate-200 apple-transition-fast disabled:text-slate-600"
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={onToggleHandoff}
            className="rounded-[20px] border border-cyan-400/18 bg-cyan-400/10 px-3 py-3 text-xs font-semibold text-cyan-100 apple-transition-fast"
          >
            Handoff
          </button>
          <button
            type="button"
            onClick={onToggleDebrief}
            className="rounded-[20px] border border-green-400/18 bg-green-500/10 px-3 py-3 text-xs font-semibold text-green-100 apple-transition-fast"
          >
            Debrief
          </button>
        </div>
      </div>
    </>
  );
}
