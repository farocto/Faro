import { FaroLogo } from '@/components/brand/FaroLogo';
import { ArrowRight } from 'lucide-react';

interface FaroCoverProps {
  onEnter: () => void;
}

const coverLines = [
  'The spaces changing Santo Domingo',
  'Who is making the city move',
  'The new Dominican design',
];

export function FaroCover({ onEnter }: FaroCoverProps) {
  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden bg-night"
      onClick={onEnter}
      role="button"
      tabIndex={0}
      aria-label="Enter Faro Edition 0"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onEnter(); }}
    >
      {/* Hero image */}
      <img
        src="https://images.pexels.com/photos/38092022/pexels-photo-38092022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1800&fit=crop"
        alt="Editorial portrait with flowing fabric in motion"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlays for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/10 to-night/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent" />

      {/* Content layer */}
      <div className="relative flex h-full flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-14">

        {/* Masthead: Faro logo + VII + edition metadata */}
        <div className="flex items-start justify-between">
          <FaroLogo light />
          <div className="flex flex-col items-end gap-2">
            <span className="font-display text-2xl font-400 leading-none text-white/60 tracking-[0.3em]">VII</span>
            <span className="text-[9px] font-700 uppercase tracking-editorial text-white/50">DOMINICANA &middot; No. 0 &middot; AGO &rsquo;26</span>
          </div>
        </div>

        {/* Center: negative space for the hero image to breathe */}
        <div className="flex-1" />

        {/* Bottom: headline + cover lines + CTA */}
        <div className="max-w-2xl">
          {/* Cover lines — secondary stories */}
          <div className="mb-6 space-y-1.5">
            {coverLines.map((line, i) => (
              <p
                key={i}
                className="text-sm font-500 text-white/70 transition-colors hover:text-white sm:text-base"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Primary headline */}
          <h1 className="font-display text-[44px] font-500 leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            THE CITY<br />IS MOVING
          </h1>

          {/* CTA */}
          <div className="mt-8 flex items-center gap-2">
            <span className="font-display text-lg font-500 tracking-wide text-white">Enter edition</span>
            <ArrowRight className="h-5 w-5 text-amber transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
          </div>
        </div>
      </div>

      {/* Subtle beacon at bottom-right — the light is on */}
      <div className="absolute bottom-8 right-6 sm:bottom-10 sm:right-10 lg:bottom-14 lg:right-14">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-beacon-pulse rounded-full bg-amber" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-amber" />
        </span>
      </div>
    </div>
  );
}
