import type { EditorialLens } from '@/features/editorial/types/editorial';

const labels: Record<EditorialLens, string> = { culture: 'Culture', city: 'City', people: 'People', style: 'Style' };

interface LensPillProps { lens: EditorialLens; active?: boolean; onClick?: () => void; }

export function LensPill({ lens, active = false, onClick }: LensPillProps) {
  const Tag = onClick ? 'button' : 'span';
  return <Tag onClick={onClick} className={`rounded-full border px-3 py-1.5 text-[10px] font-700 uppercase tracking-wide transition-all ${active ? 'border-harbor bg-harbor text-white' : 'border-cloud-dark bg-white/50 text-slate hover:border-beacon hover:text-harbor'}`}>{labels[lens]}</Tag>;
}
