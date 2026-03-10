import { useState } from "react";

type EventPanelProps = {
  event: {
    id: string;
    title: string;
    date: string;
    coordinates: [number, number];
  };
  onClose: () => void;
};

function EventPanel({ event, onClose }: EventPanelProps) {
  const [favorited, setFavorited] = useState(false);
  const [reserved, setReserved] = useState(false);

  return (
    <div className="absolute right-4 top-20 w-[360px] bg-neutral-900 text-white rounded-2xl shadow-xl border border-white/10 overflow-hidden">

      {/* HEADER */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="font-semibold text-lg">{event.title}</h2>

        <button
          onClick={onClose}
          className="text-white/60 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* IMAGE */}
      <div className="h-40 bg-neutral-800 flex items-center justify-center text-white/40">
        Generated Image
      </div>

      {/* EVENT INFO */}
      <div className="p-4 space-y-3 text-sm">

        <div>
          <span className="text-white/60">Date:</span> {event.date}
        </div>

        <div>
          <span className="text-white/60">Location:</span> Santo Domingo
        </div>

        <div>
          <span className="text-white/60">Business:</span> Example Venue
        </div>

        <div>
          <span className="text-white/60">Attendees:</span> 100
        </div>

        <div>
          <span className="text-white/60">Ticket Price:</span> $10
        </div>

        <div>
          <span className="text-white/60">Description:</span>
          <p className="text-white/80 mt-1">
            Sample event description. This will later come from the backend.
          </p>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="p-4 border-t border-white/10 flex flex-col gap-2">

        <button
          onClick={() => setReserved(!reserved)}
          className={`w-full py-2 rounded-lg font-medium transition
          ${reserved ? "bg-green-600" : "bg-red-600 hover:bg-red-500"}`}
        >
          {reserved ? "Reserved ✓" : "Reserve / Buy Ticket"}
        </button>

        <button
          onClick={() => setFavorited(!favorited)}
          className={`w-full py-2 rounded-lg transition
          ${favorited ? "bg-yellow-500 text-black" : "bg-white/10 hover:bg-white/20"}`}
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