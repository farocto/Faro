import { useState } from "react";
import type { EventPin } from "../../mocks/events";

type EventPanelProps = {
  event: EventPin;
  onClose: () => void;
};

function EventPanel({ event, onClose }: EventPanelProps) {
  const [favorited, setFavorited] = useState(false);
  const [reserved, setReserved] = useState(false);

  const venueLine = event.venueName || event.business || "Not provided";

  const streetLine = [event.streetAddress, event.neighborhood]
    .filter(Boolean)
    .join(", ");

  const cityLine = [event.city, event.postalCode].filter(Boolean).join(" ");

  return (
    <div className="absolute right-4 top-20 w-[360px] bg-neutral-900 text-white rounded-2xl shadow-xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="font-semibold text-lg">{event.title}</h2>

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
              {venueLine}
            </div>

            {streetLine ? (
              <div className="text-white/90">{streetLine}</div>
            ) : (
              <div className="text-white/50">Street not provided</div>
            )}

            {cityLine ? (
              <div className="text-white/75">{cityLine}</div>
            ) : (
              <div className="text-white/50">City not provided</div>
            )}

            {event.address && (
              <div className="mt-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/55">
                Resolved address: {event.address}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-white/60 mb-1">Attendees</div>
            <div>{event.attendees}</div>
          </div>

          <div>
            <div className="text-white/60 mb-1">Ticket Price</div>
            <div>${event.ticketPrice}</div>
          </div>
        </div>

        <div>
          <div className="text-white/60 mb-1">Description</div>
          <p className="text-white/80">
            {event.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
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