'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePSStore } from '@/lib/store/psStore';
import {
  Zap,
  Heart,
  Syringe,
  Pill,
  ClipboardList,
  Play,
  Square,
  RotateCcw,
  CheckCircle,
  XCircle,
  Volume2,
  Clock,
  Copy,
} from 'lucide-react';

const CYCLE_DURATION = 120;

const FIVE_H = [
  'Hipovolemia',
  'Hipoxia',
  'Hidrogenio (Acidose)',
  'Hipo/Hipercalemia',
  'Hipotermia',
];

const FIVE_T = [
  'Tensao (Pneumotorax)',
  'Tamponamento Cardiaco',
  'Toxinas',
  'Trombose Pulmonar (TEP)',
  'Trombose Coronariana (IAM)',
];

function useWakeLock() {
  const wakeLockRef = useRef<any>(null);

  const request = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
      }
    } catch {}
  }, []);

  const release = useCallback(() => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
  }, []);

  return { request, release };
}

function playAlertSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'square';
    gain.gain.value = 0.3;
    osc.start();
    setTimeout(() => {
      osc.frequency.value = 1100;
    }, 200);
    setTimeout(() => {
      osc.frequency.value = 880;
    }, 400);
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 600);
  } catch {}
}

function vibrate(pattern: number | number[]) {
  try {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  } catch {}
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatTimestamp(ts: number, startedAt: number): string {
  const diff = Math.round((ts - startedAt) / 1000);
  const m = Math.floor(diff / 60);
  const s = diff % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PCRTimer() {
  const {
    pcrTimer,
    startPCR,
    stopPCR,
    addPCRCycle,
    addPCRShock,
    addPCREpinephrine,
    addPCRAmiodarone,
    resetPCR,
  } = usePSStore();

  const [secondsLeft, setSecondsLeft] = useState(CYCLE_DURATION);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [checkedH, setCheckedH] = useState<Set<number>>(new Set());
  const [checkedT, setCheckedT] = useState<Set<number>>(new Set());
  const [showSummary, setShowSummary] = useState(false);
  const [outcome, setOutcome] = useState<'rosc' | 'obito' | null>(null);
  const [showChecklist, setShowChecklist] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wakeLock = useWakeLock();

  useEffect(() => {
    if (pcrTimer.isRunning) {
      wakeLock.request();
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            playAlertSound();
            vibrate([200, 100, 200, 100, 400]);
            return CYCLE_DURATION;
          }
          if (prev === 30 || prev === 60 || prev === 90) {
            vibrate(100);
          }
          return prev - 1;
        });
        setTotalElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      wakeLock.release();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pcrTimer.isRunning, wakeLock]);

  const handleStart = () => {
    setSecondsLeft(CYCLE_DURATION);
    setTotalElapsed(0);
    setShowSummary(false);
    setOutcome(null);
    setCheckedH(new Set());
    setCheckedT(new Set());
    startPCR();
  };

  const handleNextCycle = () => {
    addPCRCycle();
    setSecondsLeft(CYCLE_DURATION);
    playAlertSound();
  };

  const handleEnd = (result: 'rosc' | 'obito') => {
    stopPCR();
    setOutcome(result);
    setShowSummary(true);
  };

  const handleReset = () => {
    resetPCR();
    setSecondsLeft(CYCLE_DURATION);
    setTotalElapsed(0);
    setShowSummary(false);
    setOutcome(null);
    setCheckedH(new Set());
    setCheckedT(new Set());
    setShowChecklist(false);
  };

  const copySummary = () => {
    const lines = [
      `PCR - Resumo`,
      `Desfecho: ${outcome === 'rosc' ? 'ROSC' : 'Óbito'}`,
      `Duração: ${formatTime(totalElapsed)}`,
      `Ciclos: ${pcrTimer.cycleCount}`,
      `Choques: ${pcrTimer.shockCount}`,
      `Adrenalina: ${pcrTimer.epinephrineDoses.length} doses`,
      ...pcrTimer.epinephrineDoses.map(
        (ts, i) =>
          `  Dose ${i + 1}: ${pcrTimer.startedAt ? formatTimestamp(ts, pcrTimer.startedAt) : '--'}`
      ),
      `Amiodarona: ${pcrTimer.amiodaroneDoses.length} doses`,
    ];
    navigator.clipboard?.writeText(lines.join('\n'));
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4 pb-24">
        <div className="max-w-lg mx-auto space-y-4">
          <div
            className={`text-center p-6 rounded-2xl border-2 ${
              outcome === 'rosc'
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-slate-800 border-slate-700'
            }`}
          >
            {outcome === 'rosc' ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
            ) : (
              <XCircle className="w-16 h-16 text-slate-500 mx-auto mb-3" />
            )}
            <h2 className="text-2xl font-bold mb-1">
              {outcome === 'rosc' ? 'ROSC' : 'PCR Encerrada'}
            </h2>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 space-y-3 font-mono text-sm">
            <div className="flex justify-between">
            <span className="text-slate-400">Duração Total</span>
              <span className="font-bold">{formatTime(totalElapsed)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Ciclos</span>
              <span className="font-bold">{pcrTimer.cycleCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Choques</span>
              <span className="font-bold">{pcrTimer.shockCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Adrenalina</span>
              <span className="font-bold">{pcrTimer.epinephrineDoses.length} doses</span>
            </div>
            {pcrTimer.epinephrineDoses.map((ts, i) => (
              <div key={ts} className="flex justify-between pl-4 text-xs">
                <span className="text-slate-500">Dose {i + 1}</span>
                <span className="text-slate-300">
                  {pcrTimer.startedAt ? formatTimestamp(ts, pcrTimer.startedAt) : '--'}
                </span>
              </div>
            ))}
            <div className="flex justify-between">
              <span className="text-slate-400">Amiodarona</span>
              <span className="font-bold">{pcrTimer.amiodaroneDoses.length} doses</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={copySummary}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium"
            >
              <Copy className="w-4 h-4" />
              Copiar Resumo
            </button>
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Nova PCR
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pcrTimer.isRunning && pcrTimer.cycleCount === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 pb-24">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Timer PCR</h1>
          <p className="text-slate-400 text-sm mb-8">
            Cronômetro de ciclos de 2 minutos com registro de drogas e choques
          </p>
          <button
            onClick={handleStart}
            className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-colors"
          >
            <Play className="w-6 h-6" />
            INICIAR PCR
          </button>
        </div>
      </div>
    );
  }

  const progress = ((CYCLE_DURATION - secondsLeft) / CYCLE_DURATION) * 100;
  const isUrgent = secondsLeft <= 15;
  const lastEpiTime = pcrTimer.epinephrineDoses.length > 0
    ? Math.round((Date.now() - pcrTimer.epinephrineDoses[pcrTimer.epinephrineDoses.length - 1]) / 1000)
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-3 pb-24">
      <div className="max-w-lg mx-auto space-y-3">
        {/* Timer Display */}
        <div
          className={`text-center p-6 rounded-2xl border-2 transition-colors ${
            isUrgent
              ? 'bg-red-500/10 border-red-500/50'
              : 'bg-slate-800 border-slate-700'
          }`}
        >
          <div className="text-6xl font-mono font-bold mb-2 tabular-nums">
            <span className={isUrgent ? 'text-red-400 animate-pulse' : ''}>
              {formatTime(secondsLeft)}
            </span>
          </div>
          <div className="text-sm text-slate-400">
            CICLO {pcrTimer.cycleCount} | Total: {formatTime(totalElapsed)}
          </div>
          <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isUrgent ? 'bg-red-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-800 rounded-xl p-2">
            <div className="text-lg font-bold">{pcrTimer.shockCount}</div>
            <div className="text-[10px] text-slate-400 uppercase">Choques</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-2">
            <div className="text-lg font-bold">{pcrTimer.epinephrineDoses.length}</div>
            <div className="text-[10px] text-slate-400 uppercase">Adrenalina</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-2">
            <div className="text-lg font-bold">{pcrTimer.amiodaroneDoses.length}</div>
            <div className="text-[10px] text-slate-400 uppercase">Amiodarona</div>
          </div>
        </div>

        {lastEpiTime !== null && lastEpiTime > 180 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2 text-center">
            <span className="text-amber-300 text-sm font-medium">
              Última adrenalina: {formatTime(lastEpiTime)} atrás do intervalo de 3 minutos
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              addPCRShock();
              vibrate(50);
            }}
            className="flex items-center justify-center gap-2 py-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 font-bold text-sm active:scale-95 transition-transform"
          >
            <Zap className="w-5 h-5" />
            CHOQUE
          </button>
          <button
            onClick={() => {
              addPCREpinephrine();
              vibrate(50);
            }}
            className="flex items-center justify-center gap-2 py-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 font-bold text-sm active:scale-95 transition-transform"
          >
            <Syringe className="w-5 h-5" />
            ADRENALINA 1mg
          </button>
          <button
            onClick={() => {
              addPCRAmiodarone();
              vibrate(50);
            }}
            className="flex items-center justify-center gap-2 py-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-300 font-bold text-sm active:scale-95 transition-transform"
          >
            <Pill className="w-5 h-5" />
            AMIODARONA {pcrTimer.amiodaroneDoses.length === 0 ? '300mg' : '150mg'}
          </button>
          <button
            onClick={handleNextCycle}
            className="flex items-center justify-center gap-2 py-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-300 font-bold text-sm active:scale-95 transition-transform"
          >
            <Clock className="w-5 h-5" />
            PRÓXIMO CICLO
          </button>
        </div>

        {/* 5H 5T Checklist Toggle */}
        <button
          onClick={() => setShowChecklist(!showChecklist)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium"
        >
          <ClipboardList className="w-4 h-4" />
          Causas Reversíveis (5H / 5T)
        </button>

        {showChecklist && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800 rounded-xl p-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">5H</h3>
              {FIVE_H.map((item, i) => (
                <label
                  key={item}
                  className="flex items-center gap-2 py-1.5 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checkedH.has(i)}
                    onChange={() => {
                      const next = new Set(checkedH);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      setCheckedH(next);
                    }}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-red-500 focus:ring-red-500"
                  />
                  <span className={checkedH.has(i) ? 'line-through text-slate-500' : ''}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
            <div className="bg-slate-800 rounded-xl p-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">5T</h3>
              {FIVE_T.map((item, i) => (
                <label
                  key={item}
                  className="flex items-center gap-2 py-1.5 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checkedT.has(i)}
                    onChange={() => {
                      const next = new Set(checkedT);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      setCheckedT(next);
                    }}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-red-500 focus:ring-red-500"
                  />
                  <span className={checkedT.has(i) ? 'line-through text-slate-500' : ''}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* End Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => handleEnd('rosc')}
            className="py-4 bg-green-600 hover:bg-green-700 rounded-xl text-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <CheckCircle className="w-6 h-6" />
            ROSC
          </button>
          <button
            onClick={() => handleEnd('obito')}
            className="py-4 bg-slate-700 hover:bg-slate-600 rounded-xl text-lg font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Square className="w-6 h-6" />
            ÓBITO
          </button>
        </div>
      </div>
    </div>
  );
}
