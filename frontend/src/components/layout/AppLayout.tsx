import MapView from "../map/MapView";
import type { AppMode } from "../../App";

type AppLayoutProps = {
  mode: AppMode;
  selectedDate: string;

  selectedEventId: string | null;
  onSelectEvent: (id: string | null) => void;

  children: React.ReactNode;
};

function AppLayout({
  mode,
  selectedDate,
  selectedEventId,
  onSelectEvent,
  children,
}: AppLayoutProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* MAP */}
      <div className="absolute inset-0">
        <MapView
          mode={mode}
          selectedDate={selectedDate}
          selectedEventId={selectedEventId}
          onSelectEvent={onSelectEvent}
        />
      </div>

      {/* UI */}
      <div className="relative z-10 h-full w-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
