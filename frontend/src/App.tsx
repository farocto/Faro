import { useState } from "react";

import CityPage from "@/pages/CityPage";
import EditorialPage from "@/pages/EditorialPage";

type AppSection = "city" | "editorial";

function App() {
  const [activeSection, setActiveSection] =
    useState<AppSection>("city");

  return (
    <div className="relative min-h-screen">
      {activeSection === "city" && <CityPage />}

      {activeSection === "editorial" && <EditorialPage />}

      {/* Temporary integration controls */}
      <div className="fixed bottom-4 right-4 z-[100] flex gap-2 rounded-xl bg-night/90 p-2 shadow-xl">
        <button
          type="button"
          onClick={() => setActiveSection("city")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeSection === "city"
              ? "bg-amber text-harbor"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          City
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("editorial")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeSection === "editorial"
              ? "bg-amber text-harbor"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          Editorial
        </button>
      </div>
    </div>
  );
}

export default App;