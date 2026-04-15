import type { EventPin } from "../../mocks/events";

type LocationConfirmPanelProps = {
  event: EventPin;
  onConfirm: () => void;
  onCancel: () => void;
};

function LocationConfirmPanel({
  event,
  onConfirm,
  onCancel,
}: LocationConfirmPanelProps) {
  return (
    <div className="absolute left-4 top-20 w-[340px] rounded-2xl border border-white/10 bg-neutral-900 text-white shadow-xl overflow-hidden">
      <div className="border-b border-white/10 p-4">
        <h2 className="text-lg font-semibold">Confirm Event Location</h2>
        <p className="mt-1 text-sm text-white/60">
          Drag the temporary pin to the exact spot, then confirm.
        </p>
      </div>

      <div className="space-y-3 p-4 text-sm">
        <div>
          <div className="text-white/60">Title</div>
          <div>{event.title}</div>
        </div>

        <div>
          <div className="text-white/60">Venue</div>
          <div>{event.venueName || event.business || "Not provided"}</div>
        </div>

        <div>
          <div className="text-white/60">Resolved Address</div>
          <div>{event.address}</div>
        </div>
      </div>

      <div className="flex gap-2 border-t border-white/10 p-4">
        <button
          onClick={onConfirm}
          className="flex-1 rounded-lg bg-red-600 py-2 font-medium text-white transition hover:bg-red-500"
        >
          Confirm Location
        </button>

        <button
          onClick={onCancel}
          className="flex-1 rounded-lg bg-white/10 py-2 font-medium text-white transition hover:bg-white/20"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default LocationConfirmPanel;