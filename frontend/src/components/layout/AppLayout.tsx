import MapView from "../map/MapView";
import type { AppMode } from "../../App";
import type { EventPin } from "../../mocks/events";

type AppLayoutProps = {
  mode: AppMode;
  selectedDate: string;
  selectedEventId: string | null;
  onSelectEvent: (id: string | null) => void;
  events: EventPin[];

  pendingEvent: EventPin | null;
  onPendingEventMove: (coordinates: [number, number]) => void;
  
  children: React.ReactNode;
};

function AppLayout({
  mode,
  selectedDate,
  selectedEventId,
  onSelectEvent,
  events,
  pendingEvent,
  onPendingEventMove,
  children,
}: AppLayoutProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0">
        <MapView
          mode={mode}
          selectedDate={selectedDate}
          selectedEventId={selectedEventId}
          onSelectEvent={onSelectEvent}
          events={events}
          pendingEvent={pendingEvent}
          onPendingEventMove={onPendingEventMove}
        />
      </div>

      <div className="relative z-10 h-full w-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;