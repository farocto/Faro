import { useEffect, useMemo, useState } from "react";
import DateSlider from "../components/ui/DateSlider";
import MapView from "../components/map/MapView";
import type { AppMode } from "../App";
import { getEvents, type EventSummaryDto } from "../api/eventsApi";
import { mapEventSummariesToEventPins } from "../mappers/eventMappers";

function HomePage() {
  const todayISO = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [mode, setMode] = useState<AppMode>("events");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [events, setEvents] = useState<EventSummaryDto[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      setIsLoadingEvents(true);
      setEventsError(null);

      try {
        const result = await getEvents(selectedDate);
        setEvents(result);
      } catch (error) {
        console.error(error);
        setEventsError("Could not load events.");
      } finally {
        setIsLoadingEvents(false);
      }
    }

    loadEvents();
  }, [selectedDate]);

  const mapEvents = useMemo(() => {
    return mapEventSummariesToEventPins(events);
  }, [events]);

  return (
    <>
      <DateSlider selectedDate={selectedDate} onChange={setSelectedDate} />

      {eventsError && (
        <div className="absolute left-4 top-20 z-50 rounded-lg bg-red-600 px-4 py-2 text-sm text-white shadow-lg">
          {eventsError}
        </div>
      )}

      {isLoadingEvents && (
        <div className="absolute left-4 top-20 z-50 rounded-lg bg-black/70 px-4 py-2 text-sm text-white shadow-lg">
          Loading events...
        </div>
      )}

      <MapView
        mode={mode}
        selectedDate={selectedDate}
        selectedEventId={selectedEventId}
        onSelectEvent={setSelectedEventId}
        events={mapEvents}
        pendingEvent={null}
        onPendingEventMove={() => {}}
      />
    </>
  );
}

export default HomePage;