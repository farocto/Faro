import { useState } from "react";

import FaroSidebar from "@/components/navigation/FaroSidebar";
import MobileNav from "@/components/navigation/MobileNav";

import ActionSheet from "@/features/contributions/components/ActionSheet";

import CityPage from "@/pages/CityPage";
import EditorialPage from "@/pages/EditorialPage";

import type { AppSection } from "@/types/navigation";

function App() {
  const [activeSection, setActiveSection] = useState<AppSection>("city");

  const [isActionOpen, setIsActionOpen] = useState(false);

  const [
    createEventRequestId,
    setCreateEventRequestId,
    ] = useState(0);

  const handleCreateEvent = () => {
    setIsActionOpen(false);

    setActiveSection("city");

    setCreateEventRequestId(
      (current) => current + 1,
    );
  };

  return (
    <div className="min-h-dvh bg-cloud">
      <FaroSidebar
        active={activeSection}
        onNavigate={setActiveSection}
        onAction={() => setIsActionOpen(true)}
      />

      <MobileNav
        active={activeSection}
        onNavigate={setActiveSection}
        onAction={() => setIsActionOpen(true)}
      />

      <div className="min-h-dvh lg:pl-[240px]">
        {activeSection === "city" && (
          <CityPage
            createEventRequestId={
              createEventRequestId
            }
          />
        )}

        {activeSection === "editorial" && (
          <EditorialPage />
        )}
      </div>

      <ActionSheet
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
}

export default App;