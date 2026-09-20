import { useState } from 'react';
import type { EditorialPost, EditorialLens } from '@/features/editorial/types/editorial';
import { LensPill } from './LensPill';
import { EntityBridge } from './EntityBridge';
import { ArrowRight, Bookmark, Clock } from 'lucide-react';

export type StoryVariant = 'feature' | 'standard' | 'compact' | 'horizontal' | 'image-led' | 'entity-led';

interface StoryCardProps { post: EditorialPost; variant: StoryVariant; index?: number; }

const lensLabels: Record<EditorialLens, string> = { culture: 'Culture', city: 'City', people: 'People', style: 'Style' };

function SaveToggle() {
  const [saved, setSaved] = useState(false);
  return <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${saved ? 'border-harbor bg-harbor text-white' : 'border-cloud-dark text-slate hover:border-harbor hover:text-harbor'}`} aria-label="Guardar"><Bookmark className={saved ? 'fill-amber text-amber' : ''} size={14} strokeWidth={2} /></button>;
}

export function StoryCard({ post, variant = 'standard', index = 0 }: StoryCardProps) {
  const animationDelay = `${Math.min(index * 60, 300)}ms`;

  if (variant === 'feature') return <FeatureStory post={post} delay={animationDelay} />;
  if (variant === 'compact') return <CompactStory post={post} delay={animationDelay} />;
  if (variant === 'horizontal') return <HorizontalStory post={post} delay={animationDelay} />;
  if (variant === 'image-led') return <ImageLedStory post={post} delay={animationDelay} />;
  if (variant === 'entity-led') return <EntityLedStory post={post} delay={animationDelay} />;
  return <StandardStory post={post} delay={animationDelay} />;
}

function ReadTime({ post }: { post: EditorialPost }) {
  if (!post.readTime) return null;
  return <span className="flex items-center gap-1 text-xs font-500 text-slate"><Clock size={12} strokeWidth={1.8} />{post.readTime}</span>;
}

function AuthorByline({ post }: { post: EditorialPost }) {
  if (!post.author) return null;
  return <div className="flex items-center gap-2.5">
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-harbor text-[10px] font-700 text-white">{post.author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
    <div><p className="text-xs font-700 text-harbor">{post.author.name}</p><p className="text-[10px] uppercase tracking-wide text-slate">{post.author.role}</p></div>
  </div>;
}

function EntityRefs({ post }: { post: EditorialPost }) {
  if (post.entities.length === 0) return null;
  return <div className="flex flex-wrap gap-2">{post.entities.slice(0, 2).map((entity) => <EntityBridge key={entity.id} entity={entity} />)}</div>;
}

function FeatureStory({ post, delay }: { post: EditorialPost; delay: string }) {
  return <article className="animate-fade-up" style={{ animationDelay: delay, opacity: 0 }}>
    <div className="group relative overflow-hidden rounded-2xl">
      <img src={post.imageUrl} alt={post.imageAlt} className="h-[520px] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
        <div className="mb-4 flex items-center gap-3">
          <LensPill lens={post.lens} />
          <span className="rounded-full bg-amber px-3 py-1 text-[10px] font-700 uppercase tracking-wide text-harbor">Featured</span>
        </div>
        <h2 className="font-display text-4xl font-500 leading-[1.1] tracking-[-0.02em] text-white text-balance lg:text-5xl">{post.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-4">
          <button className="group/btn flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-700 text-harbor transition-all hover:bg-white">Read story<ArrowRight className="transition-transform group-hover/btn:translate-x-1" size={15} strokeWidth={2} /></button>
          <SaveToggle />
          <ReadTime post={post} />
        </div>
      </div>
    </div>
  </article>;
}

function StandardStory({ post, delay }: { post: EditorialPost; delay: string }) {
  return <article className="animate-fade-up group cursor-pointer" style={{ animationDelay: delay, opacity: 0 }}>
    <div className="relative overflow-hidden rounded-xl"><img src={post.imageUrl} alt={post.imageAlt} className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div>
    <div className="mt-4 flex items-center gap-3"><LensPill lens={post.lens} /><ReadTime post={post} /></div>
    <h3 className="mt-3 font-display text-2xl font-500 leading-[1.15] tracking-[-0.01em] text-harbor text-balance group-hover:text-beacon transition-colors">{post.title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-slate">{post.excerpt}</p>
    <div className="mt-4 flex items-center justify-between">
      <AuthorByline post={post} />
      <SaveToggle />
    </div>
    <div className="mt-4"><EntityRefs post={post} /></div>
  </article>;
}

function CompactStory({ post, delay }: { post: EditorialPost; delay: string }) {
  return <article className="animate-fade-up group flex items-start gap-4 cursor-pointer" style={{ animationDelay: delay, opacity: 0 }}>
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg"><img src={post.imageUrl} alt={post.imageAlt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" /></div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-700 uppercase tracking-wide text-beacon">{lensLabels[post.lens]}</p>
      <h4 className="mt-1 font-display text-base font-500 leading-tight text-harbor group-hover:text-beacon transition-colors">{post.title}</h4>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate">{post.excerpt}</p>
      {post.readTime && <span className="mt-1.5 block text-[10px] font-500 text-slate">{post.readTime}</span>}
    </div>
  </article>;
}

function HorizontalStory({ post, delay }: { post: EditorialPost; delay: string }) {
  return <article className="animate-fade-up group grid cursor-pointer grid-cols-[1fr_180px] gap-5" style={{ animationDelay: delay, opacity: 0 }}>
    <div>
      <div className="flex items-center gap-3"><LensPill lens={post.lens} /><ReadTime post={post} /></div>
      <h3 className="mt-2 font-display text-xl font-500 leading-[1.15] text-harbor group-hover:text-beacon transition-colors">{post.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">{post.excerpt}</p>
      <div className="mt-3"><EntityRefs post={post} /></div>
    </div>
    <div className="relative overflow-hidden rounded-xl"><img src={post.imageUrl} alt={post.imageAlt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /></div>
  </article>;
}

function ImageLedStory({ post, delay }: { post: EditorialPost; delay: string }) {
  return <article className="animate-fade-up group cursor-pointer" style={{ animationDelay: delay, opacity: 0 }}>
    <div className="relative overflow-hidden rounded-xl">
      <img src={post.imageUrl} alt={post.imageAlt} className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
      <div className="absolute bottom-0 p-5"><LensPill lens={post.lens} /></div>
    </div>
    <h3 className="mt-3 font-display text-lg font-500 leading-tight text-harbor group-hover:text-beacon transition-colors">{post.title}</h3>
    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate">{post.excerpt}</p>
  </article>;
}

function EntityLedStory({ post, delay }: { post: EditorialPost; delay: string }) {
  const entity = post.entities[0];
  return <article className="animate-fade-up group cursor-pointer overflow-hidden rounded-2xl border border-cloud-dark bg-white" style={{ animationDelay: delay, opacity: 0 }}>
    <div className="relative h-[200px] overflow-hidden"><img src={post.imageUrl} alt={post.imageAlt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div>
    <div className="p-5">
      <LensPill lens={post.lens} />
      <h3 className="mt-2.5 font-display text-xl font-500 leading-tight text-harbor group-hover:text-beacon transition-colors">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{post.excerpt}</p>
      {entity && <div className="mt-4 border-t border-cloud-dark pt-4"><EntityBridge entity={entity} prominent /></div>}
    </div>
  </article>;
}
