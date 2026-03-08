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
          className="rounded-2xl px-4 py-3"
          style={{ background: chip.tone, border: `0.5px solid ${chip.border}` }}
        >
          <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: chip.color }}>
            {chip.label}
          </p>
          <p className="text-lg font-bold text-white mt-1">{chip.value}</p>
        </div>
      ))}
    </div>
  );
}
