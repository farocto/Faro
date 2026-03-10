import { useState } from "react";
import DateSlider from "../components/ui/DateSlider";
import MapView from "../components/map/MapView";
import type { AppMode } from "../App";

function HomePage() {
  const todayISO = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [mode, setMode] = useState<AppMode>("events");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);


  return (
    <>
      <DateSlider
        selectedDate={selectedDate}
        onChange={setSelectedDate}
      />

      <MapView
        mode={mode}
        selectedDate={selectedDate}
        selectedEventId={selectedEventId}
        onSelectEvent={setSelectedEventId}
      />
    </>
  );
}

export default HomePage;