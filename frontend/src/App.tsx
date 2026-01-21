import { useState } from "react";

import AppLayout from "./components/layout/AppLayout";
import DateSlider from "./components/ui/DateSlider";
import ModeToggle from "./components/ui/ModeToggle";
import SafetyLegend from "./components/ui/SafetyLegend";

/**
 * Shared app mode type
 * Controls whether the map shows events or drivers
 * Used across App, AppLayout, and MapView
 */
export type AppMode = "events" | "drivers";

function App() {
  /* ===============================
     GLOBAL APP STATE (SOURCE OF TRUTH)
     =============================== */

  // Current application mode (events or drivers)
  const [mode, setMode] = useState<AppMode>("events");

  // Selected day offset (0 = today, 1 = tomorrow, etc.)
  const [selectedDate, setSelectedDate] = useState<number>(0);

  // Currently selected event (null if none selected)
  // This will later drive event details / booking UI
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  /* ===============================
     APP LAYOUT + UI CONTROLS
     =============================== */
  return (
    <AppLayout
      mode={mode}
      selectedDate={selectedDate}
      selectedEventId={selectedEventId}
      onSelectEvent={setSelectedEventId}
    >
      {/* ===============================
          TOP CENTER — DATE SLIDER
          Controls which day's events are visible
         =============================== */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto">
        <DateSlider
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* ===============================
          TOP LEFT — MODE TOGGLE
          Switches between Events and Drivers
         =============================== */}
      <div className="absolute top-4 left-4 space-y-3 pointer-events-auto">
        <ModeToggle mode={mode} onChange={setMode} />
      </div>

      {/* ===============================
          BOTTOM LEFT — SAFETY LEGEND
          Explains zone coloring (not tied to events)
         =============================== */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <SafetyLegend />
      </div>

      {/* ===============================
          TEMP DEBUG / FEEDBACK (2.4)
          Confirms selected event state wiring
          (Safe to remove in later phases)
         =============================== */}
      {selectedEventId && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-xl text-sm pointer-events-none">
          Selected event: {selectedEventId}
        </div>
      )}
    </AppLayout>
  );
}

export default App;
