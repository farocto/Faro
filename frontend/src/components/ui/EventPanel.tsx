import { useState } from "react";
import type { EventPin } from "../../types/map";

type EventPanelProps = {
  event: EventPin;
  canEdit: boolean;
  onEdit: () => void;
  onClose: () => void;
};

function EventPanel({ event, canEdit, onEdit, onClose }: EventPanelProps) {
  const [favorited, setFavorited] = useState(false);
  const [reserved, setReserved] = useState(false);

  const priceLabel = event.isFree
    ? "Free"
    : event.priceLabel ?? `$${event.priceAmount ?? 0}`;

  return (
    <div className="absolute right-4 top-20 w-[360px] bg-neutral-900 text-white rounded-2xl shadow-xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 flex justify-between items-start gap-3">
        <div>
          <h2 className="font-semibold text-lg leading-tight">{event.title}</h2>

          <div className="mt-1 text-sm text-white/60">
            {event.hostBusinessName
              ? `Hosted by ${event.hostBusinessName}`
              : "Host business not provided"}
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-white/60 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="h-40 bg-neutral-800 flex items-center justify-center text-white/40">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : (
          "Generated Image"
        )}
      </div>

      <div className="p-4 space-y-4 text-sm">
        <div>
          <div className="text-white/60 mb-1">Date</div>
          <div>{event.date}</div>
        </div>

        <div>
          <div className="text-white/60 mb-1">Location</div>

          <div className="space-y-1">
            <div className="font-medium text-white">
              {event.venueName || "Venue not provided"}
            </div>

            {event.address ? (
              <div className="text-white/75">{event.address}</div>
            ) : (
              <div className="text-white/50">Address not provided</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-white/60 mb-1">Category</div>
            <div>{event.category || "Not provided"}</div>
          </div>

          <div>
            <div className="text-white/60 mb-1">Ticket Price</div>
            <div>{priceLabel}</div>
          </div>
        </div>

        <div>
          <div className="text-white/60 mb-1">Status</div>
          <div>{event.status}</div>
        </div>

        <div>
          <div className="text-white/60 mb-1">Description</div>
          <p className="text-white/80">
            {event.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        {canEdit && (
          <button
            onClick={onEdit}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-medium transition"
          >
            Edit Event
          </button>
        )}

        {!canEdit && event.hostBusinessId && (
          <div className="rounded-lg bg-white/5 px-3 py-2 text-xs text-white/45">
            You can only edit events owned by the currently selected business.
          </div>
        )}

        <button
          onClick={() => setReserved(!reserved)}
          className={`w-full py-2 rounded-lg font-medium transition ${
            reserved ? "bg-green-600" : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {reserved ? "Reserved ✓" : "Reserve / Buy Ticket"}
        </button>

        <button
          onClick={() => setFavorited(!favorited)}
          className={`w-full py-2 rounded-lg transition ${
            favorited
              ? "bg-yellow-500 text-black"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          {favorited ? "Favorited ★" : "Favorite Event"}
        </button>

        <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
          Share Event
        </button>

        <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-red-400">
          Report Event
        </button>
      </div>
    </div>
  );
}

export default EventPanel;