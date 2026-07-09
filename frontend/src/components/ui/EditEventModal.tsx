import { useState } from "react";
import type { EventPin } from "../../types/map";
import { updateEvent } from "../../api/eventsApi";

type EditEventModalProps = {
  event: EventPin;
  selectedBusinessId: string;
  onClose: () => void;
  onUpdated: () => Promise<void>;
};

function EditEventModal({
  event,
  selectedBusinessId,
  onClose,
  onUpdated,
}: EditEventModalProps) {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [category, setCategory] = useState(event.category ?? "");
  const [ticketPrice, setTicketPrice] = useState(
    event.priceAmount !== null ? String(event.priceAmount) : "0"
  );
  const [description, setDescription] = useState(event.description ?? "");
  const [imageUrl, setImageUrl] = useState(event.imageUrl ?? "");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const canEdit =
    event.hostBusinessId !== null && event.hostBusinessId === selectedBusinessId;

  const handleSave = async () => {
    try {
      setError("");

      if (!canEdit) {
        setError("You can only edit events owned by the selected business.");
        return;
      }

      if (!title.trim()) {
        setError("Please enter an event title.");
        return;
      }

      setIsSaving(true);

      const parsedTicketPrice = Number(ticketPrice) || 0;
      const isFree = parsedTicketPrice <= 0;

      const startDate = new Date(`${date}T23:00:00.000Z`);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 2);

      await updateEvent(event.id, {
        title: title.trim(),
        hostBusinessId: selectedBusinessId,
        description: description.trim() || null,
        startAtUtc: startDate.toISOString(),
        endAtUtc: endDate.toISOString(),
        isFree,
        priceAmount: isFree ? null : parsedTicketPrice,
        priceLabel: isFree ? "Free" : `$${parsedTicketPrice}`,
        category: category.trim() || null,
        imageUrl: imageUrl.trim() || null,
        externalUrl: null,
        venueId: event.venueId,
      });

      await onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Could not update event.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
      <div className="w-[520px] max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-900 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div>
            <h2 className="text-lg font-semibold">Edit Event</h2>
            <div className="mt-1 text-sm text-white/60">
              {event.hostBusinessName
                ? `Editing as ${event.hostBusinessName}`
                : "Host business not provided"}
            </div>
          </div>

          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-5 p-4">
          {!canEdit && (
            <div className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">
              You can only edit events owned by the currently selected business.
            </div>
          )}

          <section className="space-y-3">
            <div className="text-sm font-medium text-white/80">
              Event Details
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!canEdit}
              className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none disabled:opacity-50"
              placeholder="Event title"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm text-white/70">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={!canEdit}
                  className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-white/70">
                  Category
                </label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={!canEdit}
                  className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none disabled:opacity-50"
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
                disabled={!canEdit}
                className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none disabled:opacity-50"
                placeholder="0"
              />
              <div className="mt-1 text-xs text-white/45">
                Use 0 for a free event.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-sm font-medium text-white/80">
              Location
            </div>

            <div className="rounded-lg bg-white/5 px-3 py-3 text-sm text-white/70">
              <div className="font-medium text-white">
                {event.venueName || "Venue not provided"}
              </div>

              <div className="mt-1 text-white/55">
                {event.address || "Address not provided"}
              </div>
            </div>

            <div className="text-xs text-white/45">
              Location editing will be handled separately because changing the
              address also requires updating or replacing the venue.
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
                disabled={!canEdit}
                className="min-h-[100px] w-full rounded-lg bg-white/10 px-3 py-2 outline-none disabled:opacity-50"
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
                disabled={!canEdit}
                className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none disabled:opacity-50"
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

        <div className="border-t border-white/10 p-4 flex gap-3">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-white/10 py-3 font-medium text-white transition hover:bg-white/20"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving || !canEdit}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-500 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEventModal;