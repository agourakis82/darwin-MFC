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
    <div className="grid gap-2 grid-cols-2 xl:grid-cols-4">
      {items.map((chip) => (
        <div
          key={chip.label}
          className="rounded-[24px] px-4 py-3 apple-transition-fast"
          style={{
            background: `linear-gradient(180deg, ${chip.tone} 0%, rgba(255,255,255,0.025) 100%)`,
            border: `0.5px solid ${chip.border}`,
            boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] font-bold" style={{ color: chip.color }}>
            {chip.label}
          </p>
          <p className="text-lg font-bold text-white mt-1">{chip.value}</p>
        </div>
      ))}
    </div>
  );
}
