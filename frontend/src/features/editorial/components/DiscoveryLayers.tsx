import type { DiscoveryEvent, TonightItem } from '@/features/editorial/types/editorial';
import { ArrowRight, Clock, MapPin } from 'lucide-react';

const accentMap = { amber: { dot: 'bg-amber', text: 'text-amber' }, teal: { dot: 'bg-beacon', text: 'text-beacon' }, indigo: { dot: 'bg-harbor', text: 'text-harbor' } } as const;

export function ThisWeek({ events }: { events: DiscoveryEvent[] }) {
  return <section aria-labelledby="this-week-heading">
    <div className="flex items-end justify-between">
      <div>
        <h2 id="this-week-heading" className="font-display text-3xl font-500 tracking-[-0.02em] text-harbor">This Week</h2>
        <p className="mt-1 text-sm text-slate">What's worth knowing right now.</p>
      </div>
      <button className="group flex items-center gap-1.5 text-sm font-700 text-beacon transition-colors hover:text-harbor">Full agenda<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" strokeWidth={2} /></button>
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => {
        const accent = accentMap[event.accent];
        return <div key={event.id} className="group cursor-pointer overflow-hidden rounded-2xl border border-cloud-dark bg-white transition-all hover:shadow-editorial">
          <div className="relative h-[160px] overflow-hidden"><img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 backdrop-blur-sm">
              <span className={`h-2 w-2 rounded-full ${accent.dot}`} /><span className="text-xs font-700 uppercase tracking-wide text-harbor">{event.label}</span>
            </div>
          </div>
          <div className="p-4">
            <p className={`text-[10px] font-700 uppercase tracking-wide ${accent.text}`}>{event.lens}</p>
            <h3 className="mt-1.5 font-display text-lg font-500 leading-tight text-harbor group-hover:text-beacon transition-colors">{event.title}</h3>
            <div className="mt-2.5 space-y-1.5">
              <p className="flex items-center gap-1.5 text-xs text-slate"><MapPin size={13} strokeWidth={1.8} className="text-slate" />{event.venue} · {event.location}</p>
              <p className="flex items-center gap-1.5 text-xs font-600 text-harbor"><Clock size={13} strokeWidth={1.8} className="text-amber" />{event.time}</p>
            </div>
            <button className="group/btn mt-3 flex items-center gap-1 text-[11px] font-700 uppercase tracking-wide text-beacon">View event<ArrowRight size={11} className="transition-transform group-hover/btn:translate-x-0.5" strokeWidth={2} /></button>
          </div>
        </div>;
      })}
    </div>
  </section>;
}

export function Tonight({ items }: { items: TonightItem[] }) {
  return <section aria-labelledby="tonight-heading" className="rounded-2xl border border-cloud-dark bg-harbor p-6 lg:p-7">
    <div className="flex items-center gap-3">
      <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-beacon-pulse rounded-full bg-amber" /><span className="relative inline-flex h-3 w-3 rounded-full bg-amber" /></span>
      <h2 id="tonight-heading" className="font-display text-2xl font-500 text-white">Tonight</h2>
      <span className="ml-auto text-xs font-600 uppercase tracking-wide text-white/50">What's happening after you close this app</span>
    </div>
    <div className="mt-5 divide-y divide-white/10">
      {items.map((item) => <div key={item.id} className="group flex cursor-pointer items-center gap-4 py-3.5">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg"><img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" /></div>
        <div className="min-w-0 flex-1"><p className="truncate text-sm font-600 text-white">{item.title}</p><p className="truncate text-xs text-white/50">{item.venue}</p></div>
        <span className="shrink-0 text-sm font-700 text-amber">{item.time}</span>
      </div>)}
    </div>
  </section>;
}
