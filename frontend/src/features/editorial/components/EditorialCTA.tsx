import { ArrowRight, Sparkles } from 'lucide-react';

export function PutItOnFaro() {
  return <section className="overflow-hidden rounded-2xl border border-cloud-dark bg-gradient-to-br from-harbor-soft to-cloud">
    <div className="flex flex-col items-start gap-6 p-7 lg:flex-row lg:items-center lg:justify-between lg:p-9">
      <div className="max-w-md">
        <p className="flex items-center gap-2 text-[10px] font-700 uppercase tracking-editorial text-beacon"><Sparkles size={14} strokeWidth={2} />Community</p>
        <h2 className="mt-3 font-display text-3xl font-500 leading-tight tracking-[-0.02em] text-harbor">Put it on Faro</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">Know something worth seeing, doing, buying, or experiencing? Tell us about it.</p>
        <button className="group mt-5 flex items-center gap-2 rounded-full bg-harbor px-5 py-2.5 text-sm font-700 text-white transition-all hover:bg-night">Submit to Faro<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" strokeWidth={2} /></button>
      </div>
      <div className="flex flex-wrap gap-2 lg:justify-end">
        {[{ label: 'Business', sub: 'I have something to feature' }, { label: 'Event', sub: 'Something is happening' }, { label: 'Creator', sub: 'I made something' }, { label: 'Discovery', sub: 'I found something worth sharing' }, { label: 'Product', sub: 'Something worth buying' }].map((type) => <div key={type.label} className="cursor-pointer rounded-xl border border-cloud-dark bg-white/70 px-4 py-3 transition-all hover:border-beacon hover:bg-white"><p className="text-sm font-700 text-harbor">{type.label}</p><p className="mt-0.5 text-xs text-slate">{type.sub}</p></div>)}
      </div>
    </div>
  </section>;
}

export function EnterTheCity() {
  return <section className="relative overflow-hidden rounded-2xl bg-harbor">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.4) 0%, transparent 60%)' }} />
    <div className="relative flex flex-col items-center gap-5 px-6 py-14 text-center">
      <span className="relative flex h-5 w-5"><span className="absolute inline-flex h-full w-full animate-beacon-pulse rounded-full bg-amber" /><span className="relative inline-flex h-5 w-5 rounded-full bg-amber" /></span>
      <h2 className="font-display text-4xl font-500 tracking-[-0.03em] text-white lg:text-5xl">Enter the city</h2>
      <p className="max-w-md text-sm leading-relaxed text-white/60">Sigue la luz. Explora negocios, eventos y espacios culturales geolocalizados en Santo Domingo y el Distrito Nacional.</p>
      <button className="group flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-700 text-harbor transition-all hover:bg-white">Open map<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" strokeWidth={2} /></button>
    </div>
  </section>;
}
