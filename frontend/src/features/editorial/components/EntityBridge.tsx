import type { EditorialEntityReference } from '@/features/editorial/types/editorial';
import { ArrowRight, MapPin } from 'lucide-react';

const typeLabels: Record<EditorialEntityReference['type'], string> = {
  business: 'See on Faro',
  event: 'View event',
  place: 'Explore on map',
  product: 'Shop the story',
  creator: 'Meet the creator',
};

interface EntityBridgeProps { entity: EditorialEntityReference; prominent?: boolean; }

export function EntityBridge({ entity, prominent = false }: EntityBridgeProps) {
  return <button className={`group flex w-full items-center gap-3 rounded-xl text-left transition-all ${prominent ? 'border border-cloud-dark bg-cloud p-3 hover:border-beacon hover:bg-harbor-soft' : 'border border-cloud-dark bg-white/60 p-2.5 hover:border-beacon'}`}>
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${prominent ? 'bg-harbor' : 'bg-cloud-dark'}`}>
      {entity.type === 'place' ? <MapPin size={15} className="text-amber" strokeWidth={2} /> : <span className="text-[10px] font-700 uppercase text-beacon">{entity.type.slice(0, 3)}</span>}
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-700 text-harbor">{entity.label}</p>
      <p className="truncate text-xs text-slate">{entity.detail}</p>
    </div>
    <span className="flex shrink-0 items-center gap-1 text-[10px] font-700 uppercase tracking-wide text-beacon">{typeLabels[entity.type]}<ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2} /></span>
  </button>;
}
