import {
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";

type ActionSheetProps = {
  open: boolean;
  onClose: () => void;
  onCreateEvent: () => void;
};

function ActionSheet({
  open,
  onClose,
  onCreateEvent,
}: ActionSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-night/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative mx-4 w-full max-w-md animate-fade-up rounded-2xl border border-cloud-dark bg-cloud p-6 shadow-editorial">
        <div className="flex items-start justify-between">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-editorial text-amber">
              <Sparkles size={14} strokeWidth={2} />
              Prende la Luz
            </p>

            <h2 className="mt-2 font-display text-2xl font-medium tracking-[-0.02em] text-harbor">
              What should we see?
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate transition-colors hover:bg-harbor-soft"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={onCreateEvent}
            className="group flex w-full items-center gap-4 rounded-xl border border-cloud-dark bg-white/60 p-4 text-left transition-all hover:border-beacon hover:bg-white"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-harbor">
                Create event
              </p>

              <p className="mt-0.5 text-xs text-slate">
                Something is happening
              </p>
            </div>

            <ArrowRight
              size={16}
              className="shrink-0 text-beacon transition-transform group-hover:translate-x-1"
              strokeWidth={2}
            />
          </button>

          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center gap-4 rounded-xl border border-cloud-dark bg-white/40 p-4 text-left opacity-50"
          >
            <div>
              <p className="text-sm font-bold text-harbor">
                Submit a place
              </p>

              <p className="mt-0.5 text-xs text-slate">
                Coming soon
              </p>
            </div>
          </button>

          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center gap-4 rounded-xl border border-cloud-dark bg-white/40 p-4 text-left opacity-50"
          >
            <div>
              <p className="text-sm font-bold text-harbor">
                Share a discovery
              </p>

              <p className="mt-0.5 text-xs text-slate">
                Coming soon
              </p>
            </div>
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-slate">
          Anyone can help put something on Faro.
        </p>
      </div>
    </div>
  );
}

export default ActionSheet;