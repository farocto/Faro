import { useState } from "react";

interface FaroLogoProps {
  compact?: boolean;
  light?: boolean;
}

export function FaroLogo({
  compact = false,
  light = false,
}: FaroLogoProps) {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setActive((value) => !value)}
      className={`group inline-flex items-center gap-2.5 ${
        light ? "text-white" : "text-harbor"
      }`}
      aria-label="Faro"
    >
      <span
        className={`relative flex items-center justify-center ${
          compact ? "h-9 w-9" : "h-11 w-11"
        }`}
      >
        <span
          className={`absolute rounded-full border-2 border-amber transition-transform duration-500 ${
            compact ? "inset-1.5" : "inset-1"
          }`}
        />

        <span
          className={`absolute rounded-full border border-amber transition-transform duration-500 ${
            compact ? "inset-2.5" : "inset-2"
          }`}
        />

        <span
          className={`absolute rounded-full border border-amber transition-transform duration-500 ${
            compact ? "inset-3.5" : "inset-3"
          }`}
        />

        <span
          className={`rounded-full bg-amber transition-all duration-500 ${
            active
              ? "h-4 w-4 shadow-[0_0_0_7px_rgba(245,158,11,0.14)]"
              : compact
                ? "h-2.5 w-2.5"
                : "h-3 w-3"
          }`}
        />
      </span>

      {!compact && (
        <span className="font-display text-[42px] font-medium leading-none tracking-[-0.06em]">
          faro
        </span>
      )}
    </button>
  );
}