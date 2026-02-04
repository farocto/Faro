import { useState } from "react";

import AppLayout from "./components/layout/AppLayout";
import DateSlider from "./components/ui/DateSlider";
import SafetyLegend from "./components/ui/SafetyLegend";

/**
 * MVP App Mode
 * Drivers mode removed
 */
export type AppMode = "events";

function App() {
  /* ===============================
     GLOBAL APP STATE
     =============================== */

  const [mode] = useState<AppMode>("events");

  // ✅ ISO date string (YYYY-MM-DD)
  const todayISO = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState<string>(todayISO);


  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <AppLayout
      mode={mode}
      selectedDate={selectedDate}
      selectedEventId={selectedEventId}
      onSelectEvent={setSelectedEventId}
    >
      {/* DATE SLIDER */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto">
        <DateSlider
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* SAFETY LEGEND */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <SafetyLegend />
      </div>

      {/* TEMP DEBUG */}
      {selectedEventId && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-xl text-sm pointer-events-none">
          Selected event: {selectedEventId}
        </div>
      )}
    </AppLayout>
  );
}

export default App;
