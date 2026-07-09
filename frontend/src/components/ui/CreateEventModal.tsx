import { useState } from "react";
import type { EventPin } from "../../types/map";
import { geocodeAddress } from "../../api/geocoding";

type CreateEventModalProps = {
  selectedDate: string;
  selectedBusinessName: string | null;
  onClose: () => void;
  onPreviewLocation: (event: EventPin) => void;
};

function CreateEventModal({
  selectedDate,
  selectedBusinessName,
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

  const [category, setCategory] = useState("");
  const [ticketPrice, setTicketPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isLocating, setIsLocating] = useState(false);
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

      if (!selectedBusinessName) {
        setError("Please select a business before creating an event.");
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

      setIsLocating(true);

      const geocoded = await geocodeAddress({
        venueName,
        streetAddress,
        neighborhood,
        city,
        postalCode,
      });

      const parsedTicketPrice = Number(ticketPrice) || 0;
      const isFree = parsedTicketPrice <= 0;

      const draftEvent: EventPin = {
        id: crypto.randomUUID(),
        title: title.trim(),

        date,
        startAtUtc: `${date}T23:00:00.000Z`,
        endAtUtc: null,

        coordinates: geocoded.coordinates,

        venueId: "",
        venueName: venueName.trim() || "Event Venue",
        address: geocoded.fullAddress,

        hostBusinessId: null,
        hostBusinessName: selectedBusinessName,

        category: category.trim() || null,
        imageUrl: imageUrl.trim() || null,

        isFree,
        priceAmount: isFree ? null : parsedTicketPrice,
        priceLabel: isFree ? "Free" : `$${parsedTicketPrice}`,

        status: "Draft",
        description: description.trim() || null,
      };

      onPreviewLocation(draftEvent);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not find that address."
      );
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
      <div className="w-[520px] max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-900 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div>
            <h2 className="text-lg font-semibold">Create Event</h2>
            <div className="mt-1 text-sm text-white/60">
              {selectedBusinessName
                ? `Creating as ${selectedBusinessName}`
                : "No business selected"}
            </div>
          </div>

          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-5 p-4">
          <section className="space-y-3">
            <div className="text-sm font-medium text-white/80">
              Event Details
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="Event title"
            />

            <div className="grid grid-cols-2 gap-3">
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
                <label className="mb-1 block text-sm text-white/70">
                  Category
                </label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                  placeholder="Music, Food, Community..."
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/70">
                Ticket Price
              </label>
              <input
                type="number"
                min="0"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                placeholder="0"
              />
              <div className="mt-1 text-xs text-white/45">
                Use 0 for a free event.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-sm font-medium text-white/80">Location</div>

            <input
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="Venue / building name"
            />

            <input
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
              placeholder="Street address"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                placeholder="Neighborhood"
              />

              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                placeholder="Postal code"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/70">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                placeholder="City"
              />
            </div>

            <div className="rounded-lg bg-white/5 px-3 py-2 text-xs text-white/60">
              Geocode query preview:{" "}
              {buildGeocodePreview() || "No location entered yet"}
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-sm font-medium text-white/80">Optional</div>

            <div>
              <label className="mb-1 block text-sm text-white/70">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                placeholder="Describe the event..."
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/70">
                Image URL
              </label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
                placeholder="https://..."
              />
            </div>
          </section>

          {error && (
            <div className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={handlePreviewLocation}
            disabled={isLocating}
            className="w-full rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {isLocating ? "Locating..." : "Preview Location"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEventModal;