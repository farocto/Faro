import { useState } from "react";
import type { EventPin } from "../../mocks/events";
import { geocodeAddress } from "../../api/geocoding";

type CreateEventModalProps = {
  selectedDate: string;
  onClose: () => void;
  onPreviewLocation: (event: EventPin) => void;
};

function CreateEventModal({
  selectedDate,
  onClose,
  onPreviewLocation,
}: CreateEventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(selectedDate);

  const [venueName, setVenueName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("Santo Domingo");
  const [postalCode, setPostalCode] = useState("");

  const [location, setLocation] = useState("Santo Domingo");
  const [business, setBusiness] = useState("");
  const [attendees, setAttendees] = useState("100");
  const [ticketPrice, setTicketPrice] = useState("10");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");

  const buildGeocodePreview = () => {
    return [
      venueName.trim(),
      streetAddress.trim(),
      neighborhood.trim(),
      city.trim(),
      postalCode.trim(),
      "Dominican Republic",
    ]
      .filter(Boolean)
      .join(", ");
  };

  const handlePreviewLocation = async () => {
    try {
      setError("");

      if (!title.trim()) {
        setError("Please enter an event title.");
        return;
      }

      if (!streetAddress.trim()) {
        setError("Please enter a street address.");
        return;
      }

      if (!city.trim()) {
        setError("Please enter a city.");
        return;
      }

      setIsPublishing(true);

      const geocoded = await geocodeAddress({
        venueName,
        streetAddress,
        neighborhood,
        city,
        postalCode,
      });

      const draftEvent: EventPin = {
        id: crypto.randomUUID(),
        title: title.trim(),
        date,
        coordinates: geocoded.coordinates,

        venueName: venueName.trim(),
        streetAddress: streetAddress.trim(),
        neighborhood: neighborhood.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),

        address: geocoded.fullAddress,
        location: location.trim(),

        business: business.trim() || venueName.trim(),
        attendees: Number(attendees) || 0,
        ticketPrice: Number(ticketPrice) || 0,
        description: description.trim(),
        imageUrl: imageUrl.trim(),
      };

      onPreviewLocation(draftEvent);
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
      <div className="w-[480px] max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-900 text-white shadow-2xl">
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
              placeholder="Government Party"
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
            <label className="mb-1 block text-sm text-white/70">Venue / Building Name</label>
            <input
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="Palacio Nacional"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Street Address</label>
            <input
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="Av. México"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-white/70">Neighborhood</label>
              <input
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                placeholder="Gazcue"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/70">Postal Code</label>
              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                placeholder="10204"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="Santo Domingo"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Location Label</label>
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
              placeholder="Palacio Nacional"
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
              placeholder="Describe the event..."
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

          <div className="rounded-lg bg-white/5 px-3 py-2 text-xs text-white/60">
            Geocode query preview: {buildGeocodePreview() || "No location entered yet"}
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={handlePreviewLocation}
            disabled={isPublishing}
            className="w-full rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {isPublishing ? "Locating..." : "Preview Location"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEventModal;