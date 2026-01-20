import MapView from "../map/MapView";
import type { AppMode } from "../../App";

type AppLayoutProps = {
  mode: AppMode;
  selectedDate: number;

  // NEW — passed down from App
  selectedEventId: string | null;
  onSelectEvent: (id: string) => void;

  children: React.ReactNode;
};

function AppLayout({ mode, selectedDate, children,selectedEventId,
  onSelectEvent, }: AppLayoutProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0">
        <MapView
  mode={mode}
  selectedDate={selectedDate}
  selectedEventId={selectedEventId}
  onSelectEvent={onSelectEvent}
/>
      </div>

      <div className="relative z-10 h-full w-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
