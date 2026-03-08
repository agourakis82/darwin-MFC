'use client';

import { Users } from 'lucide-react';
import type { ActiveCaseSession, CaseRoleSlot } from '@/lib/store/psStore';

interface PCRRoleDef {
  id: CaseRoleSlot;
  role: string;
  focus: string;
}

interface PSPCRRoleBoardProps {
  activeCaseSession: ActiveCaseSession | null;
  roles: PCRRoleDef[];
  onEditRole: (role: PCRRoleDef) => void;
}

export default function PSPCRRoleBoard({
  activeCaseSession,
  roles,
  onEditRole,
}: PSPCRRoleBoardProps) {
  return (
    <div
      data-testid="ps-pcr-role-board"
      className="rounded-2xl px-4 py-4 space-y-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center gap-2">
        <Users className="w-3.5 h-3.5 text-cyan-400" strokeWidth={2} />
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">PCR role board</p>
      </div>
      <div className="space-y-2">
        {roles.map((item) => {
          const assigned = activeCaseSession?.roleAssignments[item.id]?.assigned ?? false;
          return (
            <button
              data-testid={`ps-role-board-${item.id}`}
              key={item.role}
              type="button"
              onClick={() => onEditRole(item)}
              className="w-full text-left rounded-xl px-3 py-3 bg-white/5 border border-white/7 active:scale-[0.99] transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold text-white">{item.role}</p>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  assigned
                    ? 'text-green-200 border-green-400/20 bg-green-500/10'
                    : 'text-slate-300 border-white/10 bg-white/5'
                }`}>
                  {assigned ? activeCaseSession?.roleAssignments[item.id]?.label ?? 'assumido' : 'livre'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{item.focus}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
