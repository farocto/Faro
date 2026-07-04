import { useEffect, useState } from "react";

import AppLayout from "./components/layout/AppLayout";
import DateSlider from "./components/ui/DateSlider";
import SafetyLegend from "./components/ui/SafetyLegend";
import EventPanel from "./components/ui/EventPanel";
import CreateEventButton from "./components/ui/CreateEventButton";
import CreateEventModal from "./components/ui/CreateEventModal";
import LocationConfirmPanel from "./components/ui/LocationConfirmPanel";


import type { EventPin } from "./types/map";
import { createEvent, getEvents } from "./api/eventsApi";
import { createVenue } from "./api/venuesApi";
import { mapEventSummariesToEventPins } from "./mappers/eventMappers";

export type AppMode = "events";

function App() {
  const [mode] = useState<AppMode>("events");

  const todayISO = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState<string>(todayISO);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [events, setEvents] = useState<EventPin[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const [pendingEvent, setPendingEvent] = useState<EventPin | null>(null);

  async function loadEventsForSelectedDate() {
  setIsLoadingEvents(true);
  setEventsError(null);

  try {
    const eventSummaries = await getEvents(selectedDate);
    const eventPins = mapEventSummariesToEventPins(eventSummaries);

    setEvents(eventPins);
  } catch (error) {
    console.error(error);
    setEventsError("Could not load events.");
  } finally {
    setIsLoadingEvents(false);
  }
}

useEffect(() => {
  loadEventsForSelectedDate();
}, [selectedDate]);

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  const handlePreviewLocation = (draftEvent: EventPin) => {
    setPendingEvent(draftEvent);
    setIsCreateModalOpen(false);
    setSelectedEventId(null);
    setSelectedDate(draftEvent.date);
  };

  const handlePendingEventMove = (coordinates: [number, number]) => {
    setPendingEvent((prev: EventPin | null) =>
      prev ? { ...prev, coordinates } : null
    );
  };

  const handleConfirmPendingEvent = async () => {
  if (!pendingEvent) return;

  try {
    const [longitude, latitude] = pendingEvent.coordinates;

    const createdVenue = await createVenue({
      name: pendingEvent.venueName || "Event Venue",
      addressLine1: pendingEvent.address || null,
      addressLine2: null,
      city: null,
      state: null,
      postalCode: null,
      country: "Dominican Republic",
      latitude,
      longitude,
      placeId: null,
      venueType: null,
      capacity: null,
      isRentable: false,
      rentalNotes: null,
      isPubliclyListed: true,
    });

    const priceAmount = pendingEvent.priceAmount ?? 0;
    const isFree = pendingEvent.isFree || priceAmount <= 0;

    const startDate = new Date(`${pendingEvent.date}T23:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);

    const createdEvent = await createEvent({
      title: pendingEvent.title,
      description: pendingEvent.description || null,
      startAtUtc: startDate.toISOString(),
      endAtUtc: endDate.toISOString(),
      isFree,
      priceAmount: isFree ? null : priceAmount,
      priceLabel: isFree ? "Free" : pendingEvent.priceLabel ?? `${priceAmount}`,
      category: pendingEvent.category,
      imageUrl: pendingEvent.imageUrl,
      externalUrl: null,
      venueId: createdVenue.id,
    });

    setSelectedEventId(createdEvent.id);
    setSelectedDate(pendingEvent.date);
    setPendingEvent(null);

    await loadEventsForSelectedDate();
  } catch (error) {
    console.error(error);
    setEventsError("Could not create event.");
  }
};

  const handleCancelPendingEvent = () => {
    setPendingEvent(null);
  };

  return (
    <AppLayout
      mode={mode}
      selectedDate={selectedDate}
      events={events}
      selectedEventId={selectedEventId}
      onSelectEvent={setSelectedEventId}
      pendingEvent={pendingEvent}
      onPendingEventMove={handlePendingEventMove}
    >
      <div className="absolute top-4 right-4 pointer-events-auto">
        <CreateEventButton onClick={() => setIsCreateModalOpen(true)} />
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto">
        <DateSlider selectedDate={selectedDate} onChange={setSelectedDate} />
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <SafetyLegend />
      </div>

      {eventsError && (
        <div className="absolute top-20 left-4 z-50 rounded-lg bg-red-600 px-4 py-2 text-sm text-white shadow-lg pointer-events-auto">
          {eventsError}
        </div>
      )}

      {isLoadingEvents && (
        <div className="absolute top-20 left-4 z-50 rounded-lg bg-black/70 px-4 py-2 text-sm text-white shadow-lg pointer-events-auto">
          Loading events...
        </div>
      )}

      {selectedEvent && !pendingEvent && (
        <div className="pointer-events-auto">
          <EventPanel
            event={selectedEvent}
            onClose={() => setSelectedEventId(null)}
          />
        </div>
      )}

      {isCreateModalOpen && (
        <CreateEventModal
          selectedDate={selectedDate}
          onClose={() => setIsCreateModalOpen(false)}
          onPreviewLocation={handlePreviewLocation}
        />
      )}

      {pendingEvent && (
        <div className="pointer-events-auto">
          <LocationConfirmPanel
            event={pendingEvent}
            onConfirm={handleConfirmPendingEvent}
            onCancel={handleCancelPendingEvent}
          />
        </div>
      )}

      {selectedEventId && !pendingEvent && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-xl text-sm pointer-events-none">
          Selected event: {selectedEventId}
        </div>
      )}
    </AppLayout>
  );
}

export default App;