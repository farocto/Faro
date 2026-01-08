import { useState } from "react";

import AppLayout from "./components/layout/AppLayout";
import DateSlider from "./components/ui/DateSlider";
import ModeToggle from "./components/ui/ModeToggle";
import SafetyLegend from "./components/ui/SafetyLegend";

/**
 * Shared app mode type
 * Used by MapView, AppLayout, and UI controls
 */
export type AppMode = "events" | "drivers";

function App() {
  const [mode, setMode] = useState<AppMode>("events");
  const [selectedDate, setSelectedDate] = useState<number>(0);

  return (
    <AppLayout mode={mode} selectedDate={selectedDate}>
      {/* Top Center — Date Slider */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto">
        <DateSlider
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* Top Left — Mode Toggle */}
      <div className="absolute top-4 left-4 space-y-3 pointer-events-auto">
        <ModeToggle mode={mode} onChange={setMode} />
      </div>

      {/* Bottom Left — Safety Legend */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <SafetyLegend />
      </div>
    </AppLayout>
  );
}

export default App;
