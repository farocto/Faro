import { useState } from "react";
import type { EventPin } from "../../mocks/events";
import { geocodeAddress } from "../../api/geocoding";

type CreateEventModalProps = {
  selectedDate: string;
  onClose: () => void;
  onPublish: (event: EventPin) => void;
};

function CreateEventModal({
  selectedDate,
  onClose,
  onPublish,
}: CreateEventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(selectedDate);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("Santo Domingo");
  const [business, setBusiness] = useState("");
  const [attendees, setAttendees] = useState("100");
  const [ticketPrice, setTicketPrice] = useState("10");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");

  const handlePublish = async () => {
    try {
      setError("");

      if (!title.trim()) {
        setError("Please enter an event title.");
        return;
      }

      if (!address.trim()) {
        setError("Please enter an address.");
        return;
      }

      setIsPublishing(true);

      const geocoded = await geocodeAddress(address);

      const newEvent: EventPin = {
        id: crypto.randomUUID(),
        title: title.trim(),
        date,
        coordinates: geocoded.coordinates,
        address: geocoded.fullAddress,
        location: location.trim(),
        business: business.trim(),
        attendees: Number(attendees) || 0,
        ticketPrice: Number(ticketPrice) || 0,
        description: description.trim(),
        imageUrl: imageUrl.trim(),
      };

      onPublish(newEvent);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not find that address."
      );
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
      <div className="w-[420px] max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-900 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-semibold">Create Event</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <label className="mb-1 block text-sm text-white/70">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="Concert"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="123 Main St, Santo Domingo"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="Santo Domingo"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Business</label>
            <input
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="Example Venue"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Attendees</label>
            <input
              type="number"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Ticket Price</label>
            <input
              type="number"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Image URL</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="https://..."
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="w-full rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {isPublishing ? "Publishing..." : "Publish Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEventModal;