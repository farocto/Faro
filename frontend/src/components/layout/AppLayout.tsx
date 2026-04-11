import MapView from "../map/MapView";
import type { AppMode } from "../../App";
import type { EventPin } from "../../mocks/events";

type AppLayoutProps = {
  mode: AppMode;
  selectedDate: string;
  selectedEventId: string | null;
  onSelectEvent: (id: string | null) => void;
  events: EventPin[];
  children: React.ReactNode;
};

function AppLayout({
  mode,
  selectedDate,
  selectedEventId,
  onSelectEvent,
  events,
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
        />
      </div>

      <div className="relative z-10 h-full w-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;