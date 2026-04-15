import { useState } from "react";

import AppLayout from "./components/layout/AppLayout";
import DateSlider from "./components/ui/DateSlider";
import SafetyLegend from "./components/ui/SafetyLegend";
import EventPanel from "./components/ui/EventPanel";
import CreateEventButton from "./components/ui/CreateEventButton";
import CreateEventModal from "./components/ui/CreateEventModal";
import LocationConfirmPanel from "./components/ui/LocationConfirmPanel";
import { mockEvents, type EventPin } from "./mocks/events";

export type AppMode = "events";

function App() {
  const [mode] = useState<AppMode>("events");

  const todayISO = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [events, setEvents] = useState<EventPin[]>(mockEvents);

  const [pendingEvent, setPendingEvent] = useState<EventPin | null>(null);

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  const handlePreviewLocation = (draftEvent: EventPin) => {
    setPendingEvent(draftEvent);
    setIsCreateModalOpen(false);
    setSelectedEventId(null);
    setSelectedDate(draftEvent.date);
  };

  const handlePendingEventMove = (coordinates: [number, number]) => {
    setPendingEvent((prev) =>
      prev ? { ...prev, coordinates } : null
    );
  };

  const handleConfirmPendingEvent = () => {
    if (!pendingEvent) return;

    setEvents((prev) => [...prev, pendingEvent]);
    setSelectedEventId(pendingEvent.id);
    setSelectedDate(pendingEvent.date);
    setPendingEvent(null);
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
        <DateSlider
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <SafetyLegend />
      </div>

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