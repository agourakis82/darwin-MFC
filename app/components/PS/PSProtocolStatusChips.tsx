'use client';

interface StatusChip {
  label: string;
  value: number;
  tone: string;
  border: string;
  color: string;
}

interface PSProtocolStatusChipsProps {
  items: StatusChip[];
}

export default function PSProtocolStatusChips({ items }: PSProtocolStatusChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((chip) => (
        <div
          key={chip.label}
          className="rounded-full px-3.5 py-2 apple-transition-fast"
          style={{
            background: `linear-gradient(180deg, ${chip.tone} 0%, rgba(255,255,255,0.025) 100%)`,
            border: `0.5px solid ${chip.border}`,
            boxShadow: '0 10px 24px rgba(0,0,0,0.1)',
          }}
        >
          <div className="flex items-center gap-2">
            <p className="text-[10px] uppercase tracking-[0.22em] font-bold" style={{ color: chip.color }}>
              {chip.label}
            </p>
            <p className="text-sm font-bold text-white">{chip.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
